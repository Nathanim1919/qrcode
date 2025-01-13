const AttendanceSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
      qrCodeId: { type: Schema.Types.ObjectId, ref: 'QR', required: true },
      scannedAt: { type: Date, default: Date.now },
    },
    { timestamps: false }
  );
  
  export const Attendance = mongoose.model('Attendance', AttendanceSchema);