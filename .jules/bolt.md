# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Continuous Resize Listeners
**Learning:** Attaching a generic `resize` event listener on the `window` to check viewport width triggers layout thrashing and continuous callbacks during every pixel change of a resize event.
**Action:** Replace `window.addEventListener('resize', ...)` with `window.matchMedia('(min-width: 769px)').addEventListener('change', ...)` for breakpoint-specific logic. This ensures the callback only runs precisely when the breakpoint is crossed.
