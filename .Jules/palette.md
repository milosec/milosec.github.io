# Palette's Journal

## 2024-05-23 - Accessibility in Auto-Generated Static Sites
**Learning:** Tools like Mobirise generate visually appealing sites but often neglect basic accessibility, populating `alt` attributes with "Mobirise Website Builder" and leaving icon-only links without `aria-label`.
**Action:** When working with generated code, first audit all images and interactive elements. Replace default "builder spam" `alt` text with descriptive text or empty strings for decorative elements, and ensure all icon-only buttons/links have `aria-label` or screen reader only text.

## 2024-05-24 - Semantic Structure of Generated Lists
**Learning:** Mobirise contact lists often break semantic associations by splitting labels and values into separate list items or using `<br>` tags within unstructured lists. This forces screen reader users to manually piece together related information.
**Action:** Refactor fragmented lists into grouped `<li>` elements containing both the label (e.g., using `<strong>`) and the value. Use CSS (like `display: block` on the label) to preserve the original visual stacking while enforcing programmatic association.
