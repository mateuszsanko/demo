import {test, expect, type Page} from '@playwright/test';
import {GooglePage} from "./pageobjects/Google.page";
import {WikipediaPage} from "./pageobjects/Wikipedia.page";

let gPage: GooglePage;
let wikiPage: WikipediaPage;

test.beforeEach(async ({page}) => {
    gPage = new GooglePage(page);
    wikiPage = new WikipediaPage(page);
    await gPage.goto();
});

test.afterEach(async ({page}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshotPath = testInfo.outputPath(`failure.png`);
        testInfo.attachments.push({name: 'screenshot', path: screenshotPath, contentType: 'image/png'});
        await page.screenshot({path: screenshotPath, timeout: 5000});
    }
});

const PHRASES = [
    'automation',
];

test.describe('Google', () => {
    for (const phrase of PHRASES) {
        test(`Test with phrase ${phrase}`, async ({page}) => {
            await gPage.cookiesComponent.acceptButton.click();
            await expect(gPage.searchInput).toBeVisible();
            await gPage.searchInput.fill(phrase);
            await expect(page.getByRole('search')).toContainText(phrase);
            await page.keyboard.press('Enter');
            await expect(page.getByRole('search')).toContainText(phrase);
        });
    }

    test(`search for automation and open Wiki page`, async ({page}) => {
        await gPage.cookiesComponent.acceptButton.click();
        await expect(gPage.searchInput).toBeVisible();
        await gPage.searchInput.fill("automation");
        await expect(gPage.searchValue).toContainText("automation");
        await page.keyboard.press('Enter');
        await expect(gPage.searchValue).toContainText("automation");
        await gPage.check();
        await gPage.getResultLocatorFromProvidedSite("wikipedia.org")
            .scrollIntoViewIfNeeded({timeout: 10000});
        await gPage.getResultLocatorFromProvidedSite("wikipedia.org").click();
        await gPage.check();
        await expect(wikiPage.logo).toBeVisible();
        await expect(page).toHaveScreenshot({maxDiffPixelRatio: 0.01});
    });

    test.skip('Screenshot example', async ({page}) => {
        await page.goto("https://the-internet.herokuapp.com/disappearing_elements");
        await page.waitForLoadState("domcontentloaded");
        await expect(page).toHaveScreenshot({maxDiffPixels: 20});
    });
});