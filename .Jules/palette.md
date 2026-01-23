# Palette's Journal

## 2024-05-23 - Accessibility in Auto-Generated Static Sites
**Learning:** Tools like Mobirise generate visually appealing sites but often neglect basic accessibility, populating `alt` attributes with "Mobirise Website Builder" and leaving icon-only links without `aria-label`.
**Action:** When working with generated code, first audit all images and interactive elements. Replace default "builder spam" `alt` text with descriptive text or empty strings for decorative elements, and ensure all icon-only buttons/links have `aria-label` or screen reader only text.

## 2024-05-24 - Semantic List Grouping
**Learning:** Generated contact lists often fragment label and value into separate `<li>` elements (e.g., `<li>Label:</li><li>Value</li>`), creating a disjointed experience for screen reader users who hear them as unrelated items.
**Action:** Refactor such lists to group the label and value within a single `<li>` element (e.g., `<li><strong>Label:</strong><br>Value</li>`), preserving visual styling while restoring semantic relationship. Ensure this change is reflected in the project file (e.g., `project.mobirise`) to persist through regeneration.
