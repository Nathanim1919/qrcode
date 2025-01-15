import { Router } from "express";
import { generateQrCode, validateQrCode } from "../controller/qrcode.controller.js";
import authenticateUser from "../middleware/userVerfication.js";

const route = Router();


route.post("/generateQrCode", generateQrCode);
route.get("/validate", authenticateUser, validateQrCode);


export default route;