from playwright.sync_api import sync_playwright, expect
import os

def test_mobile_menu(page):
    # Use file:// protocol
    file_url = f"file://{os.path.abspath('index.html')}"

    # Abort external requests to speed up test and avoid CSP issues
    page.route("**/*", lambda route: route.continue_() if not route.request.url.startswith("https://fonts") else route.abort())

    page.goto(file_url)

    # 1. Set viewport below 768px
    page.set_viewport_size({"width": 375, "height": 667})

    # 2. Open the menu
    menu_toggle = page.locator('.mobile-menu-toggle')
    menu_toggle.click()

    nav_links = page.locator('.nav-links')
    expect(nav_links).to_have_class("nav-links active")

    # 3. Resize viewport above 768px to trigger matchMedia listener
    page.set_viewport_size({"width": 1280, "height": 800})

    # Wait for the active class to be removed by the JS listener
    page.wait_for_function('!document.querySelector(".nav-links").classList.contains("active")')

    # Assert class is removed
    expect(nav_links).not_to_have_class("nav-links active")

    # Capture screenshot to prove the state is reset
    page.screenshot(path="verification/mobile_menu_reset.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_mobile_menu(page)
        finally:
            browser.close()
