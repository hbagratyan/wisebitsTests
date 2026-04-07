import {test} from '../../fixtures/demoqa/demoqa.fixtures';

test.describe('Проверка базовых сценариев с таблицей', () => {
    test.afterEach(async ({mainPage}) => {
        await mainPage.page.context().clearCookies();
    });

    test('Добавление записи в таблицу', async ({mainPage}) => {
        await mainPage.goto()
        await mainPage.elementsButton.click()
    });
});
