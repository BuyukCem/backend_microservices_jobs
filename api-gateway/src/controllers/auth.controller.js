import UserService from "../services/user.service";
import crypto from "crypto";

const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(200).json({
            message: 'wrong user or password',
            status: 400,
            success: false
        });
    }

    await UserService.findUserByEmail(req.body.email).then(async (response) => {
        if (response.data) {
            if (response.data.isActive == true) {
                const resp = await UserService.comparePassword(req.body.password, response.data.password)
                if (!resp) {
                    res.status(401).json({
                        status: 'error',
                        message: "wrong user or password",
                    });
                } else {
                    res.status(200).json({
                        status: 'success',
                        refreshToken: UserService.generateRefreshToken(response.data),
                        accessToken: UserService.generateaAccessToken(response.data),
                        role: response.data.role
                    });
                }
            } else {
                res.status(401).json({
                    status: 'error',
                    message: "Please verify your email",

                });
            }
        } else {
            res.status(401).json({
                status: 'error',
                message: "wrong user or password",
            });
        }
    }).catch((err) => {
        res.status(401).json({
            status: 'error',
            message: err.message,
        });
    });
}
exports.signup = async (req, res) => {
    // TODO: mettre dans un middleware validator
    const email = req.body.email;
    const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email_regex.test(email)) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation error: Must be a Valid email',
        });
    }
    const password = req.body.password;
    const password_regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!password_regex.test(password)) {
        return res.status(400).json({
            status: 'error',
            message: 'Password must contain minimu 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
        });
    }
    await UserService.create(req.body).then((response) => {
        console.log(2)
        res.status(200).json({
            status: 'success',
            message: 'user created successfully',
        });
    }).catch((err) => {
        console.log(3)
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    })
}
exports.refreshToken = async (req, res) => {
    if (!req.body.refreshToken) {
        res.status(401).json({
            status: 'error',
            error: {
                message: "refresh token is invalid or has expired.",
            }
        });
    }

    const decoded = UserService.verifyRefreshToken(req.body)
    if (!decoded) {
        res.status(401).json({
            status: 'error',
            error: {
                message: "refresh token is invalid or has expired.",
            }
        });
    } else {
        res.status(200).json({
            status: 'success',
            refreshToken: UserService.generateRefreshToken(decoded)
        });
    }
}
exports.activateAccount = async (req, res) => {
    await UserService.verifiedAccount(req.body.activationToken).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'Account activated successfully'
        });
    }).catch((err) => {
        res.status(400).json({
            status: 'error',
            message: 'Account activation failed'
        });
    })
}
exports.forgotPassword = async (req, res) => {
    const {email} = req.body;
    if(email) {
        const data = await UserService.findUserByEmail(email)
        if(data.data) {
            UserService.forgotPassword(data.data.email).then(() => {
                res.status(200).json({
                    status: 'success',
                    message: 'Password reset link sent to your email'
                });
            }).catch((err) => {
                res.status(400).json({
                    status: 'error',
                    message: err.message
                });
            })
        }else {
            res.status(400).json({
                status: 'error',
                message: 'Veuillez mettre un email valid'
            });
        }
    }else {
        res.status(400).json({
            status: 'error',
            message: 'Veuillez mettre un email valid'
        });
    }

}
exports.resetPassword = async (req, res) => {
    await UserService.resetPassword(req.body.resetToken, req.body.password).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'Password reset successfully'
        });
    }).catch((err) => {
        res.status(400).json({
            status: 'error',
            message: 'Password reset failed'
        });
    })
}
exports.changePassword = async (req, res) => {
    if (!req.body.oldPassword || !req.body.password) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide old or new password'
        });
    }
    const user_id = req.body.user_id;
    const confirm_password = req.body.confirmPassword;
    const password = req.body.password;
    const old_password = req.body.oldPassword;
    const user = await UserService.findUserById(user_id);
    const comparaison = await UserService.comparePassword(old_password, user.password)
    if (comparaison) {
        if (password === confirm_password) {
            await UserService.updateUser(user_id, {password: password})
                .then(() => {
                    res.status(200).json({
                        status: 'success',
                        message: 'Mot de passe changé avec success'
                    });
                }).catch((err) => {
                    res.status(400).json({
                        status: 'error',
                        message: 'Modification échouée'
                    });
                })
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Les mots de passe ne sont pas conforme'
            });
        }
    } else {
        res.status(200).json({
            status: 'error',
            message: 'L\'ancien mot de passe n\'est pas correcte'
        });
    }
}
exports.test = async (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'test',
    });

}
