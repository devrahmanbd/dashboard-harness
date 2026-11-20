# Dashboard Design Patterns — the research behind the skill

Source: https://dashboarddesignpatterns.github.io — Bach, Freeman,
Abdul-Rahman, Turkay, Khan, Fan, Chen, "Dashboard Design Patterns", IEEE VIS
Conference / Journal of Transactions on Visualization and Computer Graphics
(TVCG), 2023. The site also links a compact and a slim pattern cheatsheet
(PNG) for quick reference.

## What it is

Dashboards offer "a curated lens through which people view large and complex
data sets at a glance. They combine visual representations and other graphical
embellishments to provide layers of abstraction and simplification for
numerous related data points, so that dashboard viewers get an overview of the
most important or relevant information, in a time efficient way."

## Why patterns

There are many high-level guidelines on dashboard design (visual perception,
reducing information load, interaction, visualization literacy), but little
guidance on effective, applicable dashboard design — and designers face an
overwhelming number of choices: which data streams to process and simplify,
which visual representations to use, and how to structure and present them on
large screens. The patterns on the site aim to support creativity and to
streamline dashboard design, especially for the wider non-expert audience now
designing dashboards.

## What it means for QUE

- The dashboard is a **monitoring tool**, not a report: the owner opens it
  every morning to answer "what needs me now?" at a glance. That is the
  "curated lens" — the most important information first, everything else a
  layer down.
- **Abstraction and simplification** are the job: a count, a status, a next
  time — not raw rows, not debug output, not raw identifiers.
- The patterns are a **design aid, not a template**: they support creativity
  and rapid design. The actionable rules live in the dashboard-design skill
  (`references/dashboard-design-skill/`), which distils the same tradition
  (Few, Tufte, Knaflic) into checkable component patterns.
- The workshop the authors ran (March 2022) is the model for how to use
  patterns: apply them to a real screen, discuss where they help and where
  they fight the content, and keep the ones that survive contact with real
  data.
