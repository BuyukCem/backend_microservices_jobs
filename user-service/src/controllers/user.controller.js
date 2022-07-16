import UserService from '../services/user.service.js'
import {ApplicationError} from "../helpers/errors.helper";
import jwt from "jsonwebtoken";
import {S3Uploader} from "./../lib/s3Uploader"
import {s3} from "./../config/S3.config";
import {check_base64} from './../validator/user.validator';
import crypto from "crypto";
import {sendResetPasswordToken} from "../services/email.service";
import bcrypt from "bcryptjs";
import {base64MimeType} from "../utils/base64-mime";

exports.findAllUsers = async (req, res, next) => {
    try {
        const users = await UserService.findByParams({role: 'USER'});
        if (!users) {
            res.status(200).json({
                status: 'error',
                message: 'User not found'
            });
        }
        const data = users.map((user) => {
            let {password, activateToken,resetToken, ...newObj} = user;
            return newObj
        })
        res.status(200).json({
            status: 'success',
            message: 'Users successfully retrieved',
            data: data,
        });
    } catch (error) {
        // throw new ApplicationError(500, error);
        res.status(500).json({
            status: 'error',
            message: 'Error when retrieving users'
        });
    }
};
exports.findById = async (req, res, next) => {
    try {
        const user = await UserService.find({id: req.params.id});
        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: 'User successfully retrieved',
                data: {user},
            });
        }
    } catch (error) {
        res.status(200).json({
            status: 'Error',
            message: 'User not found',
        });
        // throw new ApplicationError(500, error);
    }
};
// TODO : VOIR CETTE FONCTION ELLE SERT À RIEN
exports.getAuthUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const userData = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await UserService.find({id: userData.id});
        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'there is no user',
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'User successfully retrieved',
            data: {user},
        });
    } catch (error) {
        throw new ApplicationError(500, error);
    }
};
exports.deleteUser = async (req, res, next) => {
    const u = JSON.parse(req.header('user'))
    console.log('id === ', u.id)
    console.log('id 2 ', req.params.id)
    if(u) {
        if(parseInt(req.params.id) !== u.id && u.role !== "ADMIN"){
                return res.status(400).json({
                    status: "error",
                    message: "unauthorized"
                })
        }else {
            try {
                const user = await UserService.delete(req.params.id);
                if (!user) {
                    return res.status(401).json({
                        status: 'error',
                        message: 'there is no user',
                    });
                } else {
                    return res.status(200).json({
                        status: 'success',
                        message: 'User successfully deleted',
                    });
                }
            } catch (error) {
                return res.status(400).json({
                    status: 'error',
                    message: "Error delete user",
                });
                //   throw new ApplicationError(500, error);
            }
        }
    }else {
        return res.status(400).json({
            status: "error",
            message: "unauthorized"
        })
    }

};
exports.updateUser = async (req, res, next) => {

    try {
        const uploader = new S3Uploader(s3, {
            /*
            uploadParams: {
               CacheControl: 'max-age:31536000',
               ContentDisposition: 'inline',
            },*/
        }, process.env.AWS_BUCKET_NAME);

        if (req.body.image_user_profile && !check_base64(req.body.image_user_profile)) {
            let contentType = base64MimeType(req.body.image_user_profile);
            const image_user_profile_upload = await uploader.upload(req.body.image_user_profile.replace(/^data:image\/\w+;base64,/, ""), contentType, 'user_service/image_user_profile');
            req.body.image_user_profile = image_user_profile_upload.key;
        }

        if (req.body.cover_cv && !check_base64(req.body.cover_cv)) {
            let contentType = base64MimeType(req.body.cover_cv);
            if (contentType === 'application/pdf') {
                const data = req.body.cover_cv.replace(/^data:application\/\w+;base64,/, "")
                const cover_cv_upload = await uploader.upload(data, contentType, 'user_service/cover_cv');
                req.body.cover_cv = cover_cv_upload.key;
            } else if (contentType === 'image/jpeg' || contentType === 'image/png' || contentType === 'image/jpg') {
                const cover_cv_upload = await uploader.upload(req.body.cover_cv.replace(/^data:image\/\w+;base64,/, ""), contentType, 'user_service/cover_cv');
                req.body.cover_cv = cover_cv_upload.key;
            } else {
                res.status(400).json({
                    status: 'error',
                    message: 'cover_cv must be a pdf or a jpeg, jpg or png',
                });
            }
        }
        const u = JSON.parse(req.header('user'))
        if(u.id === parseInt(req.params.id) || u.role == 'ADMIN') {
            const user = await UserService.update(req.params.id, req.body);
            if (user === 0) {
                res.status(200).json({
                    status: 'error',
                    message: 'There is no user',
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'User successfully updated',
                    data: {user}
                });
            }
        }else {
            return res.status(200).json({
                status: 'success',
                message: "Can't update this user"
            });
        }
    } catch (error) {
        console.log(error)
        res.status(200).json({
            status: 'success',
            message: error.message
        });
    }
};

exports.findByEmail = async (req, res, next) => {
    await UserService.find({'email': req.body.email}).then((response) => {
        res.status(200).json({
            status: 'success',
            message: 'User successfully retrieved',
            data: response
        });
    }).catch((error) => {
        res.status(200).json({
            status: 'error',
            message: 'User not found',
        });
    });
};

exports.createUser = async (req, res, next) => {
    const uploader = new S3Uploader(s3, {
        /*
        uploadParams: {
           CacheControl: 'max-age:31536000',
           ContentDisposition: 'inline',
        },*/
    }, process.env.BUCKET_NAME);
    if (req.body.image_user_profile && !check_base64(req.body.image_user_profile)) {
        const image_user_profile_upload = await uploader.upload(req.body.image_user_profile.replace(/^data:image\/\w+;base64,/, ""), 'user_service/image_user_profile');
        req.body.image_user_profile = image_user_profile_upload.key;
    }
    if (req.body.cover_image && !check_base64(req.body.cover_image)) {
        const cover_image_upload = await uploader.upload(req.body.cover_image.replace(/^data:image\/\w+;base64,/, ""), 'user_service/cover_image');
        req.body.cover_image = cover_image_upload.key;
    }

    if(req.body.role) {
        return res.status(404).json({
            status: 'you can\'t ',
            message: "LOL !!!!!!!!!!"
        });
    }

    await UserService.create(req.body).then((data) => {
        res.status(200).json({
            status: 'success',
            message: 'User successfully created',
            data: data
        });
    }).catch((error) => {
        if (req.body.image_user_profile) {
            uploader.deleteObject(req.body.image_user_profile, 'user_service/image_user_profile')
        }
        if (req.body.cover_image) {
            uploader.deleteObject(req.body.cover_image, 'user_service/cover_image')
        }
        res.status(404).json({
            status: 'error',
            message: error
        });
    });
};
exports.verifyAccount = async (req, res, next) => {
    await UserService.find({activateToken: req.body.activationToken})
        .then((user) => {
            if (user.length === 0) {
                res.status(200).json({
                    status: 'error',
                    message: 'Account activation failed'
                });
            } else {
                UserService.update(user.dataValues.id, {
                    activateToken: null,
                    isActive: true
                }).then((data) => {
                    res.status(200).json({
                        status: 'success',
                        message: 'User successfully activated',
                        data: data
                    });
                }).catch((error) => {
                    res.status(400).json({
                        status: 'error',
                        message: 'Account activation failed'
                    });
                });
            }
        }).catch((error) => {
            res.status(400).json({
                status: 'error',
                message: 'Account activation failed'
            });
        });
};
exports.resetPassword = async (req, res, next) => {
    await UserService.find({resetToken: req.body.resetToken})
        .then((user) => {
            if (user.length === 0) {
                res.status(200).json({
                    status: 'error',
                    message: 'Password reset failed'
                });
            } else {
                console.log('user ',user)
                UserService.update(user.dataValues.id, {
                    resetToken: null,
                    password: req.body.password
                }).then((data) => {
                    res.status(200).json({
                        status: 'success',
                        message: 'Password successfully reset',
                        data: data
                    });

                }).catch((error) => {
                    res.status(400).json({
                        status: 'error',
                        message: 'Password reset failed'
                    });
                });
            }
        }).catch((error) => {
            res.status(400).json({
                status: 'error',
                message: 'Password reset failed'
            });
        });
};
exports.forgotPassword = async (req, res, next) => {
    await UserService.find({email: req.body.email})
        .then(async (user) => {
            try {
                const resetToken = crypto.randomBytes(40).toString('hex');
                await UserService.update(user.dataValues.id, {resetToken: resetToken}).then((response) => {
                    sendResetPasswordToken(response.dataValues);
                    res.status(200).json({
                        status: 'success',
                        message: 'Password reset link sent to your email'
                    });
                }).catch((err) => {
                    res.status(500).json({
                        status: 'error',
                        message: 'error when resetting password'
                    });
                })
            } catch (err) {
                res.status(500).json({
                    status: 'error',
                    message: 'error when resetting password'
                });
            }
        }).catch((error) => {
            res.status(400).json({
                status: 'error',
                message: 'Password reset failed'
            });
        });

};

exports.findApplicationUsers = async (req, res, next) => {
    const {application_users} = req.body;
    try {
        const users = await UserService.findByParams({id: application_users,isActive: true});
        if (!users) {
            res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        } else {
            const data = users.map((user) => {
                let {password, activateToken,resetToken, ...newObj} = user;
                return newObj
            })
            res.status(200).json({
                status: 'success',
                message: 'User successfully retrieved',
                data: data,
            });
        }
    } catch (error) {
        res.status(200).json({
            status: 'Error',
            message: 'User not found',
        });
    }
}


