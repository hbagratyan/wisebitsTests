import {test} from '../../fixtures/demoqa/demoqa.ui.fixtures';
import {userInfo} from "../../constants/demoqa-constants";
import {expect} from "@playwright/test";

test.describe('Проверка базовых сценариев с таблицей', () => {
    test.afterEach(async ({mainPage}) => {
        await mainPage.page.context().clearCookies();
    });

    test('Добавление записи в таблицу - новая запись отображается после добавление', async ({mainPage, webTablesPage}) => {
        await mainPage.goto();
        await mainPage.elementsButton.click();
        await mainPage.navigationMenu.webTablesButton.click();
        await webTablesPage.searchField.waitForVisibility();
        const rowsCount = await webTablesPage.registrationTableRow.getLocator.count();
        await webTablesPage.addRecordButton.click();
        await webTablesPage.firstNameInput.fill(userInfo.firstName);
        await webTablesPage.lastNameInput.fill(userInfo.lastName);
        await webTablesPage.emailInput.fill(userInfo.email);
        await webTablesPage.ageInput.fill(userInfo.age);
        await webTablesPage.salaryInput.fill(userInfo.salary);
        await webTablesPage.departmentInput.fill(userInfo.department);
        await webTablesPage.submitRegistrationButton.click();
        await webTablesPage.registrationFormTitle.waitForInvisibility();
        expect(await webTablesPage.registrationTableRow.getLocator.count()).toEqual(rowsCount + 1);
        for (const value of Object.values(userInfo)) {
            await expect(webTablesPage.registrationTableRow.getLocator.nth(rowsCount).getByText(value, {exact: true})).toBeVisible();
        }
    });
});
