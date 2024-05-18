import nodemailer from "nodemailer";
require("dotenv").config();

interface EmailParams {
  email: string;
  subject: string;
  message: string;
}

export async function sendEmail({ email, subject, message }: EmailParams) {
  if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error(
      "Les variables d'environnement EMAIL_USERNAME ou EMAIL_APP_PASSWORD ne sont pas définies."
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  console.log("Email username:", process.env.EMAIL_USERNAME);
  console.log("Email app password:", process.env.EMAIL_APP_PASSWORD);

  try {
    const info = await transporter.sendMail({
      from: `"Asso_de_madina" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: subject,
      text: message,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
