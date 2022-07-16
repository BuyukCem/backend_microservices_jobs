const JobOfferValidator = require("../../validator/job-offer-validator");

describe("Check zip code", () => {

    test("should return false", async () => {
        expect(JobOfferValidator.check_zip_code("00000")).toBeFalsy()
    })

    test("should return false", async () => {
        expect(JobOfferValidator.check_zip_code("0999")).toBeFalsy()
    })

    test("should return false", async () => {
        expect(JobOfferValidator.check_zip_code("110")).toBeFalsy()
    })

    test("should return false", async () => {
        expect(JobOfferValidator.check_zip_code("12f54")).toBeFalsy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_zip_code("1000")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_zip_code("75004")).toBeTruthy()
    })

    test("should return false", async () => {
        expect(JobOfferValidator.check_zip_code("750047")).toBeFalsy()
    })
});

describe("Check salary", () => {

    test("should return true", async () => {
        expect(JobOfferValidator.check_salary("20000")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_salary("2140.00")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_salary("41200.00")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_salary("6000f")).toBeFalsy()
    })

    test("should return false", async () => {
        expect(JobOfferValidator.check_salary("2659.430")).toBeFalsy()
    })
});
