import { test, expect } from "@playwright/test"
import requestBody from "../../test-data/dynamic-post-req.json"
import { manipulateJson } from "../../utils/api-helper";




test('Make a post call using dynamic json file and validate the response', async ({ request }) => {

    const dynamicJson = manipulateJson(JSON.stringify(requestBody),"Avdhesh","Kumar","false")
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

    //VALIDATE NESTED JSON OBJECT

    expect(responseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
    expect(responseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");


})

