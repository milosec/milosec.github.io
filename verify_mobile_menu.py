from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load the page
        page.goto('file:///app/index.html')

        # 1. Test Mobile View
        print("Testing Mobile View...")
        page.set_viewport_size({"width": 375, "height": 667})

        # Verify menu toggle is visible
        menu_toggle = page.locator('.mobile-menu-toggle')
        expect(menu_toggle).to_be_visible()

        # Click toggle
        menu_toggle.click()

        # Verify nav links are active (menu expanded)
        nav_links = page.locator('.nav-links')
        expect(nav_links).to_have_class('nav-links active')
        print("Mobile menu expanded successfully.")

        # 2. Test Resize Logic (The Optimization)
        print("Testing Resize Logic...")
        # Resize to desktop
        page.set_viewport_size({"width": 1024, "height": 768})

        # Wait a bit for the matchMedia event to fire (it should be instant but let's be safe)
        page.wait_for_timeout(500)

        # Verify nav links are NOT active (menu collapsed automatically)
        expect(nav_links).to_have_class('nav-links')
        # Also verify aria-expanded is false
        expect(menu_toggle).to_have_attribute('aria-expanded', 'false')
        print("Resize optimization worked: Menu collapsed automatically.")

        # Take screenshot of the desktop view
        page.screenshot(path='verification.png')

        browser.close()

if __name__ == '__main__':
    run()
