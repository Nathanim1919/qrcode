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
