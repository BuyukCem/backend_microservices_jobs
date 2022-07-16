import ApplicationService from '../service/application.service';

const {getCompanyByCompany_token, getCompanyById} = require('../service/company-service');
const {validateUser, validateJobOffer} = require('../externalValidator/index.validator');
import jobOfferService from '../service/jobOffer.service';
import companyService from '../service/company-service';
import userService from '../service/user.service';
import {sendMessage} from '../service/email.service'

exports.createApplication = async (req, res, next) => {
    const user = JSON.parse(req.header('user'))
    if(req.body.user_id !== user.id){
        res.status(400).json({
            status: "error",
            message: "unauthorized"
        })
    }else{
        try {
            const userValisation = await validateUser(req.body.user_id)
            if (userValisation.isValid == false) {
                return res.status(400).json({
                    message: "Candidate id not found",
                })
            }
            // TODO decommenet this when the job offer is ready
            const jobValidation = await validateJobOffer(req.body.offer_id)
            if (jobValidation && jobValidation.isValid == false) {
                return res.status(400).json({
                    message: "Job offer id not found",
                })
            }

            if (!req.body.resume || req.body.resume === null || req.body.resume === '') {
                return res.status(400).json({
                    message: "Resume not provide",
                })
            }
        } catch (e) {
            return res.status(400).json({
                message: "Error serveur"
            })
        }
        const oldApplication = await ApplicationService.findByParams({user_id: req.body.user_id, offer_id: req.body.offer_id})
        if(oldApplication && oldApplication.length > 0) {
            return res.status(400).json({
                message: "Already apply to this job",
            })
        }else {

            ApplicationService.create(req.body)
            .then(application => {
                res.status(201).json({
                    message: "Application created successfully",
                    data: application
                })
            })
            .catch(err => {
                res.status(400).json({
                    status: "error",
                    message: "Error creating application",
                })
            })
        }

    }

};
exports.getApplication = async (req, res, next) => {
    ApplicationService.findById({id: req.params.id})
        .then(application => {
            if (!application) {
                return res.status(404).json({
                    status: "error",
                    message: "Application not found",
                })
            }
            res.status(200).json({
                message: "Application found",
                data: application
            })
        })
        .catch(err => {
            res.status(500).json({
                status: "error",
                message: "Error getting application",
            })
        })
};
exports.getApplicationByJobOffer = async (req, res, next) => {
    /* TODO finnd job id existe */
    /*
    const jobValidation = await validateJobOffer(req.body.jobOfferId, req.body.userId)
    if (jobValidation.isValid == false) {
        return res.status(400).json({
            message: "Job offer id not found",
        })
    }*/
    ApplicationService.findById({offer_id: req.params.id}).then(application => {
        if (!application) {
            return res.status(404).json({
                status: "error",
                message: "Application not found",
            })
        }
        res.status(200).json({
            message: "Application found",
            data: application
        })
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                status: "error",
                message: "Error getting application",
            })
        })
}
exports.updateApplication = async (req, res, next) => {
    if(!req.headers.user){
        if(req.body.user !== req.headers.user.id){
            res.status(400).json({
                status: "error",
                message: "unauthorized"
            })
        }
    }
    const application = await  ApplicationService.findById({id : req.params.id})
    if(application) {
        if(req.headers.user.role == 'USER'){
            if(application.user_id !== req.headers.user.id) {
                res.status(400).json({
                    status: "error",
                    message: "unauthorized"
                })
            }
        }
        else if(req.headers.user.role === 'CLIENT'){
            const jobs = await jobOfferService.findbyId(application.offer_id);
            if(!jobs){
                res.status(400).json({
                    status: "error",
                    message: "unauthorized"
                })
            }else {
                if(req.params.user.company_id !== jobs.company_id){
                    res.status(400).json({
                        status: "error",
                        message: "unauthorized"
                    })
                }
            }

        }
    }else {
        res.status(400).json({
            status: "error",
            message: "unauthorized"
        })
    }

    await ApplicationService.update(req.params.id, req.body).then(data => {
        if (data === 0) {
            res.status(400).json({
                status: 'error',
                message: 'Application not found',
                data: data
            });
        } else {
            const application = data.dataValues;
            if(application) {
                userService.findbyId(application.user_id).then(function(data) {
                    if(data && data.data && data.data.user) {
                        const user = data.data.user;
                        sendMessage(user)
                    }
                })
            }
            res.status(200).json({
                status: 'success',
                message: 'Application updated successfully',
                data: data
            });
        }
    }).catch(err => {
        res.status(500).json({
            status: err.status,
            message: 'Error updating Application',
        });
    });

}

exports.getUserApplications = (req, res, next) => {
    const user = JSON.parse(req.headers.user)
    const current_id = req.params.id;
    if (!current_id) {
        return res.status(400).json({
            status: "error",
            message: "User id not found",
        })
    }
    if(user.role == 'USER'){
        if(parseInt(current_id) !== user.id){
            return res.status(400).json({
                status: "error",
                message: "unauthorized"
            })
        }
    }

    //const count = await JobOffer.countDocuments({$and: filter});
    //const totalJob = await JobOffer.count({$and: filter});
    // const count = await ApplicationService.countByParams({user_id: req.params.id});
    ApplicationService.findByParams({user_id: current_id})
        .then(async application => {
            if (!application) {
                res.status(404).json({
                    status: "error",
                    message: "Application not found",
                });
            } else {
                const application_ids = application.map( application => application.offer_id)
                try {
                    const jobs = await jobOfferService.findApplicationJobs(application_ids);
                    if(jobs && jobs.length > 0) {
                        const companies_ids = jobs.map(job => job.company_id)
                        const companies = await companyService.getCompaniesMultiple(companies_ids)
                        if(companies) {
                            const result = application.map( app => {
                                const j = jobs.filter( job => job._id == app.offer_id)
                                app.job = j[0]
                                const c = companies.filter(c => c.id == j[0].company_id)
                                const company = {
                                    company_name: c[0].company_name,
                                }
                                Object.assign(app, company)
                                return app
                            })
                            return res.status(200).json({
                                status: "success",
                                message: "Applications found",
                                data: result
                            })
                        }else {
                            res.status(404).json({
                                status: "error",
                                message: "Application not found",
                            });
                        }
                    }else {
                        res.status(404).json({
                            status: "error",
                            message: "Application not found",
                        });
                    }

                }
                catch (err) {
                    res.status(404).json({
                        status: "error",
                        message: "Application not found",
                    });
                }

            }

        }).catch(err => {
        res.status(500)
            .json({status: "error", message: "Error getting applications"});
    })
}

exports.getApplicationsForCompany = async (req, res, next) => {
    if (!req.headers['company-token']) {
        return res.status(400).json({
            status: "error",
            message: "Company token not found",
        })
    }
    const {jobs} = req.body
    if (jobs) {
        const data = jobs.map(jobOffer => jobOffer._id)
        ApplicationService.findByParams({offer_id: data}).then(application => {
            if (!application) {
                res.status(404).json({
                    status: "error",
                    message: "Application not found",
                });
            } else {
                res.status(200).json({status: "success", data: application});
            }
        }).catch(err => {
            res.status(500).json({
                status: "error",
                message: "Error getting applications"
            });
        })
    } else {
        return res.status(400).json({
            status: "error",
            message: "Provide job list",
        })
    }


}

exports.getJobApplications = async (req, res, next) => {
    if (!req.headers['company-token']) {
        return res.status(400).json({
            status: "error",
            message: "Company token not found",
        })
    }
    const job_id = req.params.id
    if (job_id) {
        ApplicationService.findByParams({offer_id: job_id}).then(async application => {
            if (!application) {
                res.status(404).json({
                    status: "error",
                    message: "Application not found",
                });
            } else {
                const ids = application.map(app => app.user_id)
                const users_resp = await userService.findUsers({application_users: ids})
                const users = users_resp.data
                if(users.length > 0) {
                    let applications = application.map(app_item => {
                        const user = users.find(user => user.id === app_item.user_id)
                        const object = {
                            user: user
                        }
                        const final = Object.assign(app_item, object)
                        return final;
                    })
                    res.status(200).json({status: "success", data: applications});
                } else {
                    res.status(200).json({status: "success", data: []});
                }
            }
        }).catch(err => {
            res.status(500).json({
                status: "error",
                message: "Error getting applications"
            });
        })
    } else {
        return res.status(400).json({
            status: "error",
            message: "Provide job id",
        })
    }

}

exports.getApplicationStats = async (req, res, next) => {
    ApplicationService.findStats().then((response) => {
        return  res.status(200).json({status: "success", data: response});
    })
    .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Error getting applications"
        });
    })
}

exports.getApplicationStatsByCompany = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({
            status: "error",
            message: "Company id not found",
        })

    }

    try {
        const jobs = await jobOfferService.findApplicationJobsById(req.params.id)
        if(jobs.data) {
            const ids = jobs.data.map(job => job._id)
            ApplicationService.findStatsByCompany(ids).then((response) => {
                return  res.status(200).json({status: "success", data: response});
            })
            .catch((err) => {
                res.status(500).json({
                    status: "error",
                    message: "Error getting applications"
                });
            })
        }else {
            res.status(500).json({
                status: "error",
                message: "Error getting applications"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error getting applications"
        });
    }

}
