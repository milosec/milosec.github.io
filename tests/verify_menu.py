import sys
import subprocess
import time
from playwright.sync_api import sync_playwright

def run_server():
    # Start server in background
    server = subprocess.Popen([sys.executable, "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2) # Wait for server to start
    return server

def verify_menu():
    server = run_server()
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()

            # Set mobile viewport
            page.set_viewport_size({"width": 375, "height": 667})

            # Listen for console errors
            errors = []
            page.on("console", lambda msg: errors.append(f"Console {msg.type}: {msg.text}") if msg.type == "error" else None)
            page.on("pageerror", lambda err: errors.append(f"PageError: {str(err)}"))

            print("Navigating to page...")
            try:
                page.goto("http://localhost:8000")
            except Exception as e:
                print(f"FAIL: Could not load page: {e}")
                return

            # Check for initial JS errors
            if errors:
                print(f"FAIL: JS Errors found on load:")
                for e in errors:
                    print(f"  - {e}")
            else:
                print("PASS: No JS errors on load.")

            # Attempt to open menu
            print("Attempting to toggle menu...")
            toggle = page.locator(".mobile-menu-toggle")
            if not toggle.is_visible():
                print("FAIL: Menu toggle not visible.")
                return

            try:
                toggle.click(timeout=2000)
            except Exception as e:
                 print(f"FAIL: Could not click toggle: {e}")

            # Check if menu opened
            # We wait a bit for the class to change
            page.wait_for_timeout(500)

            nav_links = page.locator(".nav-links")
            classes = nav_links.get_attribute("class") or ""
            is_active = "active" in classes

            if is_active:
                print("PASS: Menu opened successfully.")
            else:
                print(f"FAIL: Menu did not open. Classes: '{classes}'")

            if not is_active:
                print("Skipping resize test as menu did not open.")
                return

            # Resize to desktop
            print("Resizing to desktop (1024x768)...")
            page.set_viewport_size({"width": 1024, "height": 768})

            # Wait a bit for listener to fire
            page.wait_for_timeout(1000)

            # Check if menu closed
            classes_after = nav_links.get_attribute("class") or ""
            is_active_after_resize = "active" in classes_after

            if not is_active_after_resize:
                print("PASS: Menu closed automatically on resize.")
            else:
                print(f"FAIL: Menu remained open after resize. Classes: '{classes_after}'")

            browser.close()

    finally:
        server.terminate()

if __name__ == "__main__":
    verify_menu()
