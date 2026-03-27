# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-03-27 - Spotlight Optimization Regression
**Learning:** Caching `getBoundingClientRect()` on `mouseenter` to prevent layout thrashing inside `mousemove` introduces a functional regression because it fails to account for scroll offsets. If a user scrolls while hovering, the element moves relative to the viewport, but the cached rect does not update, causing visual detatchment. Furthermore, simply querying `getBoundingClientRect` or `clientX/Y` without immediately writing to the DOM does not cause synchronous layout thrashing.
**Action:** Do not aggressively cache viewport-relative coordinates across frames when scrolling is possible. Throttle visual updates (CSS property changes) using `requestAnimationFrame`, but calculate position directly inside the `mousemove` handler.
