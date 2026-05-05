#!/usr/bin/env python3
"""
Screenshot capture script to verify the new business submission form
"""
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize Chrome driver
driver = webdriver.Chrome()

try:
    print("🌐 Loading http://localhost:3001...")
    driver.get("http://localhost:3001")
    time.sleep(4)  # Wait for page to load
    
    print("✅ Page loaded. Taking screenshot 1 (Home page with + List Business button)...")
    driver.save_screenshot("screenshot-1-home.png")
    print("💾 Saved: screenshot-1-home.png")
    
    # Scroll to find + List Business button
    print("🔍 Looking for '+ List Business' button...")
    list_business_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'List Business')]"))
    )
    
    print("✅ Found button. Scrolling to it...")
    driver.execute_script("arguments[0].scrollIntoView(true);", list_business_button)
    time.sleep(1)
    
    print("✅ Clicking '+ List Business' button...")
    list_business_button.click()
    time.sleep(3)  # Wait for form to render
    
    print("✅ Form opened. Taking screenshot 2 (Step 1 - Business Info)...")
    driver.save_screenshot("screenshot-2-step1-info.png")
    print("💾 Saved: screenshot-2-step1-info.png")
    
    # Verify TikTok field exists
    print("🔍 Checking for TikTok field...")
    try:
        tiktok_field = driver.find_element(By.XPATH, "//input[@placeholder='TikTok URL' or contains(@placeholder, 'TikTok')]")
        print("✅ TikTok field FOUND!")
        driver.execute_script("arguments[0].scrollIntoView(true);", tiktok_field)
        driver.save_screenshot("screenshot-3-tiktok-field.png")
        print("💾 Saved: screenshot-3-tiktok-field.png (TikTok field visible)")
    except Exception as e:
        print(f"❌ TikTok field NOT found: {e}")
    
    # Check for social media section
    print("🔍 Checking for social media section...")
    try:
        social_section = driver.find_element(By.XPATH, "//*[contains(text(), 'Social Media')]")
        print("✅ Social Media section FOUND!")
        driver.execute_script("arguments[0].scrollIntoView(true);", social_section)
        time.sleep(1)
        driver.save_screenshot("screenshot-4-social-media.png")
        print("💾 Saved: screenshot-4-social-media.png (Social media section visible)")
    except Exception as e:
        print(f"❌ Social Media section NOT found: {e}")
    
    # Click Next to go to Step 2
    print("📋 Filling in Step 1 basic fields...")
    business_name = driver.find_element(By.XPATH, "//input[@placeholder='Business Name' or contains(@placeholder, 'name')]")
    business_name.send_keys("Test Restaurant")
    time.sleep(0.5)
    
    print("🔍 Selecting Restaurant category...")
    category_select = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//select | //div[contains(text(), 'Category')]/following-sibling::*//input"))
    )
    # Try to find and select from dropdown
    try:
        select = Select(driver.find_element(By.XPATH, "//select[@name='category']"))
        select.select_by_value("Restaurant")
        print("✅ Restaurant category selected")
    except:
        # Try clicking dropdown
        category_dropdown = driver.find_element(By.XPATH, "//input[@type='text' and contains(@placeholder, 'Select')]")
        category_dropdown.click()
        time.sleep(0.5)
        restaurant_option = driver.find_element(By.XPATH, "//*[contains(text(), 'Restaurant')]")
        restaurant_option.click()
        print("✅ Restaurant category selected (dropdown)")
    
    time.sleep(1)
    
    # Click Next button
    print("➡️ Clicking Next button...")
    next_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Next')]")
    next_button.click()
    time.sleep(3)
    
    print("✅ Step 2 (Media & Upload) loaded. Taking screenshot...")
    driver.save_screenshot("screenshot-5-step2-media.png")
    print("💾 Saved: screenshot-5-step2-media.png")
    
    # Check for logo upload
    print("🔍 Checking for logo upload field...")
    try:
        logo_upload = driver.find_element(By.XPATH, "//*[contains(text(), 'Logo')] | //input[@type='file' and contains(@name, 'logo')]")
        print("✅ Logo upload field FOUND!")
        driver.execute_script("arguments[0].scrollIntoView(true);", logo_upload)
        driver.save_screenshot("screenshot-6-logo-upload.png")
        print("💾 Saved: screenshot-6-logo-upload.png (Logo upload visible)")
    except Exception as e:
        print(f"❌ Logo upload NOT found: {e}")
    
    # Continue to Step 3
    print("➡️ Clicking Next to go to Step 3...")
    next_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Next')]")
    next_button.click()
    time.sleep(3)
    
    print("✅ Step 3 (Services & Hours) loaded. Taking screenshot...")
    driver.save_screenshot("screenshot-7-step3-services.png")
    print("💾 Saved: screenshot-7-step3-services.png")
    
    # Check for restaurant section
    print("🔍 Checking for Restaurant Information section...")
    try:
        restaurant_section = driver.find_element(By.XPATH, "//*[contains(text(), 'Restaurant Information')] | //h4[contains(text(), 'Restaurant')]")
        print("✅ Restaurant Information section FOUND!")
        driver.execute_script("arguments[0].scrollIntoView(true);", restaurant_section)
        time.sleep(1)
        driver.save_screenshot("screenshot-8-restaurant-section.png")
        print("💾 Saved: screenshot-8-restaurant-section.png (Restaurant section visible)")
    except Exception as e:
        print(f"❌ Restaurant Information section NOT found: {e}")
    
    # Check for dietary options
    print("🔍 Checking for Dietary Options checkboxes...")
    try:
        dietary_options = driver.find_elements(By.XPATH, "//*[contains(text(), 'Vegetarian')] | //*[contains(text(), 'Vegan')] | //*[contains(text(), 'Gluten-Free')]")
        if dietary_options:
            print(f"✅ Found {len(dietary_options)} dietary option(s)!")
    except Exception as e:
        print(f"❌ Dietary options NOT found: {e}")
    
    # Continue to Step 4 (Package)
    print("➡️ Clicking Next to go to Step 4 (Package Selection)...")
    next_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Next')]")
    next_button.click()
    time.sleep(3)
    
    print("✅ Step 4 (Package Selection) loaded. Taking screenshot...")
    driver.save_screenshot("screenshot-9-step4-package.png")
    print("💾 Saved: screenshot-9-step4-package.png")
    
    # Check for pricing
    print("🔍 Checking for package prices (R799 / R1299 / R1999)...")
    page_text = driver.find_element(By.TAG_NAME, "body").text
    has_r799 = "R799" in page_text or "799" in page_text
    has_r1299 = "R1299" in page_text or "1299" in page_text or "R1,299" in page_text
    has_r1999 = "R1999" in page_text or "1999" in page_text or "R1,999" in page_text
    
    print(f"Price R799: {'✅ FOUND' if has_r799 else '❌ NOT found'}")
    print(f"Price R1299: {'✅ FOUND' if has_r1299 else '❌ NOT found'}")
    print(f"Price R1999: {'✅ FOUND' if has_r1999 else '❌ NOT found'}")
    
    if has_r799 and has_r1299 and has_r1999:
        driver.save_screenshot("screenshot-10-pricing-correct.png")
        print("💾 Saved: screenshot-10-pricing-correct.png (All prices visible)")
    
    print("\n" + "="*60)
    print("✅ TEST COMPLETE")
    print("="*60)
    print("Screenshots saved to current directory:")
    print("  1. screenshot-1-home.png - Home with + List Business button")
    print("  2. screenshot-2-step1-info.png - Step 1 form open")
    print("  3. screenshot-3-tiktok-field.png - TikTok field visible")
    print("  4. screenshot-4-social-media.png - Full social media section")
    print("  5. screenshot-5-step2-media.png - Step 2 media upload")
    print("  6. screenshot-6-logo-upload.png - Logo upload field")
    print("  7. screenshot-7-step3-services.png - Step 3 services")
    print("  8. screenshot-8-restaurant-section.png - Restaurant info (visible for Restaurant category)")
    print("  9. screenshot-9-step4-package.png - Step 4 package selection")
    print("  10. screenshot-10-pricing-correct.png - Pricing R799/R1299/R1999")
    
except Exception as e:
    print(f"❌ ERROR: {e}")
    driver.save_screenshot("screenshot-error.png")
    print("💾 Saved: screenshot-error.png (Error state)")
    
finally:
    time.sleep(2)
    driver.quit()
    print("🔌 Browser closed")
