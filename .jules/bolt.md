# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-03-08 - Window Resize Event Bottleneck
**Learning:** Using `window.addEventListener('resize', ...)` to manage responsive breakpoints triggers the callback continuously as the window size changes, leading to unnecessary function calls.
**Action:** Use `window.matchMedia('(min-width: 769px)').addEventListener('change', ...)` instead. This is more performant as it only fires when the specified breakpoint condition is crossed, significantly reducing the frequency of event firing and layout thrashing.
