export const userCrudTest = (app, request) => {
    /*
    it('Should insert user', async () => {
        await request(app)
            .post('/user')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .send({
                "firstName": "John",
                "lastName": "Doe",
                "email": "JohnCrud@Doe.com",
                "password": "passwordAZ23@"
            })
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.message).toBe('User successfully created')
            });
    });
    it('Should insert user with same email',async () => {
        await request(app)
            .post('/user')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .send({
                "firstName": "John",
                "lastName": "Doe",
                "email": "JohnCrud@Doe.com",
                "password": "passwordAZ23@"
            })
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(404)
                expect(res.status).toBe('error')
            });
    });*/
    it('Should not create account with wrong password format', async () => {
        await request(app)
            .post('/user')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .send({
                "firstName": "John",
                "lastName": "Doe",
                "email": "JohnCr@Doee.com",
                "password": "AZ23@"
            })
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(404)
                expect(res.status).toBe("error")
                expect(res.message).toBe('Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character')
            });
    });
    it('Should get user by email', async () => {
        await request(app)
            .get('/user/email')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .send({"email": "JohnCrud@Doe.com"})
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.status).toBe('success')
                expect(res.data.firstName).toBe('John')
                expect(res.data.lastName).toBe('Doe')
                expect(res.data.email).toBe('JohnCrud@Doe.com')
                expect(res.message).toBe('User successfully retrieved')
            });
    });
    it('should get all user', async () => {
        await request(app)
            .get('/users')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.message).toBe('Users successfully retrieved')
                expect(res.data[0].lastName).toBe('Doe')
                expect(res.data[0].firstName).toBe('John')
                expect(res.data[0].email).toBe('JohnCrud@Doe.com')
            });
    })
    it('test secure route', async () => {
        await request(app)
            .get('/users')
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(401)
                expect(res.message).toBe('invalid token, pleas insert a valid token')
            });
    })
    it('test with wrong token', async () => {
        await request(app)
            .get('/users')
            .set('X_Auth_Token', 'egzg3456534TF4')
            .then(response => {
                const res = JSON.parse(response.text)
                expect(res.status).toBe(401)
                expect(res.message).toBe('invalid token, pleas insert a valid token')
            });
    })
    it('should get specific user', async ()=>{
        await request(app)
            .get('/user/1')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.message).toBe('User successfully retrieved')
                expect(res.data.user.lastName).toBe('Doe')
                expect(res.data.user.firstName).toBe('John')
                expect(res.data.user.email).toBe('JohnCrud@Doe.com');
            });
    })
    it('test user not found', async ()=>{
        await request(app)
            .get('/user/10')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .then(response => {
                const res = JSON.parse(response.text)
                expect(res.status).toBe("Error")
                expect(res.message).toBe('User not found')
            });
    })
    it('should update user', async () => {
        await request(app)
            .patch('/user/1')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .send({
                "firstName": "test",
                "lastName": "test",
                "email": "test@test.com"
            })
            .then(response => {
                const res = JSON.parse(response.text);
                expect(response.status).toBe(200)
                expect(res.message).toBe('User successfully updated')
                expect(res.data.user.lastName).toBe('test')
                expect(res.data.user.firstName).toBe('test')
                expect(res.data.user.email).toBe('test@test.com');
            });
    });
    it('should not update with wrong email format', async () => {
        await request(app)
            .patch('/user/1')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .send({
                "firstName": "test",
                "lastName": "test",
                "email": "testtest.com"
            })
            .then(response => {
                const res = JSON.parse(response.text);
                expect(response.status).toBe(200)
                expect(res.message).toBe('Validation error: Must be a Valid email')
            });
    });
    it('should not update with wrong email format', async () => {
        await request(app)
            .patch('/user/1')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .send({
                "firstName": "test",
                "lastName": "test",
                "email": "testtest.com"
            })
            .then(response => {
                const res = JSON.parse(response.text);
                expect(response.status).toBe(200)
                expect(res.message).toBe('Validation error: Must be a Valid email')
            });
    });
    it('should delete user', async ()=>{
        await request(app)
            .delete('/user/1')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.message).toBe('User successfully deleted')
            });
    })
    it('test with empty token', async ()=>{
        await request(app)
            .delete('/user/3')
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(401)
                expect(res.message).toBe('invalid token, pleas insert a valid token')
            });
    })
    it('should not delete user', async ()=>{
        await request(app)
            .delete('/user/10')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(401)
                expect(res.message).toBe('there is no user')
            });
    })
}
