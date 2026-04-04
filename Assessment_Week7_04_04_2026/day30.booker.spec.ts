import { test, expect } from "@playwright/test";
import bookingData from "../testdata/auth.json";

let apiURL = bookingData.api_base;
let authToken: string;
let createdBookingId: number;

test.describe.serial("Booking API Flow", () => {

  test("Generate Auth Token", async ({ request }) => {
    const response = await request.post(`${apiURL}/auth`, {
      data: {
        username: bookingData.userId,
        password: bookingData.userPass
      }
    });

    const body = await response.json();
    authToken = body.token;

    console.log("Token:", authToken);
    expect(authToken).toBeTruthy();
  });

  test("Fetch All Bookings", async ({ request }) => {
    const response = await request.get(`${apiURL}/booking`);
    const body = await response.json();

    console.log("All bookings:", body);
    expect(response.status()).toBe(200);
  });

  test("Fetch Booking By ID", async ({ request }) => {
    const response = await request.get(`${apiURL}/booking/${bookingData.bookingRef}`);
    const body = await response.json();

    console.log("Booking Details:", body);
    expect(response.status()).toBe(200);
  });

  test("Create New Booking", async ({ request }) => {
    const response = await request.post(`${apiURL}/booking`, {
      data: {
        firstname: bookingData.guestInfo.first,
        lastname: bookingData.guestInfo.last,
        totalprice: bookingData.payment.amount,
        depositpaid: bookingData.payment.paid,
        bookingdates: {
          checkin: bookingData.stay.startDate,
          checkout: bookingData.stay.endDate
        },
        additionalneeds: bookingData.extras
      }
    });

    const body = await response.json();
    createdBookingId = body.bookingid;

    console.log("Created ID:", createdBookingId);
    expect(createdBookingId).toBeTruthy();
  });

  test("Update Entire Booking", async ({ request }) => {
    const response = await request.put(`${apiURL}/booking/${createdBookingId}`, {
      data: {
        firstname: bookingData.fullUpdate.first,
        lastname: bookingData.fullUpdate.last,
        totalprice: bookingData.fullUpdate.amount,
        depositpaid: bookingData.fullUpdate.paid,
        bookingdates: {
          checkin: bookingData.fullUpdate.stay.startDate,
          checkout: bookingData.fullUpdate.stay.endDate
        },
        additionalneeds: bookingData.fullUpdate.extras
      },
      headers: {
        cookie: `token=${authToken}`
      }
    });

    const body = await response.json();
    console.log("Updated Booking:", body);

    expect(response.status()).toBe(200);
  });

  test("Partial Update Booking", async ({ request }) => {
    const response = await request.patch(`${apiURL}/booking/${createdBookingId}`, {
      data: {
        firstname: bookingData.partialUpdate.first,
        lastname: bookingData.partialUpdate.last
      },
      headers: {
        cookie: `token=${authToken}`
      }
    });

    const body = await response.json();
    console.log("Partially Updated:", body);

    expect(response.status()).toBe(200);
  });

  test("Delete Booking", async ({ request }) => {
    const response = await request.delete(`${apiURL}/booking/${createdBookingId}`, {
      headers: {
        cookie: `token=${authToken}`
      }
    });

    console.log("Delete Status:", response.status());
    expect(response.status()).toBe(201);
  });

});
