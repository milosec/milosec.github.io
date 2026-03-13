# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Mobile Menu Resize Listener Bottleneck
**Learning:** Attaching a `window.addEventListener('resize')` listener to check for screen width changes causes logic to run on every single pixel of resize, reducing responsiveness and slowing down the main thread.
**Action:** Use `window.matchMedia('(min-width: 769px)').addEventListener('change')` to only trigger the resize logic when the specified breakpoint is crossed.
