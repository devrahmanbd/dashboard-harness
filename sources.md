# Sources

Every link the user supplied, with what it contributes — or its status when
it contributed nothing. Fetched 2026-11-20. "Unreadable via fetch" means the
fetch returned an HTTP error or a policy block, not that the link is dead in
a browser; the status is recorded honestly either way.

## The 22 UX/UI links

1. https://www.indiehackers.com/forum/resources-to-help-you-improve-your-ui-design-134dbd3367
   — Unreadable via fetch (HTTP 403). No guideline distilled.
2. https://www.indiehackers.com/forum/how-do-you-make-apps-look-polished-with-no-design-background-cc1183aad2
   — Unreadable via fetch (HTTP 403). No guideline distilled.
3. https://www.julian.com/learn/growth/intro
   — Dead (HTTP 404). No guideline distilled.
4. https://www.thinkwithgoogle.com/marketing-resources/experience-design/speed-is-key-optimize-your-mobile-experience/
   — Redirects to the Think with Google homepage; the article body was not
   retrievable. The mobile-speed numbers it is cited for (53% of visits
   abandoned after 3s; 1 in 2 expect <2s; bounce probability +113% from 1s
   to 7s) were confirmed against Google's "The Need for Mobile Speed"
   (Google Data 2016; Google/SOASTA 2017).
5. https://developers.google.com/web/fundamentals/design-and-ux/principles/
   — Read. Google web.dev "Basics of UX": the Double Diamond (Understand,
   Define, Diverge, Decide, Prototype, Validate), writing the challenge
   statement, validating the problem (stakeholder interviews, lightning
   talks, ≥5 user interviews, ethnographic field research), project map,
   Crazy 8s, storyboard, believable prototype tested on real people.
6. https://lawsofux.com/
   — Read. The Laws of UX: Aesthetic-Usability, Hick's, Fitts's, Jakob's,
   Miller's, Doherty Threshold (<400ms), Goal-Gradient, Peak-End, Von
   Restorff, Zeigarnik, Proximity, Common Region, Similarity, Prägnanz,
   and more.
7. https://twitter.com/i/moments/880688233641848832
   — Blocked by policy (twitter.com domain blocked for the fetcher).
   Unreachable. No guideline distilled.
8. http://nelucebotari.webflow.io/#contact
   — Repurposed: the domain now serves unrelated "essay writer cheap" spam
   content; the original design content is gone. No guideline distilled.
9. https://codeburst.io/5-javascript-style-guides-including-airbnb-github-google-88cbc6b2b7aa
   — Unreadable via fetch (HTTP 403); tangential in any case — a JavaScript
   code style guide, not UI. No guideline distilled.
10. https://medium.freecodecamp.org/google-publishes-a-javascript-style-guide-here-are-some-key-lessons-1810b8ad050b
    — Read; tangential — a JavaScript code style guide, not UI. One
    transferable note: stylistic consistency matters.
11. https://uxplanet.org/7-inexcusable-yet-common-ux-gaffes-that-make-you-look-like-a-total-amateur-cb504a74b917
    — Unreadable via fetch (HTTP 403). No guideline distilled.
12. https://uxplanet.org/
    — Read, but only the publication homepage (a UX publication, 365K
    followers). No specific guideline distilled.
13. https://www.indiehackers.com/@pedrocortes/the-anatomy-of-a-great-landing-page-694e691963
    — Redirects to the Indie Hackers homepage feed; the article body was
    not retrievable. No guideline distilled.
14. https://dev.to/oninross/the-art-of-minimalism-with-ux-4ppd
    — Read. Minimalism = eliminating the not needed and removing
    distractions; Fitts's / Hick's / Jakob's / Miller's laws applied to
    minimalism; KISS and Tufte ("Overload, clutter, and confusion are not
    attributes of information, they are failures of design").
15. http://www.centerline.net/blog/user-experience-design-process-infographic/
    — Dead (HTTP 404). The UX design-process content it pointed at is
    covered by #5 instead.
16. https://dequeuniversity.com/rules/axe/2.2/color-contras
    — The exact rule slug has no match in axe 2.2 (renamed), but the full
    axe 2.2 rule list was retrieved: text contrast, discernible button/link
    text, labelled inputs, alt text, heading order, one H1, one main
    landmark, skip link, zoom to 500%, links not distinguished by colour
    alone, and more. Used for the Accessibility section.
17. https://dev.to/assaultoustudios/a-ux-review-framework-anyone-can-use-bhn
    — Read. A UX review framework: objectives → business objectives →
    personas/userflows → data (analytics, behaviour flow, SUS) → usability
    review (bucketed: journeys, general, design, mobile, desktop) →
    accessibility review → technical review (performance, best practices,
    SEO) → opportunities. Feedback framed as opportunities, kept short,
    problems identified before solutions.
18. https://developers.google.com/web/fundamentals/design-and-ux/principles/
    — DUPLICATE of #5 (same URL). No separate contribution.
19. https://icons8.com/articles/most-hated-ui-ux-design-pattern/
    — Read. Anti-patterns: hamburger menus hiding everything (a labelled
    "Menu" button was clicked 20% more; hamburger + "Menu" = +5% revenue),
    infinite scrolling (not for every site; people with a clear goal want
    to finish ASAP), Norman's doors (a control must signal push vs pull),
    fake preloaders (a smoke screen for poor performance; Google 400ms →
    −0.59% searches; Amazon 1s → $1.6B/year; >10s → user switches tasks).
20. https://medium.com/@simomagazz/homepage-design-for-2018-15-epic-ux-tips-9a9f5004c540
    — Read. Landing-page tips: the 3-second test (what is it for, what do
    I do first, why here not elsewhere); headline formulas (say what it is
    / what you get / what you can do with it; "Clear beats clever"; use
    "you"); navigation (simple, consistent, efficient, ordered by buyer
    behaviour); don't reinvent the wheel; ask users what they value
    (stakeholders and users rank differently).
21. https://www.humanproofdesigns.com/
    — Read. Trust signals on a marketing homepage: "Featured On" logos,
    "in business since 2013", testimonials with photos and names, a "Got a
    Question? Ask Our Expert Team — We'll Email You Back ASAP" contact
    callout, clear service cards, a free guide download CTA.
22. https://www.nickkolenda.com/user-experience/
    — Only the five section headings were retrievable (Focus,
    Understanding, Effort, Errors, Compatibility); the body is JS-driven.
    Used as a review skeleton only.

## The two dashboard references

- https://github.com/abdiraimov-otabek/dashboard-design-skill
  — Read in full (cloned; copied to `references/dashboard-design-skill/`).
  The binding design system for the rebuild: tokens (light + dark), the
  five principles (First glance, Monitor, Quiet, Wordless, Honest) plus
  "Goal beside the number", icon spec (16px, stroke 1/1.2/1.5, monochrome
  squares), layout (page order, dashboards grow to ~1640px, no holes,
  monitoring view fits one screen at 1440×900, phones 375px menu grid),
  component patterns (KPI strip, delta badge, 3px share bars, popover
  calendar, tables, states, tooltips), and the screenshot QA protocol
  (known totals, words audit, salience test, widths 3440/1440/375). MIT.
- https://dashboarddesignpatterns.github.io
  — Read (intro page). The Dashboard Design Patterns research (Bach,
  Freeman, Abdul-Rahman, Turkay, Khan, Fan, Chen — IEEE VIS / TVCG 2023):
  dashboards as a curated lens for at-a-glance insight; design patterns to
  support creativity and rapid dashboard design. The pattern cheatsheets
  are linked from the site. Summarised in
  `references/dashboard-design-patterns.md`.

## Tally

- Read and distilled: #5, #6, #10 (tangential), #12 (homepage only), #14,
  #16, #17, #19, #20, #21, #22 (headings only) — 11 of 22.
- Duplicate: #18 (of #5).
- Dead: #3 (404), #15 (404).
- Unreadable via fetch: #1 (403), #2 (403), #9 (403), #11 (403).
- Redirected to a homepage (article not retrievable): #4, #13.
- Blocked / repurposed: #7 (domain blocked), #8 (now spam content).
- Tangential (code style, not UI): #9, #10.
