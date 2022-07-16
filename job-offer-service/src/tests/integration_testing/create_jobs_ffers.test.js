const request = require("supertest");
const app = require('../../app')
const db = require("../../config/mongo_db.config");

afterAll(async() => {
    await db.disconnect()
});

beforeAll(async() => {
    await db.connect()
});

describe("POST create a job offer", () => {

    test("shouldn't create this job offer and should returns a response 500, because the end date is empty",
        async ()=>{
            await request(app)
            .post('/jobs_offers')
            .set('X-Auth-Token', process.env.X_Auth_Token)
            .send({
                "title": "new Job Offer",
                "date_start" : "2022-05-07",
                "date_end" : "",
                "street_number": 94190,
                "street": "rue albert camus",
                "postal_code": "1000",
                "city": "Créteil",
                "country": "France",
                "sector": "Informatique",
                "salary": 2678.30,
                "job_description": "Full-stack js angular ou react pour le front, node js soit express js " +
                    "pour le back",
                "applicant_description": "Il devra maitriser le langage javascript, node js, angular " +
                    "ou react js",
                "company_description": "Une entreprise puissante, qui révolutionne le monde de l'informatique",
                "contract_type": "CDI"
            })
            .then(res=>{
                    expect(res.statusCode).toBe(500)
                    expect(res._body.error).toBe("The end date is empty")
                })
    })

    test("shouldn't this create job offer and should returns a response 400, because the start date > the end date",
        async ()=>{
            await request(app)
            .post('/jobs_offers')
            .set('X-Auth-Token', process.env.X_Auth_Token)
            .send({
                "title": "new Job Offer",
                "date_start" : "2022-05-07",
                "date_end" : "2022-05-04",
                "street_number": 94190,
                "street": "rue albert camus",
                "postal_code": "1000",
                "city": "Créteil",
                "country": "France",
                "sector": "Informatique",
                "salary": 2340.45,
                "job_description": "Full-stack js angular ou react pour le front, node js soit express js " +
                    "pour le back",
                "applicant_description": "Il devra maitriser le langage javascript, node js, angular " +
                    "ou react js",
                "company_description": "Une entreprise puissante, qui révolutionne le monde de l'informatique",
                "contract_type": "CDI"
            })
            .then(res=>{
                    expect(res.statusCode).toBe(400)
                    expect(res._body.error).toBe("The start date cannot be greater than the end date")
                })
        })

    test("shouldn't create this job offer and should returns a response 400, because the start date < the current date",
        async ()=>{
            await request(app)
            .post('/jobs_offers')
            .set('X-Auth-Token', process.env.X_Auth_Token)
            .send({
                "title": "développeur koa js",
                "date_start" : "2022-04-01",
                "date_end" : "2022-05-08",
                "street_number": 94190,
                "street": "rue albert camus",
                "postal_code": "1000",
                "city": "Créteil",
                "country": "France",
                "sector": "Informatique",
                "salary": 2540.47,
                "job_description": "Full-stack js angular ou react pour le front, node js soit express js " +
                    "pour le back",
                "applicant_description": "Il devra maitriser le langage javascript, node js, angular " +
                    "ou react js",
                "company_description": "Une entreprise puissante, qui révolutionne le monde de l'informatique",
                "contract_type": "CDD"
            })
                
            .then(res=>{    
                expect(res.statusCode).toBe(400)
                expect(res._body).toBe("JobOffer validation failed: date_start: The start date must be greater than or equal to the current date")
        
            })
       
       })

    test("should create this job offer and returns a response 201",
        async ()=>{
            await request(app)
            .post('/jobs_offers')
            .set('X-Auth-Token', process.env.X_Auth_Token)
            .send({
                "title": "Admin SI",
                "date_start" : "2022-05-01",
                "date_end" : "2022-07-01",
                "street_number": 94190,
                "street": "rue albert camus",
                "postal_code": "1000",
                "city": "Créteil",
                "country": "France",
                "sector": "Informatique",
                "salary": 42000,
                "job_description": "Full-stack node/react js",
                "applicant_description": "maitrise de react/node js",
                "company_description": "rejoignez-nous, nous vous offrons de magnifique privillège",
                "contract_type": "CDD"
            })
            .then(res=>{
                expect(res.statusCode).toBe(201)
            })
        })
})
