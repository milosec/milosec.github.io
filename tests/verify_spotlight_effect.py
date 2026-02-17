from playwright.sync_api import sync_playwright
import sys
import os

def test_spotlight_effect():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load local file
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Check for console errors
        errors = []
        page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda exc: errors.append(str(exc)))

        # Hover over a card
        card = page.locator(".card").first

        if card.count() == 0:
            print("No cards found!")
            browser.close()
            return

        box = card.bounding_box()
        if box:
            print(f"Hovering card at {box}")
            card.hover()
            # Move mouse a bit to trigger mousemove
            page.mouse.move(box["x"] + 20, box["y"] + 20)

            page.wait_for_timeout(500) # Wait a bit more

            # Check style attribute
            style = card.get_attribute("style")
            print(f"Card style: {style}")

            if style and "--mouse-x" in style:
                print("Spotlight effect working.")
            else:
                print("Spotlight effect NOT working.")

        if errors:
            print("Console/Page errors found:")
            for e in errors:
                print(e)
            sys.exit(1)
        else:
            print("No console errors.")

        browser.close()

if __name__ == "__main__":
    test_spotlight_effect()
