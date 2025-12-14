import { test, expect } from "@playwright/test"
import requestBody from "../../test-data/dynamic-post-req.json"
import { manipulateJson } from "../../utils/api-helper";


let bookingId: number;

test.describe.serial('Create and Get booking', () => {

  test('Make a post call using dynamic json file and validate the response', async ({ request }) => {

    const dynamicJson = manipulateJson(
      JSON.stringify(requestBody),
      "Avdhesh",
      "Kumar",
      "false"
    );

    const response = await request.post(
      'https://restful-booker.herokuapp.com/booking',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        data: JSON.parse(dynamicJson),
      }
    );

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(200);
    bookingId = responseBody.bookingid;
    expect(bookingId).toBeTruthy();

    expect(responseBody.booking.firstname).toBe("Avdhesh");
    expect(responseBody.booking.lastname).toBe("Kumar");
    expect(responseBody.booking.bookingdates.checkin).toBe("2018-01-01");
    expect(responseBody.booking.bookingdates.checkout).toBe("2019-01-01");
  });

  test('Get the booking details', async ({ request }) => {

    expect(bookingId).toBeTruthy();

    const response = await request.get(
      `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(200);
  });

});