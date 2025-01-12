import mongoose, { Schema } from "mongoose";

const QrCodeSchema = new Schema({
  url: {
    type: String,
    required: true,
    default:""
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

const QrCodeModel = mongoose.model("QrCode", QrCodeSchema);
export default QrCodeModel;
