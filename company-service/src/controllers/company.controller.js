import CompanyService from '../service/company.service.js';
import {uploader} from '../app';
import {check_base64} from '../validator/company.validator'
import {s3} from "./../config/S3.config";
import {S3Uploader} from "./../lib/s3Uploader";
import {companyValidator} from "../validator/company.validator";
import {getSirene} from "./../lib/sireneApi";
import {base64MimeType} from "../utils/base64-mime";
import userService from '../service/user.service'

exports.createCompany = async (req, res, next) => {
    companyValidator(req, res, next);

    //  const inseeCompany = await getSirene(req.body.siret);
    //if(!inseeCompany) {
    //    res.status(404).json({
    //        message: 'Invalid siret',
    //        status: 404
    //    });
    //}else {
    // if(inseeCompany.etablissement && inseeCompany.etablissement.siren === req.body.siren) {
    const uploader = new S3Uploader(s3, {
        /*
        uploadParams: {
           CacheControl: 'max-age:31536000',
           ContentDisposition: 'inline',
        },*/
    }, process.env.AWS_BUCKET_NAME);

    if (req.body.logo && !check_base64(req.body.logo)) {
        const logo = await uploader.upload(req.body.logo.replace(/^data:image\/\w+;base64,/, ""), 'company_service/logo');
        req.body.logo = logo.key;
    }

            if (req.body.cover_image && !check_base64(req.body.cover_image)) {
                const cover_image_upload = await uploader.upload(req.body.cover_image.replace(/^data:image\/\w+;base64,/, ""), 'company_service/cover_image');
                req.body.logo = cover_image_upload.key;
            }
            CompanyService.create(req.body).then(resData => {
                CompanyService.postCompanyUser(req.body)
                    .then(data => {
                        CompanyService.update(resData.id, {user_account_id: data.data.id}).then(updataData => {
                            res.status(200).json({
                                status: 'success',
                                data: resData,
                                message: 'Company created successfully'
                            });
                        }).catch(err => {
                            res.status(400).json({
                                status: 'error',
                                message: 'Error when creating company: ' + err.message
                            });
                        })
                    }).catch(err => {
                            CompanyService.delete(resData.dataValues.id)
                                .then(data => {
                                    res.status(400).json({
                                        message: 'Error when creating company: ' + err.message,
                                        status: err.status
                                    });
                                    /* TODO: Supprimer le logo sur S3
                                    uploader.deleteObject(req.body.logo, "company_service/logo").then(data => {


                        res.status(400).json({
                            message: 'Error when creating company: ' + err.message,
                            status: err.status
                        });

                                    }).catch(err => {
                                        res.status(400).json({
                                            message: 'Error when creating company: ' + err.message,
                                            status: err.status
                                        });
                                    });
                                    */
                                })
                                .catch(error => {
                                    res.status(400).json({
                                        message: 'Error when creating company: ' + err.message,
                                        status: err.status
                                    });
                                })
                        });
                    });

    //}else {
    //    res.status(404).json({
    //        message: 'Invalid siren',
    //        status: 404
    //    });
    //}
    //}
};

exports.getCompany = async (req, res, next) => {
    await CompanyService.findAll({}).then(async data => {
        const ids = data.filter(company => company.user_account_id).map(company => company.user_account_id)
        const users = await  userService.findUsers({application_users: ids})
        if(users) {
            let newCompanies = data.map(company => {
                const user = users.find(user => user.id === company.user_account_id)
                if(!user) {
                    return undefined;
                }else {
                    company.isActive = user.isActive
                    return company
                }
            })
            newCompanies = newCompanies.filter(company => company)
            res.status(200).json({
                status: 'success',
                message: 'Company fetched successfully',
                data: newCompanies
            });
        }else {
            res.status(400).json({
                status: 'error',
                message: "Company not found",
            });
        }

    }).catch(err => {
        res.status(400).json({
            status: 'error',
            message: "Company not found",
        });
    });
};

exports.getCompanyByToken = async (req, res, next) => {
    const company_token = req.header('company-token')
    if(!company_token) {
        res.status(400).json({
            status: 'error',
            message: "Company not provided",
        });
    }else {
        await CompanyService.find({company_token: company_token}).then(data => {
            res.status(200).json({
                status: 'success',
                message: 'Company fetched successfully',
                data: data
            });
        }).catch(err => {
            res.status(400).json({
                status: 'error',
                message: "Company not found",
            });
        });
    }

};

exports.getCompanyById = async (req, res, next) => {
    const {id} = req.params
    if(id) {
        await CompanyService.find({id: req.params.id}).then(data => {
            res.status(200).json({
                status: 'success',
                message: 'Company fetched successfully',
                data: data
            });
        }).catch(err => {
            res.status(400).json({
                status: 'error',
                message: "Company not found",
            });
        });
    }else {
        res.status(400).json({
            status: 'error',
            message: "Company id not provided",
        });
    }
};

exports.getCompanyDetail = async (req, res, next) => {
    const {id} = req.params
    if(id) {
        await CompanyService.find({id: req.params.id}).then(data => {
            const {siren, siret,email,company_token,phone,kbis, ...newData} = data
            res.status(200).json({
                status: 'success',
                message: 'Company fetched successfully',
                data: newData
            });
        }).catch(err => {
            res.status(400).json({
                status: 'error',
                message: "Company not found",
            });
        });
    }else {
        res.status(400).json({
            status: 'error',
            message: "Company id not provided",
        });
    }
};

exports.updateCompany = async (req, res, next) => {
    // TODO: delete image
    if (req.body.logo && !check_base64(req.body.logo)) {
        const uploader = new S3Uploader(s3, {},process.env.AWS_BUCKET_NAME);
        let contentType = base64MimeType(req.body.logo);
        const logo = await uploader.upload(req.body.logo.replace(/^data:image\/\w+;base64,/, ""), 'company_service', contentType);
        req.body.logo = logo.key;
    }
    if (req.body.cover_image && !check_base64(req.body.cover_image)) {
        let contentType = base64MimeType(req.body.cover_image);
        const uploader = new S3Uploader(s3,{}, process.env.AWS_BUCKET_NAME);
        const cover_image_upload = await uploader.upload(req.body.cover_image.replace(/^data:image\/\w+;base64,/, ""), 'company_service/cover_image', contentType);
        req.body.cover_image = cover_image_upload.key || '';
    }
    if (req.body.kabis && !check_base64(req.body.kabis)) {
        const kabis = await uploader.upload(req.body.kabis.replace(/^data:image\/\w+;base64,/, ""), 'company_service/kabis');
        req.body.kabis = kabis.key;
    }
    await CompanyService.update(req.params.id, req.body).then(data => {
        if (data === 0) {
            res.status(400).json({
                status: 'error',
                message: 'Company not found',
                data: data
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Company updated successfully',
                data: data
            });
        }
    }).catch(err => {
        res.status(500).json({
            status: err.status,
            message: 'Error updating company',
        });
    });
};
exports.deleteCompany = async (req, res, next) => {
    await CompanyService.delete(req.params.id).then(data => {
        if (data === 0) {
            res.status(500).json({
                status: 'error',
                message: 'Company not found',
                data: data
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Company deleted successfully',
                data: data
            });
        }
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error deleting company',
        });
    });
};


exports.getCompanyUser = async (req, res, next) => {
    if (!req.params.id) {
        res.status(400).json({
            status: 'error',
            message: 'User id is required',
        });
    }
    await CompanyService.find({user_account_id: req.params.id}).then(data => {
        res.status(200).json({
            status: 'success',
            message: 'Company fetched successfully',
            data: data
        });
    }).catch(err => {
        res.status(400).json({
            status: 'error',
            message: "Company not found",
        });
    });
}

exports.getMultipleCompanies = async (req, res, next) => {
    const {ids} = req.body;
    if (ids.length <= 0) {
        return res.status(400).json({error: 'Invalid company list'})
    }
    await CompanyService.findMultiple({id: ids}).then(data => {
        res.status(200).json({
            status: 'success',
            message: 'Companies fetched successfully',
            data: data
        });
    })
    .catch(err => {
        res.status(400).json({
            status: 'error',
            message: "Company not found",
        });
    })
}
