import { test, expect } from "@playwright/test";
import requestBody from "../../test-data/dynamic-post-req.json";
import { manipulateJson } from "../../utils/api-helper";
import tokenRequestBody from "../../test-data/token-put.json";

let bookingId: number;
let tokenValue: string;

test.describe.serial('Restful Booker DELETE flow', () => {

  test('Create booking', async ({ request }) => {

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
  });

  test('Get auth token', async ({ request }) => {

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

  test('Delete booking by id', async ({ request }) => {

    expect(bookingId).toBeTruthy();
    expect(tokenValue).toBeTruthy();

    const response = await request.delete(
      `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': `token=${tokenValue}`,
        },
      }
    );

    expect(response.status()).toBe(201);
    expect(response.statusText()).toBe('Created');
  });

});