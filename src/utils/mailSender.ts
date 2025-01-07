import nodemailer from "nodemailer";

const mailSender = async (email: string, title: string, body: any) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "gmail",
      service: "gmail",

      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "Library",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export { mailSender };
