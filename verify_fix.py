import os
from playwright.sync_api import sync_playwright

def verify_email_fix(page):
    # Load index.html from absolute path
    file_path = os.path.abspath("index.html")
    page.goto(f"file://{file_path}", wait_until="domcontentloaded")

    # Locate the email link
    email_link = page.locator('a[data-user="info"]')

    # Scroll to it
    email_link.scroll_into_view_if_needed()

    # Take screenshot
    page.screenshot(path="verification.png")
    print("Screenshot saved to verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_email_fix(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
