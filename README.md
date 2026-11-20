# Dashboard Design + QA Harness

Verifies the QUE dashboard rebuild (Phase C) against the approved design
direction (`~/workspace/que-core-first/dashboard-design-direction.md`) and
the distilled UX/UI guidelines in `GUIDELINES.md`. It is a **baseline**
harness: the first run is expected to fail on the currently broken dashboard
(home crashes, book page crashes, layout defects). Failures are reported
honestly, never hidden.

## What it checks

`qa/qa-dashboard.mjs` (Playwright, headless Chromium) signs into **staging
only** (`https://staging.qubickle.com`) as the seed owner, visits six pages
at five widths, screenshots each, and runs the automatable checks from the
design direction's Acceptance list:

| # | Check | Pages |
|---|-------|-------|
| a | No horizontal overflow (`scrollWidth === innerWidth`) | all |
| b | Home page loads (no "This page didn't load" / "Something went wrong") | `/` |
| c | Book page reaches the time step (service → provider → slots) without a full-screen error | `/u/acme-studio/book` |
| d | No raw identifiers visible (`ai:`, `page_builder:`, `custom_domain:`, `sso:`, `white_label:`) | all |
| e | No monospace font in the bookings table | `/dashboard/bookings` |
| f | Dates without seconds | `/dashboard/bookings` |
| g | No duplicate lifecycle rows | `/dashboard/bookings` |
| h | The "upcoming" count agrees with the schedule rows where both are present | `/dashboard` |
| i | Exactly one sidebar item active | dashboard pages |
| j | No header status pills clipped / overlapping (no pills at all is the specified end state) | dashboard pages |

Checks that need a human eye ("premium feel", salience, colour-coded status,
real calendar grid, human billing labels) are recorded as `manual` with the
screenshot path. Open the screenshot and judge it — do not mark manual
checks passed without looking.

Pages visited (staging only, never production `que.qubickle.com`):

- `/dashboard`, `/dashboard/calendar`, `/dashboard/billing`,
  `/dashboard/bookings`, `/u/acme-studio/book`, `/` (home)

Widths: 1440 / 1280 / 768 / 390 / 375, `deviceScaleFactor: 2`.

## How to run

```sh
cd /root/dashboard-harness
./qa/run.sh            # full run (login + 6 pages x 5 widths)
./qa/run.sh --widths 1440,375   # a subset, for a quick re-check
```

The run takes several minutes (30 page visits + the book-page flow). `run.sh`
runs it detached (nohup) and tails the log, so an SSH drop does not kill it:

```sh
tail -f /root/dashboard-harness/qa/run.log   # watch progress
```

## Prerequisites

1. **`.env`** (mode 600) with the staging seed-owner credentials. It is NOT
   in this repo and is never committed. If it is absent the script exits
   with a clear message telling the operator to create it:

   ```sh
   cp .env.example .env
   # edit .env — STAGING_OWNER_EMAIL / STAGING_OWNER_PASSWORD
   chmod 600 .env
   ```

   The password is the **staging seed test fixture** (the same one the Phase B
   evidence scripts use). It is a test account, never a production secret.
   Never hardcode it in a script, a report, or a committed file.
2. **Playwright + Chromium.** The script reuses the repo's existing
   Playwright install (`/opt/quesystem2-staging/node_modules/playwright`)
   and the cached Chromium builds in `/root/.cache/ms-playwright`. If that
   install is missing, `run.sh` installs `playwright-core` into the harness
   and uses the cached Chromium. No browser is downloaded unless the cache
   has no matching build (`npx playwright install chromium` is the fallback
   and is the only network step).

## Where the report goes

- `qa/report.md` — human-readable, one pass/fail/manual line per check per
  page per width, with screenshot paths and a one-line verdict.
- `qa/report.json` — the same data as JSON (for diffing runs).
- `qa/screenshots/<width>/<page>.png` — full-page screenshots
  (`deviceScaleFactor: 2`).
- `qa/run.log` — the run's console output.

The first run is a **baseline**: expect failures. Compare later runs against
it (`qa/report.json`) to show what the rebuild fixed. A run that reports
failures is working correctly; a run that hides them is broken.

## Safety

- **Staging only.** The script refuses any URL whose host is not
  `staging.qubickle.com`. Production (`que.qubickle.com`), the production
  app, the production DB, and the ShieldGate/Framique stacks are never
  touched.
- **Read-only verification.** The script only signs in, navigates, clicks
  through the public book flow (service → provider → time slots, no booking
  is submitted), and reads the DOM. It does not modify the staging app, its
  code, or its data, and it never commits or pushes anything.
- **No secrets in output.** The report never contains the password. The
  `.env` file is mode 600 and lives only on this server.

## Files

- `README.md` — this file.
- `GUIDELINES.md` — distilled UX/UI good practices + design guidelines,
  organized by color, typography, spacing/layout, icons, components,
  accessibility, performance, honesty/trust, mobile, plus a Marketing /
  landing-page section for Phase D. Each guideline cites its source.
- `sources.md` — all 22 supplied links + the two dashboard references,
  with a one-line note each (or dead / duplicate / tangential).
- `references/dashboard-design-skill/` — a copy of the dashboard-design
  skill (MIT) — the binding design system.
- `references/dashboard-design-patterns.md` — the Dashboard Design Patterns
  research (Bach et al., IEEE VIS/TVCG 2023) in one page.
- `qa/qa-dashboard.mjs` — the Playwright script.
- `qa/run.sh` — the runner (detached, logs to `qa/run.log`).
- `.env.example` — the credential template (no secret).
- `.env` — the real credentials (mode 600, not committed, not in this repo).
