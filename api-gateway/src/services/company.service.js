import bcrypt from "bcryptjs";
import axios from "axios";

const jwt = require('jsonwebtoken');

export default {
    findbyUserId: async (id) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: process.env.COMPANY_MICRO_SERVICE_URL + "/company/user/" + id,
                headers: {
                    "X_Auth_Token": process.env.COMPANY_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json",
                }
            }).then((response) => {
                resolve(response.data.data)
            }).catch((error) => {
                reject('Company not found')
            })
        })
    }
}
