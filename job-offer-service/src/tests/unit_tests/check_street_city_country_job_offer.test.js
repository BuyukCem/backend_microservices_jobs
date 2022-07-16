const JobOfferValidator = require("../../validator/job-offer-validator");

describe("Check Street name", () => {

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_street("rue albert camus")).toBeTruthy()
    })

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_street("bis, avenue albert camus")).toBeTruthy()
    })

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_street("rue de la nouvelle-zélande")).toBeTruthy()
    })

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_street("rue de l'hiver")).toBeTruthy()
    })

    test("should return false", async ()=> {
        expect(JobOfferValidator.check_street("46 avenue de la montaigne")).toBeFalsy()
    })
})

describe("Check city", () => {

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_city("Évry")).toBeTruthy()
    })

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_city("Villeneuve-Saint-Georges")).toBeTruthy()
    })

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_city("L'HaŸ-Les-Roses")).toBeTruthy()
    })

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_city("Villiers sur marne")).toBeTruthy()
    })

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_city("paris IV")).toBeTruthy()
    })

    test("should return false", async ()=> {
        expect(JobOfferValidator.check_city("3")).toBeFalsy()
    })

    test("should return false", async ()=> {
        expect(JobOfferValidator.check_city("St maur : Créteil")).toBeFalsy()
    })
})


describe("Check Country", () => {

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_country("France")).toBeTruthy()
    })

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_country("Nouvelle zélande")).toBeTruthy()
    })

    test("should return true", async ()=> {
        expect(JobOfferValidator.check_country("Nouvelle-zélande")).toBeTruthy()
    })

    test("should return false", async ()=> {
        expect(JobOfferValidator.check_country("Nouvelle/zélande")).toBeFalsy()
    })

    test("should return false", async ()=> {
        expect(JobOfferValidator.check_country("Nouvelle:zélande")).toBeFalsy()
    })
})
