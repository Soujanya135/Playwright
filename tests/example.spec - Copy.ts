import { test, expect, Page,chromium} from '@playwright/test'
import selectors from '../selector.json'

test('Form authentication',async({page}:{page:Page})=>{
await page.goto('/')
await page.locator("//a[contains(text(),'Form Authentication')]").click()

await page.locator(selectors.username).fill('tomsmith');
await page.locator(selectors.password).fill('SuperSecretPassword!');
await page.locator(selectors.loginbutton).click()
})

test('Forgot Password', async ({ page }: { page: Page }) => {
  await page.goto("/")
  await page.locator("//a[contains(text(),'Forgot Password')]").click()
  await expect(page.locator(selectors.header)).toContainText("Forgot Password");
  await page.locator(selectors.email).fill("abc@gmail.com");
  await page.locator(selectors.submitButton).click();
})

test('hover',async({page}:{page:Page})=>{
  await page.goto("/")
  await page.locator(selectors.hover).click()
  let user1=await page.locator(selectors.user1)
  await user1.hover()

})

test('Add/Remove Elements', async ({ page }: { page: Page }) => {
  await page.goto('/');
  await page.setDefaultTimeout(10000)
  await page.click(selectors.login);
  await expect(page.locator("h3")).toContainText("Add/Remove Elements");
  await page.locator(selectors.addbutton).click();
  const deleteButton = page.locator(selectors.deleteButton);
  await expect(deleteButton).toContainText("Delete");
  await page.goBack();
});

test('validate checkbox', async ({ page }: { page: Page }) => {
  await page.goto('/');
  await page.click(selectors.checkboxlogin);
  await expect(page.locator(selectors.checkboxValidation)).toContainText("Checkboxes");

  const checkbox1 = page.locator(selectors.checkbox1).nth(0);
  const checkbox2 = page.locator(selectors.checkbox2).nth(1);

  await checkbox1.check();
  await expect(checkbox1).toBeChecked();
  await expect(checkbox2).toBeChecked();
});

test('drag and drop', async ({ page }: { page: Page }) => {
  await page.goto('/');
  await page.goto("/drag_and_drop");
  await expect(page.locator("//h3")).toContainText("Drag and Drop");
  await page.locator(selectors.column1).dragTo(page.locator(selectors.column2));
});

test('dropdown', async ({ page }: { page: Page }) => {
  await page.goto('/');
  await page.goto("/dropdown");
  await expect(page.locator("#content")).toContainText("Dropdown List");
  const dropdown = page.locator(selectors.selectOption);
  await dropdown.selectOption({ label: 'Option 1' });
  await expect(dropdown).toHaveValue('1');
//   await page.pause()
  await dropdown.selectOption({ value: '2' });
  await expect(dropdown).toHaveValue('2');
});

test('multiple window',async()=>{
   const browser = await chromium.launch({ headless: false })
   const context=await browser.newContext()
   const page1=await context.newPage()

   const allpage=context.pages()
   console.log("number of pages:",allpage.length)
   await page1.goto("/")
   await page1.goto("/windows")
   const [newPage] = await Promise.all([
   context.waitForEvent('page'),
   page1.locator("a[href='/windows/new']").click()
  ]);
  })

test('alert',async({page}:{page:Page})=>{
  await page.goto("/")
  await page.goto("/javascript_alerts")
  // Simple Alert
  page.once("dialog", async (dialog) => {
    console.log("Alert message:", dialog.message());
    await dialog.accept();
  });
  await page.click(selectors.simpleAlert);
  await expect(page.locator("#result")).toContainText("You successfully clicked an alert");

  //  Confirm Alert
  page.once("dialog", async (dialog) => {
    console.log("Confirm message:", dialog.message());
    await dialog.accept()
  });
  await page.click(selectors.confirmAlert);
  await expect(page.locator("#result")).toContainText("You clicked: Ok");

})

test('datatable',async({page}:{page:Page})=>{
  await page.goto("/")
  await page.goto("/tables")

  //total number of rows and column:
  const rows = await page.locator(selectors.rows).count();
  const cols = await page.locator(selectors.column).count();
 
  console.log("Total Rows:",rows);
  console.log("Total Columns:",cols);
 
})
