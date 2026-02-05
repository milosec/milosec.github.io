# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-18 - Throttling RAF in Event Listeners
**Learning:** When using requestAnimationFrame in high-frequency event listeners (like mousemove), always use a 'ticking' flag to prevent stacking multiple RAF callbacks for the same frame.
**Action:** Implement a boolean lock (ticking) that is set to true on event and reset to false in the RAF callback.
