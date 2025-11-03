// import { test, expect, Page,chromium } from '@playwright/test'
// import locators from '../locators/locator.json'
// import selectors from '../selector.json'

// test('has title', async ({ page }: { page: Page }) => {
//   await page.goto('/');
//   await page.click("a[href='/abtest']");
//   await expect(page.locator("div[class='example'] h3")).toContainText("A/B Test");
//   await page.goBack();
// });

// test('Add/Remove Elements', async ({ page }: { page: Page }) => {
//   await page.goto('/');
//   await page.setDefaultTimeout(10000)
//   await page.click(locators.add_removepage.login);
//   await expect(page.locator("h3")).toContainText("Add/Remove Elements");
//   await page.locator(locators.add_removepage.addButton).click();
//   const deleteButton = page.locator(locators.add_removepage.deleteButton);
//   await expect(deleteButton).toContainText("Delete");
//   await page.goBack();
// });
   
// test('validate checkbox', async ({ page }: { page: Page }) => {
//   await page.goto('https://the-internet.herokuapp.com/');
//   await page.click(locators.checkboxpage.checkboxlogin);
//   await expect(page.locator("//h3[contains(text(),'Checkboxes')]")).toContainText("Checkboxes");

//   const checkbox1 = page.locator(locators.checkboxpage.checkbox1).nth(0);
//   const checkbox2 = page.locator(locators.checkboxpage.checkbox2).nth(1);

//   await checkbox1.check();
//   await expect(checkbox1).toBeChecked();
//   await expect(checkbox2).toBeChecked();
// });

// test('drag and drop', async ({ page }: { page: Page }) => {
//   await page.goto('https://the-internet.herokuapp.com/');
//   await page.click(locators.drag_droppage.drag_droplogin);
//   await expect(page.locator("//h3")).toContainText("Drag and Drop");
//   await page.locator(locators.drag_droppage.column1).dragTo(page.locator(locators.drag_droppage.column2));
// });

// test('dropdown', async ({ page }: { page: Page }) => {
//   await page.goto('https://the-internet.herokuapp.com/');
//   await page.click("//a[contains(text(),'Dropdown')]");
//   await expect(page.locator("#content")).toContainText("Dropdown List");
//   const dropdown = page.locator("//select[@id='dropdown']");
//   await dropdown.selectOption({ label: 'Option 1' });
//   await expect(dropdown).toHaveValue('1');
//   await page.pause()
//   await dropdown.selectOption({ value: '2' });
//   await expect(dropdown).toHaveValue('2');
// });

// test('basic auth', async ({ page }: { page: Page }) => {
//   await page.goto("https://the-internet.herokuapp.com/");
//   await page.locator("//a[contains(text(),'Basic Auth')]").click()
// });

// test('Form authentication',async({page}:{page:Page})=>{
// await page.goto('https://the-internet.herokuapp.com/')
// await page.locator("//a[contains(text(),'Form Authentication')]").click()

// await page.locator(locators.formAuthPage.username).fill('tomsmith');
// await page.locator(locators.formAuthPage.password).fill('SuperSecretPassword!');
// await page.locator(locators.formAuthPage.loginButton).click()
// })


// // test('File Upload',async({page}:{page:Page})=>{
// //   await page.goto('https://the-internet.herokuapp.com/')
// //   await page.locator("//a[contains(text(),'File Upload')]").click()
// //   await page.locator("#file-upload").setInputFiles("C:\\Users\\soujanya.mm\\Desktop\\playwright_BDD\\sample.txt")

// // })

// test('Forgot Password', async ({ page }: { page: Page }) => {
//   await page.goto("https://the-internet.herokuapp.com/")
//   await page.locator("//a[contains(text(),'Forgot Password')]").click()
//   await expect(page.locator(locators.forgotPasswordPage.header)).toContainText("Forgot Password");
//   await page.locator(locators.forgotPasswordPage.email).fill("abc@gmail.com");
//   await page.locator(locators.forgotPasswordPage.submitButton).click();
// })


// test('hover',async({page}:{page:Page})=>{
//   await page.goto("https://the-internet.herokuapp.com/")
//   await page.locator(locators.hoverpage.hover).click()
//   let user1=await page.locator(locators.hoverpage.user1)
//   await user1.hover()

// })

// test('alert',async({page}:{page:Page})=>{
//   await page.goto("https://the-internet.herokuapp.com/")
//   await page.locator("//a[contains(text(),'JavaScript Alerts')]").click()
//   // Simple Alert
//   page.once("dialog", async (dialog) => {
//     console.log("Alert message:", dialog.message());
//     await dialog.accept();
//   });
//   await page.click("button[onclick='jsAlert()']");
//   await expect(page.locator("#result")).toContainText("You successfully clicked an alert");

//   //  Confirm Alert
//   page.once("dialog", async (dialog) => {
//     console.log("Confirm message:", dialog.message());
//     await dialog.accept()
//   });
//   await page.click("button[onclick='jsConfirm()']");
//   await expect(page.locator("#result")).toContainText("You clicked: Ok");

// })

// test('frame',async({page}:{page:Page})=>{
//   await page.goto("https://the-internet.herokuapp.com/")
//   await page.locator("a[href='/frames']").click()
//   await page.locator("//a[contains(text(),'iFrame')]").click()
//   // const frame1=await page.frame({url:"https://github.com/tourdedave/the-internet"})
//   await page.pause()

// })

// test('multiple window',async()=>{
//    const browser = await chromium.launch({ headless: false })
//    const context=await browser.newContext()
//    const page1=await context.newPage()

//    const allpage=context.pages()
//    console.log("number of pages:",allpage.length)
//    await page1.goto("https://the-internet.herokuapp.com/")
//    await page1.locator("//a[contains(text(),'Multiple Windows')]").click()
//    const [newPage] = await Promise.all([
//    context.waitForEvent('page'),
//    page1.locator("a[href='/windows/new']").click()
//   ]);

//   await expect(newPage).toHaveTitle("New Window")
//   await browser.close()
// });

// test('datatable',async({page}:{page:Page})=>{
//   await page.goto("https://the-internet.herokuapp.com/")
//   await page.locator("//a[contains(text(),'Sortable Data Tables')]").click()

//   //total number of rows and column:
//   const rows = await page.locator("#table1 tbody tr").count();
//   const cols = await page.locator("#table1 thead th").count();
 
//   console.log("Total Rows:",rows);
//   console.log("Total Columns:",cols)
// })

//  test('contextmenu',async({page}:{page:Page})=>{
//     await page.goto("https://the-internet.herokuapp.com/")
//      await page.locator("//a[contains(text(),'Context Menu')]").click()
//     const bn=await page.locator("#hot-spot")
//     const dimension=await bn.evaluate((ele)=>{
//       return window.getComputedStyle(ele).getPropertyValue("width")
//     })
//     console.log(dimension)
//     await expect(dimension).toContain("250px")
//   })

//   test('Digest Authentication',async({page}:{page:Page})=>{
//     await page.goto("/")
//     await page.locator("//a[contains(text(),'Digest Authentication')]").click()

//   })

//   test('Dynamic Loading',async({page}:{page:Page})=>{
//     await page.goto('/')
//     await page.goto('/dynamic_loading')
//     await page.locator(selectors.dynamicLoading1).click()
//     const bc=page.locator("//button[contains(text(),'Start')]")
//     const color=await bc.evaluate((ele)=>{
//       return window.getComputedStyle(ele).getPropertyValue("border-color")
//     })
//     console.log("border color:",color)
//     await expect(color).toContain("rgb(34, 132, 161)")
//     await page.locator("//button[contains(text(),'Start')]").click()
//     await page.locator('#loading').waitFor({ state: 'hidden' })
//     await expect(page.locator('#finish')).toBeVisible()
//     await expect(page.locator('#finish')).toHaveText('Hello World!')
//     await page.goBack()
//     await page.locator(selectors.dynamicLoading2).click()
//     await page.locator("//button[contains(text(),'Start')]").click()
//     await page.locator('#loading').waitFor({ state: 'hidden' })
//     await expect(page.locator('#finish')).toBeVisible()
//     await expect(page.locator('#finish')).toHaveText('Hello World!')
//     await page.close()

//   })

//   test('File Download',async({page}:{page:Page})=>{
//     await page.goto('/')
//     await page.goto('/download')
//     await page.locator("//a[contains(text(),'Test2.pdf')]").click()
//     await page.goBack()
   
//     await page.goto('/download')
//      const cc= page.locator("//a[contains(text(),'Test123.txt')]")
//     const color=await cc.evaluate((ele)=>{
//       return window.getComputedStyle(ele).getPropertyValue("color")
//     })
//     console.log(color)
//     await expect(color).toContain("rgb(43, 166, 203)")
//     await page.locator("//a[contains(text(),'Test123.txt')]").click()
//     await page.close()

//   })

//   test.only('Shifting Content',async({page}:{page:Page})=>{
//     await page.goto('/')
//     await page.goto('/shifting_content')
//     await page.locator("//a[contains(text(),'Example 1: Menu Element')]").click()
    
//   })
 








  


