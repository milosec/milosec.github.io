# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Spotlight Effect Mousemove Thrashing
**Learning:** Calling `getBoundingClientRect()` inside a high-frequency event like `mousemove` causes layout thrashing even when scoped to a single element. Caching the dimensions on `mouseenter` significantly reduces DOM reads.
**Action:** When implementing continuous hover effects, cache bounding rect values on `mouseenter` or `resize`, and use `pageX/pageY` offsets against the cached values during `mousemove` inside a `requestAnimationFrame` loop.
