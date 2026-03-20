import { Page, Locator } from "@playwright/test";

class PurchasePage {

    page: Page
    purchaseBtn: Locator
    confirmationText: Locator

    constructor(page: Page) {
        this.page = page
        this.purchaseBtn = page.locator('input[value="Purchase Flight"]')
        this.confirmationText = page.locator('h1')
    }

    async fillDetails(passenger: any) {

        await this.page.locator('#inputName').fill(passenger.name)
        await this.page.locator('#address').fill(passenger.address)
        await this.page.locator('#city').fill(passenger.city)
        await this.page.locator('#state').fill(passenger.state)
        await this.page.locator('#zipCode').fill(passenger.zipCode)

        await this.page.locator('#cardType').selectOption(passenger.cardType)

        await this.page.locator('#creditCardNumber').fill(passenger.cardNumber)
        await this.page.locator('input[name="creditCardMonth"]').fill(passenger.cardMonth)
        await this.page.locator('input[name="creditCardYear"]').fill(passenger.cardYear)

        await this.page.locator('#nameOnCard').fill(passenger.nameOnCard)
    }

    async purchaseFlight() {
        await this.purchaseBtn.click()
    }

    async getConfirmationText() {
        await this.confirmationText.waitFor()
        return await this.confirmationText.textContent()
    }

    async takeScreenshotForE2E1() {
        await this.page.screenshot({ path: "screenshot/E2E1.png" })
    }
    async takeScreenshotForE2E2() {
        await this.page.screenshot({ path: "screenshot/E2E2.png" })
    }
}

export default PurchasePage;