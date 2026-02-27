# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-27 - Syntax Error in Optimization
**Learning:** Incomplete refactoring or copy-paste errors can leave orphaned code blocks (like stray `ticking = false;` or `}`) that cause syntax errors, breaking the entire script file.
**Action:** Always validate JavaScript syntax with `node -c` before committing, especially when manually editing files without a build process.
