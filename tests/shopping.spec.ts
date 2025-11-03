import{test,expect}from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config({ path: 'shopping.env' })

// test('login_credential',async({page})=>{
//     const email = process.env.EMAIL as string;
//     await page.goto("https://www.flipkart.com/")
//     await page.getByPlaceholder("Search for Products, Brands and More").click()
//     await page.locator("//span[contains(text(),'Login')]").click()
//     await page.locator("//input[@class='r4vIwl BV+Dqf']").fill(email)
//     await page.locator("//button[contains(text(),'Request OTP')]").click()

// })
  
test('shopping_validation',async({page})=>{
    await page.goto("https://www.flipkart.com/")
    await page.getByPlaceholder('Search for Products, Brands and More').click()
    const logo=await page.locator("img[title='Flipkart']")
    const logo_visible=await logo.isVisible()
    if(logo_visible){
        console.log("logo is visible")   

    }else{
        console.log("logo is not visible")
        
    }
    // await page.locator("//div[@class='_2L0uxW']").click()
    // await page.pause()
    const searchbox=page.getByPlaceholder('Search for Products, Brands and More')
    await searchbox.click()
    await searchbox.fill("iphone 16")
    await page.keyboard.press("Enter")

    await page.locator("//div[contains(text(),'Apple iPhone 16 (Black, 128 GB)')]").click()
    // const comparecheckbox=page.getByLabel("compare")
    // // await expect(comparecheckbox).toBeVisible()
    // await comparecheckbox.check()
    // await expect(comparecheckbox).toBeChecked()
    // await page.pause()

    const bc=await page.locator("(//div[@class='LOe-Xr'])[1]")
    const color=await bc.evaluate((ele)=>{
        return window.getComputedStyle(ele).getPropertyValue("color")
    })
    console.log(color)
     expect(color).toBe("rgb(240, 240, 240)")
    


    const btn = page.locator("a[class='GK7Ljp io5kcR'] div[class='_0QyAeO']")  
    const dimensions = await btn.evaluate((ele: HTMLElement) => {
    const style = window.getComputedStyle(ele)
    return {
      width: style.getPropertyValue("width"),
      height: style.getPropertyValue("height"),
    }
  })

  console.log("Width:", dimensions.width)  
  console.log("Height:", dimensions.height) 
 
  expect(dimensions.width).toBe("52px")
  expect(dimensions.height).toBe("52px")

// const rating = await page.locator("div._3LWZlK").first().textContent()
// const reviews = await page.locator("span._2_R_DZ").first().textContent()
// console.log("Rating:", rating)
// console.log("Reviews:", reviews)

// await page.locator("//span[contains(text(),'Back to top')]").click()
// await page.locator("//a[contains(text(),'All questions')]").click()

await page.locator("//button[contains(text(),'Add to cart')]").click()
const popup = page.locator("text=out of stock")
if (await popup.isVisible()) {
    console.log(" Product is out of stock")
  } else {
    console.log(" Product added to cart successfully")
  }

await expect(page.locator("a[class='CDDksN io5kcR']")).toHaveValue("128 GB")
await page.locator("//span[contains(text(),'Back to top')]").click()
})
    



    

