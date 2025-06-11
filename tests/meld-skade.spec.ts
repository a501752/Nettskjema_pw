import { test, expect } from '@playwright/test';

import * as path from "node:path";
import { fileURLToPath as nodeFileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('Meld skade happycase', async ({ page }) => {
  
    await page.goto('https://nettskjema.test.fremtind.no/skjema/katalog/meld-skade');

    await page.getByRole('button', { name: 'Start utfylling' }).click();
    await page.locator('iframe[title="Innlogging"]').contentFrame().getByRole('textbox', { name: 'Fødselsnummer' }).fill('25878899302');
    await page.locator('iframe[title="Innlogging"]').contentFrame().getByRole('button', { name: 'Neste' }).click();
    await page.getByRole('button', { name: 'Bekreft innlogging' }).click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Skriv inn engangskoden din').click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Skriv inn engangskoden din').fill('otp');
    await page.locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Neste' }).click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Ditt BankID-passord').click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Ditt BankID-passord').fill('qwer1234');
    await page.locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Neste' }).click();

    await expect(page).toHaveTitle('Meld skade');

    const headerInformasjon3 = page.locator('h3', { hasText: 'Forsikringstaker' });
    await expect(headerInformasjon3).toBeVisible();

    await page.locator('#fornavn').click();
    await page.locator('#fornavn').fill('Kry');
    await page.locator('#fornavn').press('Tab');
    await page.locator('#etternavn').click();
    await page.locator('#etternavn').fill('Kunde');   
    await page.locator('#etternavn').press('Tab');

    await page.locator('#fnr').click();
    await page.locator('#fnr').fill('25878899302');
    await page.locator('#fnr').press('Tab');
    await page.locator('#adresse').click();
    await page.locator('#adresse').fill('Andedammen 123');
    await page.locator('#adresse').press('Tab');
    await page.locator('#postnr').click();
    await page.locator('#postnr').fill('1313');
    await page.locator('#postnr').press('Tab');

    await page.locator('#skadeDato');
    await page.getByTestId('jkl-datepicker__trigger').click();
    await page.getByTestId('jkl-datepicker__input').fill('20.05.2025');

    await page.locator('#hvordanskade').click();
    await page.locator('#hvordanskade').fill('Naboens tre veltet over bilen vår etter et lynnedslag');
    await page.locator('#hvordanskade').press('Tab');

    await page.locator('#omSkaden');

    await page.locator('#hvaErSkadet').nth(0).click();
    await page.locator('#hvaErSkadet').nth(0).fill('Bilen');
    await page.locator('#hvaErSkadet').nth(0).press('Tab');

    await page.locator('#fabrikat').nth(0).click();
    await page.locator('#fabrikat').nth(0).fill('Volvo');
    await page.locator('#fabrikat').nth(0).press('Tab');

    await page.locator('#type').nth(0).click();
    await page.locator('#type').nth(0).fill('V90');
    await page.locator('#type').nth(0).press('Tab');

    await page.locator('#aarKjopt').nth(0).click();
    await page.locator('#aarKjopt').nth(0).fill('2023');
    await page.locator('#aarKjopt').nth(0).press('Tab');

    await page.locator('#aarLaget').nth(0).click();
    await page.locator('#aarLaget').nth(0).fill('2022');
    await page.locator('#aarLaget').nth(0).press('Tab');

    await page.locator('#nyPris').nth(0).click();
    await page.locator('#nyPris').nth(0).fill('729000');
    await page.locator('#nyPris').nth(0).press('Tab');

    await page.getByRole('button', { name: 'Fortsett' }).click();

    await page.locator('iframe[title="Signering"]').contentFrame().locator('iframe[title="BankID"]').contentFrame().getByRole('heading', { name: 'Signing', exact: true }).click();
    
    const page2Promise = page.waitForEvent('popup');
    await page.locator('iframe[title="Signering"]').contentFrame().locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'meld-skade.pdf' }).click();
    const page2 = await page2Promise;

    await page.locator('iframe[title="Signering"]').contentFrame().locator('iframe[title="BankID"]').contentFrame().getByText('Content is understood and I').click();
    await page.locator('iframe[title="Signering"]').contentFrame().locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Start signing' }).click();
    await page.locator('iframe[title="Signering"]').contentFrame().locator('iframe[title="BankID"]').contentFrame().getByLabel('Enter your one time code').click();
    await page.locator('iframe[title="Signering"]').contentFrame().locator('iframe[title="BankID"]').contentFrame().getByLabel('Enter your one time code').fill('otp');
    await page.locator('iframe[title="Signering"]').contentFrame().locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Next' }).click();
    await page.locator('iframe[title="Signering"]').contentFrame().locator('iframe[title="BankID"]').contentFrame().getByLabel('Your BankID password').fill('qwer1234');
    await page.locator('iframe[title="Signering"]').contentFrame().locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Ditt krav er nå sendt inn og')).toBeVisible();
})

function fileURLToPath(url: string): string {
    return nodeFileURLToPath(url);
}