import { test, expect } from "@playwright/test"
import requestBody from "../../test-data/post-req.json"


//post-create something--> request build,endpoint-->response

test('Make a post call and validate the response', async ({ request }) => {

    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {

            "firstname": "Karthik",
            "lastname": "Kumar B",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"

        }

    })

    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody.booking).toHaveProperty("firstname", "Karthik");
    expect(responseBody.booking).toHaveProperty("lastname", "Kumar B");

    //VALIDATE NESTED JSON OBJECT

    expect(responseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01");
    expect(responseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");


})


test('Make a post call and verify response', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {
            "firstname": "Karthik",
            "lastname": "Kumar",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        }

    })

    const responseBody = await response.json();
    console.log(response);
    console.log(responseBody);



})

test('Make a post call using static json file and validate the response', async ({ request }) => {


    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: requestBody,


    })

    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody.booking).toHaveProperty("firstname", "Karthik");
    expect(responseBody.booking).toHaveProperty("lastname", "Kumar B");

    //VALIDATE NESTED JSON OBJECT

    expect(responseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01");
    expect(responseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");


})

