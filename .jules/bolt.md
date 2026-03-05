# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - matchMedia vs Resize Listeners
**Learning:** Attaching logic to `window.addEventListener('resize')` even with basic condition checks (like checking window width) can cause layout thrashing and unnecessary JS execution since it fires on every pixel change during a resize.
**Action:** Use `window.matchMedia('(min-width: ...)')` and listen for the `change` event to only execute responsive JavaScript logic when a breakpoint is actually crossed, eliminating resize-driven layout thrashing.
