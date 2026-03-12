# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-03-12 - Window Resize Optimization
**Learning:** Using `window.addEventListener('resize', ...)` with manual width checks triggers continuously during resizing, causing layout thrashing.
**Action:** Replace window resize event listeners that check for breakpoints with `window.matchMedia('(min-width: ...px)').addEventListener('change', ...)`. This ensures the callback only fires when the breakpoint is crossed, eliminating unnecessary main thread overhead.
