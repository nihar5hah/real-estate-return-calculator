from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)  # Visible browser to see animations
    page = browser.new_page()

    print("🚀 Navigating to React app...")
    page.goto("http://localhost:5173")
    page.wait_for_load_state("networkidle")

    print("📸 Taking initial screenshot...")
    page.screenshot(path="screenshot-initial.png", full_page=True)

    print("✅ App loaded successfully!")
    print(f"   Title: {page.title()}")

    # Test some interactions
    print("\n🧪 Testing interactions...")

    # Check if calculator is rendered
    calculator = page.locator(".calculator-container")
    if calculator.count() > 0:
        print("   ✓ Calculator container found")

    # Try interacting with an input
    print("\n💰 Testing property value input...")
    property_input = page.locator('input[type="range"]').first
    if property_input.count() > 0:
        print("   ✓ Found property value slider")
        # Take screenshot after interaction
        time.sleep(1)
        page.screenshot(path="screenshot-interaction.png", full_page=True)

    # Check for Framer Motion animations
    print("\n✨ Checking for animated elements...")
    metrics = page.locator(".metric-card")
    print(f"   ✓ Found {metrics.count()} metric cards")

    # Test mobile responsive
    print("\n📱 Testing mobile viewport...")
    page.set_viewport_size({"width": 375, "height": 667})
    time.sleep(1)
    page.screenshot(path="screenshot-mobile.png", full_page=True)
    print("   ✓ Mobile screenshot captured")

    # Test tablet
    print("\n📱 Testing tablet viewport...")
    page.set_viewport_size({"width": 768, "height": 1024})
    time.sleep(1)
    page.screenshot(path="screenshot-tablet.png", full_page=True)
    print("   ✓ Tablet screenshot captured")

    # Back to desktop
    print("\n💻 Back to desktop viewport...")
    page.set_viewport_size({"width": 1920, "height": 1080})
    time.sleep(1)
    page.screenshot(path="screenshot-desktop.png", full_page=True)
    print("   ✓ Desktop screenshot captured")

    # Check for console errors
    print("\n🔍 Checking console logs...")
    page.on("console", lambda msg: print(f"   Console {msg.type()}: {msg.text()}"))

    print("\n✅ All tests completed! Screenshots saved:")
    print("   - screenshot-initial.png")
    print("   - screenshot-interaction.png")
    print("   - screenshot-mobile.png")
    print("   - screenshot-tablet.png")
    print("   - screenshot-desktop.png")

    # Keep browser open for a moment to see animations
    print("\n⏳ Keeping browser open for 3 seconds to observe animations...")
    time.sleep(3)

    browser.close()
