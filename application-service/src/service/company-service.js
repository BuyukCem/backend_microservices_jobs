import axios from "axios";

module.exports.getCompanyById = async (company_id) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: process.env.COMPANY_MICRO_SERVICE_URL + "/company/"+company_id,
            headers: {
                "X_Auth_Token": process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN,
                "Content-Type": "application/json",
            }
        }).then((res) => {
            return resolve(res.data.data)
        }).catch((err) => {
            console.log(err)
            if (err.response) {
                return reject(err.response.data)
            } else if (err.request) {
                return reject(err.request)
            } else {
                return reject(err.message)
            }
            return reject(err.config)
        })
    })
}

module.exports.getCompaniesMultiple = async (company_ids) => {
    const data = {
        ids: company_ids
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: process.env.COMPANY_MICRO_SERVICE_URL + "/company/multiples",
            headers: {
                "X_Auth_Token": process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN,
                "Content-Type": "application/json",
            },
            data: data
        }).then((res) => {
            return resolve(res.data.data)
        }).catch((err) => {
            console.log(err)
            if (err.response) {
                return reject(err.response.data)
            } else if (err.request) {
                return reject(err.request)
            } else {
                return reject(err.message)
            }
            return reject(err.config)
        })
    })
}

module.exports.getCompanyByCompany_token = async (company_token) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: process.env.COMPANY_MICRO_SERVICE_URL + "/company",
            headers: {
                "X_Auth_Token": process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN,
                "Content-Type": "application/json",
                "company-token": company_token
            }
        }).then((res) => {
            return resolve(res.data.data)
        }).catch((err) => {
            if (err.response) {
                return reject(err.response.data)
            } else if (err.request) {
                return reject(err.request)
            } else {
                return reject(err.message)
            }
            return reject(err.config)
        })
    })
}
