const JobOfferValidator = require("../../validator/job-offer-validator");

describe("Check title of job offer", () => {

    test("should return true", async () => {
        expect(JobOfferValidator.check_title("Développeur Vue Js 2")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_title("Job offer : H/F")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_title("Coach agile & Devops")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_title("Coach agile, Devops et lean")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_title("Developpeur Node-React.")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_title("Developpeur Node-React (version 17 de react).")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_title("Developpeur 'Node-React' (version 17 de react).")).toBeTruthy()
    })
})


describe("Check sector of job offer", () => {

    test("should return true", async () => {
        expect(JobOfferValidator.check_sector("Informatique / Télécoms")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_sector("L'étude et le conseil")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_sector("L'étude et le conseil")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_sector("Recherche-Développement")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_sector("R & D")).toBeTruthy()
    })

    test("should return false", async () => {
        expect(JobOfferValidator.check_sector("Informatique : Industrie")).toBeFalsy()
    })

    test("should return false", async () => {
        expect(JobOfferValidator.check_sector("Informatique 2points0")).toBeFalsy()
    })
})

describe("Check contract type of job offer", () => {

    test("should return false", async () => {
        expect(JobOfferValidator.check_contract_type("CDI : contrat")).toBeFalsy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_contract_type("CDI - contrat à durée indeterminée")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_contract_type("contrat à durée determinée (CDD)")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_title("contrat à durée determinée (CDD)")).toBeTruthy()
    })

    test("should return true", async () => {
        expect(JobOfferValidator.check_title("contrat d'alternance")).toBeTruthy()
    })
})
