# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-02 - Continuous getBoundingClientRect Layout Thrashing
**Learning:** Even when scoped to a specific element and throttled by `requestAnimationFrame`, calling `getBoundingClientRect()` on every `mousemove` event continuously forces synchronous layout calculations (layout thrashing) which degrades performance.
**Action:** Cache absolute element coordinates on `mouseenter` using a `WeakMap` (to avoid memory leaks if elements are removed), update the cache only on resize, and calculate relative mouse positions using `e.pageX` and `e.pageY` during `mousemove` to completely eliminate layout thrashing during the animation.
