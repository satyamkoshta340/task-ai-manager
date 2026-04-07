import { Router } from 'express';
import { createTask, getTasks, deleteTask, getSummary } from '../controllers/tasks.controller.js';

const router = Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/summary', getSummary);
router.delete('/tasks/:id', deleteTask);

export default router;
