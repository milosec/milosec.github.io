# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Mousemove Layout Thrashing
**Learning:** Calling `getBoundingClientRect()` inside a `mousemove` handler, even when throttled via `requestAnimationFrame` and scoped to the active element, still causes excessive layout thrashing during continuous interactions.
**Action:** Cache the absolute page coordinates (`rect.left + window.scrollX`, etc.) on `mouseenter` (using a `WeakMap`) and `resize`. Then calculate relative positions inside `mousemove` using `e.pageX` and `e.pageY` against the cached coordinates, changing complexity to pure O(1) mathematical operations.
