import {test} from '../../fixtures/demoqa/demoqa.fixtures';
import {expect} from "@playwright/test";
import {endpoints} from "../../constants/demoqa-constants";

test.describe('API проверки создания пользователя, добавления и удаления книг', () => {

    test('Create User Happy Path', async ({ request }) => {
        const response = await request.post(endpoints.createUser, {
            data: {
                userName: 'testUser11',
                password: 'Test123!!'
            }
        });

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.username).toBeDefined();
    });

    test('Create User Sad Path', async ({ request }) => {
        const response = await request.post(endpoints.createUser, {
            data: {
                userName: '',
                password: 'Test123!!'
            }
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.username).toBeUndefined();
    });

    test('Add Book Happy Path', async ({request}) => {
        const response = await request.post(endpoints.bookActions)
        expect(response.status()).toBe(200);
    });

    test('Delete Book Happy Path', async ({request}) => {
        const response = await request.delete(endpoints.bookActions)
        expect(response.status()).toBe(200);
    });
});
