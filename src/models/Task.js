import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignee: { type: String, required: true },
  storyPoints: { type: Number, default: 0 },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  status: { 
    type: String, 
    enum: ['backlog', 'todo', 'in-progress', 'review', 'testing', 'done'], 
    default: 'backlog' 
  },
  sprintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sprint' },
  dueDate: { type: Date },
  comments: [{
    user: String,
    text: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);