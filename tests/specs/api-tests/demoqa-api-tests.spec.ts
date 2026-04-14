import {test} from '../../fixtures/demoqa/demoqa.api.fixtures';
import {expect} from "@playwright/test";

test.describe('API проверки создания пользователя, добавления и удаления книг', () => {

    test('Создание пользователя с валидными кредами - должен вернуться 201 статус', async ({userClient, dataGenerator}) => {
        const username = dataGenerator.userName()
        const password = dataGenerator.password()
        const response = await userClient.createUser(username, password);

        expect(response.status).toBe(201);
        expect(response.body.username).toBe(username);
    });

    test('Создание пользователя без username - должен вернуться 400 статус', async ({userClient, dataGenerator}) => {
        const response = await userClient.createUser('', dataGenerator.password());

        expect(response.status).toBe(400);
        expect(response.body.userID).toBeUndefined();
        expect(response.body.code).toBeDefined();
        expect(response.body.message).toContain('required');
    });

    test('Создание пользователя без пароля - должен вернуться 400 статус', async ({userClient, dataGenerator}) => {
        const response = await userClient.createUser(dataGenerator.userName(), '');

        expect(response.status).toBe(400);
        expect(response.body.userID).toBeUndefined();
        expect(response.body.code).toBeDefined();
        expect(response.body.message).toContain('required');
    });

    test('Добавление книги пользователю - должен вернуться 201 статус', async ({authorizedUser, bookClient}) => {
        // 1. Get valid ISBN
        const isbn = await bookClient.getValidIsbn();

        // 2. Add book
        const response = await bookClient.addBook(
            authorizedUser.userId,
            authorizedUser.token,
            isbn
        );

        // 3. Assertions
        expect(response.status).toBe(201);
        expect(response.body.books).toEqual(
            expect.arrayContaining([
                expect.objectContaining({isbn})
            ])
        );
    });

    test('Добавление книги пользователю с невалидным isbn  - должен вернуться 400 статус', async ({authorizedUser, bookClient, dataGenerator}) => {
        // 1. Generate invalid ISBN
        const isbn = dataGenerator.firstName();

        // 2. Add book
        const response = await bookClient.addBook(
            authorizedUser.userId,
            authorizedUser.token,
            isbn
        );

        // 3. Assertions
        expect(response.status).toBe(400);
    });

    test('Добавление книги пользователю без токена - должен вернуться 401 статус', async ({authorizedUser, bookClient}) => {
        const isbn = await bookClient.getValidIsbn();
        const response = await bookClient.addBook(authorizedUser.userId, '', isbn)
        expect(response.status).toBe(401);
    });

    test('Удаление книги у пользователя - должен вернуться 204 статус', async ({authorizedUser, bookClient}) => {

        // 1. Add book to user
        const isbn = await bookClient.getValidIsbn();

        const addBookResponse = await bookClient.addBook(authorizedUser.userId, authorizedUser.token, isbn)
        expect(addBookResponse.body.books).toEqual(
            expect.arrayContaining([
                expect.objectContaining({isbn})
            ])
        );
        // 2. Delete book from user
        const deleteBookResponse = await bookClient.deleteBook(authorizedUser.userId, authorizedUser.token, isbn);
        expect(deleteBookResponse.status).toBe(204);
    });

    test('Удаление книги у пользователя без токена - должен вернуться 401 статус', async ({authorizedUser, bookClient}) => {

        // 1. Add book to user
        const isbn = await bookClient.getValidIsbn();

        const addBookResponse = await bookClient.addBook(authorizedUser.userId, authorizedUser.token, isbn)
        expect(addBookResponse.body.books).toEqual(
            expect.arrayContaining([
                expect.objectContaining({isbn})
            ])
        );
        // 2. Delete book from user
        const deleteBookResponse = await bookClient.deleteBook(authorizedUser.userId, '', isbn);
        expect(deleteBookResponse.status).toBe(401);
    });
});
