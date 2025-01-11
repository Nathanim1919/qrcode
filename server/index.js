import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import QrCode from "qrcode";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Get the current directory using ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PUCH"],
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/QRCode")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  const { url, email } = req.query;

  try {
    // Generate the QR code in base64 format
    const qrCodeBase64 = await QrCode.toDataURL(url);

    // Extract the base64 string (remove the prefix "data:image/png;base64,")
    const base64Data = qrCodeBase64.replace(/^data:image\/png;base64,/, "");

    // Define the file path to save the image
    const filePath = path.join(__dirname, "qrcode.png");

    // Write the base64 data to a file
    fs.writeFileSync(filePath, base64Data, "base64");

    // Send the email with the embedded QR code
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service (e.g., Gmail, SendGrid, etc.)
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    // Define the email content
    const emailContent = `
      <html>
        <head>
          <style>
            .email-container {
              font-family: Arial, sans-serif;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email-header {
              text-align: center;
              font-size: 24px;
              color: #333;
            }
            .email-body {
              margin-top: 20px;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
            }
            .qr-code {
              text-align: center;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h2>Your QR Code</h2>
            </div>
            <div class="email-body">
              <p>Hello,</p>
              <p>Here is your personalized QR code. You can scan it with any QR code reader to access the URL:</p>
              <p><strong>${url}</strong></p>
              <div class="qr-code">
                <img src="cid:qrCode" alt="QR Code" />
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Define email options
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

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email", error });
      } else {
        console.log("Email sent: " + info.response);
        res.json({
          message: "QR code saved and email sent successfully!",
          filePath,
        });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to generate QR code", error: err.message });
  }
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
