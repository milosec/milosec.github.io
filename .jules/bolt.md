# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2024-05-28 - Replacing window resize with matchMedia
**Learning:** For breakpoint-specific logic (e.g., closing a mobile menu when returning to desktop view), using `window.addEventListener('resize')` causes unnecessary layout checks on every pixel of window resizing, potentially causing layout thrashing and performance degradation on the main thread. `window.matchMedia('(min-width: 769px)').addEventListener('change', ...)` correctly confines callback execution to the exact moment the breakpoint is crossed.
**Action:** When implementing responsive state changes in JavaScript, default to `window.matchMedia` with a `change` event listener instead of a global window `resize` event.
