import { Router } from 'express';
import { createTask, getTasks, deleteTask, getSummary } from '../controllers/tasks.controller.js';

const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.get('/summary', getSummary);
router.delete('/:id', deleteTask);

export default router;
