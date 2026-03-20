import { Page, Locator } from "@playwright/test";

class FlightsPage {

    page: Page
    prices: Locator
    buttons: Locator

    constructor(page: Page) {
        this.page = page
        this.prices = page.locator('table tbody tr td:nth-child(7)')
        this.buttons = page.locator('table tbody tr input[type="submit"]')
    }

    async chooseFirstFlight() {

        await this.page.waitForSelector('table')
        await this.buttons.first().click()
    }

    async chooseCheapestFlight() {
        await this.page.waitForSelector('table')

        const count = await this.prices.count()
        let minPrice = Number.MAX_VALUE
        let minIndex = 0    

        for(let i = 0; i < count; i++){
            const priceText = await this.prices.nth(i).textContent()
            const priceWithoutSymbol = parseFloat(priceText!.replace('$', ' '))
            if(priceWithoutSymbol < minPrice){
                minPrice = priceWithoutSymbol
                minIndex = i
            }
        }
        console.log('cheapest price = ', minPrice);
        await this.buttons.nth(minIndex).click()
        
    }

    
}

export default FlightsPage;