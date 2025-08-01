import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  status:      { type: String, default: 'pending', enum: ['pending', 'in progress', 'completed'] },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
