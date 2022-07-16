import axios from 'axios';
import express from 'express';
const expressListRoutes = require('express-list-routes');
const companyServiceRouter = express.Router();
const {middleware} = require('../middlewares/authenticate.middleware')
import permit from "./../middlewares/authorization.middleware";


companyServiceRouter.post('/company', function(req, res, next) {
    req.headers.X_Auth_Token = process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.COMPANY_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.status(error.response.status).send(error.response.data)
    })
});
companyServiceRouter.get('/company', function(req, res, next) {
    console.log("data!!!!")
    req.headers.X_Auth_Token = process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN;
    console.log(process.env.COMPANY_MICRO_SERVICE_URL + req.url)
    axios({
        method: req.method,
        url: process.env.COMPANY_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.send(error);
    })
});

companyServiceRouter.get('/company/:id',permit("CLIENT","ADMIN"), function(req, res, next) {
    req.headers.X_Auth_Token = process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.COMPANY_MICRO_SERVICE_URL + req.url,
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
        }else if (error.config) {
            res.send(error.config);
        }
    })
});

companyServiceRouter.get('/company-detail/:id', function(req, res, next) {
    req.headers.X_Auth_Token = process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.COMPANY_MICRO_SERVICE_URL + req.url,
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
        }else if (error.config) {
            res.send(error.config);
        }
    })
});

companyServiceRouter.get('/company/companyByToken',permit("CLIENT"), function(req, res, next) {
    req.headers.X_Auth_Token = process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.COMPANY_MICRO_SERVICE_URL + req.url,
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
        }else if (error.config) {
            res.send(error.config);
        }
    })
});

companyServiceRouter.post('/company/multiples',permit("CLIENT","ADMIN"), function(req, res, next) {
    req.headers.X_Auth_Token = process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.COMPANY_MICRO_SERVICE_URL + req.url,
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
        }else if (error.config) {
            res.send(error.config);
        }
    })
});

companyServiceRouter.put('/company/:id', permit("CLIENT"), function(req, res, next) {
    req.headers.X_Auth_Token = process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.COMPANY_MICRO_SERVICE_URL + req.url,
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
        }else if (error.config) {
            res.send(error.config);
        }
    })
});
companyServiceRouter.delete('/company/:id', permit("admin"), function(req, res, next) {
    req.headers.X_Auth_Token = process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.COMPANY_MICRO_SERVICE_URL + req.url,
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
        }else if (error.config) {
            res.send(error.config);
        }
    })
});

companyServiceRouter.get('/company/user/:id', permit('CLIENT'),function(req, res, next) {
    req.headers.X_Auth_Token = process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.COMPANY_MICRO_SERVICE_URL + req.url,
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
        }else if (error.config) {
            res.send(error.config);
        }
    })
  });



expressListRoutes(companyServiceRouter);

module.exports = companyServiceRouter;
