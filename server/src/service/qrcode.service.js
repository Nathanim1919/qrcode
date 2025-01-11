import QrCode from "qrcode";
import QrCodeModel from "../model/QrCode.model";

export const QrcodeGeneratorService = async (email) => {
  try {
    if (email) {
      throw new Error("url or email not provided");
    }
    const qrCodeDoc = await QrCodeModel.create({
      url,
    });

    if (qrCodeDoc) {
      await qrCodeDoc.save();
      // generate url
      url =
        process.env.BACKEDN_BASE_URL +
        `/qrcode/validate?qrcodeId=${qrCodeDoc._id}`;
      console.log(url);
      const qrcode = await QrCode.toData(url);

      return qrcode;
    }

    throw new Error("Uable to generate, please try once again");
  } catch (error) {
    throw new Error("Got unknown error while generating the qrcode", error);
  }
};


export const validateQrCodeService = async (qrCodeId) => {
    try {
        const qrCode = await QrCodeModel.findById(qrCodeId);

        if (!qrCode) throw new Error("QrCode is Not found")

        if (qrCode.iUsed) throw new Error("Invalid QrCode, QrCode is already used!!")

        qrCode.iUsed = true;
        await qrCode.save();

        return "successfully scanned! you are good to go!"
    } catch (error) {
        throw new Error("Unable to validate, please try again later!!")
    }
}
