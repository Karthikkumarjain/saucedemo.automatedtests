import { test, expect } from "@playwright/test"
import requestBody from "../../test-data/dynamic-post-req.json"
import { manipulateJson } from "../../utils/api-helper";



let bookingId: any;

test('Make a post call using dynamic json file and validate the response ', async ({ request }) => {

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

test('Get the booking details', async ({ request }) => {
    //https://restful-booker.herokuapp.com/booking?firstname=Avdhesh,lastname=Kumar
    const response = await request.get(`https://restful-booker.herokuapp.com/booking/`, {
        params: {
            "firstname": "Avdhesh",
            "lastname": "Kumar"
        }
    });

    console.log('Final URL:', response.url());
    console.log(await response.json())
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
})

