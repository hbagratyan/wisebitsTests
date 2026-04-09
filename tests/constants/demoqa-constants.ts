export const base_url = 'https://demoqa.com/'

export const endpoints = {
    createUser: `${base_url}Account/v1/User`,
    bookActions: `${base_url}BookStore/BookStoreV1Books`,
    generateToken: `${base_url}BookStore/GenerateToken`
}

export const userInfo = {
    firstName: 'Alden',
    lastName: 'Cantrell',
    age: '30',
    email: 'test@test.com',
    salary: '12345',
    department: 'QA'
}
