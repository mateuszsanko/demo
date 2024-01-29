import {BasePage} from "./Base.page";
import {Locator, Page} from "@playwright/test";
import {CookiesComponent} from "./components/Cookies.component";

export class GooglePage extends BasePage {
    readonly url: string;
    readonly TITLE: string;
    readonly cookiesComponent: CookiesComponent;

    readonly searchInput: Locator;
    readonly searchValue: Locator;

    constructor(page: Page) {
        super(page);
        this.TITLE = 'Google';
        this.searchInput = page.locator("textarea[id]");
        this.searchValue = page.getByRole("search");
        this.url = 'https://www.google.com/';
        this.cookiesComponent = new CookiesComponent(page);
    }

    getInputForValidation(todo: string): Locator {
        return this.page.locator("div").filter({has: this.page.getByText(todo)});
    }

    getResultLocatorFromProvidedSite(urlPart: string): Locator {
        return this.page.locator(`a[href*='${urlPart}'] h3`);
    }
}