import 'core-js/stable';
import 'regenerator-runtime/runtime';
import request from 'supertest';
const {app} = require('../app');
import {sequelize} from "../config/bdd.config";
import {afterAll, beforeAll} from "@jest/globals";

const {companyCrudTest} = require('./company.test')
const {companyAuthTest} = require('./companyAuth.test')

beforeAll(async () => {
    await sequelize
        .authenticate()
        .catch(err => {
            console.log(err);
        });
    await sequelize.sync({force: true}).catch(err => {
        console.log(err.message);
    });
});

afterAll(async () => {
    try {
        await sequelize.drop()
        await dbDisconnect()
    } catch (e) {
        console.log(e)
    }
})

describe('Company Crud', () => {
    companyCrudTest(app, request)
})
describe('Company Auth', () => {
    companyAuthTest(app, request)
})
