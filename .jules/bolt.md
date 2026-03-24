# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Optimizing Animations and Layout Thrashing
**Learning:** Caching layout metrics (`getBoundingClientRect`, `scrollTop`, `scrollLeft`) on `mouseenter` instead of recalculating them on every `mousemove` event prevents severe layout thrashing. Also, animating heavy CSS filters like `blur()` on the main thread causes constant rasterization.
**Action:** Always implement a fallback initialization in `mousemove` in case `mouseenter` is missed. Use `requestAnimationFrame` with a ticking lock for high-frequency events. Apply `will-change: transform;` to elements with heavy filter animations to offload rendering to the GPU compositor.
