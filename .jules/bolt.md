# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Resize Event Over-Execution
**Learning:** `window.addEventListener('resize')` fires continuously during window resizing, causing performance degradation due to unnecessary JS execution and layout checks (like `window.innerWidth`).
**Action:** Replace resize event listeners that check for breakpoints with `window.matchMedia('(min-width: ...)').addEventListener('change')` to only execute logic when the breakpoint boundary is actually crossed.
