import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import qrCodeRoute from './src/route/qrCode.route.js'
import dotenv from 'dotenv'


dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.BACKEND_BASE_URL,
    methods: ["POST", "GET", "PUT", "PUCH"],
  })
);

// connect db
mongoose
  .connect("mongodb+srv://finance:finance@cluster0.vxomzcr.mongodb.net/qrcode?retryWrites=true&w=majority&appName=Cluster0")
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
