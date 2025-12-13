import { test, expect } from "@playwright/test"
import requestBody from "../../test-data/dynamic-post-req.json"
import { manipulateJson } from "../../utils/api-helper";
import tokenRequestBody from "../../test-data/token-put.json"
import putRequestBody from "../../test-data/put-payload-req.json"
import patchRequestBody from "../../test-data/patch-req.json"



let bookingId: any;
let tokenValue: string;


test.only('Make a post call using dynamic json file and validate the response ', async ({ request }) => {

    const dynamicJson = manipulateJson(JSON.stringify(requestBody), "Avdhesh", "Kumar", "false")
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: JSON.parse(dynamicJson),


    })
    console.log(dynamicJson);

    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody.booking).toHaveProperty("firstname", "Avdhesh");
    expect(responseBody.booking).toHaveProperty("lastname", "Kumar");
    bookingId = responseBody.bookingid;

    //VALIDATE NESTED JSON OBJECT

    expect(responseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01");
    expect(responseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");


})

test.only('Get the token and make a put/update call', async ({ request }) => {


    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: tokenRequestBody
    });
    const responseBody = await response.json();
    console.log(responseBody)
    tokenValue = responseBody.token;
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

test.only('Delete booking id', async ({ request }) => {

  const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${tokenValue}`
            }
          


        }
    )

 
    console.log(response);
  expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    expect(response.statusText()).toBe('Created')


})

