import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'El título es requerido'], trim: true },
  description: { type: String, default: '', trim: true },
  assignee: { type: String, required: [true, 'El asignado es requerido'], trim: true },
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
  sprintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sprint', default: null },
  dueDate: { type: Date, default: null },
  comments: [{
    user: String,
    text: String,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Middleware para limpiar datos antes de guardar
taskSchema.pre('save', function(next) {
  // Asegurar que los campos string estén limpios
  if (this.title) this.title = this.title.trim();
  if (this.description) this.description = this.description.trim();
  if (this.assignee) this.assignee = this.assignee.trim();
  
  next();
});

export default mongoose.model('Task', taskSchema);