const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Attendee"], required: true },
    address: { type: String },
    uniqueId: { type: String, required: true, unique: true },
    qrCodeId: { type: Schema.Types.ObjectId, ref: "QR" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
