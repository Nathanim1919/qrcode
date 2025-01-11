import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import qrCodeRoute from './src/route/qrCode.route.js'
import dotenv from 'dotenv'


dotenv.config();
const app = express();
app.use(
  cors({
    origin: "https://c82a62c44f7835.lhr.life",
    methods: ["POST", "GET", "PUT", "PUCH"],
  })
);

// connect db
mongoose
  .connect("mongodb://localhost:27017/QRCode")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.use("/", qrCodeRoute);

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
