const nodemailer = require("nodemailer");
exports.sendMail = async (res, usersaved) => {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

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
        from: '"Node Mailer Contact 👻" <loca@gmail.com>', // sender address
        to: "ahmedzekri918@gmail.com", // sender addresslist of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (e) {
      console.log(e);
    }
  } catch (error) {
    // const errors = SignupError(error);
    return res.status(200).json({ error });
  }
};
