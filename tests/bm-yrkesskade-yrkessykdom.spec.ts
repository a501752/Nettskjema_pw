import { test, expect } from '@playwright/test';

import * as path from "node:path";
import { fileURLToPath as nodeFileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Testcase 1 */
test('Kunde melder yrkesskade', async ({ page }) => {
  
    await page.goto('https://nettskjema.test.fremtind.no/skjema/katalog/bm-yrkesskade-yrkessykdom');

    await expect(page).toHaveTitle('Meld krav - Meld yrkesskade/-sykdom');

    await page.locator('For å starte utfyllingen, må du logge inn med BankID.');
    
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

    const headerForsikringstaker = page.locator('h2', { hasText: 'Forsikringstaker (arbeidsgiver)' });
    await expect(headerForsikringstaker).toBeVisible();

    await page.locator('#bedriftNavn').click();
    await page.locator('#bedriftNavn').fill('Selskapet AS');

    await page.locator('#bedriftOrgnr').click();
    await page.locator('#bedriftOrgnr').fill('255787837');

    await page.locator('#bedriftAdresse').click();
    await page.locator('#bedriftAdresse').fill('Smuget 14');

    await page.locator('#bedriftPostnr').click();
    await page.locator('#bedriftPostnr').fill('1414');

    await page.locator('#avtalenummer').click();
    await page.locator('#avtalenummer').fill('726391');

    await page.locator('#bedriftKontaktperson').click();
    await page.locator('#bedriftKontaktperson').fill('Lise Lotte Olsen');

    await page.locator('#kontaktpersonStilling').click();
    await page.locator('#kontaktpersonStilling').fill('Lysdesigner');

    await page.locator('#kontaktpersonEmail').click();
    await page.locator('#kontaktpersonEmail').fill('liselotte@olsen.no');

    await page.locator('#kontaktpersonTlf').click();
    await page.locator('#kontaktpersonTlf').fill('33445566');
    
    await page.getByRole('button', { name: 'Fortsett' }).click();

    
    const headerArbeidstaker = page.locator('h2', { hasText: 'Arbeidstaker' });
    await expect(headerArbeidstaker).toBeVisible();

    await page.locator('#fulltNavn').click();
    await page.locator('#fulltNavn').fill('Petter Smart');

    await page.locator('#arbeidstakerFnr').click();
    await page.locator('#arbeidstakerFnr').fill('05098341333');

    await page.locator('#arbeidstakerEmail').click();
    await page.locator('#arbeidstakerEmail').fill('petter@smart.no');

    await page.locator('#arbeidstakerAdresse').click();
    await page.locator('#arbeidstakerAdresse').fill('Veita 13');

    await page.locator('#arbeidstakerPostnr').click();
    await page.locator('#arbeidstakerPostnr').fill('6789');

    await page.locator('#arbeidstakerTlf').click();
    await page.locator('#arbeidstakerTlf').fill('22334455');

    await page.locator('#stilling').click();
    await page.locator('#stilling').fill('Blikkenslager');

    await page.locator('#Kontonummer').click();
    await page.locator('#Kontonummer').fill('28870893037');

    await page.getByTestId('jkl-select__button').click();
    await page.getByRole('option', { name: 'Fast' }).click();

    await page.locator('#fulltidHeltid');
    await page.locator('label').filter({ hasText: 'Deltidsstilling' }).locator('span').first().click();

    await page.locator('#stillingsprosent').click();
    await page.locator('#stillingsprosent').fill('60');

    await page.locator('#arbeidslengdeIStillingen');
    await page.locator('label').filter({ hasText: '6 mnd til 1 år' }).locator('span').first().click();

    await page.locator('#aarslonnSkadeaaret').click();
    await page.locator('#aarslonnSkadeaaret').fill('750000');

    await page.locator('#aarslonnForSkaden').click();
    await page.locator('#aarslonnForSkaden').fill('700000');

    await page.locator('#aarslonnFremTilSkaden').click();
    await page.locator('#aarslonnFremTilSkaden').fill('400000');

    await page.getByText('Er arbeidstaker medlem av Folketrygden?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').first().click();

    await page.getByText('Familieforhold da arbeidstaker ble skadet');
    await page.locator('label').filter({ hasText: 'Samboer' }).locator('span').first().click();

    await page.getByText('Forsørger arbeidstaker barn?');
    await page.getByText('Ja').nth(1).click();

    await page.locator('#antallBarn').click();
    await page.locator('#antallBarn').fill('2');

    await page.locator('#barnasFodselsaar').click();
    await page.locator('#barnasFodselsaar').fill('2019 og 2022');
    
    await page.getByRole('button', { name: 'Fortsett' }).click();


    const headerKlageDokumentasjon = page.locator('h2', { hasText: 'Hva har skjedd?' });
    await expect(headerKlageDokumentasjon).toBeVisible();

    await page.getByText('Hva har skjedd?');
    await page.locator('label').filter({hasText: 'Yrkesskade'}).locator('span').first().click();

    await page.getByTestId('jkl-datepicker__trigger').click();
    await page.getByTestId('jkl-datepicker__input').fill('02.07.2025');

    await page.locator('#klokkeslettSkade').click();
    await page.locator('#klokkeslettSkade').fill('13:37');

    await page.locator('#adresseSkadested').click();
    await page.locator('#adresseSkadested').fill('Skadeveien 13');

    await page.locator('#postnummerSkadested').click();
    await page.locator('#postnummerSkadested').fill('3475');

    await page.getByText('Hvor skjedde skaden?');
    await page.locator('label').filter({ hasText: 'På vei til/fra arbeid' }).locator('span').first().click();

    await page.getByText('Skyldes skaden en trafikkulykke?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').first().click();

    await page.locator('#regnr').click();
    await page.locator('#regnr').fill('ZY12345');

    await page.locator('#forsikringsselskapBilforsikring').click();
    await page.locator('#forsikringsselskapBilforsikring').fill('Fremtind');

    await page.getByText('Har arbeidstaker meldt fra om ulykken til selskapet?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').nth(2).click();

    await page.locator('#hvaGjordeArbeidstakeren').click();
    await page.locator('#hvaGjordeArbeidstakeren').fill('Sikret skadestedet og dirigerte trafikken utenom');

    await page.locator('#aarsakTilSkaden').click();
    await page.locator('#aarsakTilSkaden').fill('Den andre bilen kom i rasende fart fra venstre og kjørte på rødt lys');

    await page.locator('#hvilkenSkade').click();
    await page.locator('#hvilkenSkade').fill('Arbeidstaker fikk et skrubbsår');

    await page.locator('#hvilkenKroppsdel').click();
    await page.locator('#hvilkenKroppsdel').fill('Nesen');

    await page.getByText('Ble personlig verneutstyr brukt? (valgfritt)');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').nth(3).click();

    await page.locator('#personligVerneutstyr').click();
    await page.locator('#personligVerneutstyr').fill('Hjelm');

    await page.getByText('Var maskinen/utstyret sikret på noen måte?');
    await page.locator('label').filter({hasText: 'Uaktuelt'}).locator('span').nth(4).click();

    await page.getByText('Fungerte vernet/sikringen som forventet?');
    await page.locator('label').filter({hasText: 'Uaktuelt'}).locator('span').nth(5).click();

    await page.getByText('Skjedde skaden som følge av brudd på arbeidsinstruks?');
    await page.locator('label').filter({hasText: 'Nei'}).locator('span').nth(6).click();

    await page.getByText('Førte skaden til dødsfall?');
    await page.locator('label').filter({hasText: 'Nei'}).locator('span').nth(7).click();

    await page.getByText('Har du hatt sykefravær?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').nth(8).click();

    await page.locator('#lengdeSykefravaer').click();
    await page.locator('#lengdeSykefravaer').fill('20.03.2025 - 23.03.2025');
    
    await page.getByRole('button', { name: 'Fortsett' }).click();


    const headerTilleggsopplysninger = page.locator('h2', { hasText: 'Tilleggsopplysninger' });
    await expect(headerTilleggsopplysninger).toBeVisible();

    await page.getByText('Er saken meldt til NAV?');
    await page.locator('label').filter({hasText: 'Nei'}).locator('span').first().click();

    await page.getByText('Har arbeidstaker andre personforsikringer?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').first().click();

    await page.locator('#hvilketSelskap').click();
    await page.locator('#hvilketSelskap').fill('Fremtind');

    await page.getByText('Har arbeidstaker meldt fra til selskapet?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').first().click();

    await page.locator('#bekreftelseArbeidstaker').check();

    await page.getByRole('button', { name: 'Send inn' }).click();

    await expect(page.getByText('Skjemaet ble sendt!')).toBeVisible();
})


function fileURLToPath(url: string): string {
    return nodeFileURLToPath(url);
}