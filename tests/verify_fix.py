import os
import sys
from playwright.sync_api import sync_playwright

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Monitor for errors
        errors = []
        page.on("pageerror", lambda err: errors.append(f"PageError: {err}"))

        # Capture all console messages
        def handle_console(msg):
            if msg.type == "error":
                errors.append(f"ConsoleError: {msg.text}")
            else:
                print(f"Console: {msg.text}")
        page.on("console", handle_console)

        # Construct file URL
        cwd = os.getcwd()
        file_path = os.path.join(cwd, "index.html")
        file_url = f"file://{file_path}"

        print(f"Testing URL: {file_url}")

        try:
            page.goto(file_url)
            page.wait_for_timeout(1000) # Wait for scripts to execute

            # Check for initial errors
            if errors:
                print("❌ INITIAL ERRORS FOUND:")
                for e in errors:
                    print(e)
            else:
                print("✅ No initial errors found.")

            # Test Spotlight Effect
            card = page.locator('.card').first
            if card.count() > 0:
                print("Found .card element. Scrolling into view...")
                card.scroll_into_view_if_needed()
                # Wait for scroll and potential layout shifts
                page.wait_for_timeout(500)

                box = card.bounding_box()
                if box:
                    print(f"Card Box: {box}")
                    # Move to center of card
                    cx = box['x'] + box['width'] / 2
                    cy = box['y'] + box['height'] / 2

                    # Ensure we actually trigger mousemove on the element
                    # Use hover explicitly first
                    card.hover()
                    page.mouse.move(cx, cy)
                    # Trigger a few more moves to be sure
                    page.mouse.move(cx + 10, cy + 10)

                    page.wait_for_timeout(200) # Wait for rAF update

                    style = card.get_attribute('style')
                    print(f"Card style after hover: {style}")

                    if style and "--mouse-x" in style:
                        print("✅ Spotlight effect is working (CSS vars updated).")
                    else:
                        print("❌ Spotlight effect is NOT working (CSS vars missing).")
                else:
                    print("Could not get bounding box for card.")
            else:
                print("❌ No .card elements found.")

        except Exception as e:
            print(f"Exception: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run_test()
