import bcrypt from "bcryptjs";
import axios from "axios";

const jwt = require('jsonwebtoken');

export default {
    findUserById: async (id) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: process.env.USER_MICRO_SERVICE_URL + "/user/" + id,
                headers: {
                    "X_Auth_Token": process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json",

                }
            }).then((response) => {
                resolve(response.data.data.user)
            }).catch((error) => {
                reject('User not found')
            })
        })
    },
    findUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: process.env.USER_MICRO_SERVICE_URL + "/user/email/",
                data: {
                    email: email
                },
                headers: {
                    "X_Auth_Token": process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    create: (user) => {
        console.log(1.1)
        console.log(process.env.USER_MICRO_SERVICE_URL)
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: process.env.USER_MICRO_SERVICE_URL + "/user",
                data: user,
                headers: {
                    "X_Auth_Token": process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                console.log(1.2)
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    },
    generateRefreshToken: (data) => {
        return jwt.sign({
            id: data.id,
            email: data.email,
            expiresIn: "24h",
            role: data.role
        }, process.env.REFRESH_TOKEN);
    },
    generateaAccessToken: (data) => {
        return jwt.sign({
            id: data.id,
            email: data.email,
            expiresIn: "2h",
            role: data.role
        }, process.env.ACCESS_TOKEN);
    },
    verifyRefreshToken: (data) => {
        try {
            const decoded = jwt.verify(data.refreshToken, process.env.REFRESH_TOKEN);
            if (decoded)
                return decoded;
            else
                return false;
        } catch (error) {
            return false;
        }
    },
    comparePassword: async (password, hash) => {
        return bcrypt.compare(password, hash);
    },
    verifiedAccount: (token) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: process.env.USER_MICRO_SERVICE_URL + "/user/verify-account",
                data: {
                    "activationToken": token
                },
                headers: {
                    "X_Auth_Token": process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    resetPassword: (token, password) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: process.env.USER_MICRO_SERVICE_URL + "/user/reset-password",
                data: {
                    "resetToken": token,
                    "password": password
                },
                headers: {
                    "X_Auth_Token": process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    updateUser: (id, userData) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'PATCH',
                url: process.env.USER_MICRO_SERVICE_URL + "/user/" + id,
                data: userData,
                headers: {
                    "X_Auth_Token": process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    forgotPassword: (email) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: process.env.USER_MICRO_SERVICE_URL + "/user/forgot-password",
                data: {
                    "email": email,
                },
                headers: {
                    "X_Auth_Token": process.env.USER_MICRO_SERVICE_X_AUTH_TOKEN,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}
