import nodemailer from 'nodemailer';

const sendEmail = async ({ email, subject, text, html }) => {
  let transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (err) {
      console.error('Failed to create Ethereal SMTP account:', err);
      throw new Error('Email service configuration missing');
    }
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || `"Portfolio Admin" <${process.env.SMTP_USER || 'no-reply@portfolio.com'}>`,
    to: email,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

export default sendEmail;
