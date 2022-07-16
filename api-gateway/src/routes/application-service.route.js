import express from 'express';
import axios from 'axios';

const applicationServiceRouter = express.Router();
const {middleware} = require('../middlewares/authenticate.middleware')
import permit from "./../middlewares/authorization.middleware";
const expressListRoutes = require('express-list-routes');

applicationServiceRouter.post('/application',permit("USER"), function (req, res, next) {
    console.log("in post application")
    req.headers.X_Auth_Token = process.env.APPLICATION_MICRO_SERVICE_X_AUTH_TOKEN;
    console.log("Application user ",req.user)
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.APPLICATION_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        console.log(error)
        if (error.response) {
            res.send(error.response.data);
        } else if (error.request) {
            res.send(error.request);
        } else if (error.message) {
            res.send(error.message);
        } else if (error.config) {
            res.send(error.config);
        }
    })
});
applicationServiceRouter.get('/applicationStats',permit("ADMIN"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.APPLICATION_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = req.user
    axios({
        method: req.method,
        url: process.env.APPLICATION_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        if (error.response) {
            res.send(error.response.data);
        } else if (error.request) {
            res.send(error.request);
        } else if (error.message) {
            res.send(error.message);
        } else if (error.config) {
            res.send(error.config);
        }
    })
})

applicationServiceRouter.get('/applicationStats/:id',permit("ADMIN"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.APPLICATION_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = req.user
    axios({
        method: req.method,
        url: process.env.APPLICATION_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        if (error.response) {
            res.send(error.response.data);
        } else if (error.request) {
            res.send(error.request);
        } else if (error.message) {
            res.send(error.message);
        } else if (error.config) {
            res.send(error.config);
        }
    })
})

applicationServiceRouter.get('/application/:id', function (req, res, next) {
    req.headers.X_Auth_Token = process.env.APPLICATION_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.APPLICATION_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        if (error.response) {
            res.send(error.response.data);
        } else if (error.request) {
            res.send(error.request);
        } else if (error.message) {
            res.send(error.message);
        } else if (error.config) {
            res.send(error.config);
        }
    })
});
applicationServiceRouter.put('/application/:id', permit("CLIENT"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.APPLICATION_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = req.user
    axios({
        method: req.method,
        url: process.env.APPLICATION_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        if (error.response) {
            res.send(error.response.data);
        } else if (error.request) {
            res.send(error.request);
        } else if (error.message) {
            res.send(error.message);
        } else if (error.config) {
            res.send(error.config);
        }
    })
});

applicationServiceRouter.get('/getUserApplications/:id', function (req, res, next) {
    req.headers.X_Auth_Token = process.env.APPLICATION_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    console.log(req.url)
    axios({
        method: req.method,
        url: process.env.APPLICATION_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        if (error.response) {
            res.send(error.response.data);
        } else if (error.request) {
            res.send(error.request);
        } else if (error.message) {
            res.send(error.message);
        } else if (error.config) {
            res.send(error.config);
        }
    })
});

applicationServiceRouter.post('/getApplicationsForCompany',permit("CLIENT"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.APPLICATION_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = req.user
    axios({
        method: req.method,
        url: process.env.APPLICATION_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        if (error.response) {
            res.send(error.response.data);
        } else if (error.request) {
            res.send(error.request);
        } else if (error.message) {
            res.send(error.message);
        } else if (error.config) {
            res.send(error.config);
        }
    })
})


applicationServiceRouter.get('/application/jobs/:id', function (req, res, next) {
    req.headers.X_Auth_Token = process.env.APPLICATION_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = req.user
    axios({
        method: req.method,
        url: process.env.APPLICATION_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        if (error.response) {
            res.send(error.response.data);
        } else if (error.request) {
            res.send(error.request);
        } else if (error.message) {
            res.send(error.message);
        } else if (error.config) {
            res.send(error.config);
        }
    })
})

console.log('================================')

expressListRoutes(applicationServiceRouter);

module.exports = applicationServiceRouter;
