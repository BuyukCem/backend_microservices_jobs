const JobOfferValidator = require("../../validator/job-offer-validator");

describe("Check street_number", () => {

    test("should return true", async ()=>{
        expect(JobOfferValidator.check_street_number("1")).toBeTruthy()
    })

    test("should return true", async ()=>{
        expect(JobOfferValidator.check_street_number("1")).toBeTruthy()
    })

    test("should return true", async ()=>{
        expect(JobOfferValidator.check_street_number("28")).toBeTruthy()
    })

    test("should return true", async ()=>{
        expect(JobOfferValidator.check_street_number("242")).toBeTruthy()
    })

    test("should return false", async ()=>{
        expect(JobOfferValidator.check_street_number("2f")).toBeFalsy();
    })

    test("should return false", async ()=>{
        expect(JobOfferValidator.check_street_number("France")).toBeFalsy();
    })
});
