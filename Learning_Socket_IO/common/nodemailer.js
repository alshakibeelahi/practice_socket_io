const nodemailer = require("nodemailer");

const sendMail = async (user) => {
  console.log(user)
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "team.robust.dev@gmail.com",
        pass: "xambflccflheswnk",
      },
    });

    const info = await transporter.sendMail({
      from: 'team.robust.dev@gmail.com',
      to: user.email,
      subject: 'Sign up credintial',
      html: `<h4>Email:${user.email}</h4><h4>Password:${user.password}</h4><h4>Code:${user.code}</h4>`,
    });

    return info.messageId;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendMail;
