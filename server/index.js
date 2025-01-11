import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import QrCodeRoute from "./src/route/qrCode.route"


dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PUCH"],
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/QRCode")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", QrCodeRoute)

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
