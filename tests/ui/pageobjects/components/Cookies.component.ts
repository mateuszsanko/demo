import {Locator, Page} from "@playwright/test";

export  class CookiesComponent {

    readonly acceptButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.acceptButton = page.getByRole('button', { name: 'Zaakceptuj wszystko' });
    }

}