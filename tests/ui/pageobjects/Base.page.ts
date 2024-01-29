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
}