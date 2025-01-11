export const generateQrCode = async (req, res) => {
    try {
        const { url, email } = req.query;
        const res = await generateQrCodeService(url, email);
        res.status(200).json({ message: "QR code generated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to generate QR code", error });
    }
}