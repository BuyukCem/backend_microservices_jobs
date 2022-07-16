import {raw} from "express";

let UserToken;

export const authUserTest = (app, request) => {
    it('should not create account with wrong email', async () => {
        await request(app)
            .post('/signup')
            .send({
                "firstName": "John",
                "lastName": "Doe",
                "email": "DoeJohn.com",
                "password": "passwordAZ23@#"
            })
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(400);
                expect(res.message).toBe('Validation error: Must be a Valid email')
            });
    });
    it('should not create account with wrong password', async () => {
        await request(app)
            .post('/signup')
            .send({
                "firstName": "John",
                "lastName": "Doe",
                "email": "zfz@ae.com",
                "password": "pass"
            })
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(400);
                expect(res.message).toBe('Password must contain at least 10 characters, one uppercase letter, one lowercase letter, one number and one special character')
            });
    });
    /*
    it('should create account', async () => {
        await request(app)
            .post('/signup')
            .send({
                "firstName": "John",
                "lastName": "Doe",
                "email": "John@Doe.com",
                "password": "password3@AZ23"
            })
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(200);
                expect(res.message).toBe('User successfully created')
            });
    });
    it('should authenticate user', async () => {
        await request(app)
            .post('/login')
            .send({
                "email": "John@Doe.com",
                "password": "password3@AZ23"
            })
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(200);
                expect(res.status).toBe('success')
                UserToken = res.token
            });
    });*/
    it('should not authenticate user with wrong password', async () => {
        await request(app)
            .post('/login')
            .send({
                "email": "John@Doe.com",
                "password": "password3"})
            .then(response => {
                const res = JSON.parse(response.text);
                expect(response.status).toBe(401);
                expect(res.status).toBe('error')
            });
    });
    it('should not authenticate user with wrong email', async () => {
        await request(app)
            .post('/login')
            .send({
                "email": "Joh@Doe.com",
                "password": "password3"
            })
            .then(response => {
                const res = JSON.parse(response.text);
                expect(response.status).toBe(401);
                expect(res.status).toBe('error')
            });
    });
}
