import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

// All routes below require authentication
router.use(protect);

// @route   GET /api/tasks/
router.get('/', getTasks);

// @route   POST /api/tasks/
router.post('/', createTask);

// @route   PUT /api/tasks/:id
router.put('/:id', updateTask);

// @route   DELETE /api/tasks/:id
router.delete('/:id', deleteTask);

export default router;
