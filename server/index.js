import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PUCH"],
  })
);

// connect db
mongoose
  .connect("mongodb://localhost:27017/ZeeGain")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
