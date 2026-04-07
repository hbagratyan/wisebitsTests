import {BasePage} from "../base-page";
import {Page} from "@playwright/test";
import {base_url} from "../../constants/demoqa-constants";
import {NavigationMenu} from "./navigation-menu";
import {Button} from "../../locators/button";

export class MainPage extends BasePage {
    baseURL: string;
    navigationMenu: NavigationMenu;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
        this.navigationMenu = new NavigationMenu(page);
    }

    async goto() {
        await this.page.goto(base_url);
    }

    get elementsButton(): Button{
        return new Button(this.page.locator('[href="/elements"]'), "Кнопка блока с названием Elements");
    }
}
