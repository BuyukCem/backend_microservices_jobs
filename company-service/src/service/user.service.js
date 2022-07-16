import {Op} from "sequelize";
import axios from "axios";

export default {

    findUsers:  (data) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: process.env.USER_MICRO_SERVICE_URL + "/user-by-applications",
                headers: {
                    "X_Auth_Token": process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json"
                },
                data: data
            }).then(response => {
                resolve(response.data.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }
}


