import {Locator, Page} from "@playwright/test";

export  class CookiesComponent {

    readonly acceptButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.acceptButton = page.locator("div[id] button[id][data-ved]").nth(3);
    }
}