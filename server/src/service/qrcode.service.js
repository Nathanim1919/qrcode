import QrCode from "qrcode";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "./email.service.js";
import mongoose from "mongoose";
import {QR} from "../model/QrCode.model.js";
import User from "../model/User.model.js";
import {Attendance} from "../model/Attendance.model.js";
import {Event} from "../model/Event.model.js";



// Get the current directory using ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const QrcodeGeneratorService = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId not provided");
    }

    // Create a new QR code document in the database
    const qrCodeDoc = await QR.create({
      userId,
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
    });

    if (qrCodeDoc) {
      // Generate the URL for the QR code
      const qrCodeUrl = `${process.env.BACKEND_BASE_URL}/scanOption?qrcodeId=${qrCodeDoc._id}`;
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
        qrCodeDoc.code = base64Data;
        await qrCodeDoc.save();

        // get user
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        user.qrCode = qrCodeDoc._id;
        await user.save();

        // Send email with the QR code and URL
        await sendEmail(user.email, qrCodeUrl, filePath);

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

// export const validateQrCodeService = async (qrCodeId, scanType) => {
//   try {
//     // Validate qrcodeId
//     if (!mongoose.Types.ObjectId.isValid(qrCodeId)) {
//       throw new Error("Invalid QR Code ID format");
//     }
//     const qrCode = await QR.findById(qrCodeId);

//     if (!qrCode) {
//      return {
//        message: "QR code not found in the database",
//        success: false
//      }
//     }


//     // Mark the QR code as used
//     qrCode.isUsed = true;
//     await qrCode.save();

//     return {
//       data: { qrCodeId: qrCode._id },
//       message: "Congratulations! Your QR code is verified and ready to use.",
//       success: true,
//     };
//   } catch (error) {
//     throw {
//       status: error.status || 500,
//       message:
//         error.message || "An error occurred while validating the QR code",
//       errorCode: error.errorCode || "VALIDATION_ERROR",
//     };
//   }
// };


export const validateQrCodeForEvent = async (qrCodeId, scanType,scanTime, eventId) => {
  try {
    // Validate `qrCodeId`
    if (!mongoose.Types.ObjectId.isValid(qrCodeId) || !mongoose.Types.ObjectId.isValid(eventId)) {
      throw new Error("Invalid QR Code ID format");
    }

    // Fetch the QR code details
    const qrCode = await QR.findById(qrCodeId);
    if (!qrCode) {
      return {
        message: "QR code not found in the database",
        success: false,
      };
    }

    // Check if QR code is already marked as used
    const existingAttendance = await Attendance.findOne({
      qrCodeId,
      eventId,
    });

    if (existingAttendance) {
      return {
        message: "QR code has already been used for this event and user",
        success: false,
      };
    }

    // Fetch the event details
    const event = await Event.findById(eventId);
    if (!event) {
      return {
        message: "Event not found",
        success: false,
      };
    }

    
    // Validate the event date
    const currentDate = new Date().toLocaleDateString("en-CA"); // Format: YYYY-MM-DD
    const eventDate = new Date(event.date).toLocaleDateString("en-CA");
  
    
    if (currentDate !== eventDate) {
      return {
        message: "QR code is not valid for the current date",
        success: false,
      };
    }
    

    // Validate the event time
    if (event.type !== scanType) {
      return {
        message: `QR code is not valid for the current time slot (${scanType})`,
        success: false,
      };
    }


    const {userId} = qrCode;

    const user = await User.findById(userId);

    if (!user) {
      return {
        message: "User not found",
        success: false,
      };
    }
    
    // Mark the QR code as used by creating an attendance record
    const attendanceRecord = new Attendance({
      userId,
      eventId,
      qrCodeId,
      scannedAt: new Date(),
    });
    await attendanceRecord.save();

    // Return success response
    return {
      data: { qrCodeId: qrCode._id, eventId: event._id, user },
      message: "QR code is valid and attendance recorded successfully",
      success: true,
    };
  } catch (error) {
    console.log(error)
    throw {
      status: error.status || 500,
      message: error.message || "An error occurred while validating the QR code",
      errorCode: error.errorCode || "VALIDATION_ERROR",
    };
  }
};
