# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Layout Thrashing in Mouse Listeners
**Learning:** Even with `requestAnimationFrame`, calling `getBoundingClientRect` inside a high-frequency event listener (like `mousemove`) causes synchronous layout thrashing before the frame is requested.
**Action:** Store event coordinates in variables and perform ALL heavy geometric calculations (like `getBoundingClientRect`) strictly inside the `requestAnimationFrame` callback.
