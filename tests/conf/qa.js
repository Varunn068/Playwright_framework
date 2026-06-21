const { faker } = require('@faker-js/faker');

module.exports = {
    user_name: faker.internet.username(),
    pass_word: faker.internet.password({ length: 12, memorable: false }) + 'A1!',
    customer_name: faker.person.fullName(),
    customer_country: faker.location.country(),
    customer_city: faker.location.city(),
    customer_credit_card: faker.finance.creditCardNumber(),
    customer_month: String(faker.date.future().getMonth() + 1).padStart(2, '0'),
    customer_year: faker.date.future().getFullYear().toString()
};