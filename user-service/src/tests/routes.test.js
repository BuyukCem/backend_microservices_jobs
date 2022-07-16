import 'core-js/stable';
import 'regenerator-runtime/runtime';
import request from 'supertest';
import app from '../app';
import {sequelize, dbDisconnect} from "../config/bdd.config";
import {afterAll, beforeAll} from "@jest/globals";
import pgtools from "pgtools";

const {userCrudTest} = require('./userCrud.test')

beforeAll(async () => {
    await sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
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
        await dbDisconnect()
    } catch (e) {
        console.log(e)
    }

})
describe('User Crud', () => {
    userCrudTest(app, request)
})
