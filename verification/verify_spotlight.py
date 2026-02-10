from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load the file
        page.goto("file:///app/index.html")

        # Set viewport
        page.set_viewport_size({"width": 1280, "height": 800})

        # Find a card
        card = page.locator(".card").first

        # Scroll to card
        card.scroll_into_view_if_needed()

        # Get bounding box
        box = card.bounding_box()
        if box:
            # Move mouse to center of card
            page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)

            # Wait a bit for rAF and any transition
            page.wait_for_timeout(500)

            # Take screenshot of the card specifically (or the whole page)
            # Let's take the whole page to see context
            page.screenshot(path="verification.png")
            print("Screenshot saved to verification.png")

        browser.close()

if __name__ == "__main__":
    run()
