export const base_url = 'https://demoqa.com/'

export const endpoints = {
    createUser: `${base_url}swagger#/Account/AccountV1User `,
    addBook: `${base_url}swagger#/BookStore/BookStoreV1Books`,
    deleteBook: `${base_url}swagger#/BookStore/BookStoreV1Books`,
    generateToken: `${base_url}swagger#/BookStore/GenerateToken`
}

export const userInfo = {
    firstName: 'Alden',
    lastName: 'Cantrell',
    age: '30',
    email: 'test@test.com',
    salary: '12345',
    department: 'QA'
}
