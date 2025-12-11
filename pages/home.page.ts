import { Page, Locator } from "@playwright/test"

export class HomePage {
    private readonly page: Page;
    private readonly appLogo: Locator;
    private readonly backPack: Locator;

    constructor(page: Page) {
        this.page = page;
        this.appLogo = page.locator('.app_logo');
        this.backPack = page.locator('#add-to-cart-sauce-labs-backpack');
    }

    async getAppLogoText() {
        return await this.appLogo.textContent();
    }

    async addBackPackItemToCart() {
        await this.backPack.click();


    }



}