import QrCode from "qrcode";
import QrCodeModel from "../model/QrCode.model.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendEmail } from "./email.service.js";
import { url } from "inspector";


// Get the current directory using ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

       // Extract the base64 string (remove the prefix "data:image/png;base64,")
    const base64Data = qrCodeBase64.replace(/^data:image\/png;base64,/, '');

    // Define the file path to save the image
    const filePath = path.join(__dirname, 'qrcode.png');

    // Write the base64 data to a file
    fs.writeFileSync(filePath, base64Data, 'base64');

      // send email
      sendEmail(email, url, filePath);


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
