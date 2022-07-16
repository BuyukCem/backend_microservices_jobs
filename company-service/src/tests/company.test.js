export const companyCrudTest = (app, request) => {
    /*
        it('should create company', async () => {
            await request(app)
                .post('/company')
                .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
                .send({
                    'company_name': 'companyName',
                    'siret': '12345678912345',
                    'siren': '1234567891',
                    'city': 'Paris',
                    'country': 'France',
                    'zip_code': "75000",
                    'street': 'rue de la paix',
                    'street_number': '10',
                   // 'logo': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="',
                    'email': 'testt@test.com',
                    'password': 'passwordAZ23@'
                })
                .then(response => {
                    const res = JSON.parse(response.text)
                    console.log(res)
                    expect(response.status).toBe(200)
                    expect(res.message).toBe('Company created successfully')
                });
        })
        it('should not create company with invalid Siret format', async () => {
            await request(app)
                .post('/company')
                .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
                .send({
                    "company_name": "companyName",
                    "siret": "123345",
                    "city": "Paris",
                    "country": "France",
                    "zip_code": "234",
                    "street": "rue de la paix",
                    "street_number": "10",
                    "nb_employees": "60",
                    "presentation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "wanted": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    'email': 'test@test.com',
                    'password': 'testtestddddd2@'
                })
                .then(response => {
                    const res = JSON.parse(response.text)
                    expect(response.status).toBe(401)
                    expect(res.message).toBe('Company siret is invalid format')
                });
        })
        it('should not create company with wrong Siret', async () => {
            await request(app)
                .post('/company')
                .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
                .send({
                    "company_name": "companyName",
                    "siret": "12345678910324",
                    "city": "Paris",
                    "country": "France",
                    "zip_code": "234",
                    "street": "rue de la paix",
                    "street_number": "10",
                    "nb_employees": "60",
                    "presentation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "wanted": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    'email': 'test@test.com',
                    'password': 'testtestddddd2@'
                })
                .then(response => {
                    const res = JSON.parse(response.text)
                    expect(response.status).toBe(401)
                    expect(res.message).toBe('Company siret is invalid format')
                });
        })
        it('Should test insert with wrong zip_code', async () => {
            await request(app)
                .post('/company')
                .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
                .send({
                    "company_name": "companyName",
                    "siret": "12345678912345",
                    "city": "Paris",
                    "country": "France",
                    "zip_code": "234",
                    "street": "rue de la paix",
                    "street_number": "10",
                    "nb_employees": "60",
                    "presentation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "wanted": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    'email': 'test@test.com',
                    'password': 'testtestddddd2@'
                })
                .then(response => {
                    const res = JSON.parse(response.text)
                    expect(response.status).toBe(400)
                    expect(res.message).toBe('Validation error: Zip code must be 5 characters long')
                });
        })
        it('should test require ComanyName', async () => {
            await request(app)
                .post('/company')
                .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
                .send({
                    "company_name": "",
                    "siret": "12345678912345",
                    "city": "Paris",
                    "country": "France",
                    "zip_code": "75000",
                    "street": "rue de la paix",
                    "street_number": "10",
                    'email': 'test@test.com',
                    'password': 'testtestddddd2@'
                })
                .then(response => {
                    const res = JSON.parse(response.text)
                    expect(response.status).toBe(400)
                    expect(res.message).toBe('Validation error: Please provide a value for "Comanpy Name"')
                });
        })

        it('should get all company', async () => {
            await request(app)
                .get('/company')
                .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
                .then(response => {
                    const res = JSON.parse(response.text)
                    expect(response.status).toBe(200)
                    expect(res.data[0].company_name).toBe('companyName')
                    expect(res.message).toBe('Company fetched successfully')
                });
        })
        it('should get one company', async () => {
            await request(app)
                .get('/company/1')
                .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
                .then(response => {
                    const res = JSON.parse(response.text)
                    expect(response.status).toBe(200)
                    expect(res.data.company_name).toBe('companyName')
                    expect(res.message).toBe('Company fetched successfully')
                });
        })
        */
    it('should not get wrong company id', async () => {
        await request(app)
            .get('/company/10')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(400)
                expect(res.message).toBe('Company not found')
            });
    })
    /*
    it('should test update company', async () => {
        await request(app)
            .put('/company/1')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .send({
                "company_name": "companyNameUpdated",
                "siret": "12345678912345",
                "city": "Paris",
                "country": "France",
                "zip_code": "75000",
                "street": "rue de la paix",
                "street_number": "10",
                "nb_employees": "60",
                "presentation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                "wanted": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            })
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.message).toBe('Company updated successfully')
                expect(res.data.company_name).toBe('companyNameUpdated')
                expect(res.data.presentation).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
            });
    })*/
    it('should not update wrong company id', async () => {
        await request(app)
            .put('/company/10')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .send({
                "company_name": "companyNameUpdated",
                "siret": "12345678912345",
                "city": "Paris",
                "country": "France",
                "zip_code": "75000",
                "street": "rue de la paix",
                "street_number": "10",
                "nb_employees": "60",
                "presentation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                "wanted": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            })
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(400)
                expect(res.message).toBe('Company not found')
            });
    })
    /*
    it('should test delete company', async () => {
        await request(app)
            .delete('/company/1')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.message).toBe('Company deleted successfully')
            });
    })
    it('should not delete wrong company id', async () => {
        await request(app)
            .delete('/company/10')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .then(response => {
                const res = JSON.parse(response.text)
                expect(response.status).toBe(500)
                expect(res.message).toBe('Company not found')
            });
    })

    it('should delete company when user not created', async () => {
        await request(app)
            .post('/company')
            .set('X_Auth_Token', process.env.X_AUTH_TOKEN)
            .send({
                'company_name': 'companyName',
                'siret': '12345678912345',
                'city': 'Paris',
                'country': 'France',
                'zip_code': "75000",
                'street': 'rue de la paix',
                'street_number': '10',
                // 'logo': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="',
                'email': 'testttest.com',
                'password': 'passwordAZ23@'
            })
            .then(response => {
                const res = JSON.parse(response.text)
                console.log(res)
                expect(response.status).toBe(400)
                expect(res.message).toBe('Error when creating company: Validation error: Must be a Valid email')
                expect(res.status).toBe('error')
            });
    })*/
}
