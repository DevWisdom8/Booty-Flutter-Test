const nodemailer = require("nodemailer");

const createTransporter = () => {
  const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP_USER and SMTP_PASS must be configured");
  }

  if (SMTP_HOST || SMTP_PORT) {
    return nodemailer.createTransport({
      host: SMTP_HOST || "smtp.gmail.com",
      port: Number(SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
};

const sendEmail = async ({ to, subject, html, text }) => {
  const { SMTP_FROM, SMTP_USER } = process.env;

  const mailOptions = {
    from: SMTP_FROM || SMTP_USER,
    to,
    subject,
    text,
    html,
  };

  const currentTransporter = getTransporter();
  return currentTransporter.sendMail(mailOptions);
};

const sendVerificationEmail = async ({ email, verificationLink, username }) => {
  const appName = process.env.APP_NAME || "BBB App";
  const subject = `Verify your ${appName} email address`;
  const text = [
    `Welcome${username ? ` ${username}` : ""}!`,
    `Please confirm your email address to complete your ${appName} registration.`,
    `Click the link below or copy it into your browser:`,
    verificationLink,
    "",
    "If you did not request this, please ignore this email.",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #111;">Welcome${username ? ` ${username}` : ""}!</h2>
      <p>Please confirm your email address to complete your ${appName} registration.</p>
      <p style="margin: 24px 0;">
        <a href="${verificationLink}" style="background: #111; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
          Verify Email
        </a>
      </p>
      <p>If the button does not work, copy and paste this link into your browser:</p>
      <p><a href="${verificationLink}">${verificationLink}</a></p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
  `;

  return sendEmail({ to: email, subject, text, html });
};

module.exports = {
  sendVerificationEmail,
};


