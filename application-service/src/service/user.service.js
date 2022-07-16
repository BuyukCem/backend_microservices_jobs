import {Op} from "sequelize";
import axios from "axios";

export default {
    findbyId: async (id) => {
        console.log(process.env.USER_MICRO_SERVICE_URL + "/user/".concat(id));
        try {
            const user = await axios({
                method: 'GET',
                url: process.env.USER_MICRO_SERVICE_URL + "/user/".concat(id),
                headers: {
                    "X_Auth_Token": process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json"
                }
            })
            console.log(user)
            return user.data;
        } catch (e) {
            return {
                status: "Error",
                message: "Error in findbyId"
            }
        }

    },

    findUsers:  (data) => {
        return  axios({
                method: 'POST',
                url: process.env.USER_MICRO_SERVICE_URL + "/user-by-applications",
                headers: {
                    "X_Auth_Token": process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json"
                },
                data: data
            }).then(response => {
                return response.data;
            })
            .catch(err => {
                return {
                    status: "Error",
                    message: "Error in find users"
                }
            })
    }
}


