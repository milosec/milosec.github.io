import os
import time
from playwright.sync_api import sync_playwright

def test_mobile_menu():
    filepath = f"file://{os.path.abspath('index.html')}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a mobile viewport size
        page = browser.new_page(viewport={"width": 375, "height": 667})

        # We need to abort external requests since CSP might block or upgrade them
        page.route("**/*", lambda route: route.continue_() if not route.request.url.startswith("http") else route.abort())

        # Catch errors
        page.on("pageerror", lambda err: print(f"Page Error: {err}"))
        page.on("console", lambda msg: print(f"Console: {msg.text}"))

        page.goto(filepath)

        # Verify initial state
        toggle = page.locator('.mobile-menu-toggle')
        nav_links = page.locator('.nav-links')

        assert toggle.get_attribute('aria-expanded') == 'false', "Menu should be closed initially"
        assert not 'active' in nav_links.get_attribute('class'), "Nav links should not be active initially"

        # Click toggle
        toggle.click()

        # Verify expanded state
        assert toggle.get_attribute('aria-expanded') == 'true', "Menu should be open after click"
        page.wait_for_function("document.querySelector('.nav-links').classList.contains('active')")

        # Click a link inside the menu to close it
        nav_links.locator('a').first.click()

        # Verify closed state
        assert toggle.get_attribute('aria-expanded') == 'false', "Menu should be closed after link click"
        page.wait_for_function("!document.querySelector('.nav-links').classList.contains('active')")

        # Click toggle again to open
        toggle.click()
        assert toggle.get_attribute('aria-expanded') == 'true', "Menu should be open again"

        # Resize window past breakpoint (769px) to test matchMedia reset logic
        page.set_viewport_size({"width": 800, "height": 600})

        # Add slight delay for matchMedia event to process
        page.wait_for_timeout(500)

        # Verify menu resets correctly via matchMedia event
        assert toggle.get_attribute('aria-expanded') == 'false', f"Menu should be closed after resizing to desktop, but got {toggle.get_attribute('aria-expanded')}"
        page.wait_for_function("!document.querySelector('.nav-links').classList.contains('active')")

        print("All mobile menu tests passed successfully!")
        browser.close()

if __name__ == '__main__':
    test_mobile_menu()