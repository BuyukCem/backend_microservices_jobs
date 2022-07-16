const auth = require('../middlewares/authenticate.middleware')
const companyController = require('../controllers/company.controller')

module.exports = (app) => {
    app.route('/company')
        .post(auth.authenticate, companyController.createCompany)
        .get(auth.authenticate, companyController.getCompany)
    app.route('/company/multiples')
        .post(auth.authenticate, companyController.getMultipleCompanies)
    app.route('/company/companyByToken')
        .get(auth.authenticate, companyController.getCompanyByToken)
    app.route('/company/user/:id')
        .get(auth.authenticate, companyController.getCompanyUser)
    app.route('/company-detail/:id')
        .get(auth.authenticate, companyController.getCompanyDetail)
    app.route('/company/:id')
        .get(auth.authenticate, companyController.getCompanyById)
        .put(auth.authenticate, companyController.updateCompany)
        .delete(auth.authenticate, companyController.deleteCompany)
}

