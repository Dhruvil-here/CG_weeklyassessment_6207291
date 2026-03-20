import { test, expect } from "@playwright/test";
import HomePage from "../PageObjectModel/home.page";
import FlightsPage from "../PageObjectModel/flights.page";
import PurchasePage from "../PageObjectModel/purchase.page";
import data from "../utility/flights.json";

test("Integration - Multiple Booking Flows", async ({ page }) => {

    const home = new HomePage(page);
    const flights = new FlightsPage(page);
    const purchase = new PurchasePage(page);

    //FLOW 1 → First Flight
    await home.goToUrl(data.url);
    await home.searchFlights(data.homePage.from,data.homePage.to);

    await flights.chooseFirstFlight();

    await purchase.fillDetails(data.passenger);
    await purchase.purchaseFlight();
    let confirmation = await purchase.getConfirmationText();
    expect(confirmation).toContain(data.expected);

    console.log("Flow 1 completed");

    //FLOW 2 → Cheapest Flight
    await home.goToUrl(data.url); // restart flow
    await home.searchFlights("Boston", "London");

    await flights.chooseCheapestFlight();

    await purchase.fillDetails(data.passenger);
    await purchase.purchaseFlight();
    confirmation = await purchase.getConfirmationText();
    expect(confirmation).toContain(data.expected);

    console.log("Flow 2 completed");
});