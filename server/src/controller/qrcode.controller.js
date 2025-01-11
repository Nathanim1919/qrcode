import {
  QrcodeGeneratorService,
  validateQrCodeService,
} from "../service/qrcode.service.js";

export const generateQrCode = async (req, res) => {
  console.log("Qury Parameters are: ", req.query);
  try {
    const { email } = req.query;
    const response = await QrcodeGeneratorService(email);
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
    const { qrcodeId } = req.query;

    if (!qrcodeId) {
      return res
        .status(400)
        .json({ success: false, message: "qrcodeId is required" });
    }

    const response = await validateQrCodeService(qrcodeId);
    return res.status(200).json({ success: true, message: response.message });
  } catch (error) {
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
