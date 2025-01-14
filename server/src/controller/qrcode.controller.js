import {
  QrcodeGeneratorService,
  validateQrCodeForEvent,
} from "../service/qrcode.service.js";

export const generateQrCode = async (req, res) => {
  try {
    const { userId } = req.body;
    const response = await QrcodeGeneratorService(userId);
    res
      .status(200)
      .json({ response, message: "QR code generated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to generate QR code", error });
  }
};


export const validateQrCode = async (req, res) => {
  try {
    const { qrcodeId, scanType, scanTime, eventId } = req.query;

   console.log("qrcodeId", qrcodeId);
   console.log("scanType", scanType);
    console.log("scanTime", scanTime);
    console.log("eventId", eventId);
    if (!qrcodeId) {
      return res
        .status(400)
        .json({ success: false, message: "qrcodeId is required" });
    }

    const response = await validateQrCodeForEvent(qrcodeId, scanType, scanTime, eventId);
    return res.status(200).json({ success: response.success, message: response.message });
  } catch (error) {
    console.error("Error in validateQrCode:", error);
    let statusCode = 500;
    let errorMessage = error.message || "An unknown error occurred";

    if (errorMessage.includes("Invalid QR Code ID format")) {
      statusCode = 400;
    } else if (errorMessage.includes("QR Code not found")) {
      statusCode = 404;
    } else if (errorMessage.includes("QR Code already used")) {
      statusCode = 400;
    }

    return res
      .status(statusCode)
      .json({ success: false, message: errorMessage });
  }
};
