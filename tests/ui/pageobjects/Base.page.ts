import {expect, type Locator, type Page} from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;
    abstract readonly TITLE: string;
    abstract readonly url: string;

    protected constructor(page: Page) {
        this.page = page;
    }

    async check() {
        await this.page.waitForLoadState("domcontentloaded");
    }

    async goto() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState("domcontentloaded");
    }

    async scrollToElement(locator: Locator, seconds: number) {
        for (let i = 0; i < seconds; i++) {
            if (!await locator.isVisible()) {
                await this.page.keyboard.press("PageDown");
                await this.check();
            } else {
                return locator;
            }
        }
    }
}