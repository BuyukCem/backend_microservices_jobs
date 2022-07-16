const request = require("supertest");
const app = require('../../app');
const db = require("../../config/mongo_db.config");

afterAll(async() => {
    await db.disconnect()
});

beforeAll(async() => {
    await db.connect()
});

describe("GET list of job offers", () => {
    test("should returns list of job offers and a response 200", async() => {
        await request(app)
        .get("/jobs_offers")
        .set('X-Auth-Token', process.env.X_Auth_Token)
        .then(res=>{
            expect(res.statusCode).toBe(200)
        })
    })
});

describe("GET :id/ retrieve a job offer", () => {

    test("shouldn't retrieve a job offer, because 400 object id is not valid", async ()=>{
        await request(app)
        .get('/jobs_offers/621529fa62de6b552fb0d9e8gw3')
        .set('X-Auth-Token', process.env.X_Auth_Token)
        .then(res=>{
            console.log(res.body)
            expect(res.statusCode).toBe(400)
            expect(res._body.error).toBe("L'object ID is not valid  : 621529fa62de6b552fb0d9e8gw3")
        })
    });

    test("shouldn't retrieve a job offer, because 404 object id not found", async ()=>{
        await request(app)
        .get('/jobs_offers/621529fa62de6b552fb0d9e8')
        .set('X-Auth-Token', process.env.X_Auth_Token)
        .then(res=>{
            expect(res._body.error).toBe("object ID not found")
            expect(res.statusCode).toBe(404)
        })
    });

    test("should retrieve an job offer", async ()=>{
        await request(app)
        .get('/jobs_offers/62532a5f40aac48dbf49f9d7')
        .set('X-Auth-Token', process.env.X_Auth_Token)
        .then(res=>{
            expect(res.statusCode).toBe(200)
        })
    })
});
