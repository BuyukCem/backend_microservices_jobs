const JobOfferValidator = require("../../validator/job-offer-validator");

describe("Check job, applicant ou company description" , () => {

    test("should return false, because this description is less than 20 characters long",
        async ()=> {
        expect(JobOfferValidator.check_characters_descriptions("maitrise de Node.Js"))
            .toBeFalsy()
    })

    test("should return true, because this description has less than 20 characters",
        async ()=> {
            expect(JobOfferValidator.check_characters_descriptions("Développeur Node.Js " +
                "qui devra connaitre express js"))
                .toBeTruthy()
    })

    let description_500_characters = "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla. Nulla non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh dignissim sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus aliquam met"
    test("should return true because this description is at most 500 characters",
        async ()=> {
            expect(JobOfferValidator.check_characters_descriptions(description_500_characters))
                .toBeTruthy();
    })

    let description = "Nam quis nulla. other Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla. Nulla non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh dignissim sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus aliquam met"
    test("should return false, because this description is longer than 500 characters",
        async ()=> {
            expect(JobOfferValidator.check_characters_descriptions(description))
                .toBeFalsy();
    })
})
