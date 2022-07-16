const express = require('express');
const app = express.Router()
const {JobOffer} = require("../models/job-offer.model");
const {likeOffer} = require("../models/like-offer.model");
const ObjectID = require('mongoose').Types.ObjectId;
const auth = require('../middlewares/authenticate.middleware');
const {getCompany, getCompanyById, getCompaniesMultiple} = require('../services/company-service');

function isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }

    const num = Number(str);

    if (Number.isInteger(num) && num > 0) {
      return true;
    }

    return false;
  }

app.route('/').get(async (req, res) => {
    const searchQuery = req.query.search
    const company_id = req.query.company_id;
    const contract_type = req.query.contract_type ? req.query.contract_type.split(',') : [];
    const sector = req.query.sector;
    const country = req.query.country;
    const city = req.query.city;
    const {page = 1, limit = 10} = req.query;

    let filter = [/*{is_active: true}*/];
    if (city && typeof city === 'string') {
        filter.push({city: new RegExp(city, 'i')});
    }
    if (company_id && isPositiveInteger(company_id)) {
        filter.push({company_id: company_id});
    }
    if (contract_type && contract_type.length > 0) {
        filter.push({contract_type: {$in: contract_type}});
    }
    if (country && typeof country === 'string') {
        filter.push({country: new RegExp(country, 'i')});
    }
    if (searchQuery && typeof searchQuery === 'string') {
        filter.push({title: new RegExp(searchQuery, 'i')});
    }
    if (sector && typeof sector === 'string') {
        filter.push({sector: new RegExp(sector, 'i')});
    }

    let today = new Date()
    today.setUTCHours(0,0,0,0);
    today = today.toISOString();

    filter.push({is_active: true});
    filter.push({date_start: {$gte: today}})
    filter.push({date_end: {$gte: today}})
    const count = await JobOffer.countDocuments({$and: filter});
    const totalJob = await JobOffer.count({$and: filter});
    let result = []
    JobOffer.find({
        $and: filter
    }).limit(limit)
        .sort({createdAt: -1})
        .skip((page - 1) * limit)
        .then(async (data) => {
            for (let i = 0; i < data.length; i++) {
                await getCompanyById(data[i].company_id).then(async (response) => {
                    console.log("-2")
                    result.push({
                        id: data[i].id,
                        title: data[i].title,
                        data_start: data[i].data_start,
                        data_end: data[i].data_end,
                        company_id: data[i].company_id,
                        contract_type: data[i].contract_type,
                        applicant_description: data[i].applicant_description,
                        job_description: data[i].job_description,
                        salary: data[i].salary,
                        salary_type: data[i].salary_type,
                        sector: data[i].sector,
                        sub_sector: data[i].sub_sector,
                        city: data[i].city,
                        street_number: data[i].street_number,
                        street: data[i].street,
                        postal_code: data[i].postal_code,
                        country: data[i].country,
                        is_active: data[i].is_active,
                        company_name: response.company_name,
                        company_logo: response.logo,
                        company_url: response.website,
                    })
                }).catch(() => {
                    result.push(data[i]);
                })
            }
            res.status(200).json({
                data: result,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                totalJobs: totalJob
            })
        })
        .catch(error => {
            res.status(500).json({error: "error"})
        })
})

app.route('/saved-list').get(async (req, res) => {
    const user_id = req.query.user_id
    likeOffer.find({user: user_id, deleted: false})
        .then(data => {
            const like_ids = data.map(like => like.jobOffer);
            if (like_ids.length > 0) {
                JobOffer.find({_id: {$in: like_ids}})
                    .then(async jobs => {
                        const c_ids = jobs.map(j => j.company_id)
                        const companies = await getCompaniesMultiple(c_ids)
                        if (companies) {
                            let result = jobs.map(j => {
                                const r = companies.filter(company => company.id === j.company_id)
                                const c = {
                                    company_name: r[0].company_name,
                                    company_logo: r[0].logo,
                                    company_id: r[0].id
                                }
                                return {
                                    job: j,
                                    company_details: c
                                }
                            })
                            return res.status(200).json({
                                likes: like_ids,
                                status: "success",
                                data: result,
                            })
                        } else {
                            res.status(200).json({data: [], status: "success"})
                        }

                    })
                    .catch(error => res.status(500).json({error: error.message}))
            } else {
                res.status(200).json({data: [], status: "success"})
            }
        })
        .catch(error => res.status(500).json({error: error.message, status: "error"}))
})

app.route('/upload-jobs-file').post(auth.authenticate, async (req, res) => {
    const company_token = req.header('company-token');
    const user = JSON.parse(req.header('user'))
    if (user) {
        if (!company_token) {
            return res.status(401).json({
                error: 'Unauthorized please provide a valid company_token',
                status: 'error'
            });
        }
        if (user.company_token !== company_token) {
            return res.status(401).json({
                error: 'Unauthorized please provide a valid company_token',
            });
        }
        try {
            const response = await getCompany(company_token)
            if (!response) return res.status(401).json({
                error: 'Unauthorized please provide a valid company_token',
                status: 'error'
            });
            if (!req.body.jobs) {
                return res.status(400).json({
                    error: 'No jobs provided',
                    status: 'error'
                })
            } else {
                let all_data = req.body.jobs
                if (all_data.length > 30) {
                    return res.status(400).json({
                        error: 'exced limit',
                        status: 'error'
                    })
                } else {
                    all_data = all_data.map(job => {
                        job.company_id = response.id
                        return job
                    })
                    JobOffer.insertMany(all_data)
                        .then(function () {
                            return res.status(200).json({success: "success", status: 'all data uploaded'});
                        }).catch(function (error) {
                        return res.status(400).json({erron: "error when insert"});
                    });
                }
            }
        } catch (error) {
            return res.status(500).json({error: "error server", status: "error"})
        }
    }else {
        return res.status(401).json({
            error: 'Unauthorized',
            status: 'error'
        });
    }

})

app.route('/').post(auth.authenticate, async (req, res) => {
    const company_token = req.header('company-token');
    const user = JSON.parse(req.header('user'))
    if (user) {
        if (!company_token) return res.status(401).json({
            error: 'Unauthorized please provide a valid compnay_token',
            status: 'error'
        });
        if (user.company_token !== company_token) {
            return res.status(401).json({
                error: 'Unauthorized please provide a valid company_token',
            });
        }
        try {
            const company = await getCompany(company_token)
            if (company) {
                req.body.company_id = company.id;
            } else {
                return res.status(401).json({error: 'error server', status: "error"})
            }

        } catch (error) {
            return res.status(401).json({error: 'error server', status: "error"})
        }
        const job_offer = new JobOffer({
            ...req.body,
        })
        //If an end date is entered, we must ensure that the start date is greater than the end date
        if (req.body.date_end && req.body.date_start > req.body.date_end) {
            return res.status(400).json({"error": "The start date cannot be greater than the end date"})
        }
        //If an end date is entered, we must ensure that the end date is not empty
        if (req.body.date_end && req.body.date_end == null || req.body.date_end === '') {
            return res.status(500).json({error: 'The end date is empty'});
        } else {
            job_offer.save()
                .then(() => res.status(201).json({success: "Job offer successfully created"}))
                .catch(error => {
                    if (error.name === "ValidationError") {
                        return res.status(400).json(error.message);
                    } else {
                        return res.sendStatus(500).json(error.message);
                    }
                })
        }
     }else {
        return res.status(401).json({
            error: 'Unauthorized',
            status: 'error'
        });
     }
});

app.route('/stats').get(async (req, res) => {
    try {
        const stats = await JobOffer.aggregate([{$group: {_id: "$contract_type", count: {$count: {}}}}])
        if (stats) {
            res.status(200).json({data: stats})
        } else {
            return res.status(404).json({error: 'not found'})
        }
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})

app.route('/statsByCompany/:id').get(async (req, res) => {
    const {id} = req.params
    if (!id) {
        return res.status(400).json({error: 'Company id is required'})
    }

    try {
        const stats = await JobOffer.aggregate([{
            "$match": {
                "company_id": parseInt(id)
            }
        }, {$group: {_id: "$contract_type", count: {$count: {}}}}])
        if (stats) {
            res.status(200).json({data: stats})
        } else {
            return res.status(404).json({error: 'not found'})
        }
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})

app.route('/:id').get(async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({error: 'L\'object ID is not valid  : ' + req.params.id})
    }
    //Check if the current object id exists
    const job_offer_id_exists = await JobOffer.findOne({_id: req.params.id});
    if (!job_offer_id_exists) {
        return res.status(404).json({error: 'object ID not found'})
    } else {
        const company = await getCompanyById(job_offer_id_exists.company_id);
        if (company) {
            job_offer_id_exists.company_name = company.company_name
            job_offer_id_exists.company_logo = company.logo
            job_offer_id_exists.company_url = company.website
            await res.status(200).json({data: job_offer_id_exists, status: "success"})
        } else {
            res.status(500).json({error: "No company found"})
        }
    }
})

app.route('/job_for_applications').post(async (req, res) => {
    const {applications} = req.body;
    if (applications.length <= 0) {
        return res.status(400).json({error: 'Invalid application list'})
    }
    JobOffer.find({_id: {$in: applications}})
        .then(data => res.status(200).json({data: data, status: "success"}))
        .catch(error => res.status(500).json({error: error.message}))
})

app.route('/:id').patch(auth.authenticate, async (req, res) => {
    const user = JSON.parse(req.header('user'))
    if(user) {
        if ((user.company_id !== req.body.company_id)) {
            return res.status(401).json({error: 'Unauthorized'})
        }
        //If an end date is entered or modified, or si an start date is  entered,
        //we must ensure that the start date is greater than the end date
        if (req.body.date_start && req.body.date_end && req.body.date_start > req.body.date_end) {
            return res.status(400).json({error: 'The start date cannot be greater than the end date'})
        }

        //If an end date is entered, we must ensure that the end date is not empty
        if (req.body.date_end && req.body.date_end == null || req.body.date_end === '') {
            return res.status(500).json({error: 'The end date is empty'});
        }
        //Check if the current object id is valid
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).json({error: 'L\'object ID is not valid  : ' + req.params.id})
        }

        //Check if the current object id  exists
        const job_offer_id_exists = await JobOffer.findOne({_id: req.params.id});

        if (!job_offer_id_exists) {
            return res.status(404).json({error: 'object ID not found'})
        } else {
            console.log("new id ", req.body.company_id)
            if (job_offer_id_exists.company_id !== req.body.company_id) {
                return res.status(404).json({error: "you can't edit"})
            }
            await JobOffer.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
                .then(data => res.status(200).json({success: "Job offer successfully modified"}))
                .catch(error => {
                    if (error.name === "ValidationError") {
                        return res.status(400).json(error.message);
                    } else {
                        return res.sendStatus(500).json(error.message);
                    }
                })
        }
    }else {
        return res.status(401).json({error: 'Unauthorized'})
    }

})

app.route('/:id').delete(auth.authenticate, async (req, res) => {
    const user = JSON.parse(req.header('user'))
    if(user) {
        if(!req.params.id){
            return res.status(400).json({error: 'Invalid id'})
        }

        console.log("hello into delete")
        //Check if the current object id  is valid
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).json({error: 'L\'object ID is not valid  : ' + req.params.id})
        }
          //Check if the current object id  exists
        const job = await JobOffer.findOne({_id: req.params.id,company_id: user.company_id})
        if(job) {

            try {
                await JobOffer.findByIdAndUpdate(req.params.id, {is_active: false})
                    .then(res.status(200).json({success: "Offre d'emploi supprimée avec succès"}))
                    .catch(error => res.status(404).json({error: error.message}));
            } catch (err) {
                return res.status(400).json({error: 'L\'object ID is not valid '})
            }
        }else {
            return res.status(401).json({error: 'Unauthorized'})
        }

    }else {
        return res.status(401).json({error: 'Unauthorized'})
    }
})

app.route('/company/:id').get(auth.authenticate, async (req, res) => {
    const {page = 1, limit = 10} = req.query
    const {id} = req.params
    if (id) {
        let filter = [{company_id: id, is_active: true}];
        const count = await JobOffer.countDocuments({$and: filter});
        const totalJob = await JobOffer.count({$and: filter});
        let result = []
        JobOffer.find({
            $and: filter,
        }).sort({updated_at: -1})
            .limit(limit)
            .skip((page - 1) * limit)
            .then(async (data) => {
                const company = await getCompanyById(id)
                if (company) {
                    result = data.map(job => {
                        job.company_name = company.company_name,
                            job.company_logo = company.logo,
                            job.company_url = company.website
                        return job
                    })
                    res.status(200).json({
                        data: result,
                        totalPages: Math.ceil(count / limit),
                        currentPage: page,
                        totalJobs: totalJob
                    })
                } else {
                    res.status(200).json({
                        data: [],
                        totalPages: 0,
                        currentPage: 0,
                        totalJobs: 0
                    })
                }
            })
            .catch(error => {
                console.log("-4")
                res.status(500).json({error: error.message})
            })
    } else {
        return res.status(404).json({error: 'company ID not provide'})
    }

});

app.route('/getJobsByCompany/:id').get(async (req, res) => {
    const {id} = req.params
    if (id) {
        let filter = [{company_id: id}];
        JobOffer.find({
            $and: filter,
        })
            .then(async (data) => {
                res.status(200).json({
                    data: data,
                    status: 'success'
                })
            })
            .catch(error => {
                res.status(500).json({error: error.message})
            })
    } else {
        return res.status(404).json({error: 'company ID not provide'})
    }

});


module.exports = app
