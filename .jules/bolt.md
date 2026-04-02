# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Mousemove Layout Thrashing
**Learning:** Calling `getBoundingClientRect()` within a `mousemove` event handler causes significant layout thrashing even when attached to specific elements.
**Action:** Cache the element's absolute page coordinates (`rect.left + window.scrollX` and `rect.top + window.scrollY`) in a `WeakMap` upon `mouseenter` and `resize` events. In the `mousemove` handler, use `e.pageX` and `e.pageY` relative to the cached coordinates to compute positions, avoiding DOM layout reads during the high-frequency event.
