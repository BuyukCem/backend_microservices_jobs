import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import xss from 'xss-clean';
const httpProxy = require('express-http-proxy')
import authenticate from 'middlewares/authenticate.middleware';
const bodyParser = require('body-parser')
dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.set('etag', false);
app.use(xss());
app.use(cors());

const authRoute = require('./routes/auth.route');
const userServiceRoute = require('./routes/user-service.route');
const companyServiceRoute = require('./routes/company-service.route');
const applicationServiceRoute = require('./routes/application-service.route');
const jobOfferServiceRoute = require('./routes/job-offer-service.route');

app.use('/', authRoute)

app.use('/test', (req, res) => {
    console.log("Hello World")
    res.send('Hello World')
});

app.use(authenticate);
app.use('/', userServiceRoute)
app.use('/', companyServiceRoute)
app.use('/', applicationServiceRoute)
app.use('/', jobOfferServiceRoute)

export default app;
