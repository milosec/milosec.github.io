## 2026-01-16 - Static Site Security & API Key Exposure
**Vulnerability:** Hardcoded Google Maps API Key in client-side HTML and lack of security headers.
**Learning:** Static sites (like Mobirise exports) often lack backend capabilities to hide secrets or set HTTP headers. API keys for client-side services (Maps) are inevitably exposed.
**Prevention:** Mitigate by restricting API keys in the provider's console (Referrer restrictions). Enhance security posture by adding CSP and Referrer-Policy via meta tags to limit the impact of potential XSS, even if no backend exists.

## 2026-01-16 - Mobirise Persistence & Meta Tags
**Vulnerability:** Manual security hardening in `index.html` (like CSP headers) is overwritten upon Mobirise regeneration.
**Learning:** Mobirise stores `<head>` injections in the `header_custom` JSON field within `project.mobirise`. This field is often empty by default.
**Prevention:** Always mirror security meta tags added to `index.html` into the `header_custom` field in `project.mobirise`.
