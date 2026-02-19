from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Load the page
        page.goto(f"file://{os.path.abspath('index.html')}")

        # Locate the first card
        card = page.locator('.card').first

        # Scroll into view
        card.scroll_into_view_if_needed()
        page.wait_for_timeout(500)

        # Hover over the card to trigger the effect
        # We need to hover specifically to trigger :hover state for opacity
        card.hover()

        # Wait for opacity transition (0.3s)
        page.wait_for_timeout(500)

        # Move mouse to a specific point relative to the card to set variables
        box = card.bounding_box()
        if box:
            # Move to top-left corner area
            page.mouse.move(box['x'] + 50, box['y'] + 50)
            page.wait_for_timeout(200) # Wait for RAF update

            # Take screenshot of the card
            page.screenshot(path="verification/spotlight_top_left.png")
            print("Captured spotlight_top_left.png")

            # Move to bottom-right corner area
            page.mouse.move(box['x'] + box['width'] - 50, box['y'] + box['height'] - 50)
            page.wait_for_timeout(200) # Wait for RAF update

            # Take another screenshot
            page.screenshot(path="verification/spotlight_bottom_right.png")
            print("Captured spotlight_bottom_right.png")

        else:
            print("Could not find card bounding box")

        browser.close()

if __name__ == "__main__":
    run()
