import{test,expect}from '@playwright/test'
import validations from '../validation.json'

test('sauce_demo_login',async({page})=>{
    await page.goto("https://www.saucedemo.com/v1/index.html")
    const title=await page.title()
    console.log(title)
    expect (title).toEqual("Swag Labs")
    
    await page.getByPlaceholder("Username").fill("standard_user")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    const bn=await page.locator("input[type='submit']")
    const color=await bn.evaluate((ele)=>{
        return window.getComputedStyle(ele).backgroundColor
    })   
    console.log("background color is",color)
    expect(color).toContain("226, 35, 26")

    const mw=await page.locator(validations.maxWidth)
    const width=await mw.evaluate((ele)=>{
        return window.getComputedStyle(ele).maxWidth
    })
    console.log("max-width:",width)
    expect(width).toBe("720px")
    await page.locator("//input[@class='btn_action']").click()
    await page.locator(validations.openMenu).click()
    const menulist=page.locator(validations.menulist)
    // await expect(menulist).toHaveCount(4)
    // console.log(menulist);
    
    await page.locator(validations.about).click()
    await page.locator(validations.product).click()
    const searchbar=await page.locator("//img[@alt='search']")
    await expect(searchbar).toBeEnabled()
    if(searchbar){
        console.log("searchbar enabled")
    }else{
        console.log("searchbar is not enabled")  
    }
    await expect(page).toHaveURL("https://saucelabs.com/")
     const browser_title=await page.title()
     console.log(browser_title)
     
    await page.keyboard.press("PageDown")
    await page.goBack()
    await page.waitForLoadState("load")

     const fs=page.locator(validations.fontSize)
     const measure=await fs.evaluate((ele)=>{
    return window.getComputedStyle(ele).getPropertyValue("font-size")
    })
    console.log("fontsize",measure)
    await expect(measure).toBe("14px")
    await expect(measure).toBeTruthy()

     const bn3=page.locator(validations.backgroundColor)
     const colour=await bn3.evaluate((ele)=>{
        return window.getComputedStyle(ele).getPropertyValue("background")
        })
    console.log(colour)
    await  expect(colour).toContain("71, 76, 85")      
    const dropdown = page.locator(validations.dropDown)
    await dropdown.selectOption({ label: "Price (high to low)" })
    await expect(dropdown).toHaveValue("hilo")
    // await page.pause()

    const add_to_cart= page.locator(`(//button[@class='btn_primary btn_inventory'])[1]`)
    await add_to_cart.click()

    await page.locator("[fill='currentColor']").click()
    await expect(page.locator(validations.checkoutButton)).toHaveAttribute("href", "./checkout-step-one.html")
    await page.locator(validations.checkoutButton).click()

    await page.getByPlaceholder("First Name").fill("si")
    await page.getByPlaceholder("Last Name").fill("ya")
    await page.getByPlaceholder("Zip/Postal Code").fill("560000")
    await page.locator("//input[@type='submit']").click()
    await page.locator(validations.cartButton).click()

    await page.locator(validations.openMenu).click()
    await page.locator(validations.logout).click()
    
    
})