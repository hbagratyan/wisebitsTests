import {test} from '../../fixtures/demoqa/demoqa.fixtures';
import {expect} from "@playwright/test";
import {endpoints} from "../../constants/demoqa-constants";
import {DataGenerator} from "../../utils/data.generator";

test.describe('API проверки создания пользователя, добавления и удаления книг', () => {

    const data = new DataGenerator()

    test('Create User - Valid credentials', async ({request}) => {
        const username = data.userName()
        const password = data.password()

        const response = await request.post(endpoints.createUser, {
            data: {
                userName: username,
                password: password
            }
        });

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.username).toBe(username);
    });

    test('Create User with Empty Username - Error validation', async ({request}) => {
        const response = await request.post(endpoints.createUser, {
            data: {
                userName: '',
                password: data.password()
            }
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.userID).toBeUndefined();
        expect(body.code).toBeDefined();
        expect(body.message).toContain('required');
    });

    test('Create User with Empty Password - Error validation', async ({request}) => {
        const response = await request.post(endpoints.createUser, {
            data: {
                userName: data.userName(),
                password: ''
            }
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.userID).toBeUndefined();
        expect(body.code).toBeDefined();
        expect(body.message).toContain('required');
    });

    test('Add Book Happy Path', async ({request}) => {
        // 1. Create user
        const username = data.userName()
        const password = data.password()

        const userResponse = await request.post(endpoints.createUser, {
            data: {
                userName: username,
                password: password
            }
        });

        expect(userResponse.status()).toBe(201);
        const userBody = await userResponse.json();
        const userId = userBody.userID;

        // 2. Generate token
        const tokenResponse = await request.post(endpoints.generateToken, {
            data: {
                userName: username,
                password: password
            }
        });

        const tokenBody = await tokenResponse.json();
        const token = tokenBody.token;

        // 3. Add book to user
        const isbn = "9781449325862"; // реальный ISBN из DemoQA

        const addBookResponse = await request.post(endpoints.bookActions, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                userId,
                collectionOfIsbns: [
                    {isbn}
                ]
            }
        });
        const body = await addBookResponse.json();
        expect(body.books).toEqual(
            expect.arrayContaining([
                expect.objectContaining({isbn})
            ])
        );
    });

    test('Add Book without token should fail', async ({ request }) => {
        const username = data.userName();
        const password = data.password();

        // create user
        const userResponse = await request.post(endpoints.createUser, {
            data: { userName: username, password }
        });
        const userId = (await userResponse.json()).userID;

        const isbn = "9781449325862";

        const response = await request.post(endpoints.bookActions, {
            // ❌ без Authorization
            data: {
                userId,
                collectionOfIsbns: [{ isbn }]
            }
        });

        expect(response.status()).toBe(401);
    });

    test('Delete Book Happy Path', async ({ request }) => {

    });

    test('Delete Book sad Path', async ({request}) => {
        const response = await request.delete(endpoints.bookActions,
            {
                data: {
                    userId: "string",
                    collectionOfIsbns: [
                        {
                            isbn: "string"
                        }
                    ]
                }
            }
        )
        expect(response.status()).toBe(200);
    });
});
