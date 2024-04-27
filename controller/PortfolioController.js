const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

const sendEmailController = (req, resp) => {
  try {
    const { name, email, msg } = req.body;

    //validation

    if (!name || !email || !msg) {
      return resp.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    //email matter
    transporter.sendMail({
      to: "adarshkumar88773753@gmail.com",
      from: "adarshkumar88773753@gmail.com",
      subject: "Regarding Mern Portfolio App",
      html: `
      <h5>Detail Information</h5>
      <ul>
      <li><p>Name:${name}</p></li>
      <li><p>Name:${email}</p></li>
      <li><p>Name:${msg}</p></li>
      </ul>`,
    });
    return resp.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};
module.exports = { sendEmailController };
