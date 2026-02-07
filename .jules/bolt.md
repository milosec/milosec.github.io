# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-02 - Layout Thrashing in Input Handlers
**Learning:** `getBoundingClientRect()` triggers a synchronous reflow. Calling it directly in a `mousemove` handler (high frequency) causes layout thrashing even if the visual update is throttled via `requestAnimationFrame`.
**Action:** Move `getBoundingClientRect()` inside the `requestAnimationFrame` callback to ensure layout reads are also throttled to the frame rate.
