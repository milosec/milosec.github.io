## 2026-01-16 - Static Site Security & API Key Exposure
**Vulnerability:** Hardcoded Google Maps API Key in client-side HTML and lack of security headers.
**Learning:** Static sites (like Mobirise exports) often lack backend capabilities to hide secrets or set HTTP headers. API keys for client-side services (Maps) are inevitably exposed.
**Prevention:** Mitigate by restricting API keys in the provider's console (Referrer restrictions). Enhance security posture by adding CSP and Referrer-Policy via meta tags to limit the impact of potential XSS, even if no backend exists.

## 2026-01-16 - Secure Configuration for Static Sites
**Vulnerability:** Hardcoded secrets in static HTML files are immediately exposed in version control.
**Learning:** Even without a build process, secrets can be separated from code using a gitignored `config.js` file loaded before dependent scripts.
**Prevention:** Use a `config.js` (gitignored) + `config.example.js` (committed) pattern. Inject secrets at runtime using simple DOM manipulation to avoid committing them.
