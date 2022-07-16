import axios from 'axios';
import express from 'express';

const jobOfferServiceRouter = express.Router();
const {middleware} = require('../middlewares/authenticate.middleware')
import permit from "./../middlewares/authorization.middleware";
const expressListRoutes = require('express-list-routes');

jobOfferServiceRouter.post('/jobs_offers', permit("CLIENT"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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

jobOfferServiceRouter.post('/jobs_offers/upload-jobs-file', permit("CLIENT"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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

jobOfferServiceRouter.get('/jobs_offers', function (req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.send("Something wrong");
    })
});

jobOfferServiceRouter.post('/jobs_offers/job_for_applications', function(req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
        headers: req.headers,
        data: req.body
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.send("Something wrong");
    })
});

jobOfferServiceRouter.get("/jobs_offers/stats",permit("ADMIN"), function(req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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

jobOfferServiceRouter.get('/jobs_offers/:id', function(req, res, next) {

    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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
jobOfferServiceRouter.patch('/jobs_offers/:id', permit("CLIENT"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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
jobOfferServiceRouter.delete('/jobs_offers/:id', permit("CLIENT"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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
jobOfferServiceRouter.get("/sectors", function (req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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

jobOfferServiceRouter.post('/like',permit("USER"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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
jobOfferServiceRouter.get('/likes/:id',permit("USER"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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

jobOfferServiceRouter.get('/jobs_offers/company/:id', function (req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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

jobOfferServiceRouter.get("/jobs_offers/statsByCompany/:id",permit("ADMIN"), function(req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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


jobOfferServiceRouter.get("/likes",permit("USER"), function(req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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

jobOfferServiceRouter.post('/like',permit("USER"), function(req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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

jobOfferServiceRouter.post('/alert', permit("USER"),function(req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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

jobOfferServiceRouter.delete('/delete-alert/:id/:user_id',permit("USER"), function (req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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

jobOfferServiceRouter.get("/alert/:id",permit("USER"), function(req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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

jobOfferServiceRouter.get("/alerts/:id",permit("USER"), function(req, res, next) {
    req.headers.X_Auth_Token = process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN;
    req.headers.user = JSON.stringify(req.user)
    axios({
        method: req.method,
        url: process.env.JOB_OFFER_MICRO_SERVICE_URL + req.url,
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


console.log('=========================================')
expressListRoutes(jobOfferServiceRouter);

module.exports = jobOfferServiceRouter;
