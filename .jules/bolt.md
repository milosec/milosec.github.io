# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Layout Thrashing with Resize Listeners
**Learning:** Using `window.addEventListener('resize', ...)` to handle responsive breakpoints causes the callback to fire continuously during window resizing, leading to unnecessary checks and potential layout thrashing.
**Action:** Use `window.matchMedia('(min-width: 769px)').addEventListener('change', ...)` to trigger breakpoint-specific logic only when the breakpoint is actually crossed, rather than on every resize frame.
