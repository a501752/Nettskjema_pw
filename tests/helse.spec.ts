import { test, expect } from '@playwright/test';

import * as path from "node:path";
import { fileURLToPath as nodeFileURLToPath } from 'url';

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));


/** Testcase 1 */
test('Helse', async ({ page }) => {

    await page.goto('https://nettskjema.test.fremtind.no/skjema/katalog/helse');

    await page.getByRole('button', { name: 'Start utfylling' }).click();
    await page.locator('iframe[title="Innlogging"]').contentFrame().getByRole('textbox', { name: 'Fødselsnummer' }).fill('25878899302');
    await page.locator('iframe[title="Innlogging"]').contentFrame().getByRole('button', { name: 'Neste' }).click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Skriv inn engangskoden din').click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Skriv inn engangskoden din').fill('otp');
    await page.locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Neste' }).click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Ditt BankID-passord').click();
    await page.locator('iframe[title="BankID"]').contentFrame().getByLabel('Ditt BankID-passord').fill('qwer1234');
    await page.locator('iframe[title="BankID"]').contentFrame().getByRole('button', { name: 'Neste' }).click();

    const headerAvtale = page.locator('h2', { hasText: 'Avtale' });
    await expect(headerAvtale).toBeVisible();

    await page.getByText('Velg avtale');
    await page.locator('label').filter({ hasText: 'Personforsikring' }).locator('span').first().click();

    await page.getByText('Helseerklæringen gjelder');
    await page.locator('label').filter({ hasText: 'Ny forsikring' }).locator('span').first().click();

    await page.getByRole('button', { name: 'Fortsett' }).click();

    /** */
    const headerInnledning = page.locator('h2', { hasText: 'Innledning' });
    await expect(headerInnledning).toBeVisible();

    await page.getByText('Hvilke forsikringer har du kjøpt');
    await page.locator('label').filter({ hasText: 'Kritisk sykdom'}).check();

    await page.getByText('Om den forsikrede');

    await page.locator('#Adresse');
    await page.locator('#Adresse').fill('Smuget 13');
    await page.locator('#Adresse').press('Tab');

    await page.locator('#postnr');
    await page.locator('#postnr').fill('1313');
    await page.locator('#postnr').press('Tab');

    await page.locator('#telefonnr');
    await page.locator('#telefonnr').fill('13131313');
    await page.locator('#telefonnr').press('Tab');

    await page.locator('#epost');
    await page.locator('#epost').fill('kry@kunde.no');
    await page.locator('#epost').press('Tab');

    await page.getByLabel('Jeg bekrefter at jeg har lest Orientering om helseerklæringen').check();

    await page.getByRole('button', { name: 'Fortsett' }).click();

    /** */
    await page.getByText('Arbeid og personlig');

    await page.getByText('Har du bodd sammenhengende i Norge de siste 5 årene'); /** spm3 */
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').first().click();

    await page.getByText('Jeg er'); /** spm7 = 1 */
    await page.locator('label').filter({ hasText: 'i jobb' }).locator('span').first().click();

    await page.getByText('Er du'); /** spm8 == 1 */
    await page.locator('label').filter({ hasText: 'ansatt' }).locator('span').first().click();

    await page.locator('#spm9');
    await page.locator('#spm9').fill('Rørlegger');
    await page.locator('#spm9').press('Tab');

    await page.locator('#spm10');
    await page.locator('#spm10').fill('Jeg legger rør');
    await page.locator('#spm10').press('Tab');

    await page.locator('#spm20');
    await page.locator('#spm20').fill('170');
    await page.locator('#spm20').press('Tab');

    await page.locator('#spm21');
    await page.locator('#spm21').fill('70');
    await page.locator('#spm21').press('Tab');

    await page.getByText('Har du noen fysiske eller psykiske funksjonshemninger');  /** spm22 == 1 */
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(3).click();  

    await page.locator('#spm23');
    await page.locator('#spm23').fill('Smerter i korsryggen');
    await page.locator('#spm23').press('Tab');

    await page.getByText('Er du for tiden fullt arbeidsdyktig');
    await page.locator('label').filter({ hasText: 'Nei' }).locator('span').nth(4).click();

    await page.locator('#spm25');
    await page.locator('#spm25').fill('Det gjør så ufattelig vondt i ryggen :-(');
    await page.locator('#spm25').press('Tab');

    await page.getByText('Har du i løpet av de siste 10 årene vært til behandling eller kontroll');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(6).click();

    /** Gruppe start */
    /** Hva er årsaken (diagnose) */
    await page.locator('#spm27');
    await page.locator('#spm27').fill('Lumbago');
    await page.locator('#spm27').press('Tab');

    await page.locator('#spm28');
    await page.locator('#spm28').fill('April 2025');
    await page.locator('#spm28').press('Tab');

    await page.locator('#spm29');
    await page.locator('#spm29').fill('De kan jo ikke gjøre noe :-(');
    await page.locator('#spm29').press('Tab');

    await page.locator('#spm30');
    await page.locator('#spm30').fill('Lumbago-klinikken i Oslo');
    await page.locator('#spm30').press('Tab');
    /** Gruppe slutt */

    await page.getByRole('button', { name: 'Fortsett' }).click();


    await expect(page).toHaveTitle('Sykdomsbilde');

    await page.getByText('Har du nå eller i løpet av de siste 10 årene hatt en eller flere av følgende sykdommer?');

    /** TODO Svar JA på alle */

    /** Diabetes */
    await page.getByText('Diabetes?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').first().click();
    await page.getByText('Når fikk du påvist diabetes').fill('April 2025');
    await page.getByText('Behandlende lege').fill('Dr Øvel, Toten');
    await page.getByText('Har du fortsatt sykdommen?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(2).click();

    await page.getByText('HIV?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(3).click();
    await page.getByText('Når fikk du påvist HIV?').fill('April 2025');
    await page.getByText('Har du blitt behandlet for sykdommen?').fill('Javisst');
    await page.getByText('Hvor følges du opp for sykdommen').fill('Rikshospitalet, Oslo');

    await page.getByText('Hjerte-/karsykdom?');
    await page.locator('label').filter( {hasText: 'Ja' }).locator('span').nth(4).click();

    await page.getByText('Høyt blodtrykk?');
    await page.locator('label').filter( {hasText: 'Ja' }).locator('span').nth(5).click();

    await page.getByText('Høyt kolesterol?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(6).click();

    await page.getByText('Migrene, gjentatt eller langvarig hodepine?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(7).click();

    await page.getByText('Hjernesykdom');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(8).click();

    await page.getByText('Astma eller annen lungesykdom');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(9).click();

    await page.getByText('Kreft?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(10).click();

    await page.getByText('Nyresykdom?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(11).click();

    await page.getByText('Leversykdom?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(12).click();

    await page.getByText('Fordøyelsessykdom?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(13).click();

    await page.getByText('Sykdom i nervesystemet?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(14).click();

    await page.getByText('Hepatitt?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(15).click();

    await page.getByText('Revmatisme, leddgikt eller annen autoimmun sykdom?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(16).click();

    await page.getByText('Annen sykdom av alvorlig karakter?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(17).click();

    await page.getByText('Har du, eller har du i løpet av de siste 10 årene hatt, angst, depresjon, utbrenthet, adferdsforstyrrelser, spiseforstyrrelser eller andre psykiske lidelser, eller har du gått til samtaler eller behandling hos psykolog eller psykiater?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').nth(18).click();



    /** */

    await page.locator('#spm27');
    await page.locator('#spm27').fill('Lumbago');
    await page.locator('#spm27').press('Tab');

    await page.locator('#spm28');
    await page.locator('#spm28').fill('I fjor høst');
    await page.locator('#spm28').press('Tab');

    await page.locator('#spm29');
    await page.locator('#spm29').fill('Jeg fikk noen øvelser...');
    await page.locator('#spm29').press('Tab');

    await page.locator('#spm30');
    await page.locator('#spm30').fill('Lumbago-klinikken, Oslo');
    await page.locator('#spm30').press('Tab');

    await page.getByRole('button', { name: 'Fortsett' }).click();


    await expect(page).toHaveTitle('Sykdomsbilde');

    await page.getByText('Diabetes?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').first().click();

    await page.locator('#spm33');
    await page.locator('#spm33').fill('I forrige måned');
    await page.locator('#spm33').press('Tab');

    await page.locator('#spm34');
    await page.locator('#spm34').fill('Dr Acula, Valakia');
    await page.locator('#spm34').press('Tab');

    await page.getByText('Har du fortsatt sykdommen?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').first().click();

    /** LURK klikk next eller noe sånt */

    /** */

    await page.getByText('HIV?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').first().click();

    await page.locator('#spm37');
    await page.locator('#spm37').fill('I fjor');
    await page.locator('#spm37').press('Tab');

    await page.locator('#spm34');
    await page.locator('#spm34').fill('Nei');
    await page.locator('#spm34').press('Tab');

    await page.locator('#spm39');
    await page.locator('#spm39').fill('Klinikk HIV-og-hoi');
    await page.locator('#spm39').press('Tab');







    await page.locator('#spm7');
    await page.locator('label').filter({ hasText: 'Nei' }).locator('span').first().click();




})


function fileURLToPath(url: string): string {
    return nodeFileURLToPath(url);
}