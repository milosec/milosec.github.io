# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Resize Listeners vs MatchMedia
**Learning:** Attaching `resize` event listeners to `window` causes the callback to fire continuously during window resizing, leading to unnecessary layout checks and potential layout thrashing.
**Action:** Use `window.matchMedia` and listen for `change` events to trigger logic only when specific breakpoints are crossed, significantly reducing the frequency of callback execution and improving performance.
