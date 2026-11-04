import nodemailer from "nodemailer";

async function createTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    const port = Number(SMTP_PORT) || 587;
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }

  // Never silently "send" through a test inbox in production.
  if (process.env.NODE_ENV === "production") {
    throw new Error("SMTP is not configured (SMTP_HOST, SMTP_USER, SMTP_PASS)");
  }

  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
}

export default async function sendEmail({ email, subject, text, html }) {
  const transporter = await createTransport();
  const info = await transporter.sendMail({
    from:
      process.env.SMTP_FROM ||
      `"Portfolio Admin" <${process.env.SMTP_USER || "no-reply@localhost"}>`,
    to: email,
    subject,
    text,
    html,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) console.info("Dev email preview:", previewUrl);
  return info;
}
