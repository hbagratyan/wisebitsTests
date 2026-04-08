import {test} from '../../fixtures/demoqa/demoqa.fixtures';
import {expect} from "@playwright/test";
import {endpoints} from "../../constants/demoqa-constants";

test.describe('API проверки создания пользователя, добавления и удаления книг', () => {

    test('Create User Happy Path', async ({request}) => {
        const response = await request.post(endpoints.createUser)
        expect(response.status()).toBe(200);
    });

    test('Add Book Happy Path', async ({request}) => {
        const response = await request.post(endpoints.addBook)
        expect(response.status()).toBe(200);
    });

    test('Delete Book Happy Path', async ({request}) => {
        const response = await request.delete(endpoints.deleteBook)
        expect(response.status()).toBe(200);
    });
});
