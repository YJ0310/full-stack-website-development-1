import express from "express";
const router = express.Router();
import Task from "../models/Task.js";

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new tasks
router.post("/", async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
    });
    const savedTask = await task.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { router };
