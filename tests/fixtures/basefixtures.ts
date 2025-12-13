import { Page, test as base } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LoginPage } from '../../pages/login.page';
import { AddtoCart } from '../../pages/addtocart.page';


type TestObjects = {
  homePage: HomePage;
  loginPage: LoginPage
  pageWithMonitoring: Page
  timeLogger: void
  addtoCartPage: AddtoCart;

};

export const test = base.extend<TestObjects>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  addtoCartPage: async ({ page }, use) => {
    await use(new AddtoCart(page));
  },


  pageWithMonitoring: [async ({ page }, use) => {
    //setup
    page.on("response", (response) => {
      const url = response.url();
      const status = response.status();
      console.log(`The url is ${url} and status is ${status} `)


    })
    await use(page);
    //tearDown
    console.log("The test execution is now over")
  }, { auto: true }],
  timeLogger: [async ({ }, use) => {
    test.info().annotations.push({

      type: "Start",
      description: new Date().toISOString(),
    })

    await use();
    test.info().annotations.push({

      type: "End",
      description: new Date().toISOString(),
    })


  }, { auto: true }],//to call this fixture when you want it to run everytime and you dont want to call this in you sepec file


});

export const expect = test.expect;