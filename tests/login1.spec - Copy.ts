import { test, expect } from "@playwright/test";

test("Add third highest priced product", async ({ page }) => {
  
  await page.goto("https://www.saucedemo.com/v1/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce")
  await page.locator("#login-button").click()
  

  const priceLocators = page.locator(".inventory_item_price");
  const count = await priceLocators.count();

  const prices: number[] = [];
  for (let i = 0; i < count; i++) {
    const text = await priceLocators.nth(i).innerText(); 
    const value = parseFloat(text.replace("$", ""));
    prices.push(value);
  }

  
  const sorted = [...prices].sort((a, b) => b - a); 
  const thirdHighest = sorted[2];

  const index = prices.indexOf(thirdHighest)
  console.log("index is....",index);
  
   const add_to_cart= page.locator(`(//button[@class='btn_primary btn_inventory'])[3]`)
   await add_to_cart.click()
   const add_to_cart1= page.locator(`(//button[@class="btn_primary btn_inventory"])[5]`)
   await add_to_cart1.click()
   await page.pause()
   await page.locator("path[fill='currentColor']").click()
   await page.locator("//a[contains(text(),'CHECKOUT')]").click()
   await expect(page.locator(".subheader")).toContainText("Checkout: Your Information")

  await page.getByPlaceholder("First Name").fill("sooo")
  await page.getByPlaceholder("Last Name").fill("ya")
  await page.getByPlaceholder("Zip/Postal Code").fill("560090")
  await page.locator("//input[@type='submit']").click()
  
  
});

