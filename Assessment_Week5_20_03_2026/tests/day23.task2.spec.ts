import{expect, test} from "@playwright/test";
import HomePage from "../PageObjectModel/home.page";
import FlightsPage from "../PageObjectModel/flights.page";
import PurchasePage from "../PageObjectModel/purchase.page";
import data from "../utility/flights.json";

test("BlazeDemo Full E2E", async ({ page }) => {
    const homepage = new HomePage(page);
    const flightsPage = new FlightsPage(page);
    const purchasePage = new PurchasePage(page); 

    await homepage.goToUrl(data.url)
    await homepage.searchFlights(data.homePage.from, data.homePage.to)

    await flightsPage.chooseCheapestFlight()

    await purchasePage.fillDetails(data.passenger)
    await purchasePage.purchaseFlight()
    const confirm = await purchasePage.getConfirmationText()
    await expect(confirm).toContain(data.expected)
    await purchasePage.takeScreenshotForE2E2()
})