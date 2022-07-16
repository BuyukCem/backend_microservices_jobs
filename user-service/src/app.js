import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import xss from 'xss-clean';
import {dbConnect} from "./config/bdd.config";
const bodyParser = require('body-parser')

dotenv.config();
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.set('etag', false);
app.use(xss());
app.use(cors());

dbConnect()

const userRoute = require('./routes/user.route');
userRoute(app);

export default app;
