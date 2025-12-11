import { Page, Locator } from "@playwright/test"

export class AddtoCart {

    private readonly shoppingCart: Locator;

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCart = page.locator('.shopping_cart_link')

    }

    async clickOnAddToCart() {

        await this.shoppingCart.click();
    }

}