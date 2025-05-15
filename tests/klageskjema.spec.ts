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

    if (await page.getByRole('link', { name: 'klageskjema' }).first().isVisible()) {
        await page.getByRole('link', { name: 'klageskjema' }).first().click();
    }

    const headerKontaktinformasjon = page.locator('h2', { hasText: 'Kontaktinformasjon' });
    await expect(headerKontaktinformasjon).toBeVisible();

    await page.locator('#utfyltDato');

    await page.locator('#segment');
    await page.locator('label').filter({ hasText: 'Privatkunde' }).locator('span').first().click();

    await page.getByText('Privatkunde').click();

    await page.locator('#adresse').click();
    await page.locator('#adresse').fill('Andedammen 123');
    await page.locator('#postnr').click();
    await page.locator('#postnr').fill('1313');

    await page.locator('#kommunikasjon');
    await page.locator('label').filter({ hasText: 'E-post' }).locator('span').first().click();

    await page.locator('#epost').click();
    await page.locator('#epost').fill('anders@and.no');
    await page.locator('#tlf').click();
    await page.locator('#tlf').fill('99887766');
    
    await page.getByRole('button', { name: 'Neste side' }).click();


    const headerKlageDokumentasjon = page.locator('h2', { hasText: 'Om klagen og dokumentasjon' });
    await expect(headerKlageDokumentasjon).toBeVisible();

    await page.locator('#saksnr').click();
    await page.locator('#saksnr').fill('654321');
    await page.locator('#beskrivelse').click();
    await page.locator('#beskrivelse').fill('Alt er dårlig...');

    await expect(page.locator('#root')).toContainText('Last opp vedlegg (dokumentasjon eller lignende)');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Velg filer' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, 'sample.pdf'));

    await expect(page.locator('#root')).toContainText('sample.pdf');

    await page.getByRole('button', { name: 'Send inn klage' }).click();

    await expect(page.getByText('Tusen takk for din tilbakemelding!')).toBeVisible();
})


test('Klageskjema bedrift', async ({ page }) => {
  
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

    if (await page.getByRole('link', { name: 'klageskjema' }).first().isVisible()) {
        await page.getByRole('link', { name: 'klageskjema' }).first().click();
    }

    const headerKontaktinformasjon = page.locator('h2', { hasText: 'Kontaktinformasjon' });
    await expect(headerKontaktinformasjon).toBeVisible();

    await page.locator('#utfyltDato');

    await page.locator('#segment');
    await page.locator('label').filter({ hasText: 'Bedriftskunde' }).locator('span').first().click();

    await page.getByText('Bedriftskunde').click();

    await page.locator('#orgNummer').click();
    await page.locator('#orgNummer').fill('549536883');
    await page.locator('#firmanavn').click();
    await page.locator('#firmanavn').fill('KreativKode AS');

    await page.locator('#adresse').click();
    await page.locator('#adresse').fill('Knøsesmauet 21');
    await page.locator('#postnr').click();
    await page.locator('#postnr').fill('5011');

    await page.locator('#kommunikasjon');
    await page.locator('label').filter({ hasText: 'E-post' }).locator('span').first().click();

    await page.locator('#epost').click();
    await page.locator('#epost').fill('anders@and.no');
    await page.locator('#tlf').click();
    await page.locator('#tlf').fill('99887766');
    
    await page.getByRole('button', { name: 'Neste side' }).click();


    const headerOmKlagen = page.locator('h2', { hasText: 'Om klagen og dokumentasjon' });
    await expect(headerOmKlagen).toBeVisible();

    await page.locator('#saksnr').click();
    await page.locator('#saksnr').fill('654321');

    await page.locator('#beskrivelse').click();
    await page.locator('#beskrivelse').fill('Jeg er misfornøyd med alt!');

    await page.getByRole('button', { name: 'Send inn klage' }).click();

    await expect(page.getByText('Tusen takk for din tilbakemelding!')).toBeVisible();
})


test('Klageskjema privat m/mellomlagring', async ({ page }) => {

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

    if (await page.getByRole('link', { name: 'klageskjema' }).first().isVisible()) {
        await page.getByRole('link', { name: 'klageskjema' }).first().click();
    }

    const headerKontaktinformasjon = page.locator('h2', { hasText: 'Kontaktinformasjon' });
    await expect(headerKontaktinformasjon).toBeVisible();

    await page.locator('#utfyltDato');

    await page.locator('#segment');
    await page.locator('label').filter({ hasText: 'Privatkunde' }).locator('span').first().click();

    await page.locator('#adresse').click();
    await page.locator('#adresse').fill('Andedammen 123');
    await page.locator('#postnr').click();
    await page.locator('#postnr').fill('1313');

    await page.locator('#segment');
    await page.locator('label').filter({ hasText: 'E-post' }).locator('span').first().click();

    await page.locator('#epost').click();
    await page.locator('#epost').fill('anders@and.no');
    await page.locator('#tlf').click();
    await page.locator('#tlf').fill('99887766');
    
    await page.getByRole('button', { name: 'Lagre og fortsett senere' }).click();

    await expect(page.getByText('Svarene dine er lagret')).toBeVisible();

    await page.getByRole('button', { name: 'Logg ut' }).click();

    await expect(page.getByText('Du er logget ut.')).toBeVisible();

    /** */
  
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

    if (await page.getByRole('link', { name: 'klageskjema' }).first().isVisible()) {
        await page.getByRole('link', { name: 'klageskjema' }).first().click();
    }
    
    const headerKontaktinformasjon2 = page.locator('h2', { hasText: 'Kontaktinformasjon' });
    await expect(headerKontaktinformasjon2).toBeVisible();

    /**
     * Verifiser at "Privatkunde" er valgt
     */

    /**
     * Verifiser at feltene i “Kontaktinformasjon” ligger der ferdig utfylt med verdiene som ble lagt inn i steg 1
     */
    const epost = page.locator('#epost');
    await expect(epost).toHaveValue("anders@and.no");

    const tlf = page.locator('#tlf');
    await expect(tlf).toHaveValue("99887766");

    await page.getByRole('button', { name: 'Neste side' }).click();

    const headerOmKlagen = page.locator('h2', { hasText: 'Om klagen og dokumentasjon' });
    await expect(headerOmKlagen).toBeVisible();

    await page.locator('#saksnr').click();
    await page.locator('#saksnr').fill('654321');

    await page.locator('#beskrivelse').click();
    await page.locator('#beskrivelse').fill('Jeg er misfornøyd med alt!');

    await page.getByRole('button', { name: 'Send inn klage' }).click();

    await expect(page.getByText('Tusen takk for din')).toBeVisible();
    await expect(page.locator('#root')).toContainText('Tusen takk for din tilbakemelding! Du vil høre fra oss i løpet av kort tid.');
})


/**
 * Test av klageskjema med forventet feil pga opplasting av for stor fil
 */
test('Klageskjema privat "bad path"', async ({ page }) => {

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

    if (await page.getByRole('link', { name: 'klageskjema' }).first().isVisible()) {
        await page.getByRole('link', { name: 'klageskjema' }).first().click();
    }

    const headerKontaktinformasjon = page.locator('h2', { hasText: 'Kontaktinformasjon' });
    await expect(headerKontaktinformasjon).toBeVisible();

    await page.locator('#utfyltDato');

    await page.locator('#segment');
    await page.locator('label').filter({ hasText: 'Privatkunde' }).locator('span').first().click();

    await page.locator('#adresse').click();
    await page.locator('#adresse').fill('Andedammen 123');
    await page.locator('#postnr').click();
    await page.locator('#postnr').fill('1313');

    await page.locator('#kommunikasjon');
    await page.locator('label').filter({ hasText: 'E-post' }).locator('span').first().click();

    await page.locator('#epost').click();
    await page.locator('#epost').fill('anders@and.no');

    await page.locator('#tlf').click();
    await page.locator('#tlf').fill('87654321');

    await page.getByRole('button', { name: 'Neste side' }).click();
    
    const headerOmKlagen = page.locator('h2', { hasText: 'Om klagen og dokumentasjon' });
    await expect(headerOmKlagen).toBeVisible();
    
    await page.locator('#saksnr').click();
    await page.locator('#saksnr').fill('654321');

    await page.locator('#beskrivelse').click();
    await page.locator('#beskrivelse').fill('Jeg er misfornøyd med alt!');

    await page.locator('#vedlegg');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Velg filer' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, '10mb.pdf'));
})


/**
 * Test av klageskjema med timeout
*/
test('Klageskjema privat time-out', async ({ page }) => {
    test.setTimeout(60000); // Set timeout to 1 minute (i.e. 60 seconds)

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

    if (await page.getByRole('link', { name: 'klageskjema' }).first().isVisible()) {
        await page.getByRole('link', { name: 'klageskjema' }).first().click();
    }

    const headerKontaktinformasjon = page.locator('h2', { hasText: 'Kontaktinformasjon' });
    await expect(headerKontaktinformasjon).toBeVisible();

    await page.locator('#utfyltDato');

    await page.locator('#segment');
    await page.locator('label').filter({ hasText: 'Privatkunde' }).locator('span').first().click();

    await page.getByText('Privatkunde').click();

    await page.locator('#adresse').click();
    await page.locator('#adresse').fill('Andedammen 123');
    await page.locator('#postnr').click();
    await page.locator('#postnr').fill('1313');

    await page.locator('#kommunikasjon');
    await page.locator('label').filter({ hasText: 'E-post' }).locator('span').first().click();

    await page.locator('#epost').click();
    await page.locator('#epost').fill('anders@and.no');
    await page.locator('#tlf').click();
    await page.locator('#tlf').fill('99887766');
    
    await page.getByRole('button', { name: 'Neste side' }).click();


    const headerKlageDokumentasjon = page.locator('h2', { hasText: 'Om klagen og dokumentasjon' });
    await expect(headerKlageDokumentasjon).toBeVisible();

    /** La testen stå og vente i 1 minutt uten at det gjøres noe */
    await page.waitForTimeout(60000); // waits for 1 minute (60 seconds)

    await page.locator('#saksnr').click();
    await page.locator('#saksnr').fill('654321');
    await page.locator('#beskrivelse').click();
    await page.locator('#beskrivelse').fill('Nå har jeg ventet lenge nok...');

    await expect(page.locator('#root')).toContainText('Last opp vedlegg (dokumentasjon eller lignende)');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Velg filer' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, 'sample.pdf'));

    await expect(page.locator('#root')).toContainText('sample.pdf');

    await page.getByRole('button', { name: 'Send inn klage' }).click();

    await expect(page.getByText('Tusen takk for din tilbakemelding!')).toBeVisible();

})


function fileURLToPath(url: string): string {
    return nodeFileURLToPath(url);
}