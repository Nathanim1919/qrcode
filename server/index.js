import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import qrCodeRoute from './src/route/qrCode.route.js'
import userRoute from "./src/route/user.route.js";
import evenRoute from "./src/route/event.route.js";
import attendanceRoute from "./src/route/attendance.route.js";
import authRoute from "./src/route/auth.route.js";
import dotenv from 'dotenv'


dotenv.config();
const app = express();
// Middleware to parse JSON
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173',"https://3c46ddc76dd116.lhr.life"], // Allow both
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

app.use("/auth", authRoute);
app.use("/qrcode", qrCodeRoute);
app.use("/users", userRoute);
app.use("/events", evenRoute);
app.use("/attendance", attendanceRoute);



app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
