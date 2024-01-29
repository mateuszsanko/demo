import {BasePage} from "./Base.page";
import {Locator, Page} from "@playwright/test";

export class WikipediaPage extends BasePage {
    readonly url: string;
    readonly TITLE: string;
    readonly articleTitle: Locator;
    readonly logo: Locator;

    constructor(page: Page) {
        super(page);
        this.articleTitle = page
            .getByRole('heading', {name: 'Automation', exact: true})
            .locator('span');
        this.logo = page.getByRole('link', { name: 'Wikipedia The Free' });
        this.TITLE = 'Wikipedia';
        this.url = 'https://www.wikipedia.com/';
    }

}