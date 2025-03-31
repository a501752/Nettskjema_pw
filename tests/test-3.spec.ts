import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/skjema/katalog/demo-filopplasting');
  await page.getByRole('button', { name: 'Velg filer' }).click();
  await page.getByRole('button', { name: 'Velg filer' }).setInputFiles('dummy.pdf');
  await page.getByRole('button', { name: 'Neste side' }).click();
});