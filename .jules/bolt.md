# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-02 - Layout Thrashing from getBoundingClientRect in mousemove
**Learning:** Even with O(1) element targeting, calling `getBoundingClientRect` synchronously inside a high-frequency `mousemove` handler forces the browser to recalculate the layout repeatedly (layout thrashing).
**Action:** Cache the element's absolute page coordinates (using `rect.left + window.scrollX`) in a `WeakMap` on `mouseenter` (and `resize` events). Inside the `mousemove` handler, use `e.pageX` and `e.pageY` along with the cached absolute coordinates to compute relative position in true O(1) time without triggering reflows.
