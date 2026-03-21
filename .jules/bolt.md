# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2025-02-12 - matchMedia instead of resize event
**Learning:** Using `window.addEventListener('resize', ...)` to perform checks against `window.innerWidth` runs constantly on resize, causing unnecessary callback execution.
**Action:** Use `window.matchMedia('(min-width: 769px)').addEventListener('change', ...)` instead to only execute logic when crossing the specific breakpoint.
