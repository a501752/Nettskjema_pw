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

    const headerInformasjon = page.locator('h2', { hasText: 'Meld skade' });
    await expect(headerInformasjon).toBeVisible();

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

    await page.getByRole('button', { name: '+ Legg til' }).click();

    await page.locator('#omSkaden');

    await page.locator('#hvaErSkadet').click();
    await page.locator('#hvaErSkadet').fill('Bilen');
    await page.locator('#hvaErSkadet').press('Tab');

    await page.locator('#fabrikat').click();
    await page.locator('#fabrikat').fill('Volvo');
    await page.locator('#fabrikat').press('Tab');

    await page.locator('#type').click();
    await page.locator('#type').fill('V90 Stasjonsvogn');
    await page.locator('#type').press('Tab');

    await page.locator('#aarKjopt').click();
    await page.locator('#aarKjopt').fill('2023');
    await page.locator('#aarKjopt').press('Tab');

    await page.locator('#aarLaget').click();
    await page.locator('#aarLaget').fill('2022');
    await page.locator('#aarLaget').press('Tab');

    await page.locator('#nyPris').click();
    await page.locator('#nyPris').fill('729000');
    await page.locator('#nyPris').press('Tab');

    await page.getByRole('button', { name: 'Fortsett' }).click();

    await page.getByText('Les innhold før signering');

    /**
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Velg filer' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, 'meld-skade.pdf'));

    await expect(page.locator('#root')).toContainText('sampleJPG.jpg');
     */



    const downloadPromise = page.waitForEvent('download');
    await page.getByText('Download file').click();
    const download = await downloadPromise;
    await page.locator('meld-skade.pdf').click();
    
    await page.getByText('Innholdet er forstått og jeg er klar til å signere.').check();

    await page.getByRole('button', { name: 'Start signering' }).click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Skriv inn engangskoden din').fill('otp');
    await page.locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Neste' }).click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Ditt BankID-passord').click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Ditt BankID-passord').fill('qwer1234');
    await page.locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Neste' }).click();


    await page.getByRole('button', { name: 'Signering utført' }).click();

    await expect(page.getByRole('paragraph')).toContainText('Ditt krav er nå sendt inn');
})

function fileURLToPath(url: string): string {
    return nodeFileURLToPath(url);
}