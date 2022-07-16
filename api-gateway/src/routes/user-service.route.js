import axios from 'axios';
import express from 'express';

const userServiceRouter = express.Router();
const {middleware} = require('../middlewares/authenticate.middleware')
import permit from "./../middlewares/authorization.middleware";
userServiceRouter.post('/signup', async function (req, res, next) {
    req.headers.X_Auth_Token = process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    try {
       const res = await axios({
           method: req.method,
           url: process.env.USER_MICRO_SERVICE_URL + req.url,
           headers: req.headers,
           data: req.body
       })
    } catch (error) {
        res.status(500).send(error);
    }
});
userServiceRouter.get('/user',permit("USER","CLIENT"),  function (req, res, next) {
    req.headers.X_Auth_Token = process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.USER_MICRO_SERVICE_URL + req.url + '/' + req.user.id,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        console.log(response.data.data)
        if(response.data && response.data.data && response.data.data.user) {
            const {password,activateToken,accountDateCreation,createdAt, resetToken, ...loadUser} = response.data.data.user;
            response.data.data.user = loadUser
        }

        res.send(response.data)
    }).catch(error => {
        console.log(error);
        res.send(error);
    })
});
userServiceRouter.patch('/user', function (req, res, next) {
        req.headers.X_Auth_Token = process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN;
        req.headers.user = JSON.stringify(req.user)
        axios({
            method: req.method,
            url: process.env.USER_MICRO_SERVICE_URL + req.url + '/' + req.user.id,
            headers: req.headers,
            data: req.body
        }).then((response) => {
            res.send(response.data)
        }).catch(error => {
            console.log(error);
            res.send(error);
        })
});
userServiceRouter.get('/users',permit("ADMIN"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.USER_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.send(error);
    })
});
userServiceRouter.get('/user/:id',permit("USER","CLIENT"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.USER_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.send(error);
    })
});
userServiceRouter.patch('/user/:id', function (req, res, next) {
    req.headers.X_Auth_Token = process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.USER_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.send(error);
    })
});
userServiceRouter.delete('/user/:id',permit("USER","CLIENT","ADMIN"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.USER_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.send(error);
    })
});
userServiceRouter.get('/get_auth_user', function (req, res, next) {
    req.headers.X_Auth_Token = process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.USER_MICRO_SERVICE_URL + '/user/' + req.user.id,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.send(error);
    })
});
userServiceRouter.post('/reset-password', function (req, res, next) {
    req.headers.X_Auth_Token = process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.USER_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.send(error);
    })
});
module.exports = userServiceRouter;
