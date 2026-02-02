# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Correct RequestAnimationFrame Throttling
**Learning:** Simply wrapping code in `requestAnimationFrame` inside an event listener does NOT throttle the expensive operations (like `getBoundingClientRect`) if they are called *before* the rAF block. To true throttle:
1. Capture event data (coordinates) in the listener.
2. Use a `ticking` flag to schedule *one* rAF.
3. Perform the expensive reads (`getBoundingClientRect`) and writes (`style.setProperty`) *inside* the rAF callback, using the captured coordinates.
**Action:** Always move layout reads inside the rAF callback to ensure they only happen once per frame, not once per mouse event.
