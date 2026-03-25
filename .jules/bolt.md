# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-03-25 - Local Layout Thrashing in Mousemove
**Learning:** Even when `mousemove` listeners are scoped to individual elements, calling `getBoundingClientRect()` on every event trigger causes layout thrashing. Because the element's position within the document rarely changes during mouse movement, recalculating its position continuously is unnecessary.
**Action:** Cache the element's document-relative position (`docLeft` and `docTop`) on `mouseenter` (using `getBoundingClientRect()` plus `window.pageXOffset`/`window.pageYOffset`), and clear it on `mouseleave`. During `mousemove`, use the cached position with `e.pageX` and `e.pageY` to calculate relative coordinates, entirely bypassing `getBoundingClientRect()` in the high-frequency event path. Use `requestAnimationFrame` and a boolean lock (`ticking`) to further throttle CSS variable updates.