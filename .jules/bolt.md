# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-04-05 - Layout Thrashing on Mousemove
**Learning:** Even when `mousemove` listeners are bound directly to target elements, calling `getBoundingClientRect` on every mouse movement causes layout thrashing.
**Action:** Cache the absolute coordinates (e.g. `rect.left + window.scrollX`) on `mouseenter` and `resize` (using `WeakMap` to avoid memory leaks). Use `e.pageX` and `e.pageY` during `mousemove` to calculate relative positions, ensuring NO synchronous layout recalculations occur during high-frequency events.
