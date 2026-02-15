import os
from playwright.sync_api import sync_playwright

def test_mobile_menu_resize():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use mobile viewport
        context = browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()

        # Load the file
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Check if mobile menu toggle is visible
        menu_toggle = page.locator('.mobile-menu-toggle')
        nav_links = page.locator('.nav-links')

        # Ensure initial state
        if not menu_toggle.is_visible():
            print("Error: Mobile menu toggle not visible in mobile view")
            browser.close()
            return

        # Open the menu
        menu_toggle.click()

        # Wait for menu to be active
        page.wait_for_selector('.nav-links.active')
        print("Menu opened successfully in mobile view.")

        # Resize to desktop
        page.set_viewport_size({"width": 1024, "height": 768})

        # Wait a bit for the listener to fire
        page.wait_for_timeout(500)

        # Check if menu is closed
        is_active_after_resize = nav_links.get_attribute('class')

        if 'active' in is_active_after_resize:
            print("FAILURE: Menu remained open after resizing to desktop.")
        else:
            print("SUCCESS: Menu closed automatically after resizing to desktop.")

        # Take screenshot of the desktop view to verify menu is gone (nav links should be visible in desktop mode, but not the mobile overlay)
        # In desktop mode, .nav-links is visible but it's the desktop menu.
        # The 'active' class makes it the mobile overlay.
        # So we verify that it looks like a desktop menu.

        page.screenshot(path="verification.png")

        browser.close()

if __name__ == "__main__":
    test_mobile_menu_resize()
