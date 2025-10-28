import express from 'express';
import Team from '../models/Team.js';

const router = express.Router();

// GET all team members
router.get('/', async (req, res) => {
  try {
    const team = await Team.find({ active: true });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create team member
router.post('/', async (req, res) => {
  const member = new Team({
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    capacity: req.body.capacity
  });

  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;