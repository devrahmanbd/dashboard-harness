#!/usr/bin/env node
/**
 * QUE dashboard QA — staging only.
 *
 * Signs into https://staging.qubickle.com as the seed owner, visits six pages
 * at five widths, screenshots each, and runs the automatable checks from the
 * design direction's Acceptance list (see README.md). Writes qa/report.md
 * and qa/report.json.
 *
 * Safety: refuses any URL whose host is not staging.qubickle.com. Read-only:
 * it only navigates and clicks through the public book flow (service ->
 * provider -> time slots); no booking is submitted, nothing is modified.
 *
 * Exit code: 0 when the run completed and the report was written (check
 * outcomes are data, not harness errors); 1 when the harness itself could
 * not run (missing .env, no Playwright, sign-in failed, uncaught error).
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HARNESS_DIR = resolve(__dirname, '..');
const QA_DIR = join(HARNESS_DIR, 'qa');
const SHOTS_DIR = join(QA_DIR, 'screenshots');

const STAGING = 'https://staging.qubickle.com';
const PAGES = [
  { slug: 'dashboard', path: '/dashboard' },
  { slug: 'calendar', path: '/dashboard/calendar' },
  { slug: 'billing', path: '/dashboard/billing' },
  { slug: 'bookings', path: '/dashboard/bookings' },
  { slug: 'book', path: '/u/acme-studio/book' },
  { slug: 'home', path: '/' },
];
const DEFAULT_WIDTHS = [1440, 1280, 768, 390, 375];
const VIEWPORT_HEIGHT = 900;
const RAW_IDENTIFIERS = ['ai:', 'page_builder:', 'custom_domain:', 'sso:', 'white_label:'];
const ERROR_TEXTS = ["This page didn't load", 'Something went wrong'];

// ---------------------------------------------------------------- .env ----
function loadEnv() {
  const envPath = join(HARNESS_DIR, '.env');
  if (!existsSync(envPath)) {
    console.error(
      'ERROR: .env not found at ' + envPath + '\n' +
      'Create it first:\n' +
      '  cp .env.example .env\n' +
      '  # edit .env — set STAGING_OWNER_EMAIL and STAGING_OWNER_PASSWORD\n' +
      '  chmod 600 .env\n' +
      'The password is the staging seed test fixture (see README.md). ' +
      'Never hardcode it in a script, a report, or a committed file.',
    );
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq > 0) env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
  }
  if (!env.STAGING_OWNER_EMAIL || !env.STAGING_OWNER_PASSWORD) {
    console.error('ERROR: .env must set STAGING_OWNER_EMAIL and STAGING_OWNER_PASSWORD.');
    process.exit(1);
  }
  return env;
}

// ---------------------------------------------------------- Playwright ----
function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const candidates = [
    '/opt/quesystem2-staging/node_modules/playwright',
    join(HARNESS_DIR, 'node_modules', 'playwright'),
    join(HARNESS_DIR, 'node_modules', 'playwright-core'),
    'playwright',
    'playwright-core',
  ];
  for (const c of candidates) {
    try {
      const mod = require(c);
      if (mod && mod.chromium) {
        console.log('Playwright loaded from: ' + c);
        return mod;
      }
    } catch { /* try next */ }
  }
  console.error(
    'ERROR: no Playwright install found.\n' +
    'Expected the repo install at /opt/quesystem2-staging/node_modules/playwright.\n' +
    'Fallback: cd ' + HARNESS_DIR + ' && npm install playwright-core\n' +
    'then re-run. A cached Chromium build in /root/.cache/ms-playwright is also required.',
  );
  process.exit(1);
}

// -------------------------------------------------------------- helpers ---
function checkResult(check, page, width, result, detail, screenshot) {
  return { check, page, width, result, detail, screenshot: screenshot || null };
}

async function clickText(page, text) {
  // Try the most specific selector first, fall back to any visible element.
  const selectors = [
    `button:has-text("${text}")`,
    `a:has-text("${text}")`,
    `[role="button"]:has-text("${text}")`,
    `:text("${text}")`,
  ];
  for (const sel of selectors) {
    const loc = page.locator(sel).first();
    try {
      if (await loc.isVisible({ timeout: 2000 })) {
        await loc.click({ timeout: 5000 });
        return true;
      }
    } catch { /* try next selector */ }
  }
  return false;
}

function hasErrorText(text) {
  return ERROR_TEXTS.some((e) => text.includes(e));
}

// ------------------------------------------------- per-page DOM checks ----
async function runDomChecks(page, slug, width, shotPath) {
  const out = [];
  const text = await page.evaluate(() => document.body.innerText || '');
  const url = page.url();

  // (a) no horizontal overflow — every page, every width.
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  out.push(checkResult(
    'a: no horizontal overflow', slug, width,
    overflow.scrollWidth === overflow.innerWidth ? 'pass' : 'fail',
    `scrollWidth=${overflow.scrollWidth} innerWidth=${overflow.innerWidth}`,
    shotPath,
  ));

  // (b) home page loads — home only. The error strings alone are not
  // enough: a blank white page has no error text either, so the page must
  // also have meaningful visible content.
  if (slug === 'home') {
    const visibleLen = text.trim().length;
    const hasErr = hasErrorText(text);
    const ok = !hasErr && visibleLen > 200;
    out.push(checkResult(
      'b: home page loads', slug, width,
      ok ? 'pass' : 'fail',
      hasErr ? 'error state visible: ' + ERROR_TEXTS.find((e) => text.includes(e))
        : visibleLen > 200 ? 'no error state; page rendered (' + visibleLen + ' chars visible)'
        : 'page is blank/near-blank (visible text length = ' + visibleLen + ')',
      shotPath,
    ));
  }

  // (d) no raw identifiers — every page.
  const found = RAW_IDENTIFIERS.filter((k) => text.includes(k));
  out.push(checkResult(
    'd: no raw identifiers', slug, width,
    found.length === 0 ? 'pass' : 'fail',
    found.length === 0 ? 'none of ai:/page_builder:/custom_domain:/sso:/white_label: visible'
      : 'visible: ' + found.join(', '),
    shotPath,
  ));

  if (slug === 'bookings') {
    // (e) no monospace font in the bookings table.
    const mono = await page.evaluate(() => {
      const els = [...document.querySelectorAll('table th, table td, [role="columnheader"], [role="cell"]')];
      if (els.length === 0) return { found: false, reason: 'no table cells found' };
      const bad = els.filter((el) => /mono/i.test(getComputedStyle(el).fontFamily));
      return { found: bad.length > 0, reason: bad.length + ' of ' + els.length + ' cells use a mono font' + (bad.length ? ' (e.g. ' + getComputedStyle(bad[0]).fontFamily + ')' : '') };
    });
    out.push(checkResult(
      'e: no monospace in bookings table', slug, width,
      mono.reason.startsWith('no table') ? 'manual' : (mono.found ? 'fail' : 'pass'),
      mono.reason, shotPath,
    ));

    // (f) dates without seconds.
    const secs = text.match(/\b\d{1,2}:\d{2}:\d{2}\b/g);
    out.push(checkResult(
      'f: dates without seconds', slug, width,
      secs ? 'fail' : 'pass',
      secs ? 'seconds found, e.g. ' + secs.slice(0, 3).join(', ') : 'no HH:MM:SS times visible',
      shotPath,
    ));

    // (g) no duplicate lifecycle rows.
    const dup = await page.evaluate(() => {
      const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
      const h = heads.find((el) => /lifecycle/i.test(el.textContent || ''));
      if (!h) return { status: 'manual', reason: 'no lifecycle section heading found' };
      let section = h.closest('section,div');
      if (!section) return { status: 'manual', reason: 'lifecycle heading has no container' };
      // Rows are the leaf-ish elements inside the section that carry a time.
      const rows = [...section.querySelectorAll('li, tr, div')].filter((el) => {
        const t = (el.textContent || '').trim();
        return t.length > 0 && t.length < 200 && /\d{1,2}:\d{2}/.test(t) && el.children.length <= 4;
      }).map((el) => (el.textContent || '').replace(/\s+/g, ' ').trim());
      if (rows.length === 0) return { status: 'manual', reason: 'lifecycle section found but no rows detected' };
      const seen = new Map();
      for (const r of rows) seen.set(r, (seen.get(r) || 0) + 1);
      const dups = [...seen.entries()].filter(([, n]) => n > 1);
      return dups.length
        ? { status: 'fail', reason: dups.length + ' duplicated row(s), e.g. "' + dups[0][0] + '" x' + dups[0][1] }
        : { status: 'pass', reason: rows.length + ' lifecycle rows, none duplicated' };
    });
    out.push(checkResult('g: no duplicate lifecycle rows', slug, width,
      dup.status === 'pass' ? 'pass' : dup.status === 'fail' ? 'fail' : 'manual', dup.reason, shotPath));
  }

  if (slug === 'dashboard') {
    // (h) "upcoming" count agrees with the schedule rows.
    const agree = await page.evaluate(() => {
      const text = document.body.innerText || '';
      const m = text.match(/UPCOMING\s*\n?\s*(\d+)/i) || text.match(/(\d+)\s*\n?\s*UPCOMING/i);
      if (!m) return { status: 'manual', reason: 'no UPCOMING count found on the page' };
      const count = parseInt(m[1], 10);
      const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
      const h = heads.find((el) => /schedule/i.test(el.textContent || ''));
      if (!h) return { status: 'manual', reason: 'UPCOMING=' + count + ' but no Schedule section found' };
      const section = h.closest('section,div');
      if (!section) return { status: 'manual', reason: 'UPCOMING=' + count + ' but Schedule has no container' };
      const rows = [...section.querySelectorAll('tr, li')].filter((el) => {
        const t = (el.textContent || '').trim();
        return t.length > 10 && /\d{1,2}:\d{2}/.test(t);
      });
      if (rows.length === 0) return { status: 'manual', reason: 'UPCOMING=' + count + ' but no schedule rows detected' };
      return rows.length === count
        ? { status: 'pass', reason: 'UPCOMING=' + count + ' and ' + rows.length + ' schedule rows' }
        : { status: 'fail', reason: 'UPCOMING=' + count + ' but ' + rows.length + ' schedule rows' };
    });
    out.push(checkResult('h: upcoming count agrees with schedule rows', slug, width,
      agree.status === 'pass' ? 'pass' : agree.status === 'fail' ? 'fail' : 'manual', agree.reason, shotPath));
  }

  if (['dashboard', 'calendar', 'billing', 'bookings'].includes(slug)) {
    // (i) exactly one sidebar item active.
    const active = await page.evaluate(() => {
      const byAria = [...document.querySelectorAll('[aria-current="page"]')];
      if (byAria.length > 0) return { n: byAria.length, how: 'aria-current="page"' };
      const nav = document.querySelector('nav, aside, [aria-label*="sidebar" i], [aria-label*="navigation" i]');
      const scope = nav || document;
      const byClass = [...scope.querySelectorAll('a, button')].filter((el) =>
        /active/i.test(el.className && el.className.baseVal !== undefined ? el.className.baseVal : String(el.className || '')));
      if (byClass.length > 0) return { n: byClass.length, how: 'class "active" in nav' };
      return { n: 0, how: 'no active marker found' };
    });
    out.push(checkResult(
      'i: exactly one sidebar item active', slug, width,
      active.n === 1 ? 'pass' : active.how === 'no active marker found' ? 'manual' : 'fail',
      active.n === 1 ? '1 active item (' + active.how + ')'
        : active.how === 'no active marker found' ? 'could not determine the active item — judge on the screenshot'
        : active.n + ' active items (' + active.how + ')',
      shotPath,
    ));

    // (j) no header status pills clipped / overlapping.
    const pills = await page.evaluate(() => {
      const els = [...document.querySelectorAll('body *')].filter((el) => {
        const t = (el.textContent || '').trim();
        const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
        if (own.length === 0 || own.length > 40) return false;
        if (!/NEXT|AT RISK/i.test(own)) return false;
        const r = el.getBoundingClientRect();
        return r.top >= 0 && r.top < 180 && r.width > 0;
      });
      return els.map((el) => {
        const r = el.getBoundingClientRect();
        return { text: (el.textContent || '').trim().slice(0, 40), left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top) };
      });
    });
    let pillResult = 'pass';
    let pillDetail = 'no header status pills present (the specified end state)';
    if (pills.length > 0) {
      const vw = await page.evaluate(() => window.innerWidth);
      const clippedReal = pills.filter((p) => p.left < 0 || p.right > vw);
      const overlapping = pills.some((a, i) => pills.some((b, j) => i < j && a.left < b.right && b.left < a.right && Math.abs(a.top - b.top) < 20));
      if (clippedReal.length > 0) { pillResult = 'fail'; pillDetail = 'clipped pill(s): ' + clippedReal.map((p) => p.text).join(', '); }
      else if (overlapping) { pillResult = 'fail'; pillDetail = 'overlapping header pills: ' + pills.map((p) => p.text).join(' / '); }
      else { pillDetail = pills.length + ' header pill(s) present, none clipped/overlapping: ' + pills.map((p) => p.text).join(', '); }
    }
    out.push(checkResult('j: no header status pills clipped/overlapping', slug, width, pillResult, pillDetail, shotPath));
  }

  return out;
}

// ------------------------------------------------- book-page time step ----
async function runBookFlow(page, width, shotPath) {
  const out = [];
  const text0 = await page.evaluate(() => document.body.innerText || '');
  if (hasErrorText(text0)) {
    out.push(checkResult('c: book page reaches the time step', 'book', width, 'fail',
      'full-screen error on load: ' + ERROR_TEXTS.find((e) => text0.includes(e)), shotPath));
    return out;
  }
  if (!(await clickText(page, 'Consultation'))) {
    out.push(checkResult('c: book page reaches the time step', 'book', width, 'manual',
      'could not find/click the Consultation service — judge on the screenshot', shotPath));
    return out;
  }
  await page.waitForTimeout(1500);
  if (!(await clickText(page, 'Staff A'))) {
    out.push(checkResult('c: book page reaches the time step', 'book', width, 'manual',
      'service selected but could not find/click the Staff A provider — judge on the screenshot', shotPath));
    return out;
  }
  await page.waitForTimeout(3000);
  const text = await page.evaluate(() => document.body.innerText || '');
  if (hasErrorText(text)) {
    out.push(checkResult('c: book page reaches the time step', 'book', width, 'fail',
      'full-screen error after selecting provider: ' + ERROR_TEXTS.find((e) => text.includes(e)), shotPath));
    return out;
  }
  const slots = await page.evaluate(() => {
    const t = document.body.innerText || '';
    const times = t.match(/\b\d{1,2}:\d{2}\s*(AM|PM)\b/gi);
    return times ? times.slice(0, 8) : [];
  });
  if (slots.length > 0) {
    out.push(checkResult('c: book page reaches the time step', 'book', width, 'pass',
      'time slots shown, e.g. ' + slots.join(', '), shotPath));
  } else {
    out.push(checkResult('c: book page reaches the time step', 'book', width, 'manual',
      'no full-screen error, but no time slots detected — judge on the screenshot', shotPath));
  }
  return out;
}

// ------------------------------------------------------------------ main --
async function main() {
  const args = process.argv.slice(2);
  const widthsArg = args.find((a) => a.startsWith('--widths='));
  const widths = widthsArg
    ? widthsArg.slice('--widths='.length).split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => Number.isFinite(n) && n > 0)
    : DEFAULT_WIDTHS;
  if (widths.length === 0) { console.error('ERROR: --widths needs at least one width.'); process.exit(1); }

  const env = loadEnv();
  const { chromium } = loadPlaywright();
  const startedAt = new Date().toISOString();
  const results = [];
  const manualNotes = [];

  mkdirSync(SHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await context.newPage();

  // ---- sign in (staging /auth) ----
  // /auth is a chooser ("Create your account" / "Sign in") behind a cookie
  // banner — there is no email/password form until "Sign in" is clicked.
  console.log('Signing in to staging as ' + env.STAGING_OWNER_EMAIL + ' ...');
  await page.goto(STAGING + '/auth', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);
  // Dismiss the cookie banner (best effort — it overlaps the form).
  await clickText(page, 'Reject non-essential');
  await page.waitForTimeout(500);
  // Reach the sign-in form.
  if (!(await clickText(page, 'Sign in'))) {
    throw new Error('could not find the "Sign in" button on /auth');
  }
  await page.waitForTimeout(1500);
  const emailSel = page.locator('input[type="email"], input[name="email"], input[autocomplete="email"], input[aria-label*="email" i], input[placeholder*="mail" i]').first();
  const passSel = page.locator('input[type="password"]').first();
  try {
    await emailSel.waitFor({ state: 'visible', timeout: 15000 });
    await emailSel.fill(env.STAGING_OWNER_EMAIL);
    await passSel.fill(env.STAGING_OWNER_PASSWORD);
    let submit = page.locator('form button[type="submit"]').first();
    if (!(await submit.isVisible({ timeout: 3000 }).catch(() => false))) {
      submit = page.locator('button[type="submit"]').first();
    }
    await submit.click();
    await page.waitForURL(/\/dashboard/, { timeout: 20000 });
    console.log('Signed in — now on ' + page.url());
  } catch (err) {
    const shot = join(SHOTS_DIR, 'signin-failed.png');
    await page.screenshot({ path: shot }).catch(() => {});
    console.error('ERROR: sign-in failed: ' + (err && err.message ? err.message.split('\n')[0] : err));
    console.error('Screenshot: ' + shot);
    await browser.close();
    process.exit(1);
  }

  // ---- visit every page at every width ----
  for (const width of widths) {
    await page.setViewportSize({ width, height: VIEWPORT_HEIGHT });
    for (const p of PAGES) {
      const url = STAGING + p.path;
      const shotPath = join(SHOTS_DIR, String(width), p.slug + '.png');
      mkdirSync(dirname(shotPath), { recursive: true });
      console.log(`[${width}px] ${p.path} ...`);
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
        await page.waitForTimeout(2500);
      } catch (err) {
        results.push(checkResult('page load', p.slug, width, 'fail',
          'navigation failed: ' + (err && err.message ? err.message.split('\n')[0] : err), shotPath));
        continue;
      }

      // Book page: run the interactive flow first, then screenshot the result.
      if (p.slug === 'book') {
        results.push(...await runBookFlow(page, width, shotPath));
      }
      await page.screenshot({ path: shotPath, fullPage: true });
      results.push(...await runDomChecks(page, p.slug, width, shotPath));

      // Manual (human-eye) checks — recorded with the screenshot path.
      manualNotes.push({
        page: p.slug, width, screenshot: shotPath,
        note: 'Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons.',
      });
    }
  }
  await browser.close();

  // ---- report ----
  const counts = { pass: 0, fail: 0, manual: 0 };
  for (const r of results) counts[r.result] = (counts[r.result] || 0) + 1;
  const verdict = counts.fail === 0
    ? (counts.manual === 0 ? 'PASS — all automated checks pass' : 'PASS (automated) — ' + counts.manual + ' manual check(s) still need a human eye')
    : 'FAIL — ' + counts.fail + ' automated check(s) failing (baseline: failures are expected on the currently broken dashboard)';
  const finishedAt = new Date().toISOString();

  const report = {
    harness: '/root/dashboard-harness',
    run: { startedAt, finishedAt, staging: STAGING, widths, deviceScaleFactor: 2, viewportHeight: VIEWPORT_HEIGHT },
    staging: {
      branch: process.env.STAGING_BRANCH || 'unknown',
      commit: process.env.STAGING_COMMIT || 'unknown',
    },
    verdict,
    counts,
    results,
    manual: manualNotes,
  };
  writeFileSync(join(QA_DIR, 'report.json'), JSON.stringify(report, null, 2) + '\n');

  const byPage = {};
  for (const r of results) { (byPage[r.page] = byPage[r.page] || []).push(r); }
  const lines = [];
  lines.push('# Dashboard QA report');
  lines.push('');
  lines.push('- Run: ' + startedAt + ' → ' + finishedAt);
  lines.push('- Staging: ' + STAGING + ' (branch ' + report.staging.branch + ' @ ' + report.staging.commit + ')');
  lines.push('- Widths: ' + widths.join(' / ') + 'px, deviceScaleFactor 2, viewport height ' + VIEWPORT_HEIGHT + 'px');
  lines.push('- Signed in as: ' + env.STAGING_OWNER_EMAIL + ' (seed owner)');
  lines.push('');
  lines.push('## Verdict');
  lines.push('');
  lines.push(verdict);
  lines.push('');
  lines.push('Counts: ' + counts.pass + ' pass / ' + counts.fail + ' fail / ' + counts.manual + ' manual (automated checks only; manual checks are listed separately below).');
  lines.push('');
  lines.push('## Results');
  lines.push('');
  lines.push('| Check | Page | Width | Result | Detail | Screenshot |');
  lines.push('|---|---|---|---|---|---|');
  for (const r of results) {
    const shot = r.screenshot ? r.screenshot.replace(HARNESS_DIR + '/', '') : '—';
    lines.push('| ' + r.check + ' | ' + r.page + ' | ' + r.width + ' | **' + r.result.toUpperCase() + '** | ' + r.detail.replace(/\|/g, '\\|') + ' | ' + shot + ' |');
  }
  lines.push('');
  lines.push('## Failing checks');
  lines.push('');
  const fails = results.filter((r) => r.result === 'fail');
  if (fails.length === 0) lines.push('None.');
  else for (const r of fails) lines.push('- [' + r.width + 'px] ' + r.page + ' — ' + r.check + ': ' + r.detail);
  lines.push('');
  lines.push('## Manual checks (judge on the screenshot)');
  lines.push('');
  for (const m of manualNotes) {
    lines.push('- [' + m.width + 'px] ' + m.page + ' — ' + m.note + ' Screenshot: ' + m.screenshot.replace(HARNESS_DIR + '/', ''));
  }
  lines.push('');
  lines.push('## Notes');
  lines.push('');
  lines.push('- The first run is a baseline: the dashboard is known-broken (home crashes, book page crashes, layout defects), so failures are expected and honest.');
  lines.push('- A run that reports failures is working correctly; a run that hides them is broken.');
  lines.push('- Compare later runs against qa/report.json to show what the rebuild fixed.');
  writeFileSync(join(QA_DIR, 'report.md'), lines.join('\n'));

  console.log('');
  console.log('Verdict: ' + verdict);
  console.log('Counts: ' + counts.pass + ' pass / ' + counts.fail + ' fail / ' + counts.manual + ' manual');
  console.log('Report: ' + join(QA_DIR, 'report.md'));
  console.log('JSON:   ' + join(QA_DIR, 'report.json'));
}

main().catch((err) => {
  console.error('ERROR: harness failed: ' + (err && err.stack ? err.stack : err));
  process.exit(1);
});
