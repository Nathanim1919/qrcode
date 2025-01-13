import { Router } from "express";
import { generateQrCode, validateQrCode } from "../controller/qrcode.controller.js";

const route = Router();


route.post("/generateQrCode", generateQrCode);
route.get("/qrcode/validate", validateQrCode);


export default route;