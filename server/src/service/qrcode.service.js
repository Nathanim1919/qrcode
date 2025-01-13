import QrCode from "qrcode";
import QrCodeModel from "../model/QrCode.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "./email.service.js";
import mongoose from "mongoose";

// Get the current directory using ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const QrcodeGeneratorService = async (email) => {
  try {
    if (!email) {
      throw new Error("Email not provided");
    }

    // Create a new QR code document in the database
    const qrCodeDoc = await QrCodeModel.create({
      url: "link",
    });
    console.log(qrCodeDoc);

    if (qrCodeDoc) {
      // Generate the URL for the QR code
      const qrCodeUrl = `${process.env.BACKEND_BASE_URL}/validateQrCode?qrcodeId=${qrCodeDoc._id}`;
      console.log("Generated URL for QR Code:", qrCodeUrl);

      if (!process.env.BACKEND_BASE_URL) {
        throw new Error("BACKEND_BASE_URL environment variable is not set.");
      }

      try {
        // Generate the QR code as a base64 string
        const qrCodeBase64 = await QrCode.toDataURL(qrCodeUrl);
        console.log("QR Code generated successfully.");

        // Extract the base64 string (remove the prefix "data:image/png;base64,")
        const base64Data = qrCodeBase64.replace(/^data:image\/png;base64,/, "");

        // Define the file path to save the image
        const filePath = path.join(__dirname, "qrcode1.png");

        // Write the base64 data to a file
        fs.writeFileSync(filePath, base64Data, "base64");

        // Save the URL to the QR code document
        qrCodeDoc.url = qrCodeUrl;
        await qrCodeDoc.save();

        // Send email with the QR code and URL
        await sendEmail(email, qrCodeUrl, filePath);

        return qrCodeBase64;
      } catch (qrCodeError) {
        console.error("Error generating QR Code:", qrCodeError);
        throw new Error(
          "Failed to generate the QR code. Please try again later."
        );
      }
    } else {
      throw new Error("Unable to create QR code document.");
    }
  } catch (error) {
    console.error("Error in QrcodeGeneratorService:", error);
    throw new Error("Got unknown error while generating the QR code");
  }
};

export const validateQrCodeService = async (qrCodeId) => {
  try {
    // Validate qrcodeId
    if (!mongoose.Types.ObjectId.isValid(qrCodeId)) {
      throw new Error("Invalid QR Code ID format");
    }
    const qrCode = await QrCodeModel.findById(qrCodeId);

    if (!qrCode) {
     return {
       message: "QR code not found in the database",
       success: false
     }
    }

    if (qrCode.isUsed) {
     return {
       data: { qrCodeId: qrCode._id },
       message: "QR code already used and cannot be verified again",
       success: false
      };
    }

    // Mark the QR code as used
    qrCode.isUsed = true;
    await qrCode.save();

    return {
      data: { qrCodeId: qrCode._id },
      message: "Congratulations! Your QR code is verified and ready to use.",
      success: true,
    };
  } catch (error) {
    throw {
      status: error.status || 500,
      message:
        error.message || "An error occurred while validating the QR code",
      errorCode: error.errorCode || "VALIDATION_ERROR",
    };
  }
};
