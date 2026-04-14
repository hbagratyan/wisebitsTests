import {BasePage} from "../base-page";
import {Page} from "@playwright/test";
import {base_url} from "../../constants/demoqa-constants";
import {NavigationMenu} from "./navigation-menu";
import {Button} from "../../locators/button";
import {Input} from "../../locators/input";
import {Block} from "../../locators/block";

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

    get addRecordButton(): Button {
        return new Button(this.page.locator('[id="addNewRecordButton"]'), "Кнопка добавления записи в таблицу");
    }

    get searchField(): Input {
        return new Input(this.page.locator(`[id="searchBox"]`), "Поле поиска записей в таблице");
    }

    // Элементы модалки ввода данных пользователя в форме регистрации

    get registrationFormTitle(): Block {
        return new Block(this.page.getByText('Registration Form'), "Заголовок модалки формы регистрации");
    }

    get firstNameInput(): Input {
        return new Input(this.page.locator('input[id="firstName"]'), "Поле ввода имени в форме регистрации");
    }

    get lastNameInput(): Input {
        return new Input(this.page.locator('input[id="lastName"]'), "Поле ввода Фамилии в форме регистрации");
    }

    get emailInput(): Input {
        return new Input(this.page.locator('input[id="userEmail"]'), "Поле ввода email в форме регистрации");
    }

    get ageInput(): Input {
        return new Input(this.page.locator('input[id="age"]'), "Поле ввода возраста в форме регистрации");
    }

    get salaryInput(): Input {
        return new Input(this.page.locator('input[id="salary"]'), "Поле ввода зарплаты в форме регистрации");
    }

    get departmentInput(): Input {
        return new Input(this.page.locator('input[id="department"]'), "Поле ввода департамента в форме регистрации");
    }

    get submitRegistrationButton(): Button {
        return new Button(this.page.locator('button[id="submit"]'), "Кнопка подтверждения регистрации");
    }

    get registrationTableRow(): Block {
        return new Block(this.page.locator('table tr'), "Строка таблицы на странице формы регистрации");
    }
}
