import { QrcodeGeneratorService } from "../service/qrcode.service";

export const generateQrCode = async (req, res) => {
  try {
    const {email } = req.query;
    const res = await QrcodeGeneratorService(email);
    res.status(200).json({ message: "QR code generated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate QR code", error });
  }
};
