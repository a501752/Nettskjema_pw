import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://nettskjema.test.fremtind.no/skjema/katalog/utvidetfullmakt-i');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Innledning');
})