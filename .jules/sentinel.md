## 2026-01-16 - Static Site Security & API Key Exposure
**Vulnerability:** Hardcoded Google Maps API Key in client-side HTML and lack of security headers.
**Learning:** Static sites (like Mobirise exports) often lack backend capabilities to hide secrets or set HTTP headers. API keys for client-side services (Maps) are inevitably exposed.
**Prevention:** Mitigate by restricting API keys in the provider's console (Referrer restrictions). Enhance security posture by adding CSP and Referrer-Policy via meta tags to limit the impact of potential XSS, even if no backend exists.

## 2026-01-20 - GitOps for Static Site Secrets
**Vulnerability:** API keys committed directly to HTML files in version control.
**Learning:** Even if client-side keys are public, committing them exposes them to scrapers and history.
**Prevention:** Implement a `config.js` pattern (gitignored) vs `config.example.js` (committed). Use a runtime script (`map-loader.js`) to inject secrets into DOM elements (e.g., iframes) from the config object, keeping the source code clean of secrets.
