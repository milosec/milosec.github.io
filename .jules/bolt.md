# Bolt's Journal

This journal documents critical performance learnings for the project.

## 2024-05-22 - [Optimizing Mousemove Handlers]
**Learning:** `document.addEventListener('mousemove', ...)` that iterates over elements triggers extensive layout thrashing (forced synchronous layout) via `getBoundingClientRect()`.
**Action:** Scope event listeners to specific elements and use `requestAnimationFrame` to debounce style updates.
