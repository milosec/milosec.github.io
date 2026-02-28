# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-28 - Optimize Window Resize Listeners
**Learning:** Using `window.addEventListener('resize', ...)` to manage breakpoint-specific logic (like resetting a mobile menu) is inefficient because the event fires continuously during resize, leading to unnecessary checks and layout thrashing.
**Action:** Use `window.matchMedia('(min-width: ...)')` and listen to its `change` event instead. This ensures the callback only fires exactly when the breakpoint is crossed, avoiding the performance hit of continuous resize listeners.
