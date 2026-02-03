# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-03 - Throttling vs. Scheduling
**Learning:** Simply wrapping `requestAnimationFrame` inside a `mousemove` handler without a state flag (`ticking`) schedules a callback for *every* mouse event, flooding the next frame's task queue. This is not true throttling.
**Action:** Use a `ticking` boolean flag to ensure only one rAF callback is scheduled per frame. Store event coordinates in a shared scope so the callback always uses the latest position.
