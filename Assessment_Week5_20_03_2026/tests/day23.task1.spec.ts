import { test, expect } from "@playwright/test";
import HomePage from "../PageObjectModel/home.page";
import FlightsPage from "../PageObjectModel/flights.page";
import PurchasePage from "../PageObjectModel/purchase.page";
import data from "../utility/flights.json";

test("BlazeDemo Full E2E (Multi POM)", async ({ page }) => {

    const home = new HomePage(page);
    const flights = new FlightsPage(page);
    const purchase = new PurchasePage(page);

    await home.goToUrl(data.url);
    await home.searchFlights(data.homePage.from, data.homePage.to);

    await flights.chooseFirstFlight();

    await purchase.fillDetails(data.passenger);
    await purchase.purchaseFlight();
    const confirmation = await purchase.getConfirmationText();
    expect(confirmation).toContain(data.expected);
    await purchase.takeScreenshotForE2E1();
});