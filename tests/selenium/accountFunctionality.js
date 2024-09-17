const { Builder, Browser, By } = require("selenium-webdriver");
const {expect} = require('chai');
const {faker} = require('@faker-js/faker');
const addContext = require('mochawesome/addContext.js');

const person = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({length: 20, pattern: /\w/}),
};
const person2 = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({length: 20, pattern: /[a-zA-Z0-9]/}),
};

describe('Tests_for_account_functionality', function () {
    let driver;
    
    //Steps before each test
    beforeEach(async () => {
        //Launch a blank Chrome browser
        driver = await new Builder().forBrowser(Browser.CHROME).build();

        //Moves browser window 
        await driver.manage().window().setRect({x: 10, y: -1440 });
        
        //Navigate to website
        await driver.get('https://magento.softwaretestingboard.com/');
    });

    //Steps after each test
    // afterEach(async () => {await driver.quit()});

    it('Successfully creates an account', async function () {
        await driver.findElement(By.xpath('//div[@class="panel header"]/ul/li[3]')).click();

        let currentUrl = await driver.getCurrentUrl();

        //Chai assert to verify the page is correct
        expect(currentUrl).to.contain("account/create/");

        //Enter account information
        await driver.findElement(By.id('firstname')).sendKeys(person.firstName);
        await driver.findElement(By.id('lastname')).sendKeys(person.lastName);
        await driver.findElement(By.id('email_address')).sendKeys(person.email);
        await driver.findElement(By.id('password')).sendKeys(person.password);
        console.log(person.password);
        
        await driver.findElement(By.id('password-confirmation')).sendKeys(person.password);

        //Add the account details to the report
        addContext(this, {
            title: "Account information used",
            value: {
                firstName: person.firstName,
                lastName: person.lastName,
                email: person.email,
                password: person.password
            }
        });
        
        //Submit new account information
        await driver.findElement(By.xpath("//button[@class='action submit primary']")).click();

        //Verify account has been created
        let accountName = await driver.findElement(By.xpath("//div[@class='box-content']/p")).getText();
        expect(accountName).to.contain(person.firstName);
        expect(accountName).to.contain(person.lastName);
        expect(accountName).to.contain(person.email);
    });

    it('Unable to create an account with missing information', async () => {
        await driver.findElement(By.xpath('//div[@class="panel header"]/ul/li[3]')).click();

        let currentUrl = await driver.getCurrentUrl();

        //Chai assert to verify the page is correct
        expect(currentUrl).to.contain("account/create/");

        //Enter account information
        await driver.findElement(By.id('firstname')).sendKeys(person2.firstName);
        // await driver.findElement(By.id('lastname')).sendKeys(person2.lastName);
        await driver.findElement(By.id('email_address')).sendKeys(person2.email);
        await driver.findElement(By.id('password')).sendKeys(person2.password);
        await driver.findElement(By.id('password-confirmation')).sendKeys(person2.password);

        //Submit new account information
        await driver.findElement(By.xpath("//button[@class='action submit primary']")).click();

        //Chai assert for required info error
        const requiredErr = await driver.findElement(By.xpath("//div[@class='mage-error']")).isDisplayed();
        expect(requiredErr).to.equal(true);
    });

    it('Unable to create an account with passwords that dont match', async () => {
        await driver.findElement(By.xpath('//div[@class="panel header"]/ul/li[3]')).click();

        let currentUrl = await driver.getCurrentUrl();

        //Chai assert to verify the page is correct
        expect(currentUrl).to.contain("account/create/");

        //Enter account information
        await driver.findElement(By.id('firstname')).sendKeys(person2.firstName);
        await driver.findElement(By.id('lastname')).sendKeys(person2.lastName);
        await driver.findElement(By.id('email_address')).sendKeys(person2.email);
        await driver.findElement(By.id('password')).sendKeys(person2.password);
        await driver.findElement(By.id('password-confirmation')).sendKeys(person2.password+1);

        //Submit new account information
        await driver.findElement(By.xpath("//button[@class='action submit primary']")).click();

        //Chai assert for password error
        const passwordErr = await driver.findElement(By.xpath("//div[@id='password-confirmation-error']")).isDisplayed();
        expect(passwordErr).to.equal(true);
    });

    it('Unable to create an account with an already registered email', async () => {
        await driver.findElement(By.xpath('//div[@class="panel header"]/ul/li[3]')).click();

        let currentUrl = await driver.getCurrentUrl();

        //Chai assert to verify the page is correct
        expect(currentUrl).to.contain("account/create/");

        //Enter account information
        await driver.findElement(By.id('firstname')).sendKeys(person.firstName);
        await driver.findElement(By.id('lastname')).sendKeys(person.lastName);
        await driver.findElement(By.id('email_address')).sendKeys(person.email);
        await driver.findElement(By.id('password')).sendKeys(person.password);
        await driver.findElement(By.id('password-confirmation')).sendKeys(person.password);

        //Submit new account information
        await driver.findElement(By.xpath("//button[@class='action submit primary']")).click();

        //Chai assert for email error
        const emailErr = await driver.findElement(By.xpath("//div[@class='page messages']")).isDisplayed();
        expect(emailErr).to.equal(true);
    });
    
    it('Successfully login with the correct email/password to a previously created account', async() => {
        
        await driver.findElement(By.xpath('//div[@class="panel header"]/ul/li[2]')).click();

        //Chai assert to verify the page is correct
        const loginPageCheck = await driver.findElement(By.xpath('//h1[@class="page-title"]/span[@class="base"]')).getText();
        expect(loginPageCheck).to.contain("Customer Login");

        //Enter login information
        await driver.findElement(By.id('email')).sendKeys(person.email);
        await driver.findElement(By.id('pass')).sendKeys(person.password);

        
        //Submit login information
        await driver.findElement(By.xpath("//button[@class='action login primary']")).click();
        
        //Navigate to account information
        await driver.findElement(By.xpath("//button[@class='action switch']")).click();
        await driver.findElement(By.xpath("//div[@class='customer-menu']/ul/li[1]")).click();
        
        let currentUrl = await driver.getCurrentUrl();
        
        //Chai assert to verify the page is correct
        expect(currentUrl).to.contain("customer/account/");
        
        let accountInformation = await driver.findElement(By.xpath("//div[@class='box-content']/p")).getText();
        expect(accountInformation).to.contain(person.email);
        expect(accountInformation).to.contain(person.firstName);
        expect(accountInformation).to.contain(person.lastName);
    });

    it('Unable to login with the incorrect email and correct password to a previously created account', async() => {
        
        await driver.findElement(By.xpath('//div[@class="panel header"]/ul/li[2]')).click();

        //Chai assert to verify the page is correct
        const loginPageCheck = await driver.findElement(By.xpath('//h1[@class="page-title"]/span[@class="base"]')).getText();
        expect(loginPageCheck).to.contain("Customer Login");

        //Enter login information
        await driver.findElement(By.id('email')).sendKeys(person2.email);
        await driver.findElement(By.id('pass')).sendKeys(person.password);

        //Submit login information
        await driver.findElement(By.xpath("//button[@class='action login primary']")).click();

        //Verify sign-in error
        const logingErr = await driver.findElement(By.xpath("//div[@class='page messages']")).isDisplayed();
        expect(logingErr).to.equal(true);
    });

    it('Unable to login with the correct email and incorrect password to a previously created account', async() => {
        
        await driver.findElement(By.xpath('//div[@class="panel header"]/ul/li[2]')).click();

        //Chai assert to verify the page is correct
        const loginPageCheck = await driver.findElement(By.xpath('//h1[@class="page-title"]/span[@class="base"]')).getText();
        expect(loginPageCheck).to.contain("Customer Login");

        //Enter login information
        await driver.findElement(By.id('email')).sendKeys(person.email);
        await driver.findElement(By.id('pass')).sendKeys(person2.password);

        //Submit login information
        await driver.findElement(By.xpath("//button[@class='action login primary']")).click();

        //Verify sign-in error
        const logingErr = await driver.findElement(By.xpath("//div[@class='page messages']")).isDisplayed();
        expect(logingErr).to.equal(true);
        
    });

    it('Unable to login with the incorrect email/password to a previously created account', async() => {
        
        await driver.findElement(By.xpath('//div[@class="panel header"]/ul/li[2]')).click();

        //Chai assert to verify the page is correct
        const loginPageCheck = await driver.findElement(By.xpath('//h1[@class="page-title"]/span[@class="base"]')).getText();
        expect(loginPageCheck).to.contain("Customer Login");

        //Enter login information
        await driver.findElement(By.id('email')).sendKeys(person2.email);
        await driver.findElement(By.id('pass')).sendKeys(person2.password);

        //Submit login information
        await driver.findElement(By.xpath("//button[@class='action login primary']")).click();

        //Verify sign-in error
        const logingErr = await driver.findElement(By.xpath("//div[@class='page messages']")).isDisplayed();
        expect(logingErr).to.equal(true);
        
    });

});