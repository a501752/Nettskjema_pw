import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/skjema/katalog/demo-farger-former');
  await page.locator('label').filter({ hasText: 'Grønn' }).locator('span').first().click();
  await page.locator('label').filter({ hasText: 'Kubisk' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Neste side' }).click();
  await page.locator('#gronnBeskr').click();
  await page.locator('#gronnBeskr').fill('Kjempegrønn');
  await page.getByRole('button', { name: 'Neste side' }).click();
  await page.locator('#kubiskBeskr').fill('Veldig firkantet');
  await page.getByRole('button', { name: 'Neste side' }).click();
});