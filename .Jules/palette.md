# Palette's Journal

## 2024-05-23 - Accessibility in Auto-Generated Static Sites
**Learning:** Tools like Mobirise generate visually appealing sites but often neglect basic accessibility, populating `alt` attributes with "Mobirise Website Builder" and leaving icon-only links without `aria-label`.
**Action:** When working with generated code, first audit all images and interactive elements. Replace default "builder spam" `alt` text with descriptive text or empty strings for decorative elements, and ensure all icon-only buttons/links have `aria-label` or screen reader only text.

## 2024-05-24 - Accessibility of Emoji Icons
**Learning:** The site uses raw emojis (e.g., 📍, 📧) as decorative icons in the "Contact" section. Screen readers announce these (e.g., "Round Pushpin"), which can be redundant or distracting when followed immediately by the text label.
**Action:** Wrap purely decorative emojis in `<span aria-hidden="true">` to prevent screen reader announcement, or provide `role="img"` with `aria-label` if they convey unique meaning.
