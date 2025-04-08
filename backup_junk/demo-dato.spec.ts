import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/skjema/katalog/demo-dato');

  await page.locator('#demoDato').click();


  await page.locator('#dato1');
  await page.getByTestId('jkl-datepicker__trigger').click();
  await page.getByLabel('04.03.2025').click();
  
  await page.locator('#dato2');
  await page.getByTestId('jkl-datepicker__trigger').click();
  await page.getByLabel('03.03.2025').click();
});