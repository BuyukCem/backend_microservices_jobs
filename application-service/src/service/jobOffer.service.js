import {Op} from "sequelize";
import axios from "axios";

export default {
    findbyId: async (id) => {
        // FONCTION non utilisée , (faux)
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: process.env.JOB_OFFER_MICRO_SERVICE_URL + "/jobs_offers/".concat(id),
                headers: {
                    "X-Auth-Token": process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json"
                }
            }).then(response => {
                 if(response.data && response.data.data) {
                    return resolve(response.data.data)
                }else{
                    return reject({
                        status: "Error",
                        message: "Error in findbyId"
                    })
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        })

    },
    findCompanyJoboffers: async (company_token) => {
        return axios({
            method: 'GET',
            url: process.env.JOB_OFFER_MICRO_SERVICE_URL + "/jobs_offers/company",
            headers: {
                "company-token": company_token,
                "X_Auth_Token": process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN,
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            console.log(error);
            return  error;
        })
    },

    findApplicationJobsById: async (id) => {
        return axios({
            method: 'GET',
            url: process.env.JOB_OFFER_MICRO_SERVICE_URL + "/jobs_offers/getJobsByCompany/"+id,
            headers: {
                "X_Auth_Token": process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN,
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            console.log(error);
            return  error;
        })
    },

    findApplicationJobs: async (application_list) => {
        const data = {
            applications: application_list
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: process.env.JOB_OFFER_MICRO_SERVICE_URL + "/jobs_offers/job_for_applications",
                headers: {
                    "X_Auth_Token": process.env.JOB_OFFER_MICRO_SERVICE_X_AUTH_TOKEN,
                },
                data: data
            }).then(response => {
                resolve(response.data.data)
            }).catch(error => {
                console.log(error);
                reject(error);
            })
        })
        
    },
}
