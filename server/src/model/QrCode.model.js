import mongoose, { Schema } from "mongoose";

const QRSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    code: { type: String, required: true },
    isValid: { type: Boolean, default: true },
    scanType: { type: String, enum: ["Event", "Meal"] },
  },
  { timestamps: true }
);

export const QR = mongoose.model("QR", QRSchema);
