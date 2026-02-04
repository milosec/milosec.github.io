
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen for console errors
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        # Load the local file
        # Using absolute path
        cwd = os.getcwd()
        filepath = f"file://{cwd}/index.html"
        print(f"Loading {filepath}")

        try:
            page.goto(filepath, wait_until='domcontentloaded')
        except Exception as e:
            print(f"Error loading page: {e}")
            return

        # Check for console errors
        if console_errors:
            print("Console Errors found:")
            for err in console_errors:
                print(f"- {err}")
        else:
            print("No console errors found.")

        # Verify CSP meta tag content via JS
        csp_content = page.evaluate("""() => {
            const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
            return meta ? meta.getAttribute('content') : null;
        }""")

        if csp_content and "form-action 'self'" in csp_content:
            print("SUCCESS: CSP meta tag contains form-action 'self'.")
        else:
            print(f"FAILURE: CSP meta tag missing or incorrect. Content: {csp_content}")

        # Take screenshot
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/verification.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
