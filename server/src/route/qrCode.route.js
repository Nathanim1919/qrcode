import { Router } from "express";
import { generateQrCode, validateQrCode } from "../controller/qrcode.controller";

const route = Router();


route.get("/generateQrCode", generateQrCode);
route.post("/validate", validateQrCode);


export default route;