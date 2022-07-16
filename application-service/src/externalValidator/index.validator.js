const { validateUser } = require('./user.validator')
const { validatejob }  = require('./jobOffer.validator')

module.exports = {
        validateUser: validateUser,
        validateJobOffer: validatejob
}
