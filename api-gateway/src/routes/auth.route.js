const authController = require('../controllers/auth.controller')
const express = require("express");
const authServiceRouter = express.Router();

authServiceRouter.post('/login', authController.login);
authServiceRouter.post('/signup', authController.signup);
authServiceRouter.post('/refresh-token', authController.refreshToken);
authServiceRouter.post('/forgot-password', authController.forgotPassword);
authServiceRouter.post('/reset-password', authController.resetPassword);
authServiceRouter.post('/changePassword', authController.changePassword);
authServiceRouter.post('/verify-email', authController.activateAccount);
authServiceRouter.get('/test', authController.test);

module.exports = authServiceRouter;
