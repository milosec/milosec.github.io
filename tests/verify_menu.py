import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        file_path = os.path.abspath("index.html")
        await page.goto(f"file://{file_path}")

        # Set mobile viewport
        await page.set_viewport_size({"width": 375, "height": 667})

        # Open the menu
        await page.click('.mobile-menu-toggle')

        # Wait for transition
        await page.wait_for_timeout(500)

        # Take screenshot
        await page.screenshot(path="verification.png")
        print("Screenshot saved to verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
