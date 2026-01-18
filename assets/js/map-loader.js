/**
 * 🛡️ Sentinel: Secure Map Loader
 * Loads Google Maps iframe dynamically to avoid hardcoding API keys in HTML.
 */
(function() {
    function initMap() {
        const config = window.appConfig;

        // Fail securely if config is missing
        if (!config || !config.GOOGLE_MAPS_API_KEY) {
            console.warn('Sentinel: Google Maps API key not found in window.appConfig.');
            return;
        }

        const apiKey = config.GOOGLE_MAPS_API_KEY;
        // Select iframes that have the specific data-src indicating a map
        const mapIframes = document.querySelectorAll('iframe[data-src*="google.com/maps"]');

        mapIframes.forEach(iframe => {
            let src = iframe.getAttribute('data-src');

            // Check for the placeholder
            if (src.includes('key=KEY_PLACEHOLDER')) {
                // Replace placeholder with actual key
                src = src.replace('key=KEY_PLACEHOLDER', `key=${apiKey}`);

                // Set the src attribute to trigger load
                iframe.setAttribute('src', src);

                // Optional: Remove data-src to clean up
                iframe.removeAttribute('data-src');
            }
        });
    }

    // Ensure DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMap);
    } else {
        initMap();
    }
})();
