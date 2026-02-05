## 2026-01-16 - Static Site Security & API Key Exposure
**Vulnerability:** Hardcoded Google Maps API Key in client-side HTML and lack of security headers.
**Learning:** Static sites (like Mobirise exports) often lack backend capabilities to hide secrets or set HTTP headers. API keys for client-side services (Maps) are inevitably exposed.
**Prevention:** Mitigate by restricting API keys in the provider's console (Referrer restrictions). Enhance security posture by adding CSP and Referrer-Policy via meta tags to limit the impact of potential XSS, even if no backend exists.

## 2026-01-16 - Mobirise Persistence & Meta Tags
**Vulnerability:** Manual security hardening in `index.html` (like CSP headers) is overwritten upon Mobirise regeneration.
**Learning:** Mobirise stores `<head>` injections in the `header_custom` JSON field within `project.mobirise`. This field is often empty by default.
**Prevention:** Always mirror security meta tags added to `index.html` into the `header_custom` field in `project.mobirise`.

## 2026-01-25 - CSP Hardening & Inline Scripts
**Vulnerability:** Inline JavaScript requires `script-src 'unsafe-inline'`, which enables XSS.
**Learning:** Mobirise generates inline scripts by default. To harden CSP, these must be extracted to external files. However, `project.mobirise` must also be updated to ensure the `header_custom` field (containing the CSP meta tag) matches the `index.html` changes.
**Prevention:** Extract inline scripts to `assets/js/`, verify they load correctly (paying attention to `file://` protocol nuances during testing), and update both `index.html` and `project.mobirise`.

## 2026-02-10 - CSP Hardening: Styles & Specificity
**Vulnerability:** `style-src 'unsafe-inline'` weakens CSP, allowing potential CSS injection attacks.
**Learning:** Refactoring inline styles to CSS classes allows removing `'unsafe-inline'`. However, ensuring the new classes override existing framework styles might require `!important` or higher specificity selectors when working with generated codebases like Mobirise.
**Prevention:** Systematically replace inline styles with utility classes and verify visual regressions. Update CSP to remove `'unsafe-inline'` for `style-src`.

## 2026-03-01 - CSP Enhancements: HTTPS Upgrade & Data URI
**Vulnerability:** Mixed content risks and potential data exfiltration via images.
**Learning:** `upgrade-insecure-requests` is a powerful CSP directive supported in `<meta>` tags that transparently upgrades HTTP resource requests to HTTPS, mitigating mixed content on static sites. `img-src data:` is often default but unnecessary, and removing it hardens the site against potential data exfiltration vectors.
**Prevention:** Audit `img-src` usage and remove `data:` if unused. Always include `upgrade-insecure-requests` in CSP for modern static sites.

## 2026-06-15 - CSP: form-action in Meta Tags
**Vulnerability:** Default CSP allows forms to submit data to any origin.
**Learning:** `form-action` is one of the few CSP directives supported in `<meta>` tags (unlike `frame-ancestors`), allowing effective mitigation of form-jacking on static sites.
**Prevention:** Include `form-action 'self'` in the CSP meta tag to restrict form submissions to the same origin.

## 2026-06-15 - Security Availability: Broken JS
**Vulnerability:** Syntax errors in unrelated JS code blocks can crash the entire script execution, disabling critical security features like client-side email obfuscation.
**Learning:** Client-side security controls (like obfuscation) are fragile and dependent on the overall health of the JavaScript environment. Availability is a prerequisite for client-side security.
**Prevention:** Implement strict syntax checking (linting/validation) in the build pipeline to catch errors before deployment.
