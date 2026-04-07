import {BasePage} from "../base-page";
import {Page} from "@playwright/test";
import {base_url} from "../../constants/demoqa-constants";
import {NavigationMenu} from "./navigation-menu";

export class WebTablesPage extends BasePage {
    baseURL: string;
    navigationMenu: NavigationMenu;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
        this.navigationMenu = new NavigationMenu(page);
    }

    async goto() {
        await this.page.goto(`${base_url}/webtables`);
    }
}
