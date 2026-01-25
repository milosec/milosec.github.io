# Palette's Journal

## 2024-05-23 - Accessibility in Auto-Generated Static Sites
**Learning:** Tools like Mobirise generate visually appealing sites but often neglect basic accessibility, populating `alt` attributes with "Mobirise Website Builder" and leaving icon-only links without `aria-label`.
**Action:** When working with generated code, first audit all images and interactive elements. Replace default "builder spam" `alt` text with descriptive text or empty strings for decorative elements, and ensure all icon-only buttons/links have `aria-label` or screen reader only text.

## 2024-05-24 - Accessibility of Emoji Icons
**Learning:** The site uses raw emojis (e.g., 📍, 📧) as decorative icons in the "Contact" section. Screen readers announce these (e.g., "Round Pushpin"), which can be redundant or distracting when followed immediately by the text label.
**Action:** Wrap purely decorative emojis in `<span aria-hidden="true">` to prevent screen reader announcement, or provide `role="img"` with `aria-label` if they convey unique meaning.

## 2024-05-25 - Robust Mobile Menus in Glassmorphism
**Learning:** Implementing absolute-positioned overlays on top of fixed, glassmorphic headers (`backdrop-filter`) creates complex stacking context issues, often resulting in transparent or hidden menus.
**Action:** Instead of fighting `z-index`, use `flex-wrap: wrap` on the navbar container and allow the mobile menu to flow naturally as a block element (`width: 100%`) within the fixed header. This ensures it inherits the header's background/blur and stays on top of content without fragile positioning hacks.
