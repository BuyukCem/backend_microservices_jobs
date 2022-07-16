import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import xss from 'xss-clean';
import {dbConnect} from "./config/bdd.config";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(cors());

dbConnect()

const applicationRoute = require('./routes/application.route');
applicationRoute(app);
module.exports = {app};
