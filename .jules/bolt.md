# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - requestAnimationFrame Stacking on High-Frequency Events
**Learning:** Calling `requestAnimationFrame` inside a `mousemove` event handler without a `ticking` lock can queue up multiple callbacks per frame on high refresh-rate monitors, causing unnecessary calculations and potential micro-stutters.
**Action:** Always use a `ticking` state boolean to lock and throttle `requestAnimationFrame` callbacks for high-frequency DOM events.
