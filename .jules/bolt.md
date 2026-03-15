# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Mobile Menu Resize Listener Bottleneck
**Learning:** Attaching standard `resize` event listeners to `window` for updating component states (like mobile menu resets) causes unnecessary callback execution on every pixel change, leading to performance degradation.
**Action:** Use `window.matchMedia('(min-width: ...px)').addEventListener('change', ...)` to trigger logic only when specific breakpoints are crossed, rather than continuously polling viewport width.
