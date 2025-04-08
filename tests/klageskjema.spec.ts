import { test, expect } from '@playwright/test';

import * as path from "node:path";
import { fileURLToPath as nodeFileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('Klageskjema privat', async ({ page }) => {
  
    await page.goto('https://nettskjema.test.fremtind.no/skjema/katalog/klageskjema');

    await page.getByRole('button', { name: 'Start utfylling' }).click();
    await page.locator('iframe[title="Innlogging"]').contentFrame().getByRole('textbox', { name: 'Fødselsnummer' }).fill('25878899302');
    await page.locator('iframe[title="Innlogging"]').contentFrame().getByRole('button', { name: 'Neste' }).click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByRole('textbox', { name: 'Engangskode' }).click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByRole('textbox', { name: 'Engangskode' }).fill('otp');
    await page.locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Neste' }).click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByRole('textbox', { name: 'Ditt BankID-passord' }).fill('qwer1234');
    await page.locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Neste' }).click();

    await expect(page).toHaveTitle('Klageskjema');
    await expect(page.getByRole('heading', { name: 'Klageskjema' })).toBeVisible();
    
    await page.locator('#utfyltDato');

    await page.locator('label').filter({ hasText: 'Privatkunde' }).locator('span').first().click();

    await page.getByLabel('Privatkunde').click();
    await page.locator('#adresse').click();
    await page.locator('#adresse').fill('Kugården 123');
    await page.locator('#postnr').click();
    await page.locator('#postnr').fill('1337');

    await page.locator('label').filter({ hasText: 'E-post' }).locator('span').first().click();
    await page.locator('#epost').click();
    await page.locator('#epost').fill('kryKunde@fremtind.no');
    await page.locator('#tlf').click();
    await page.locator('#tlf').fill('99994444');
    await page.getByRole('button', { name: 'Neste side' }).click();

    await page.locator('#saksnr').click();
    await page.locator('#saksnr').fill('987654321');
    await page.locator('#beskrivelse').click();
    await page.locator('#beskrivelse').fill('Alt er galt!');
    
    await expect(page.locator('#root')).toContainText('Last opp vedlegg (dokumentasjon eller lignende)');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Velg filer' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, 'sample.pdf'));

    await expect(page.locator('#root')).toContainText('sample.pdf');

    await page.getByRole('button', { name: 'Send inn klage' }).click();

    await expect(page.getByRole('paragraph')).toContainText('Tusen takk for din tilbakemelding! Du vil høre fra oss i løpet av kort tid.');
})


function fileURLToPath(url: string): string {
    return nodeFileURLToPath(url);
}