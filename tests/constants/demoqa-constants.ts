export const base_url = 'https://demoqa.com/'

export const endpoints = {
    createUser: `${base_url}Account/v1/User`,
    bookActions: `${base_url}BookStore/v1/Books`,
    generateToken: `${base_url}Account/v1/GenerateToken`
}

export const userInfo = {
    firstName: 'Alden',
    lastName: 'Cantrell',
    age: '30',
    email: 'test@test.com',
    salary: '12345',
    department: 'QA'
}
