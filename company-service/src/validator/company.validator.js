exports.check_base64 = function base64Validator(base64) {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(base64);
};
function validateWebsite(website) {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(website);
};
function validatePhone(phone) {
  return /^\+?[0-9]{10,15}$/.test(phone);
};
function validateSiret(siret) {
  return /^\d{14}$/.test(siret);
}

exports.companyValidator = function companyValidator(req, res, next) {
    if(req.body.website){
      if (!validateWebsite(req.body.website)) {
          res.status(401).send({
          success: false,
          message: 'Company website is invalid format'
        });
      }
    }
    if(req.body.phone){
      if (!validatePhone(req.body.phone)) {
          res.status(401).send({
          success: false,
          message: 'Company phone is invalid format'
        });
      }
    }
    if (!req.body.password) {
        res.status(401).send({
        sucess: false,
        message: 'Comapny User password is required'
      });
    }
};
