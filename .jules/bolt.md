# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Layout Thrashing in Hover Effects
**Learning:** Calling `getBoundingClientRect()` inside a high-frequency event like `mousemove` causes layout thrashing, even if throttled via `requestAnimationFrame`, because it forces the browser to recalculate layout repeatedly.
**Action:** Cache the bounding rectangle on `mouseenter` (or `resize`) and reuse the cached values in the `mousemove` handler to ensure O(1) time complexity and eliminate layout recalculations.

## 2026-02-01 - GPU Offloading for Heavy Filters
**Learning:** Animating elements with heavy CSS filters (like `blur(80px)` on `.blob`) on the CPU causes constant main-thread rasterization and significant performance degradation.
**Action:** Always apply `will-change: transform;` to heavily filtered elements being animated, which offloads rendering to the GPU compositor and frees up the main thread.
