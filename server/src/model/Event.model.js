import mongoose, {Schema} from 'mongoose';


const EventSchema = new Schema(
    {
      name: { type: String, required: true },
      date: { type: Date, required: true },
      time: { type: String, enum: ['Morning', 'Afternoon'], required: true },
      type: { type: String, enum: ['Event', 'Meal'], required: true },
      status: { type: String, enum: ['Pending','Ongoing', 'Done'], required: true },
      visibility: { type: String, enum: ['Public', 'Private'], required: true },
    },
    { timestamps: true }
  );
  
  export const Event = mongoose.model('Event', EventSchema);