import { Page, Locator } from "@playwright/test"


const base_url = process.env.BASE_URL as string

export class LoginPage {


    private readonly page: Page;

    constructor(page: Page) {

        this.page = page;
    }

    async navigateToApplicationUrl() {

        await this.page.goto(base_url);

    }
}