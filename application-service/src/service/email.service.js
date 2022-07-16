import MailService from '@sendgrid/mail';
console.log(process.env.SENDGRID_SENDER_EMAIL)
console.log(process.env.SENDGRID_API_KEY)
MailService.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMessage = async (user) => {
    try {
        const msg = {
            to: user.email,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: 'Candidature',
            text: `Il y a du nouveau sur vos candidature, Veuillez vous connecter pour en savoir plus.`,
        };
        return await MailService.send(msg);
    } catch (error) {
        throw new Error(error.message)
    }
}
