## 2024-05-22 - Global Event Listeners & Layout Thrashing
**Learning:** Attaching `mousemove` listeners to `document` that query the DOM (`querySelectorAll`) and force layout (`getBoundingClientRect`) inside the handler causes massive main-thread blocking and layout thrashing (forced reflow) on every frame.
**Action:** Scope event listeners to the specific interactive elements (e.g., `.card`) and use `requestAnimationFrame` to throttle style updates. Cache DOM queries outside the event loop.
# Bolt's Journal

This journal documents critical performance learnings for the project.

## 2024-05-22 - [Optimizing Mousemove Handlers]
**Learning:** `document.addEventListener('mousemove', ...)` that iterates over elements triggers extensive layout thrashing (forced synchronous layout) via `getBoundingClientRect()`.
**Action:** Scope event listeners to specific elements and use `requestAnimationFrame` to debounce style updates.
