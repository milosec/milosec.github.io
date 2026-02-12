# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-12 - Resize Event Overhead
**Learning:** Using `window.addEventListener('resize', ...)` to check breakpoints causes the handler to fire hundreds of times per second during resize, leading to layout thrashing.
**Action:** Use `window.matchMedia('(min-width: 769px)').addEventListener('change', ...)` to execute code only when the breakpoint is crossed.
