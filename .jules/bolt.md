# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Optimizing mousemove Performance
**Learning:** Calling `getBoundingClientRect()` inside a rapidly firing `mousemove` listener on individual elements still causes layout thrashing, even if bounded by `requestAnimationFrame`.
**Action:** Cache the result of `getBoundingClientRect()` on `mouseenter` and clear it on `mouseleave` to avoid repeated DOM measurement calls entirely during the `mousemove` lifecycle.
