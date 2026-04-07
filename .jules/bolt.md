# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - GPU Offloading for Heavy CSS Filters
**Learning:** Animating elements with heavy CSS filters (like `blur(80px)` on `.blob`) on the CPU causes constant main-thread rasterization, leading to layout thrashing and jank.
**Action:** Apply `will-change: transform;` to offload rendering to the GPU compositor, significantly improving animation performance.
