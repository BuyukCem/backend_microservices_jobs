const request = require("supertest");
const app = require('../../app')
const db = require("../../config/mongo_db.config");

afterAll(async() => {
    await db.disconnect()
});

beforeAll(async() => {
    await db.connect()
});

describe("DELETE an job offer", () => {
    
    test("shouldn't delete a job offer, because 400 object id is not valid", async ()=>{
        await request(app)
        .delete('/jobs_offers/621529fa62de6b552fb0d9e8gw3')
        .set('X-Auth-Token', process.env.X_Auth_Token)
        .then(res=>{
            expect(res.statusCode).toBe(400)
            expect(res._body.error).toBe("L'object ID is not valid  : 621529fa62de6b552fb0d9e8gw3")
        })
    });

    test("shouldn't delete a job offer, because 404 object id not found", async ()=>{
        const res = await request(app)
        .delete('/jobs_offers/621529fa62de6b552fb0d9e8')
        .set('X-Auth-Token', process.env.X_Auth_Token)
        .then(res=>{
            expect(res.statusCode).toBe(404)
            expect(res._body.error).toBe("object ID not found")
        })
    });

    test("should delete an job offer", async ()=>{
        await request(app)
        .delete('/jobs_offers/62532bb7c0789fb8667a7d7b')
        .set('X-Auth-Token', process.env.X_Auth_Token)
        .then(res=>{
            expect(res.statusCode).toBe(200)
        })
    });
});
