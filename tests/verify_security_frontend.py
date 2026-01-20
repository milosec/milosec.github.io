from playwright.sync_api import sync_playwright, expect
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load local file
        file_path = os.path.abspath("index.html")
        page.goto(f"file://{file_path}", wait_until="domcontentloaded")

        # Locate the LinkedIn link in the footer
        # It's in .social-row .soc-item a
        link = page.locator(".social-row .soc-item a").first

        # Verify attributes
        expect(link).to_have_attribute("target", "_blank")
        expect(link).to_have_attribute("rel", "noopener noreferrer")

        print("✅ Attributes verified successfully.")

        # Scroll to footer
        link.scroll_into_view_if_needed()

        # Take screenshot
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/security_fix.png"
        page.screenshot(path=screenshot_path)
        print(f"📸 Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
