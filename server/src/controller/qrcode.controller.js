import { QrcodeGeneratorService, validateQrCodeService } from "../service/qrcode.service.js";

export const generateQrCode = async (req, res) => {
  console.log("Qury Parameters are: ", req.query);
  try {
    const { email } = req.query;
    const response = await QrcodeGeneratorService(email);
    res
      .status(200)
      .json({ response, message: "QR code generated successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to generate QR code", error });
  }
};

export const validateQrCode = async (req, res) => {
  try {
    const { qrcodeId } = req.query;
    console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,",qrcodeId)

    if (!qrcodeId) {
      res.status(400).json({ message: "qrcodeId is required" });
    }

    const response = await validateQrCodeService(qrcodeId);
    res.status(200).json({
      response,
      message: "Response retreived successfully",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to validate the qrcode", error });
  }
};
