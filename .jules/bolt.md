## 2024-05-22 - Global Event Listeners & Layout Thrashing
**Learning:** Attaching `mousemove` listeners to `document` that query the DOM (`querySelectorAll`) and force layout (`getBoundingClientRect`) inside the handler causes massive main-thread blocking and layout thrashing (forced reflow) on every frame.
**Action:** Scope event listeners to the specific interactive elements (e.g., `.card`) and use `requestAnimationFrame` to throttle style updates. Cache DOM queries outside the event loop.
