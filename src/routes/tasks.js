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
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description || '',
      assignee: req.body.assignee || '',
      storyPoints: req.body.storyPoints || 0,
      priority: req.body.priority || 'medium',
      status: req.body.status || 'backlog',
      sprintId: req.body.sprintId || null,
      dueDate: req.body.dueDate || null
    });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Error de validación',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    
    res.status(400).json({ 
      message: error.message,
      details: 'Revisa que todos los campos requeridos estén presentes'
    });
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

// PUT update entire task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.assignee = req.body.assignee || task.assignee;
      task.storyPoints = req.body.storyPoints || task.storyPoints;
      task.priority = req.body.priority || task.priority;
      task.sprintId = req.body.sprintId || task.sprintId;
      task.dueDate = req.body.dueDate || task.dueDate;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ 
        message: 'Tarea eliminada correctamente',
        deletedTask: task 
      });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ 
      message: 'Error al eliminar la tarea',
      error: error.message 
    });
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