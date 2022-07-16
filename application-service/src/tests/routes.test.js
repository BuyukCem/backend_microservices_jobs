import 'core-js/stable';
import 'regenerator-runtime/runtime';
import request from 'supertest';
const {app} = require('../app');
import {sequelize} from "../config/bdd.config";
import {afterAll, beforeAll} from "@jest/globals";

const {applicationCrudTest} = require('./application.test')
const {applicationAuthTest} = require('./application.test')

beforeAll(async () => {
    await sequelize
        .authenticate()
        .then(() => {
            console.log('TEST: Connection has been established successfully.');
        })
        .catch(err => {
            console.log(err);
        });
    await sequelize.sync({force: true}).then(() => {
        console.log('Database has been successfully synced.');
    }).catch(err => {
        console.log(err.message);
    });
});

afterAll(async () => {
    try {
        await sequelize.drop()
        await sequelize.close();
    } catch (e) {
        console.log(e)
    }
})

describe('Appliction Crud', () => {
    applicationCrudTest(app, request)
})
