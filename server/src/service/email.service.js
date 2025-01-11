import nodemailer from "nodemailer";
import {generateEmailTemplate} from "../utils/emailTemplate.utils.js";


export const sendEmail = async (email, url, filePath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service (e.g., Gmail, SendGrid, etc.)
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  const emailContent = generateEmailTemplate(url);

  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: "Your QR Code",
    html: emailContent,
    attachments: [
      {
        filename: "qrcode.png",
        path: filePath,
        cid: "qrCode", // Content-ID for embedding image inline
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { message: "QR code saved and email sent successfully!", filePath };
  } catch (error) {
    console.log("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
