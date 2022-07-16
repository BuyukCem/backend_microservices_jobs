const jwt = require('jsonwebtoken');

module.exports.authenticate = async (req, res, next) => {
    const token = req.header('X_Auth_Token');
    if (!token || token === '') {
        res.status(401).send({
            status: 401,
            message: 'Please insert a token',
            success: false
        })
    }
    
    else if (token !== process.env.X_AUTH_TOKEN) {
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
