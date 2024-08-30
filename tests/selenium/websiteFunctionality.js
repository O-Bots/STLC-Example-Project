const { Builder, Browser, By } = require("selenium-webdriver");
const {expect} = require('chai');
const {faker} = require('@faker-js/faker');
const addContext = require('mochawesome/addContext.js');

const person = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({pattern: /[a-zA-Z0-9]/}),
};