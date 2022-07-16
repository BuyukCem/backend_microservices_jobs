import MailService from '@sendgrid/mail';
import {ApplicationError} from "../helpers/errors.helper";
console.log(process.env.SENDGRID_SENDER_EMAIL)
console.log(process.env.SENDGRID_API_KEY)
MailService.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendResetPasswordToken = async (user) => {
    try {
        const link = `${process.env.HOST_FRONT_PROJECT}/reset-password?token=${user.resetToken}`
        const msg = {
            to: user.email,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: 'Password change request',
            text: `Veuillez cliquer sur le lien suivant pour modifier votre mot de passe : ${link}`,
        };
        return await MailService.send(msg);
    } catch (error) {
        throw new Error(error.message)
    }
}
exports.sendActivateAccountToken = async (user) => {
    const link = `${process.env.HOST_FRONT_PROJECT}/activate_account?token=${user.activateToken}`
    try {
        const msg = {
            to: user.email,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: 'Account activation',
            text: ``,
        };
        if(user.firstName){
            msg.text = `Bonjour ${user.firstName}, Veuillez cliquer sur le lien suivant pour vérifier votre email : ${link}`
        }else{
            msg.text = `Bonjour ${user.email}, Veuillez cliquer sur le lien suivant pour vérifier votre email : ${link}`
        }
        console.log("here ", msg.text)
        return await MailService.send(msg)
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
