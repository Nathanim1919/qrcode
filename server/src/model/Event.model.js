import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema(
  {
    name: { type: String },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    time: { 
      type: String, 
      enum: ["Morning", "Afternoon", "Evening", "Night"], 
      required: true 
    },
    type: { 
      type: String, 
      enum: ["Training", "Meal", "Conference", "Workshop", "Seminar"], 
      required: true 
    },
    status: {
      type: String,
      enum: ["Pending", "Ongoing", "Done"],
      default: "Pending",
      required: true,
    },
    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
      required: true,
    },
  },
  { timestamps: true }
);

EventSchema.pre("save", function (next) {
  // set the name with time and type
  this.name = `${this.type} - ${this.time}`;
  next();
});

export const Event = mongoose.model("Event", EventSchema);
