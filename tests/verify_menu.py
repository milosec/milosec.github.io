import sys
import os
from playwright.sync_api import sync_playwright

def test_mobile_menu():
    filepath = os.path.abspath('index.html')
    url = f'file://{filepath}'

    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Set mobile viewport size
        page = browser.new_page(viewport={'width': 375, 'height': 667})

        # Abort external requests to bypass CSP restrictions for file:// URLs
        page.route("**/*", lambda route: route.continue_() if not route.request.url.startswith("http") else route.abort())

        page.goto(url)

        # Wait for toggle
        toggle = page.locator('.mobile-menu-toggle')
        nav_links = page.locator('.nav-links')

        # Verify initial state
        assert toggle.get_attribute('aria-expanded') == 'false'

        # Click toggle to open menu
        toggle.click()
        page.wait_for_timeout(500)

        assert toggle.get_attribute('aria-expanded') == 'true'
        assert 'active' in nav_links.get_attribute('class')

        # Resize to desktop
        page.set_viewport_size({'width': 1024, 'height': 768})
        page.wait_for_timeout(500)

        # Verify reset
        assert toggle.get_attribute('aria-expanded') == 'false'
        assert 'active' not in nav_links.get_attribute('class')

        browser.close()
        print("Mobile menu test passed.")

if __name__ == "__main__":
    test_mobile_menu()
