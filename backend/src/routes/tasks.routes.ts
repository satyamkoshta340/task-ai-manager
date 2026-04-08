import { Router } from 'express';
import { createTask, getTasks, deleteTask, getSummary, updateTask } from '../controllers/tasks.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Protect all task routes with authenticate middleware
router.use(authenticate);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/summary', getSummary);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTask);

export default router;
