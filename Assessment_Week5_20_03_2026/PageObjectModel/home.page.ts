import { Page, Locator } from "@playwright/test";

class HomePage {

    page: Page
    fromCity: Locator
    toCity: Locator
    findFlightsBtn: Locator

    constructor(page: Page) {   
        this.page = page
        this.fromCity = page.locator('select[name="fromPort"]')
        this.toCity = page.locator('select[name="toPort"]')
        this.findFlightsBtn = page.locator('input[value="Find Flights"]')
    }

    async goToUrl(url: string) {
        await this.page.goto(url)
    }

    async searchFlights(from: string, to: string) {
        await this.fromCity.selectOption(from)
        await this.toCity.selectOption(to)
        await this.findFlightsBtn.click()
    }
}

export default HomePage;