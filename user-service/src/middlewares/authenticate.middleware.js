import UserService from "../services/user.service";

const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    const Token = req.header('X_Auth_Token');
    if (!Token || Token === '' || Token !== process.env.X_AUTH_TOKEN) {
        res.status(401).send({
            status: 401,
            message: 'invalid token, pleas insert a valid token',
            success: false
        })
    }else{
        next();
    }
}
