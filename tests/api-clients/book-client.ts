import {APIRequestContext} from "@playwright/test";
import {endpoints} from "../constants/demoqa-constants";

export class BookClient {
    constructor(private request: APIRequestContext) {
    }

    async addBook(userId: string, token: string, isbn: string) {
        const response = await this.request.post(endpoints.bookActions, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                userId,
                collectionOfIsbns: [{isbn}]
            }
        });

        return {
            status: response.status(),
            body: await response.json()
        };
    }

    async getValidIsbn(nthIsbn: number = 0): Promise<string> {
        const response = await this.request.get(endpoints.bookActions);
        const body = await response.json();

        const books = body?.books;

        if (!response.ok() || !Array.isArray(books) || books.length === 0) {
            throw new Error('No books available to extract ISBN');
        }

        return books[nthIsbn].isbn;
    }

    async deleteBook(userId: string, token: string, isbn: string) {
        const response = await this.request.delete(
            `${endpoints.bookActions}?UserId=${userId}&ISBN=${isbn}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // ⚠️ у DELETE иногда нет body
        let body = null;
        try {
            body = await response.json();
        } catch {
            body = null;
        }

        return {
            status: response.status(),
            body
        };
    }
}

