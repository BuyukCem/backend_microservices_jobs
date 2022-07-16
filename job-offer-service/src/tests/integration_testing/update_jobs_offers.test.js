const request = require("supertest");
const app = require('../../app')
const db = require("../../config/mongo_db.config");

afterAll(async() => {
    await db.disconnect()
});

beforeAll(async() => {
    await db.connect()
});

describe("PATCH update a job offer", () => {

    test("shouldn't modified a job offer and should returns a response 500, because the end date is empty",
        async ()=>{
            await request(app)
            .patch('/jobs_offers/62532a5f40aac48dbf49f9d7')
            .set('X-Auth-Token', process.env.X_Auth_Token)
            .send({
                "date_end" : ""
            })
            .then(res=>{
                console.log(res.body)
                expect(res.statusCode).toBe(500)
                expect(res._body.error).toBe("The end date is empty")
            });
    });

   test("shouldn't modified a job offer and should returns a response 400, because the start date > the end date",
        async ()=>{
            await request(app)
            .patch('/jobs_offers/62532a5f40aac48dbf49f9d7')
            .set('X-Auth-Token', process.env.X_Auth_Token)
            .send({
                "date_start" : "2022-11-07",
                "date_end" : "2022-09-07",
                "contract_type": "ALTERNANCE"
            })
            .then(res=>{
                expect(res.statusCode).toBe(400)
                expect(res._body.error).toBe("The start date cannot be greater than the end date")

            });
    });

    test("shouldn't modified this job offer and should returns a response 400, because the start date < the current date",
        async ()=>{
            await request(app)
            .patch('/jobs_offers/62532a5f40aac48dbf49f9d7')
            .set('X-Auth-Token', process.env.X_Auth_Token)
            .send({
                "date_start" : "2022-03-26",
                "title": "Developpeur node/react js, angular/nest js",
                "job_description": "Full-stack node/react js, angular/nest js",
                "applicant_description": "maitrise de react/node js et angular/nest js",
                "company_description": "rejoignez-nous, nous vous offrons de magnifique privillège ( bureau, formation...)"
            })
            .then(res=>{
                expect(res.statusCode).toBe(400)
                expect(res._body).toBe("Validation failed: date_start: The start date must be greater than or equal to the current date")
            })
        })


    test("shouldn't modified a job offer, because response 400 object id is not valid",
        async ()=>{
            await request(app)
            .patch('/jobs_offers/6228feaebf305ba03fd14d1ef')
            .set('X-Auth-Token', process.env.X_Auth_Token)
            .send({
                "title": "new Job Offer title modified",
                "city": "New Delhi",
                "country": "Inde",
                "sector": "R & D",
            })
            .then(res=>{
                expect(res.statusCode).toBe(400)
                expect(res._body.error).toBe("L'object ID is not valid  : 6228feaebf305ba03fd14d1ef")

            });
    });

    test("shouldn't modified a job offer, because  response 404 object id not found",
        async ()=>{
            await request(app)
            .patch('/jobs_offers/62240b4791a932baea943af7')
            .set('X-Auth-Token', process.env.X_Auth_Token)
            .send({
                "title": "Developpeur node/react js, angular/nest js",
                "job_description": "Full-stack node/react js, angular/nest js",
                "applicant_description": "maitrise de react/node js et angular/nest js",
                "company_description": "rejoignez-nous, nous vous offrons de magnifique privillège ( bureau, formation...)"
            })
            .then(res=>{
                expect(res.statusCode).toBe(404)
                expect(res._body.error).toBe("object ID not found")
            });

    });

    test("should modified an job offer",
        async ()=>{
            await request(app)
            .patch('/jobs_offers/62532a5f40aac48dbf49f9d7')
            .set('X-Auth-Token', process.env.X_Auth_Token)
            .send({
                "title": "Developpeur node/react js, angular/nest js",
                "job_description": "Full-stack node/react js, angular/nest js",
                "applicant_description": "maitrise de react/node js et angular/nest js",
                "company_description": "rejoignez-nous, nous vous offrons de magnifique privillège ( bureau, formation...)"
            })
            .then(res=>{
                expect(res.statusCode).toBe(200)
            })
        })
});
