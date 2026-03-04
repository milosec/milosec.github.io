# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Optimizing window resize event listeners
**Learning:** Using `window.addEventListener('resize', ...)` fires continuously and can cause layout thrashing if executing logic conditionally based on screen width.
**Action:** Use `window.matchMedia('(min-width: 769px)').addEventListener('change', ...)` to only trigger the callback when a specific breakpoint is crossed, effectively saving a ton of unnecessary JS execution overhead.
