import { test, expect } from '@playwright/test';

import * as path from "node:path";
import { fileURLToPath as nodeFileURLToPath } from 'url';

/** Hva har skjedd - (kollisjon | dyr | tyveri | annet) */

/** Kollisjon med annet kjøretøy */
/** Påkjøring av dyr */
/** Tyveri/innbrudd */
/** Andre skader kjøretøy */

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('Skademeldingskjema etter kollisjon', async ({ page }) => {
  
    await page.goto('https://nettskjema.test.fremtind.no/skjema/katalog/skademelding-autolease');

    await expect(page).toHaveTitle('Skademelding Autolease');

    const headerInformasjon = page.locator('h2', { hasText: 'Informasjon' });
    await expect(headerInformasjon).toBeVisible();

    await page.locator('#innmelderFnr').click();
    await page.locator('#innmelderFnr').fill('09058435551');
    await page.locator('#innmelderFnr').press('Tab');
    await page.locator('#innmelderNavn').click();
    await page.locator('#innmelderNavn').fill('Anders And');
    await page.locator('#innmelderNavn').press('Tab');
    await page.locator('#bedriftNavn').click();
    await page.locator('#bedriftNavn').fill('Selskapet AS');
    await page.locator('#bedriftNavn').press('Tab');
    await page.locator('#bedriftOrgnr').click();
    await page.locator('#bedriftOrgnr').fill('733801433');
    await page.locator('#bedriftOrgnr').press('Tab');
    await page.locator('#regNr').click();
    await page.locator('#regNr').fill('AB12345');
    await page.locator('#regNr').press('Tab');
    await page.locator('#kontaktEpost').click();
    await page.locator('#kontaktEpost').fill('ole@olsen.no');
    await page.locator('#kontaktEpost').press('Tab');
    await page.locator('#kontaktTelefon').click();
    await page.locator('#kontaktTelefon').fill('22334455');
    await page.locator('#kontaktTelefon').press('Tab');
    /** */
    await page.getByTestId('jkl-datepicker__trigger').click();
    await page.getByTestId('jkl-datepicker__input').fill('20.03.2025');
    await page.getByRole('button', { name: 'Fortsett' }).click();

    
    const headerHvaHarSkjedd = page.locator('h2', { hasText: 'Hva har skjedd?' });
    await expect(headerHvaHarSkjedd).toBeVisible();

    await page.getByText('Angi årsak');
    await page.locator('label').filter({ hasText: 'Kollisjon med annet kjøretøy' }).locator('span').first().click();
    await page.getByRole('button', { name: 'Fortsett' }).click();

    const headerKollisjonAnnetKjoretoy = page.locator('h2', { hasText: 'Kollisjon med annet kjøretøy' });
    await expect(headerKollisjonAnnetKjoretoy).toBeVisible();

    await page.locator('#kollisjonHvor').click();
    await page.locator('#kollisjonHvor').fill('På vei til byen');
    await page.locator('#kollisjonHvor').press('Tab');
    await page.locator('#kollisjonSjaforNavn').click();
    await page.locator('#kollisjonSjaforNavn').fill('Pelle Pettersen');
    await page.locator('#kollisjonSjaforNavn').press('Tab');
    await page.locator('#kollisjonSjaforAlder').click();
    await page.locator('#kollisjonSjaforAlder').fill('33');
    await page.locator('#kollisjonSjaforAlder').press('Tab');
    await page.locator('#kollisjonHvordan').click();
    await page.locator('#kollisjonHvordan').fill('Helt uventet sto det en bil i veikanten');
    await page.locator('#kollisjonHvordan').press('Tab');
    await page.getByText('Hva slags dekk var det på kjøretøyet?');
    await page.locator('label').filter({ hasText: 'Sommerdekk' }).locator('span').first().click();
    await page.locator('#kollisjonMotpartRegnr').click();
    await page.locator('#kollisjonMotpartRegnr').fill('ZN54321');
    await page.locator('#kollisjonMotpartRegnr').press('Tab');
    
    await page.getByRole('button', { name: 'Fortsett' }).click();

    const headerSkader = page.locator('h2', { hasText: 'Skader' });
    await expect(headerSkader).toBeVisible();

    await page.locator('#skader').click();
    await page.locator('#skader').fill('Diger bulk på venstre forskjerm');
    await page.locator('#skader').press('Tab');
    await page.getByText('Har du bestilt time på verksted?');
    await page.locator('label').filter({ hasText: 'Ja' }).locator('span').first().click();
    await page.locator('#verksted').click();
    await page.locator('#verksted').fill('Kvikk Fiks AS');
    await page.locator('#verksted').press('Tab');

    await expect(page.locator('#root')).toContainText('Last opp skademelding og bilder');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Velg filer' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, 'sample.pdf'));

    await expect(page.locator('#root')).toContainText('sample.pdf');

    await page.getByRole('button', { name: 'Send inn' }).click();
    await expect(page.getByRole('paragraph')).toContainText('Saken din er registrert, og dette skjer videre: Nå har vi foreløpig de opplysningene vi trenger, og antatt behandlingstid er 2 arbeidsdager. Vi kontakter deg så snart vi har sett på saken din. Du vil få en egen e-post med skadenummeret ditt.');
})

test('Skademeldingskjema etter påkjøring av dyr', async ({ page }) => {

    await page.goto('https://nettskjema.test.fremtind.no/skjema/katalog/skademelding-autolease');

    await expect(page).toHaveTitle('Skademelding Autolease');

    const headerInformasjon = page.locator('h2', { hasText: 'Informasjon' });
    await expect(headerInformasjon).toBeVisible();

    await page.locator('#innmelderFnr').click();
    await page.locator('#innmelderFnr').fill('09058435551');
    await page.locator('#innmelderFnr').press('Tab');
    await page.locator('#innmelderNavn').click();
    await page.locator('#innmelderNavn').fill('Anders And');
    await page.locator('#innmelderNavn').press('Tab');
    await page.locator('#bedriftNavn').click();
    await page.locator('#bedriftNavn').fill('Selskapet AS');
    await page.locator('#bedriftNavn').press('Tab');
    await page.locator('#bedriftOrgnr').click();
    await page.locator('#bedriftOrgnr').fill('733801433');
    await page.locator('#bedriftOrgnr').press('Tab');
    await page.locator('#regNr').click();
    await page.locator('#regNr').fill('AB12345');
    await page.locator('#regNr').press('Tab');
    await page.locator('#kontaktEpost').click();
    await page.locator('#kontaktEpost').fill('ole@olsen.no');
    await page.locator('#kontaktEpost').press('Tab');
    await page.locator('#kontaktTelefon').click();
    await page.locator('#kontaktTelefon').fill('22334455');
    await page.locator('#kontaktTelefon').press('Tab');
    /** */
    await page.getByTestId('jkl-datepicker__trigger').click();
    await page.getByTestId('jkl-datepicker__input').fill('20.03.2025');
    await page.getByRole('button', { name: 'Fortsett' }).click();
    
    /** ----------------------------  */
    const headerHvaHarSkjedd = page.locator('h2', { hasText: 'Hva har skjedd?' });
    await expect(headerHvaHarSkjedd).toBeVisible();
    
    /**
    await page.locator('label').filter({ hasText: 'Kollisjon med annet kjøretøy' }).locator('span').first().click();
    await page.locator('label').filter({ hasText: 'Påkjøring av dyr' }).locator('span').first().click();
    await page.locator('label').filter({ hasText: 'Tyveri/innbrudd' }).locator('span').first().click();
    await page.locator('label').filter({ hasText: 'Andre skader kjøretøy' }).locator('span').first().click();
     */
    await page.locator('label').filter({ hasText: 'Påkjøring av dyr' }).locator('span').first().click();

    const headerPaakjoeringAvDyr = page.locator('a', { hasText: 'Påkjøring av dyr' });
    await expect(headerPaakjoeringAvDyr).toBeVisible();

    await page.getByRole('button', { name: 'Fortsett' }).click();


    await page.locator('#dyrHvor').click();
    await page.locator('#dyrHvor').fill('På veien til byen');
    await page.locator('#dyrHvor').press('Tab');
    await page.locator('#dyrSjaforNavn').click();
    await page.locator('#dyrSjaforNavn').fill('Pelle Pettersen');
    await page.locator('#dyrSjaforNavn').press('Tab');
    await page.locator('#dyrSjaforAlder').click();
    await page.locator('#dyrSjaforAlder').fill('33');
    await page.locator('#dyrSjaforAlder').press('Tab');
    await page.locator('#dyrHvordan').click();
    await page.locator('#dyrHvordan').fill('Plutselig sto det en bil i veikanten');
    await page.locator('#dyrHvordan').press('Tab');
    await page.getByText('Hva slags dekk var det på kjøretøyet?');
    await page.locator('label').filter({ hasText: 'Sommerdekk' }).locator('span').first().click();
    await page.getByText('Har du meldt fra til viltnemda eller politiet?');
    await page.locator('label').filter({hasText: 'Nei'}).locator('span').first().click();
    await page.getByRole('button', { name: 'Fortsett' }).click();

    const headerSkader = page.locator('h2', { hasText: 'Skader' });
    await expect(headerSkader).toBeVisible();

    await page.locator('#skader').click();
    await page.locator('#skader').fill('Diger bulk på venstre forskjerm');
    await page.locator('#skader').press('Tab');
    await page.getByText('Har du bestilt time på verksted?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').first().click();
    await page.locator('#verksted').click();
    await page.locator('#verksted').fill('Kvikk Fiks AS');
    await page.locator('#verksted').press('Tab');
        
    await expect(page.locator('#root')).toContainText('Last opp skademelding og bilder');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Velg filer' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, 'sampleJPG.jpg'));

    await expect(page.locator('#root')).toContainText('sampleJPG.jpg');

    await page.getByRole('button', { name: 'Send inn' }).click();
    await page.getByText('Saken din er registrert, og').click();
    await expect(page.getByRole('paragraph')).toContainText('Saken din er registrert, og dette skjer videre: Nå har vi foreløpig de opplysningene vi trenger, og antatt behandlingstid er 2 arbeidsdager. Vi kontakter deg så snart vi har sett på saken din. Du vil få en egen e-post med skadenummeret ditt.');
})


test('Skademeldingskjema etter tyveri/innbrudd', async ({ page }) => {

    await page.goto('https://nettskjema.test.fremtind.no/skjema/katalog/skademelding-autolease');

    await expect(page).toHaveTitle('Skademelding Autolease');

    const headerInformasjon = page.locator('h2', { hasText: 'Informasjon' });
    await expect(headerInformasjon).toBeVisible();

    await page.locator('#innmelderFnr').click();
    await page.locator('#innmelderFnr').fill('09058435551');
    await page.locator('#innmelderFnr').press('Tab');
    await page.locator('#innmelderNavn').click();
    await page.locator('#innmelderNavn').fill('Anders And');
    await page.locator('#innmelderNavn').press('Tab');
    await page.locator('#bedriftNavn').click();
    await page.locator('#bedriftNavn').fill('Selskapet AS');
    await page.locator('#bedriftNavn').press('Tab');
    await page.locator('#bedriftOrgnr').click();
    await page.locator('#bedriftOrgnr').fill('733801433');
    await page.locator('#bedriftOrgnr').press('Tab');
    await page.locator('#regNr').click();
    await page.locator('#regNr').fill('AB12345');
    await page.locator('#regNr').press('Tab');
    await page.locator('#kontaktEpost').click();
    await page.locator('#kontaktEpost').fill('ole@olsen.no');
    await page.locator('#kontaktEpost').press('Tab');
    await page.locator('#kontaktTelefon').click();
    await page.locator('#kontaktTelefon').fill('22334455');
    await page.locator('#kontaktTelefon').press('Tab');
    /** */
    await page.getByTestId('jkl-datepicker__trigger').click();
    await page.getByTestId('jkl-datepicker__input').fill('20.03.2025');
    await page.getByRole('button', { name: 'Fortsett' }).click();

    
    /** ----------------------------  */
    const headerHvaHarSkjedd = page.locator('h2', { hasText: 'Hva har skjedd?' });
    await expect(headerHvaHarSkjedd).toBeVisible();
    /**
    await page.locator('label').filter({ hasText: 'Kollisjon med annet kjøretøy' }).locator('span').first().click();
    await page.locator('label').filter({ hasText: 'Påkjøring av dyr' }).locator('span').first().click();
    await page.locator('label').filter({ hasText: 'Tyveri/innbrudd' }).locator('span').first().click();
    await page.locator('label').filter({ hasText: 'Andre skader kjøretøy' }).locator('span').first().click();
     */
    await page.locator('label').filter({ hasText: 'Tyveri/innbrudd' }).locator('span').first().click();

    /** ----------------------------  */
    const headerTyveriInnbrudd = page.locator('a', { hasText: 'Tyveri/innbrudd' });
    await expect(headerTyveriInnbrudd).toBeVisible();
    await page.getByRole('button', { name: 'Fortsett' }).click();

    await page.locator('#tyveriParkert').click();
    await page.locator('#tyveriParkert').fill('Utenfor butikken');
    await page.locator('#tyveriParkert').press('Tab');
    await page.locator('#tyveriHvaHarSkjedd').click();
    await page.locator('#tyveriHvaHarSkjedd').fill('Noen har knust sidevinduet og fått åpnet døren');
    await page.locator('#tyveriHvaHarSkjedd').press('Tab');
    await page.locator('#tyveriSkader').click();
    await page.locator('#tyveriSkader').fill('Bilen er totalt ramponert');
    await page.locator('#tyveriSkader').press('Tab');
    await page.getByText('Har du meldt fra til politiet?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').first().click();
    await page.getByRole('button', { name: 'Fortsett' }).click();


    /** ----------------------------  */
    const headerSkader = page.locator('h2', { hasText: 'Skader' });
    await expect(headerSkader).toBeVisible();

    await page.locator('#skader').click();
    await page.locator('#skader').fill('Diger bulk på venstre forskjerm');
    await page.locator('#skader').press('Tab');
    await page.getByText('Har du bestilt time på verksted?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').first().click();

    await page.locator('#verksted').click();
    await page.locator('#verksted').fill('Kvikk Fiks AS');
    await page.locator('#verksted').press('Tab');
        
    await expect(page.locator('#root')).toContainText('Last opp skademelding og bilder');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Velg filer' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, 'sampleJPG.jpg'));

    await expect(page.locator('#root')).toContainText('sampleJPG.jpg');

    await page.getByRole('button', { name: 'Send inn' }).click();
    await page.getByText('Saken din er registrert, og').click();
    await expect(page.getByRole('paragraph')).toContainText('Saken din er registrert, og dette skjer videre: Nå har vi foreløpig de opplysningene vi trenger, og antatt behandlingstid er 2 arbeidsdager. Vi kontakter deg så snart vi har sett på saken din. Du vil få en egen e-post med skadenummeret ditt.');
    
})


test('Skademeldingskjema etter andre skader kjøretøy', async ({ page }) => {

    await page.goto('https://nettskjema.test.fremtind.no/skjema/katalog/skademelding-autolease');

    await expect(page).toHaveTitle('Skademelding Autolease');
    
    const headerInformasjon = page.locator('h2', { hasText: 'Informasjon' });
    await expect(headerInformasjon).toBeVisible();

    await page.locator('#innmelderFnr').click();
    await page.locator('#innmelderFnr').fill('09058435551');
    await page.locator('#innmelderFnr').press('Tab');
    await page.locator('#innmelderNavn').click();
    await page.locator('#innmelderNavn').fill('Anders And');
    await page.locator('#innmelderNavn').press('Tab');
    await page.locator('#bedriftNavn').click();
    await page.locator('#bedriftNavn').fill('Selskapet AS');
    await page.locator('#bedriftNavn').press('Tab');
    await page.locator('#bedriftOrgnr').click();
    await page.locator('#bedriftOrgnr').fill('733801433');
    await page.locator('#bedriftOrgnr').press('Tab');
    await page.locator('#regNr').click();
    await page.locator('#regNr').fill('AB12345');
    await page.locator('#regNr').press('Tab');
    await page.locator('#kontaktEpost').click();
    await page.locator('#kontaktEpost').fill('ole@olsen.no');
    await page.locator('#kontaktEpost').press('Tab');
    await page.locator('#kontaktTelefon').click();
    await page.locator('#kontaktTelefon').fill('22334455');
    await page.locator('#kontaktTelefon').press('Tab');
    /** */
    await page.getByTestId('jkl-datepicker__trigger').click();
    await page.getByTestId('jkl-datepicker__input').fill('20.03.2025');
    await page.getByRole('button', { name: 'Fortsett' }).click();
    
    /** ----------------------------  */
    const headerHvaHarSkjedd = page.locator('h2', { hasText: 'Hva har skjedd?' });
    await expect(headerHvaHarSkjedd).toBeVisible();
    /**
    await page.locator('label').filter({ hasText: 'Kollisjon med annet kjøretøy' }).locator('span').first().click();
    await page.locator('label').filter({ hasText: 'Påkjøring av dyr' }).locator('span').first().click();
    await page.locator('label').filter({ hasText: 'Tyveri/innbrudd' }).locator('span').first().click();
    await page.locator('label').filter({ hasText: 'Andre skader kjøretøy' }).locator('span').first().click();
     */
    await page.locator('label').filter({ hasText: 'Andre skader kjøretøy' }).locator('span').first().click();
    await page.getByRole('button', { name: 'Fortsett' }).click();

    await page.locator('#annetHvor').click();
    await page.locator('#annetHvor').fill('Utenfor sykehuset');
    await page.locator('#annetHvor').press('Tab');
    await page.locator('#annetSjaforNavn').click();
    await page.locator('#annetSjaforNavn').fill('Gudleiv Knotten');
    await page.locator('#annetSjaforNavn').press('Tab');
    await page.locator('#annetSjaforAlder').click();
    await page.locator('#annetSjaforAlder').fill('33');
    await page.locator('#annetSjaforAlder').press('Tab');
    await page.locator('#annetHvordan').click();
    await page.locator('#annetHvordan').fill('En kampestein rullet ned fra fjellsiden og ut i veien og traff bilen');
    await page.locator('#annetHvordan').press('Tab');
    await page.getByText('Hva slags dekk var det på kjøretøyet?');
    await page.locator('label').filter({ hasText: 'Sommerdekk' }).locator('span').first().click();

    await page.getByRole('button', { name: 'Fortsett' }).click();

    const headerSkader = page.locator('h2', { hasText: 'Skader' });
    await expect(headerSkader).toBeVisible();

    await page.locator('#skader').click();
    await page.locator('#skader').fill('Diger bulk på venstre forskjerm');
    await page.locator('#skader').press('Tab');
    await page.getByText('Har du bestilt time på verksted?');
    await page.locator('label').filter({hasText: 'Ja'}).locator('span').first().click();
    await page.locator('#verksted').click();
    await page.locator('#verksted').fill('Kvikk Fiks AS');
    await page.locator('#verksted').press('Tab');
    
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Velg filer' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, 'sampleJPG.jpg'));

    await expect(page.locator('#root')).toContainText('sampleJPG.jpg');

    await page.getByRole('button', { name: 'Send inn' }).click();
    await page.getByText('Saken din er registrert, og').click();
    await expect(page.getByRole('paragraph')).toContainText('Saken din er registrert, og dette skjer videre: Nå har vi foreløpig de opplysningene vi trenger, og antatt behandlingstid er 2 arbeidsdager. Vi kontakter deg så snart vi har sett på saken din. Du vil få en egen e-post med skadenummeret ditt.');
})

function fileURLToPath(url: string): string {
    return nodeFileURLToPath(url);
}