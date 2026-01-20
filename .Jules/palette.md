# Palette's Journal

## 2024-05-23 - Accessibility in Auto-Generated Static Sites
**Learning:** Tools like Mobirise generate visually appealing sites but often neglect basic accessibility, populating `alt` attributes with "Mobirise Website Builder" and leaving icon-only links without `aria-label`.
**Action:** When working with generated code, first audit all images and interactive elements. Replace default "builder spam" `alt` text with descriptive text or empty strings for decorative elements, and ensure all icon-only buttons/links have `aria-label` or screen reader only text.

## 2024-05-24 - Semantic Grouping in Definition Lists
**Learning:** Found a pattern where contact information (label + value) was implemented as inline spans separated by `<br>` tags within a single list item. While technically accessible (screen readers read the text), it lacks semantic structure for navigation and makes styling dependent on line-breaks.
**Action:** Refactor such patterns into semantic groupings using block-level elements (like `h5` for labels and `p` for values) inside the list item. This improves screen reader navigation (headings) and allows for precise spacing control via CSS utilities (e.g., `mb-1`) rather than relying on `br`.
