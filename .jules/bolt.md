# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Optimizing Viewport Change Listeners
**Learning:** Using `window.addEventListener('resize')` for responsive breakpoints causes unnecessary callback execution and layout thrashing because it triggers continuously during resizing, even when the breakpoint hasn't changed.
**Action:** Replace `window.addEventListener('resize')` with `window.matchMedia('(min-width: ...)').addEventListener('change')` to trigger callbacks only when crossing defined breakpoints.
