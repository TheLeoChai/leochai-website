# Build Notes, article and recipe templates with supplied launch content

- Identifier: LEO-56
- Linear: https://linear.app/leochai/issue/LEO-56/build-notes-article-and-recipe-templates-with-supplied-launch-content
- Status: Backlog
- Priority: Medium
- Estimate: None
- Labels: day-30
- Milestone: Notes & recipes
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-106, LEO-107, LEO-108, LEO-109, LEO-119
- Blocks: LEO-156, LEO-155, LEO-129, LEO-128, LEO-127, LEO-126, LEO-125, LEO-124, LEO-123, LEO-122, LEO-121, LEO-120, LEO-68, LEO-58, LEO-57
- Blocked by: LEO-49
- Related: LEO-160
- Created: 2026-09-10T20:23:25.732Z
- Updated: 2026-09-11T02:20:28.331Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: N1–N4; H6/G4 links; F5/F6
Build order: M1, step 9 (relative day 30 target).

Build the chronological category-labeled index and shared article template with date, revision, AI-editing note, sources and previous/next links. Add the recipe variant with finished dish, personal note, servings, ingredients, ordered steps and print CSS. Publish the two supplied essays and a real supplied recipe; use supplied failure/reflection material when available.

Key constraints

* Do not invent Leo's opinions, recipes, quantities or captions to fill slots; missing content is a dependency.
* Published HTML/media, locale RSS and Git content work independently of NAS; translations reference source revision and English-only backlog is explicit.
* Preserve informal voice, responsive images, alt text and credited sources; no request-time model translation.

Acceptance criteria (§14)

* §14 day 30 + checks 1–2, 7–8: two supplied essays and supplied recipe render, print, link and feed correctly; one article per available locale works without JS/NAS.
* No fake Chinese routes/alternates; no private originals, drafts or secrets in public artifacts/history.

## Feature-section work breakdown

* [LEO-106 · N1 · Chronological Notes index and categories](<https://linear.app/leochai/issue/LEO-106/n1-chronological-notes-index-and-categories>)
* [LEO-107 · N2 · Shared article template and authorship](<https://linear.app/leochai/issue/LEO-107/n2-shared-article-template-and-authorship>)
* [LEO-108 · N3 · Recipe template, quantities and print layout](<https://linear.app/leochai/issue/LEO-108/n3-recipe-template-quantities-and-print-layout>)
* [LEO-109 · N4 · Previous/next navigation and contact](<https://linear.app/leochai/issue/LEO-109/n4-previousnext-navigation-and-contact>)
* [LEO-119 · N · Supplied launch essays, failure reflection and real recipe](<https://linear.app/leochai/issue/LEO-119/n-supplied-launch-essays-failure-reflection-and-real-recipe>)

## User-flow acceptance specs (§12)

* **F5 · Casual explorer:** gallery → PC clip → recipe → RSS. Engineering knowledge optional.
* **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.
* **F7 · Mobile/reduced motion:** diagrams readable; chat stacks; farm text timeline; optional rigs/viewers unloaded; numbered animation stills.
* **F8 · NAS/quota failure:** recorded farm and pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Decision & build steps (2026-09-11)

**Decision (templates & typography in Notes):**

* Templates are plain Eleventy layouts consuming LEO-161's typography tokens; article images use static `<picture>`/srcset emitted at build (no runtime image framework; pyvips derivatives come from the publishing pipeline when present).
* Recipe variant gets print CSS; quantities preserved verbatim; no manufactured filler. Missing supplied content blocks the affected issue, no placeholder articles. zh Notes with untranslated items show the explicit "English articles awaiting translation" list — no false alternate links.

**Build steps (in order):**

1. LEO-106 — N1 chronological index + categories.
2. LEO-107 — N2 shared article template.
3. LEO-108 — N3 recipe template + print CSS.
4. LEO-109 — N4 prev/next + contact.
5. LEO-119 — supplied launch content (2 essays + real recipe) through the templates.

## Comments

No comments returned by Linear.
