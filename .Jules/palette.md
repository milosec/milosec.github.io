# Palette's Journal

## 2024-05-23 - Accessibility in Auto-Generated Static Sites
**Learning:** Tools like Mobirise generate visually appealing sites but often neglect basic accessibility, populating `alt` attributes with "Mobirise Website Builder" and leaving icon-only links without `aria-label`.
**Action:** When working with generated code, first audit all images and interactive elements. Replace default "builder spam" `alt` text with descriptive text or empty strings for decorative elements, and ensure all icon-only buttons/links have `aria-label` or screen reader only text.

## 2024-05-24 - Accessibility of Emoji Icons
**Learning:** The site uses raw emojis (e.g., 📍, 📧) as decorative icons in the "Contact" section. Screen readers announce these (e.g., "Round Pushpin"), which can be redundant or distracting when followed immediately by the text label.
**Action:** Wrap purely decorative emojis in `<span aria-hidden="true">` to prevent screen reader announcement, or provide `role="img"` with `aria-label` if they convey unique meaning.

## 2024-05-24 - Mobile Menu State Management
**Learning:** When implementing custom JavaScript toggles for mobile menus (especially those that lock body scrolling), failing to reset the state on window resize leads to broken UX on desktop (locked scroll) if the user resizes the window.
**Action:** Always include a `resize` event listener that checks `window.innerWidth` and resets the menu state (removes active classes, resets aria-expanded, restores body scroll) when crossing the mobile breakpoint.

## 2024-05-25 - Skip to Content Links
**Learning:** Static site templates often omit "Skip to content" links, forcing keyboard users to tab through the entire navigation menu on every page load. This is a critical WCAG failure (2.4.1).
**Action:** Always verify the presence of a skip link. If missing, inject an anchor tag immediately after `<body>` and target the main content container (e.g., `#main-content`) with a visually hidden, focus-visible utility class.
