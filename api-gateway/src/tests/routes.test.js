import 'core-js/stable';
import 'regenerator-runtime/runtime';
import request from 'supertest';
import app from '../app';
import {afterAll} from "@jest/globals";
const { Client } = require('pg')
const {authUserTest} = require('./AuthUser.test');

afterAll( async () => {
    const connectionString = process.env.USER_MICRO_SERVICE_URL
    const client =  new Client({
        connectionString
    });

    try{
        await client.connect();
    }catch (e) {
        await client.query(" ", async (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log("user table truncated");
                await client.end();
            }
        });
    }
});
describe('User Auth', ()=>{authUserTest(app, request)})
