import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nettskjema.test.fremtind.no/skjema/katalog/klageskjema');
  await page.getByRole('button', { name: 'Start utfylling' }).click();
});