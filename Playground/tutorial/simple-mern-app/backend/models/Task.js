import mongoose from "mongoose";

const task_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Task', task_schema);
