import { test, expect } from "@playwright/test";
import requestBody from "../../test-data/dynamic-post-req.json";
import { manipulateJson } from "../../utils/api-helper";
import tokenRequestBody from "../../test-data/token-put.json";
import patchRequestBody from "../../test-data/patch-req.json";

let bookingId: number;
let tokenValue: string;

test.describe.serial('Restful Booker PATCH flow', () => {

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
    expect(responseBody.booking.firstname).toBe("Avdhesh");
    expect(responseBody.booking.lastname).toBe("Kumar");

    bookingId = responseBody.bookingid;
    expect(bookingId).toBeTruthy();

    expect(responseBody.booking.bookingdates.checkin).toBe("2018-01-01");
    expect(responseBody.booking.bookingdates.checkout).toBe("2019-01-01");
  });

  test('Get the token', async ({ request }) => {

    const response = await request.post(
      'https://restful-booker.herokuapp.com/auth',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        data: tokenRequestBody,
      }
    );

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(200);
    tokenValue = responseBody.token;
    expect(tokenValue).toBeTruthy();
  });

  test('Make a PATCH call with the token', async ({ request }) => {

    expect(bookingId).toBeTruthy();
    expect(tokenValue).toBeTruthy();

    const response = await request.patch(
      `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': `token=${tokenValue}`,
        },
        data: patchRequestBody,
      }
    );

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(200);
  });

});
