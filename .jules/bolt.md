# BOLT'S JOURNAL - CRITICAL LEARNINGS

## 2026-02-01 - Global Mousemove Bottleneck
**Learning:** Attaching `mousemove` listeners to `document` and iterating over all target elements causes massive layout thrashing (`getBoundingClientRect` on every element) and unnecessary style updates.
**Action:** Attach listeners directly to the target elements and use `requestAnimationFrame` to throttle visual updates. This changes complexity from O(N) to O(1) for the active element.

## 2026-02-01 - Stale Coordinates in RAF Throttling
**Learning:** When throttling `mousemove` events with `requestAnimationFrame`, capturing `clientX/Y` inside the event handler closure can result in stale coordinates (lag) if multiple events fire before the next frame. The first event's coordinates are used, ignoring subsequent ones.
**Action:** Store the latest coordinates in variables outside the `requestAnimationFrame` scope, update them on every event, and read them inside the RAF callback to ensure the most recent position is rendered.
