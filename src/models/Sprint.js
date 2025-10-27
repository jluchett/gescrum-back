import mongoose from 'mongoose';

const sprintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['planned', 'active', 'completed'], 
    default: 'planned' 
  },
  plannedPoints: { type: Number, default: 0 },
  completedPoints: { type: Number, default: 0 },
  velocity: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Sprint', sprintSchema);