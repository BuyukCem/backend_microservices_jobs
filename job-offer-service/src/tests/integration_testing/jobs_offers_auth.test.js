const request = require("supertest");
const app = require('../../app')
const db = require("../../config/mongo_db.config");

afterAll(async() => {
    await db.disconnect()
});

beforeAll(async() => {
    await db.connect()
});

test("POST/ should returns post the job offer, because no security token",async ()=>{
        await request(app).post('/jobs_offers').send({
            "title": "preact",
            "date_start" : "2022-05-07",
            "date_end" : "2022-05-08",
            "street_number": 94190,
            "street": "rue albert camus",
            "postal_code": "94000",
            "city": "Créteil",
            "country": "France",
            "sector": "Informatique",
            "salary": 2140.40,
            "job_description": "Full-stack js angular ou react pour le front, node js soit express js " +
                "pour le back",
            "applicant_description": "Il devra maitriser le langage javascript, node js, angular " +
                "ou react js",
            "company_description": "Une entreprise puissante, qui révolutionne le monde de l'informatique",
            "contract_type": "CDI"
        })
        .then(res=>{
            expect(res.statusCode).toBe(401)
            expect(res._body.message).toBe('Please insert a token')
    })
})

    
test("POST/ should returns post the job offer, because wrong token",async ()=>{
    await request(app)
    .post('/jobs_offers')
    .set('X-Auth-Token', 'wrongToken')
    .send({
            "title": "preact",
            "date_start" : "2022-05-07",
            "date_end" : "2022-05-08",
            "street_number": 94190,
            "street": "rue albert camus",
            "postal_code": "94000",
            "city": "Créteil",
            "country": "France",
            "sector": "Informatique",
            "salary": 2140.40,
            "job_description": "Full-stack js angular ou react pour le front, node js soit express js " +
                "pour le back",
            "applicant_description": "Il devra maitriser le langage javascript, node js, angular " +
                "ou react js",
            "company_description": "Une entreprise puissante, qui révolutionne le monde de l'informatique",
            "contract_type": "CDI"
        })
        .then(res=>{
            expect(res.statusCode).toBe(401)
            expect(res._body.message).toBe('Please insert a valid token')  
       
     })
})

test("PATCH/ should returns modified the job offer, because no security token",async ()=>{
    await request(app)
    .patch('/jobs_offers/6244b513d7a1c8aa086b9814')
    .send({
        "title": "developer web js",
        "date_start" : "2022-07-01",
    })
    .then(res=>{
        expect(res.statusCode).toBe(401)
        expect(res._body.message).toBe('Please insert a token')

    })
})

test("PATCH/ should returns modified the job offer, no security token",async ()=>{
    await request(app)
    .patch('/jobs_offers/6244b513d7a1c8aa086b9814')
    .set('X-Auth-Token', 'wrongToken')
    .send({
        "title": "developer web js",
        "date_start" : "2022-07-01",
    })
    .then(res=>{
        expect(res.statusCode).toBe(401)
        expect(res._body.message).toBe('Please insert a valid token')

    })
})

test("GET/ should returns list of job offers and a response 200, because no security token", async() => {
    const response = await request(app)
    .get("/jobs_offers")
    .then(res=>{
        expect(res.statusCode).toBe(401)
        expect(res._body.message).toBe('Please insert a token')
    })
})

test("GET/ should returns list of job offers and a response 200, because wrong token", async() => {
    const response = await request(app)
    .get("/jobs_offers")
    .set('X-Auth-Token', 'wrongToken')
    .then(res=>{
        expect(res.statusCode).toBe(401)
        expect(res._body.message).toBe('Please insert a valid token')
    })
    
})

test("GET :id/ should returns a job offer and a response 200, because no security token", async() => {
    const response = await request(app)
    .get("/jobs_offers/6244b513d7a1c8aa086b9814")
    .then(res=>{
        expect(res.statusCode).toBe(401)
        expect(res._body.message).toBe('Please insert a token')
    })
})

test("GET :id/ should returns a job offer and a response 200, because wrong token", async() => {
    const response = await request(app)
    .get("/jobs_offers/6244b513d7a1c8aa086b9814")
    .set('X-Auth-Token', 'wrongToken')
    .then(res=>{
        expect(res.statusCode).toBe(401)
        expect(res._body.message).toBe('Please insert a valid token')
    })
})

test("DELETE/ should delete a job offer and a response 200, because no security token", async() => {
    const response = await request(app)
    .delete("/jobs_offers/6244b513d7a1c8aa086b9814")
    .then(res=>{
        expect(res.statusCode).toBe(401)
        expect(res._body.message).toBe('Please insert a token')
    })
})

test("DELETE/ should delete a job offer and a response 200, because wrong token", async() => {
    const response = await request(app)
    .delete("/jobs_offers/6244b513d7a1c8aa086b9814")
    .set('X-Auth-Token', 'wrongToken')
    .then(res=>{
        expect(res.statusCode).toBe(401)
        expect(res._body.message).toBe('Please insert a valid token')
    })
})
