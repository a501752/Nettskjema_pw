import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  page.goto('http://localhost:8080/skjema/katalog/demo-filopplasting');

  await page.getByText('Vedlegget kan ikke være større enn');
  await page.getByRole('button', { name: 'Velg filer' }).click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  const fileChooser = await fileChooserPromise;
  await page.getByText('Velg filer').click();

  await page.getByRole('button', { name: 'Neste side' }).click();


});