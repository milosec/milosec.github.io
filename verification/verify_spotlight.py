from playwright.sync_api import sync_playwright
import os
import time

def verify_spotlight():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen for console logs
        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        cwd = os.getcwd()
        url = f"file://{cwd}/index.html"
        print(f"Loading {url}")
        page.goto(url)

        # Wait for content to load
        try:
            page.wait_for_selector('.card', timeout=2000)
            print("Found .card elements")
        except:
            print("Timeout waiting for .card")
            browser.close()
            exit(1)

        card = page.locator('.card').first

        # Use hover to scroll into view and trigger mousemove
        print("Hovering over card...")
        card.hover()

        # Wait a bit for rAF
        # Move mouse slightly within the card to trigger more events
        box = card.bounding_box()
        if box:
            card.hover(position={"x": 10, "y": 10})
            time.sleep(0.1)
            card.hover(position={"x": 20, "y": 20})
            time.sleep(0.5)

            style = card.get_attribute('style')
            print(f"Final Style: {style}")

            if style and '--mouse-x' in style:
                print("SUCCESS")
            else:
                print("FAILURE: Style not updated")
                exit(1)

            # Take screenshot
            page.screenshot(path="verification/verification.png")
            print("Screenshot saved to verification/verification.png")

        browser.close()

if __name__ == "__main__":
    verify_spotlight()
