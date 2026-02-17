# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-02 - Throttling High-Frequency Events
**Learning:** Attaching `mousemove` listeners without throttling can cause performance issues. Even when using `requestAnimationFrame`, if multiple events fire in a single frame, multiple callbacks might be queued or executed depending on implementation.
**Action:** Use a `ticking` flag to ensure only one `requestAnimationFrame` callback is scheduled per frame for each element. This prevents stacking of callbacks and redundant calculations.
