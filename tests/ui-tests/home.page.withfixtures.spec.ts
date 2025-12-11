import { test ,expect} from "../fixtures/basefixtures"
import { HomePage } from "../../pages/home.page"


test('Verify app logo text @UI', async ({ homePage ,loginPage}) => {

    await loginPage.navigateToApplicationUrl();
    const logoText = await homePage.getAppLogoText();
    console.log(logoText);  // "Swag Labs"
    expect(logoText).toBe('Swag Labs');
});

test('Verify backPack is added to the cart successfully @UI', async ({ homePage ,addtoCartPage,loginPage}) => {
   

    await loginPage.navigateToApplicationUrl();
    const logoText = await homePage.getAppLogoText();
    console.log(logoText);  // "Swag Labs"
    expect(logoText).toBe('Swag Labs');
    await homePage.addBackPackItemToCart();
    await addtoCartPage.clickOnAddToCart();

});