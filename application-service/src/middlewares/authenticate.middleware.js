const jwt = require('jsonwebtoken');

module.exports.authenticate = async (req, res, next) => {
    const Token = req.header('X_Auth_Token');
    if (!Token || Token === '') {
        res.status(401).send({
            status: 401,
            message: 'Please insert a token',
            success: false
        })
    }
    else if ( Token !== process.env.X_AUTH_TOKEN) {
        res.status(401).send({
            status: 401,
            message: 'Please insert a valid token',
            success: false
        })
    }
    else{
        next();
    }
}
