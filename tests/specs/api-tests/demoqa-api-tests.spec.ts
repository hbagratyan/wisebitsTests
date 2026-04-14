import {test} from '../../fixtures/demoqa/demoqa.api.fixtures';
import {expect} from "@playwright/test";

test.describe('API проверки создания пользователя, добавления и удаления книг', () => {

    test('Create User - Valid credentials', async ({userClient, dataGenerator}) => {
        const username = dataGenerator.userName()
        const password = dataGenerator.password()

        const response = await userClient.createUser(username, password);

        expect(response.status).toBe(201);
        expect(response.body.username).toBe(username);
    });

    test('Create User with Empty Username - Error validation', async ({userClient, dataGenerator}) => {
        const response = await userClient.createUser('', dataGenerator.password());

        expect(response.status).toBe(400);
        expect(response.body.userID).toBeUndefined();
        expect(response.body.code).toBeDefined();
        expect(response.body.message).toContain('required');
    });

    test('Create User with Empty Password - Error validation', async ({userClient, dataGenerator}) => {
        const response = await userClient.createUser(dataGenerator.userName(), '');

        expect(response.status).toBe(400);
        expect(response.body.userID).toBeUndefined();
        expect(response.body.code).toBeDefined();
        expect(response.body.message).toContain('required');
    });

    test('Add Book - Valid data', async ({userClient, dataGenerator, bookClient}) => {
        // 1. Create user
        const username = dataGenerator.userName()
        const password = dataGenerator.password()
        const userResponse = await userClient.createUser(username, password);
        expect(userResponse.status).toBe(201);
        const userId = userResponse.body.userID;

        // 2. Generate token
        const tokenResponse = await userClient.generateToken(username, password);
        const token = tokenResponse.body.token;

        // 3. Add book to user
        const isbn = await bookClient.getValidIsbn()

        const addBookResponse = await bookClient.addBook(userId, token, isbn)
        expect(addBookResponse.body.books).toEqual(
            expect.arrayContaining([
                expect.objectContaining({isbn})
            ])
        );
    });

    test('Add Book without token - Error validation', async ({userClient, dataGenerator, bookClient}) => {
        const username = dataGenerator.userName();
        const password = dataGenerator.password();

        // create user
        const userResponse = await userClient.createUser(username, password);
        const userId = await userResponse.body.userID;

        const isbn = await bookClient.getValidIsbn();

        const response = await bookClient.addBook(userId, '', isbn)

        expect(response.status).toBe(401);
    });

    test('Delete Book Happy Path', async ({userClient, dataGenerator, bookClient}) => {
        // 1. Create user
        const username = dataGenerator.userName();
        const password = dataGenerator.password();
        const userResponse = await userClient.createUser(username, password);
        expect(userResponse.status).toBe(201);
        const userId = userResponse.body.userID;

        // 2. Generate token
        const tokenResponse = await userClient.generateToken(username, password);
        const token = tokenResponse.body.token;

        // 3. Add book to user
        const isbn = await bookClient.getValidIsbn();

        const addBookResponse = await bookClient.addBook(userId, token, isbn)
        expect(addBookResponse.body.books).toEqual(
            expect.arrayContaining([
                expect.objectContaining({isbn})
            ])
        );
        // 4. Delete book from user
        const deleteBookResponse = await bookClient.deleteBook(userId, token, isbn);
        expect(deleteBookResponse.status).toBe(204);
    });

    test('Delete Book sad Path', async ({userClient, dataGenerator, bookClient}) => {
        // 1. Create user
        const username = dataGenerator.userName();
        const password = dataGenerator.password();
        const userResponse = await userClient.createUser(username, password);
        expect(userResponse.status).toBe(201);
        const userId = userResponse.body.userID;

        // 2. Generate token
        const tokenResponse = await userClient.generateToken(username, password);
        const token = tokenResponse.body.token;

        // 3. Add book to user
        const isbn = await bookClient.getValidIsbn();

        const addBookResponse = await bookClient.addBook(userId, token, isbn)
        expect(addBookResponse.body.books).toEqual(
            expect.arrayContaining([
                expect.objectContaining({isbn})
            ])
        );
        // 4. Delete book from user
        const deleteBookResponse = await bookClient.deleteBook(userId, '', isbn);
        expect(deleteBookResponse.status).toBe(401);

    });
});
