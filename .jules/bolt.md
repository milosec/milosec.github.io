# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - rAF Flooding
**Learning:** Calling `requestAnimationFrame` inside a `mousemove` handler without a latch/flag queues a callback for *every* event, which can be dozens per frame.
**Action:** Use a `ticking` boolean flag to prevent scheduling a new rAF until the previous one has executed.
