import mongoose, {Schema} from 'mongoose';


const EventSchema = new Schema(
    {
      name: { type: String, required: true },
      date: { type: Date, required: true },
      time: { type: String, enum: ['Morning', 'Afternoon'], required: true },
      type: { type: String, enum: ['Event', 'Meal'], required: true },
      status: { 
        type: String, 
        enum: ['Pending','Ongoing', 'Done'], 
        default: 'Pending',
        required: true 
      },
      visibility: { 
        type: String, 
        enum: ['Public', 'Private'], 
        default: 'Public',
        required: true 
      },
    },
    { timestamps: true }
  );
  
  export const Event = mongoose.model('Event', EventSchema);