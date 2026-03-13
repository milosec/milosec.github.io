import time
from playwright.sync_api import sync_playwright

def test_performance():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('file:///app/index.html')

        # Test spotlight
        page.set_viewport_size({'width': 1200, 'height': 800})
        cards = page.locator('.card')
        cards.first.wait_for()

        # hover
        cards.first.hover()
        # Ensure frame rendering time
        page.wait_for_timeout(200)

        style = cards.first.get_attribute('style')
        assert style and '--mouse-x' in style, "Spotlight effect CSS variables were not applied correctly."
        print("Spotlight effect verified.")

        # Test Mobile Menu toggle and resizing
        page.set_viewport_size({'width': 375, 'height': 667})
        menu_toggle = page.locator('.mobile-menu-toggle')
        menu_toggle.wait_for(state='visible')

        # Open the menu
        menu_toggle.click()
        page.wait_for_timeout(200)
        nav_links = page.locator('.nav-links')
        assert 'active' in nav_links.get_attribute('class'), "Mobile menu did not open."
        assert page.locator('body').evaluate('document.body.style.overflow') == 'hidden', "Body should hide overflow."
        print("Mobile menu toggle verified.")

        # Trigger desktop breakpoint resize and ensure the menu collapses
        page.set_viewport_size({'width': 800, 'height': 600})
        page.wait_for_timeout(200)

        # Ensure the menu was reset
        assert 'active' not in nav_links.get_attribute('class'), "Mobile menu did not reset when crossing breakpoint."
        assert menu_toggle.get_attribute('aria-expanded') == 'false', "Aria-expanded state not reset on resize."
        print("Mobile menu media query listener reset verified.")

        browser.close()

if __name__ == '__main__':
    test_performance()
