import UserService from "../services/user.service";
import companyService from "../services/company.service";
const jwt = require('jsonwebtoken')

export default async function authenticate(req, res, next) {
    // open Route
    if((/jobs_offers.*/).test(req.originalUrl) && req.method == 'GET'){
        next()
    }else if(req.originalUrl == "/company" && req.method == 'POST'){
        next()
    }else if(req.originalUrl == "/sectors" && req.method == 'GET'){
        next()}
    else if((/company-detail.*/).test(req.originalUrl)  && req.method == 'GET') {
        next()
    }
    else{
        const Token = req.header('Authorization');
        if (!Token) {
            res.status(401).send({
                status: 401,
                message: 'invalid token, please log in or sign up',
                success: false
            })
        } else {
            try {
                let authToken = parseAuthToken(Token);
                const user = jwt.verify(authToken, process.env.ACCESS_TOKEN);
                req.user = {
                    ...user
                }
                if (!user) {
                    console.log('invalid token 1')
                    res.status(401).send({
                        status: 401,
                        message: 'invalid token, please log in or sign up',
                        success: false
                    })
                } else {
                    try {
                        const data = await UserService.findUserById(req.user.id)
                        if(data.role == 'CLIENT'){
                            const data_company = await companyService.findbyUserId(req.user.id)
                            console.log("company ", data_company)
                            if (data_company) {
                                req.user.company_token = data_company.company_token;
                                req.user.company_id = data_company.id;
                            }
                        }
                        if (!data) {
                            console.log('invalid token 1')
                            res.status(401).send({
                                status: 401,
                                message: 'invalid token, please log in or sign up',
                                success: false
                            })
                        } else {
                            if(data.isActive === true){
                                req.user.role = user.role;
                                next()
                            }else{
                                res.status(401).send({
                                    status: 401,
                                    message: 'Your account is not active, please activate your account',
                                    success: false
                                })
                            }
                        }
                    } catch (e) {
                        res.status(401).send({
                            status: 401,
                            message: 'invalid token, please log in or sign up',
                            success: false
                        })
                    }
                }
            } catch (error) {
                res.status(401).send({
                    status: 401,
                    message: 'invalid token, please log in or sign up',
                    success: false
                })
            }
        }
    }
}
function parseAuthToken(authorization) {
    if (authorization.startsWith('Bearer ')) {
        return authorization.slice(7, authorization.length);
    }
    return null;
}
