import { QrcodeGeneratorService } from "../service/qrcode.service";

export const generateQrCode = async (req, res) => {
  try {
    const { email } = req.query;
    const response = await QrcodeGeneratorService(email);
    res
      .status(200)
      .json({ response, message: "QR code generated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate QR code", error });
  }
};

export const validateQrCode = async (req, res) => {
  try {
    const { qrCodeId } = req.query;

    if (!qrCodeId) {
      res.status(400).json({ message: "qrCodeId is required" });
    }

    const response = await validateQrCodeService(qrCodeId);
    res.status(200).json({
      response,
      message: "Response retreived successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to validate the qrcode", error });
  }
};
