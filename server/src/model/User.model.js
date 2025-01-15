import { Schema, model } from "mongoose";
import { customAlphabet } from "nanoid";

// Create a custom generator for unique IDs
const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6); // 6-character alphanumeric string

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },
    uniqueId: {
        type: String,
        required: true,
        unique: true,
        default: () => `#WDG-${nanoid(8)}`, // Default value
      },
    qrCode: { type: Schema.Types.ObjectId, ref: "QR" },
  },
  { timestamps: true }
);


const User = model("User", UserSchema);
export default User;
