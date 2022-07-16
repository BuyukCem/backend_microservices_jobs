const {getCompany} = require('../services/company-service');
module.exports.authenticate = async (req, res, next) => {
    const token = req.header('X_Auth_Token');
    const company_token = req.header('company-token');
    if (!company_token || company_token === '') {
        return res.status(401).send({
            message: "Unauthorized please insert your company token"
        });
    }
    if (!token || token === '') {
        res.status(401).send({
            status: 401,
            message: 'Please insert a token',
            success: false
        })
    } else if (token !== process.env.X_Auth_Token) {
        res.status(401).send({
            status: 401,
            message: 'Please insert a valid token',
            success: false
        })
    }else{
        try {
             const company = await getCompany(company_token)
             if(!company) {
                res.status(401).send({
                    status: 401,
                    message: 'Please insert a valid company token',
                    success: false
                })
             }else {
                req.company_id = company.id;
                console.log(req.company_id)
                next()
             }
        } catch (e) {
            console.log(e)
            console.log(3)
            res.status(401).send({
                status: 401,
                message: 'Please insert a valid company token',
                success: false
            })
        }
    }
}

