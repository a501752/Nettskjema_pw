import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nettskjema.test.fremtind.no/skjema/katalog/klageskjema');
  await page.getByRole('button', { name: 'Start utfylling' }).click();
  await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Skriv inn engangskoden din').click();
  await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Skriv inn engangskoden din').fill('otp');
  await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Skriv inn engangskoden din').press('Enter');
  await page.locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Neste' }).click();
  await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Ditt BankID-passord').click();
  await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Ditt BankID-passord').fill('25878899302');
  await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Ditt BankID-passord').press('Enter');
  await page.locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Neste' }).click();
});