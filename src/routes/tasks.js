import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('sprintId');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET tasks by sprint
router.get('/sprint/:sprintId', async (req, res) => {
  try {
    const tasks = await Task.find({ sprintId: req.params.sprintId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    assignee: req.body.assignee,
    storyPoints: req.body.storyPoints,
    priority: req.body.priority,
    status: req.body.status,
    sprintId: req.body.sprintId,
    dueDate: req.body.dueDate
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update task status
router.patch('/:id/status', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.status = req.body.status;
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST add comment to task
router.post('/:id/comments', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.comments.push({
        user: req.body.user,
        text: req.body.text
      });
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;