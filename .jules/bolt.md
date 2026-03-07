# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-02 - Layout Thrashing with getBoundingClientRect on Mousemove
**Learning:** Computing `getBoundingClientRect()` on every `mousemove` event forces synchronous layout recalculations and degrades performance, even when constrained to a single element. Furthermore, `window.addEventListener('resize')` triggers continuously, unnecessarily firing event handlers on every pixel change.
**Action:** Cache the element's bounding box coordinates on `mouseenter` (and clear on `mouseleave`) to avoid layout thrashing during continuous `mousemove` events. Use `requestAnimationFrame` to throttle style application. For window resizing, replace frequent resize listeners with `window.matchMedia` breakpoint observers for zero-overhead responsive state changes.