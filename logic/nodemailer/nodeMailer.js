const nodemailer = require("nodemailer");
const response = require("../../utils/response");

const emailText=(email, code)=>`
  Nous avons reçu une demande nous indiquant d'utiliser cette adresse e-mail afin de récupérer le compte Google 
  ${email}.
  ${code}
  Saisissez le code lorsque vous y êtes invité afin de nous indiquer que nous pouvons vous contacter à cette 
  adresse e-mail.
  Si vous ne reconnaissez pas le compte ${email}, il est possible que quelqu'un ait indiqué 
  votre adresse e-mail par erreur. Vous pouvez ignorer cet e-mail en toute sécurité.
  Cordialement,
  L'équipe de Colocakesh
` ;
exports.sendMail = async (res, email, code) => {
  try {
    try {
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass,
        },
        // if we are in the localhost environment
        // tls: {
        //   rejectUnauthorized: false, // we are not doing it from the actual domain
        // },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: "colocakesh2022@gmail.com", // sender address
        to: email, // sender addresslist of receivers
        subject: "Account Verification", // Subject line
        text: emailText(email, code), // plain text body
        html: "<b>Hello Colocakesh</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return response(res, false, "Email has been verified", [], 200);
    } catch (e) {
      return response(res, true, "Email couldn't be verified", e, 400);
    }
  } catch (error) {
    // const errors = SignupError(error);
    return response(res, true, "Email couldn't be verified", error, 400);
  }
};
