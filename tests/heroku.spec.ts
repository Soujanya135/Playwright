import { test, expect, Page, chromium } from '@playwright/test'
import locators from '../locators/locator.json'

test('AB Testing page', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.click(locators.abTestLink)
  await expect(page.locator(locators.abTestHeader)).toContainText('A/B Test')
  await page.goBack()
})

test('Add/Remove Elements', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.click(locators.login)
  await expect(page.locator(locators.addRemoveHeader)).toContainText('Add/Remove Elements')
  await page.click(locators.addButton)
  await expect(page.locator(locators.deleteButton)).toContainText('Delete')
  await page.goBack()
})

test('Checkbox validation', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.click(locators.checkboxLogin)
  await expect(page.locator(locators.checkboxHeader)).toContainText('Checkboxes')
  const checkbox1 = page.locator(locators.checkbox1)
  const checkbox2 = page.locator(locators.checkbox2)
  await checkbox1.check()
  await expect(checkbox1).toBeChecked()
  await expect(checkbox2).toBeChecked()
})

test('Drag and Drop', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.click(locators.dragDropLogin)
  await expect(page.locator(locators.dragDropHeader)).toContainText('Drag and Drop')
  await page.locator(locators.column1).dragTo(page.locator(locators.column2))
})


test('Dropdown selection', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.click(locators.dropdownLogin)
  await expect(page.locator(locators.dropdownHeader)).toContainText('Dropdown List')
  const dropdown = page.locator(locators.selectOption)
  await dropdown.selectOption(locators.option1)
  await expect(dropdown).toHaveValue('1')
  await dropdown.selectOption(locators.option2)
  await expect(dropdown).toHaveValue('2')
})

test('Form Authentication', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.click(locators.formAuthLink)
  await page.fill(locators.username, 'tomsmith')
  await page.fill(locators.password, 'SuperSecretPassword!')
  await page.click(locators.loginButton)
})

test('Forgot Password', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.click(locators.forgotPasswordLink)
  await expect(page.locator(locators.forgotHeader)).toContainText('Forgot Password')
  await page.fill(locators.email, 'abc@gmail.com')
  await page.click(locators.submitButton)
})

test('Hover action', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.click(locators.hoverLink)
  await page.locator(locators.user1).hover()
})

test('JavaScript Alerts', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.click(locators.alertLink)

  page.once('dialog', async dialog => {
    console.log(dialog.message())
    await dialog.accept()
  })
  await page.click(locators.simpleAlert)
  await expect(page.locator(locators.alertResult)).toContainText('You successfully clicked an alert')

  page.once('dialog', async dialog => {
    console.log(dialog.message())
    await dialog.accept()
  })
  await page.click(locators.confirmAlert)
  await expect(page.locator(locators.alertResult)).toContainText('You clicked: Ok')
})

test('Multiple Windows', async () => {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('/')
  await page.click(locators.multipleWindowLink)
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click(locators.newWindowLink) 
  ])
  await expect(newPage).toHaveTitle('New Window')
  await browser.close()
})


test('Sortable Data Table', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.click(locators.sortableTableLink)
  const rows = await page.locator(locators.rows).count()
  const cols = await page.locator(locators.columns).count()
  console.log('Rows:', rows, 'Columns:', cols)
})

test('Context Menu', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.click(locators.contextMenuLink)
  const box = page.locator(locators.hotSpotBox)
  const width = await box.evaluate(ele => window.getComputedStyle(ele).getPropertyValue('width'))
  console.log('Width:', width)
  await expect(width).toContain('250px')
})

test('Dynamic Loading', async ({ page }: { page: Page }) => {
  await page.goto(locators.dynamicLoadingLink)
  await page.click(locators.dynamicExample1)
  await page.click(locators.startButton)
  await page.locator(locators.loadingIcon).waitFor({ state: 'hidden' })
  await expect(page.locator(locators.finishText)).toHaveText('Hello World!')
  await page.goBack()
  await page.click(locators.dynamicExample2)
  await page.click(locators.startButton)
  await page.locator(locators.loadingIcon).waitFor({ state: 'hidden' })
  await expect(page.locator(locators.finishText)).toHaveText('Hello World!')
})

test('Shifting Content', async ({ page }: { page: Page }) => {
  await page.goto(locators.shiftingContentLink)
  await page.click(locators.menuExampleLink)
})

