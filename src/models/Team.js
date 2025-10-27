import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['scrum-master', 'developer', 'qa'], 
    required: true 
  },
  email: { type: String },
  capacity: { type: Number, default: 0 }, // Story points por sprint
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);