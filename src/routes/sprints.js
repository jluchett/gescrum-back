import express from 'express';
import Sprint from '../models/Sprint.js';

const router = express.Router();

// GET all sprints
router.get('/', async (req, res) => {
  try {
    const sprints = await Sprint.find().sort({ startDate: -1 });
    res.json(sprints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET active sprint
router.get('/active', async (req, res) => {
  try {
    const activeSprint = await Sprint.findOne({ status: 'active' });
    res.json(activeSprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new sprint
router.post('/', async (req, res) => {
  const sprint = new Sprint({
    name: req.body.name,
    goal: req.body.goal,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    plannedPoints: req.body.plannedPoints
  });

  try {
    const newSprint = await sprint.save();
    res.status(201).json(newSprint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update sprint
router.patch('/:id', async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);
    if (sprint) {
      Object.keys(req.body).forEach(key => {
        sprint[key] = req.body[key];
      });
      const updatedSprint = await sprint.save();
      res.json(updatedSprint);
    } else {
      res.status(404).json({ message: 'Sprint not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;