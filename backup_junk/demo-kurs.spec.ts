import { test, expect } from '@playwright/test';


await page.locator('label').filter({ hasText: 'Grønn' }).click();
await page.locator('label').filter({ hasText: 'Kubisk' }).locator('span').first().click();
await page.getByRole('button', { name: 'Neste side' }).click();
await page.locator('#gronnBeskr').click();
await page.locator('#gronnBeskr').fill('Kjempegrønn');
await page.getByRole('button', { name: 'Neste side' }).click();
await page.locator('#kubiskBeskr').fill('Virkelig firkantet');
await page.getByRole('button', { name: 'Neste side' }).click();test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/skjema/katalog/demo-kurs');

  await page.locator('#dato1');
  await page.getByTestId('jkl-datepicker__trigger').click();
  await page.getByLabel('04.03.2025').click();
  
  await page.locator('#dato2');
  await page.getByTestId('jkl-datepicker__trigger').click();
  await page.getByLabel('03.03.2025').click();
});