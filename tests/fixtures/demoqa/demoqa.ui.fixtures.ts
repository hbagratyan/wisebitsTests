import {test as base} from '@playwright/test';
import {AuthInit} from "../../page-objects/demoqa/auth.init";
import {MainPage} from "../../page-objects/demoqa/main-page";
import {WebTablesPage} from "../../page-objects/demoqa/web-tables-page";
import {base_url} from "../../constants/demoqa-constants";

interface DemoqaUiFixtures {
    mainPage: MainPage;
    webTablesPage: WebTablesPage;
    authInit: AuthInit;
}

export const test = base.extend<DemoqaUiFixtures>({
    authInit: [
        async ({browser}, use): Promise<void> => {
            const authInit = await AuthInit.create(browser);
            await use(authInit);
            await authInit.currentPage.close();
        },
        {auto: true},
    ],

    mainPage: async ({authInit, baseURL}, use) => {
        await use(new MainPage(authInit.page, baseURL || base_url));
    },

    webTablesPage: async ({authInit, baseURL}, use) => {
        await use(new WebTablesPage(authInit.page, baseURL || base_url));
    },
});
