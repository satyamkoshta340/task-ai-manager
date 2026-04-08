import { Router } from 'express';
import { createTask, getTasks, deleteTask, getSummary, updateTask } from '../controllers/tasks.controller.js';

const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.get('/summary', getSummary);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTask);

export default router;
