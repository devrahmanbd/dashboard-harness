# QUE Dashboard — UX/UI Good Practices & Design Guidelines

Distilled from the 22 UX/UI links the user supplied, plus the dashboard-design
skill and Dashboard Design Patterns. Every guideline cites its source. See
`sources.md` for the status of each link — several were dead, blocked,
duplicated, or tangential, and those are listed there, not silently dropped.

## How to use this document

- The dashboard-design skill's system (tokens, principles, icons, layout,
  components, screenshot QA) is the binding spec for the dashboard rebuild —
  see `~/workspace/que-core-first/dashboard-design-direction.md` and
  `references/dashboard-design-skill/`. These guidelines are the supporting
  good practices behind it.
- A guideline earns its place by being checkable or actionable. The harness
  (`qa/`) automates the checkable ones; the rest are judged on the screenshots
  (marked `manual` in the report).

## 1. Color

- Two semantic hues carry meaning: accent (people/traffic/bookings) and money
  (revenue), plus warn for below-threshold. Everything else is ink, muted, or
  line. (dashboard-design skill, tokens.md)
- Three intensities, three jobs: pale (token at 7–20%) for non-data and
  de-emphasis, medium for data marks, bright or dark only for what needs
  attention. A screen of medium and bright everywhere has nothing left to
  highlight with. (dashboard-design skill, tokens.md / perception.md — Few's rules)
- Muted text must keep ≥ 4.5:1 contrast on every surface it sits on; data
  marks need 3:1 against their neighbours. (dashboard-design skill,
  tokens.md / perception.md; Deque axe rules — "Text elements must have
  sufficient color contrast")
- Colour is never the only carrier of meaning: pair red/green with a shape,
  icon, position, or text, or use blue/orange. Check every status through a
  colour-blindness filter (deuteranopia, protanopia, tritanopia,
  achromatopsia). (dashboard-design skill, perception.md; UX review
  framework — "green text on a red button could completely ruin a
  colour-blind user's experience")
- Colour only where it means something; different colours only for different
  meanings. No gradients on chart backgrounds, no gloss, no 3D.
  (dashboard-design skill, perception.md)
- Links must be distinguishable from surrounding text in a way that does not
  rely on colour. (Deque axe rules)

## 2. Typography

- Base 14 px, labels 12–13 px muted, KPI values 28–32 px, panel titles
  15–16 px semibold. (dashboard-design skill, layout.md / tokens.md)
- Times, dates, and numbers use tabular numerals, right-aligned in columns;
  as precise as the decision needs (5.2M on a card, exact in the tooltip);
  compact on axes (1k, $4k). (dashboard-design skill, SKILL.md /
  perception.md)
- Dates without seconds ("Nov 21, 7:00 PM", not "11/21/2026, 7:00:00 PM").
  (design direction; dashboard-design skill)
- One typeface for UI text; no monospace in tables. (design direction)
- Headings: one level-one heading per page, heading levels increase by one,
  no empty headings; don't use bold/italic/font-size to style a paragraph as
  a heading. (Deque axe rules)
- A headline should be unique and authentic ("no-bullshit"), user-centric
  (use "you", replace We/Our with You/Your), descriptive ("Clear beats
  clever"), and targeted at the 20–35% of traffic most likely to convert.
  (homepage-design tips)

## 3. Spacing / layout

- Spacing is an 8px-based system; cards use generous, consistent padding
  (p-6). Empty space is deliberate (a max-width column), never a half-empty
  card or a 300–350px void. (dashboard-design skill, layout.md; design
  direction)
- Dashboards grow on big screens (content may reach ~1640px from an 1800px
  viewport; four breakdown panels in one row). Content pages cap at ~1180px,
  centred. Never a narrow column floating in white space.
  (dashboard-design skill, layout.md)
- No holes: cards in a row hold similar amounts of content (limit 8 rows
  each). When one card is half empty, restructure it (fold it into its
  neighbour, pair it with another short card) instead of stretching it.
  (dashboard-design skill, layout.md)
- The monitoring view fits one screen: KPI cards + the main problem view
  above the fold at 1440×900. Breakdowns and detail lists may scroll; the
  answer and the problems may not. (dashboard-design skill, layout.md)
- Page order: header (title left; updated/filter/range right) → KPI cards →
  the main view where problems show → breakdowns → detail lists. Most
  important top-left (F-scan). (dashboard-design skill, layout.md)
- Related elements are grouped by proximity and by a clearly defined
  boundary (Law of Proximity, Law of Common Region); similar elements are
  perceived as a group (Law of Similarity). (lawsofux.com)
- Minimalism: "if it doesn't serve a purpose for the user to reach their
  end goal, get rid of it." Overload, clutter, and confusion are failures
  of design, not attributes of information (Tufte). (dev.to minimalism)
- One primary action per view — the next thing the user should do is the
  clearest, boldest action. (design direction; minimalism — Fitts's Law:
  CTAs are the elements users must find and select easily)

## 4. Icons

- 16 px icons, stroke 1 / 1.2 / 1.5 (1 in nav lists, 1.2 default, 1.5
  selected or alone), medium weight over semibold. Never mix stroke widths
  inside one icon row. (dashboard-design skill, tokens.md)
- Small monochrome icon squares — one neutral icon per tile/row, never a
  rainbow of icon tiles with one colour per card. Colour only where it
  means something. (dashboard-design skill, SKILL.md / qa.md smell list)
- Every icon-only control has a tooltip (dark surface, white text, 12px)
  that also shows on keyboard focus, and an accessible name — when a button
  has no accessible name, screen readers announce it as just "button".
  (dashboard-design skill, components.md; UX review framework; Deque axe
  rules — icon buttons must have alternate text)
- Don't hide everything behind a hamburger: a labelled "Menu" button was
  clicked 20% more than a hamburger icon, and hamburger + the word "Menu"
  earned 5% more revenue. If navigation matters, show it or label it.
  (icons8)
- A control must signal its affordance — a door (or button) that doesn't
  say push or pull is a Norman's door. (icons8)
- Use familiar icons and patterns (Jakob's Law): users prefer what works
  like the other sites they already know. Don't reinvent the wheel — users
  are creatures of habit. (lawsofux.com; dev.to minimalism; homepage-design
  tips)

## 5. Components

- KPI strip: one card, tiles divided by hairlines (not floating cards).
  Selected = a soft tinted fill with a faint ring — never an underline or a
  left edge. (dashboard-design skill, components.md)
- Delta badge: ▲ 13% green / ▼ 9% red, 12px medium, tabular; ±0% grey.
  Colour by meaning, not direction (lower-is-better flips). Base below ~5
  reads "was 1" in grey, never a red −100%. Never repeat a tile's delta
  anywhere else. (dashboard-design skill, components.md)
- Ranked breakdown list: a 3px rounded track along the row's bottom edge,
  the share filled in the entity colour at ~75% opacity. No tinted block
  behind the text. (dashboard-design skill, components.md)
- Date range picker: one pill trigger + a popover calendar (soft band
  between solid end days, footer with the range + day count + Apply). Never
  a native `<input type="date">`. (dashboard-design skill, components.md)
- Tables: hairline row separators, muted date column, right-aligned
  amounts, tabular figures. People rows: letter avatar + name + one muted
  detail + status chip + value + icon actions. (dashboard-design skill,
  components.md)
- Hick's Law: the time to decide grows with the number and complexity of
  choices — limit options and steps. (lawsofux.com; dev.to minimalism)
- Fitts's Law: the time to acquire a target is a function of its distance
  and size — make the primary action large, close, and contrasting, with
  short clear text. (lawsofux.com; dev.to minimalism)
- Miller's Law: a person keeps 7 (±2) items in working memory — limit what
  users must hold in mind to finish a task. (lawsofux.com; dev.to
  minimalism)
- Goal-Gradient Effect: the tendency to approach a goal increases with
  proximity — show progress toward the goal (value, goal, and what is left
  on one tile). (lawsofux.com; dashboard-design skill — "Goal beside the
  number")
- Peak-End Rule: people judge an experience by its peak and its end — make
  the end of a flow (the booking confirmation) feel good, not just the
  middle. (lawsofux.com)
- Von Restorff Effect: the item that differs is the one remembered — make
  the thing that needs attention the one that differs. (lawsofux.com)
- Zeigarnik Effect: people remember uncompleted tasks better than completed
  ones — an unfinished booking or unconfirmed appointment stays visible
  until it is done. (lawsofux.com)
- Aesthetic-Usability Effect: users perceive aesthetically pleasing design
  as more usable — craft is not decoration, it is usability. (lawsofux.com)

## 6. Accessibility

- Text contrast ≥ 4.5:1 (WCAG AA) for normal text, ≥ 3:1 for large text
  and data marks. (dashboard-design skill, perception.md; Deque axe rules)
- Colour is never the only carrier of meaning (see Color). Links are
  distinguished from surrounding text without relying on colour.
  (dashboard-design skill; Deque axe rules)
- Buttons and links must have discernible text; form inputs must have
  labels (and a visible label); images must have alternate text; SVG
  graphics need accessible text. (Deque axe rules)
- Page structure: one level-one heading, one main landmark, all content
  inside landmarks, heading levels increase by one, a skip link to bypass
  repeated blocks. (Deque axe rules)
- Users must be able to zoom and scale text up to 500%; zooming and
  scaling must not be disabled. (Deque axe rules)
- Focus must be visible; every interactive element (including charts and
  heatmaps) must be keyboard-reachable, with a text alternative (aria-label
  summary: range, extremes, latest value) and spoken values context-first.
  (dashboard-design skill, perception.md; Deque axe rules)
- Respect reader settings: more contrast, differentiate without colour,
  reduced transparency, dark mode. (dashboard-design skill, perception.md)
- Test with a real screen reader and a colour-blindness filter, not just a
  linter. Automated checks (axe) catch only part of it — manual checks are
  also required. (Deque axe rules; UX review framework — Lighthouse +
  contrast tools)

## 7. Performance

- 53% of mobile visits are abandoned if a page takes longer than 3 seconds
  to load; 1 in 2 people expect a page to load in less than 2 seconds; as
  load time goes from 1s to 7s, the probability of a mobile visitor
  bouncing rises 113%. (Think with Google — "The Need for Mobile Speed",
  Google Data 2016; Google/SOASTA 2017)
- Doherty Threshold: productivity soars when the computer and its users
  interact at a pace under 400ms — neither has to wait on the other.
  (lawsofux.com)
- Every second matters: Google found a 400ms delay reduces searches by
  0.59%; Amazon calculated a 1s slowdown costs $1.6B/year (and 100ms cost
  1% of sales in 2006). A user waiting longer than 10 seconds switches
  tasks. (icons8)
- Never use a fake preloader as a smoke screen for poor performance — fix
  the performance. A preloader is a temporary fix at most, never a
  permanent solution. (icons8)
- Measure with PageSpeed Insights / Lighthouse; optimise images, cache
  assets, reduce server requests, and load above-the-fold content first.
  (UX review framework; Think with Google — assess, execute, monitor)
- Perception of speed matters as much as real speed: show a skeleton the
  size of the final content while loading, keep old data visible but dimmed
  while new data loads (never flash zeros), and never let an older response
  overwrite a newer one. (dashboard-design skill, components.md — States)

## 8. Honesty / trust

- The same number everywhere it appears; estimates are labelled; a tiny
  base never shouts. (dashboard-design skill, SKILL.md)
- No fake metrics, no approximated counts presented as fact, no debug
  output, no raw identifiers, no test/seed labels in customer-facing
  tables. If data is loading, show a loading state — never a wrong page.
  (design direction; dashboard-design skill — Honest)
- Errors say what went wrong and offer the fix as a button; no "Oops", no
  error codes as the message. (dashboard-design skill, components.md)
- Empty states say what will appear here and how to get it ("Payments
  appear here after the first one is taken" + "Take payment"); never an
  all-clear ("nothing urgent today") on an account with no data — no data
  is not good news. (dashboard-design skill, components.md)
- Trust signals on public pages: "Featured On" logos, an "in business
  since" line, testimonials with photos and names, and a clear "Got a
  Question? Ask Our Expert Team — We'll Email You Back ASAP" contact
  callout. (humanproofdesigns.com)
- Don't oversell: don't promise things you don't actually offer.
  (homepage-design tips)
- Review honestly: frame findings as opportunities, keep written feedback
  short and to the point, and identify problems before jumping to
  solutions. (UX review framework)
- Test on real people with real data: a prototype must be believable, and
  validation means watching users, not asking them what they think.
  (Google web.dev — Basics of UX)

## 9. Mobile

- No horizontal page scroll at 375px
  (`document.documentElement.scrollWidth === innerWidth`).
  (dashboard-design skill, layout.md)
- Navigation: a site picker + current page + a Menu button opening a grid
  of all pages (3 columns, icon over label) — not a sideways-scrolling tab
  row. (dashboard-design skill, layout.md)
- Segmented tabs shrink and truncate (never scroll sideways). Date
  calendar is a bottom sheet, one month. (dashboard-design skill,
  layout.md)
- Rows fold before they truncate: drop decorations (avatars, icon squares,
  chips) and move their facts into the muted second line, so names and
  numbers stay whole. (dashboard-design skill, layout.md)
- Fonts must not be too small; pinch or zoom must not be required on any
  page. (UX review framework)
- Charts use touch-pan-y (never touch-none) so a vertical swipe still
  scrolls the page. (dashboard-design skill, layout.md)
- Enable efficiency on all devices — the same task must be completable on
  a phone as on a desktop. (homepage-design tips)

## 10. Marketing / landing page (Phase D)

- In 3 seconds a visitor must know: what the site is for, what to do
  first, and why be here and not somewhere else. (homepage-design tips)
- A homepage has three objectives: (1) tell me what your site is about
  and what it is for, (2) show me where to start, (3) tell me why I should
  be here and not somewhere else. (homepage-design tips)
- Headline formulas that work: say what it is ("Your ride on demand"),
  say what you get ("Optimize your Facebook Ads as Easily as Making your
  Morning Coffee"), say what you're able to do with it ("Everything you
  need to manage your business and get work done, in one place").
  Split-test — there is no way to know in advance which headline works.
  (homepage-design tips)
- Navigation: simple, consistent, enables efficiency; it reflects the
  buyer's typical behaviour by order of importance; the logo returns to the
  homepage; use common terms (Contact, About, Services). (homepage-design
  tips)
- Be original, but don't reinvent the wheel — users are creatures of habit
  and hate change. (homepage-design tips)
- Focus on what users value most — ask them. Stakeholders and users rank
  sections differently (in one study, users ranked FAQs first and
  stakeholders ranked it last). (homepage-design tips)
- Trust and proof: featured-on logos, in-business-since line, testimonials
  with photos, a free guide download, and a visible expert contact
  callout. (humanproofdesigns.com)

## Sources that contributed nothing (and why)

- The two JavaScript style-guide links (#9, #10) are code style, not UI —
  the one transferable note is "stylistic consistency matters"
  (freeCodeCamp / Google JS style guide).
- #12 (uxplanet.org) is a publication homepage, not a specific article.
- #22 (nickkolenda.com) only yielded its five section headings (Focus,
  Understanding, Effort, Errors, Compatibility) — the content is JS-driven
  and wasn't retrievable. Those headings are a useful review skeleton.
- Dead / blocked / unreadable: #1, #2, #3, #7, #8, #11, #13, #15 (see
  sources.md for the exact status of each).
