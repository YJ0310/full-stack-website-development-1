import mongoose from "mongoose";

/**
 * Mongoose schema for a Task.
 *
 * @typedef {Object} Task
 * @property {string} title - The title of the task. Required.
 * @property {string} description - The description of the task. Required.
 * @property {boolean} [completed=false] - Whether the task is completed.
 * @property {Date} [create_at=Date.now] - The date the task was created.
 */


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
