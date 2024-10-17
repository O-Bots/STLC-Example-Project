const { Builder, Browser, By, until} = require("selenium-webdriver");
const {expect} = require('chai');
const {faker} = require('@faker-js/faker');
const addContext = require('mochawesome/addContext.js');

const person = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({pattern: /[a-zA-Z0-9]/}),
};

describe('Tests_for_website_functionality' , function () {
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

    // it('Successfully navigates to the correct product page', async () => {
    //     //Navigate to a product catagory
    //     //Store category name
    //     const categoryName = await driver.findElement(By.xpath("//nav[@class='navigation']//li[2]/a")).getText();
        
    //     //Click category
    //     await driver.findElement(By.xpath(`//nav[@class='navigation']//li[2]`)).click();

    //     //Store category name
    //     const subCategoryName = await driver.findElement(By.xpath("//ol[@class='items']/li[1]/a")).getText();
        
    //     //Click sub category
    //     await driver.findElement(By.xpath(`//ol[@class='items']/li[1]/a`)).click();

    //     //Verify the page is correct
    //     const previousBreadcrumb = await driver.findElement(By.xpath('//div[@class="breadcrumbs"]/ul/li[2]')).getText();
    //     const currentBreadcrumb = await driver.findElement(By.xpath('//div[@class="breadcrumbs"]/ul/li[3]')).getText();
    //     expect(previousBreadcrumb).to.equal(categoryName);
    //     expect(currentBreadcrumb).to.equal(subCategoryName);

    //     //Set up rng to choose product
    //     const products = await driver.findElements(By.xpath("//ol[@class='products list items product-items']/li"));
    //     let rngProduct = Math.floor(Math.random() * products.length + 1);

    //     //Store product name and price
    //     const productName = await driver.findElement(By.xpath(`//ol[@class='products list items product-items']/li[${rngProduct}]//strong/a`)).getText();
    //     const productPrice = await driver.findElement(By.xpath(`//ol[@class='products list items product-items']/li[${rngProduct}]//span[@class="normal-price"]/span/span[2]/span`)).getText();

    //     //Click chosen product
    //     await driver.findElement(By.xpath(`//ol[@class='products list items product-items']/li[${rngProduct}]//strong/a`)).click();

    //     //Verify page is correct
    //     let currentUrl = await driver.getCurrentUrl()
    //     expect(currentUrl.toLocaleLowerCase()).to.contain(productName.replace(/\s/g, "-").toLocaleLowerCase());

    //     //Verify product information
    //     const productPageName = await driver.findElement(By.xpath("//div[@class='product-info-main']/div[1]/h1/span")).getText();
    //     const productPagePrice = await driver.findElement(By.xpath("//div[@class='product-info-main']/div[3]//span[@class='normal-price']/span/span[2]/span")).getText();
    //     expect(productPageName).to.equal(productName);
    //     expect(productPagePrice).to.equal(productPrice);
    // });
    
    // it('Navigates to the product page using the breadcrumbs', async () => {
    //     //Navigate to a product catagory
    //     //Store category name
    //     const categoryName = await driver.findElement(By.xpath("//nav[@class='navigation']//li[2]/a")).getText();
        
    //     //Click category
    //     await driver.findElement(By.xpath(`//nav[@class='navigation']//li[2]`)).click();

    //     //Store category name
    //     const subCategoryName = await driver.findElement(By.xpath("//ol[@class='items']/li[1]/a")).getText();
        
    //     //Click sub category
    //     await driver.findElement(By.xpath(`//ol[@class='items']/li[1]/a`)).click();

    //     //Verify the page is correct
    //     const previousBreadcrumb = await driver.findElement(By.xpath('//div[@class="breadcrumbs"]/ul/li[2]')).getText();
    //     const currentBreadcrumb = await driver.findElement(By.xpath('//div[@class="breadcrumbs"]/ul/li[3]')).getText();
    //     expect(previousBreadcrumb).to.equal(categoryName);
    //     expect(currentBreadcrumb).to.equal(subCategoryName);

    //     //Set up rng to choose product
    //     const products = await driver.findElements(By.xpath("//ol[@class='products list items product-items']/li"));
    //     let rngProduct = Math.floor(Math.random() * products.length + 1);

    //     //Store product name and price
    //     const productName = await driver.findElement(By.xpath(`//ol[@class='products list items product-items']/li[${rngProduct}]//strong/a`)).getText();
    //     const productPrice = await driver.findElement(By.xpath(`//ol[@class='products list items product-items']/li[${rngProduct}]//span[@class="normal-price"]/span/span[2]/span`)).getText();

    //     //Click chosen product
    //     await driver.findElement(By.xpath(`//ol[@class='products list items product-items']/li[${rngProduct}]//strong/a`)).click();

    //     //Verify page is correct
    //     let currentUrl = await driver.getCurrentUrl()
    //     expect(currentUrl.toLocaleLowerCase()).to.contain(productName.replace(/\s/g, "-").toLocaleLowerCase());

    //     //Verify product information
    //     const productPageName = await driver.findElement(By.xpath("//div[@class='product-info-main']/div[1]/h1/span")).getText();
    //     const productPagePrice = await driver.findElement(By.xpath("//div[@class='product-info-main']/div[3]//span[@class='normal-price']/span/span[2]/span")).getText();
    //     expect(productPageName).to.equal(productName);
    //     expect(productPagePrice).to.equal(productPrice);
        
    //     //Navigate to the category page via breadcrumb
    //     await driver.findElement(By.xpath('//div[@class="breadcrumbs"]/ul/li[2]')).click();

    //     //Store page info
    //     const categoryPageTitle = await driver.findElement(By.xpath('//h1[@id="page-title-heading"]/span')).getText();
    //     expect(categoryName).to.equal(categoryPageTitle);
    // });

    it('Navigates to the category page correctly', async () => {
        //Navigate to a product catagory
        const hover = driver.findElement(By.xpath("//span[.='Women']"));
        const actions = driver.actions({async: true})
        //Click subcategory
        await actions.move({origin: hover}).press().perform();

    });
});