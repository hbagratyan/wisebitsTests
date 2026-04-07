import {Browser, BrowserContext, Page} from '@playwright/test';
import {BasePage} from '../base-page';
import {base_url} from "../../constants/demoqa-constants";

export class AuthInit extends BasePage {
    context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        super(page);
        this.context = context;
    }

    get currentPage(): Page {
        return this.page;
    }

    static async create(browser: Browser): Promise<AuthInit> {
        const context = await browser.newContext();
        const page = await context.newPage();
        return new AuthInit(page, context);
    }
}
