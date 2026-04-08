import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';
import * as tasksService from '../services/tasks.service.js';
import * as aiService from '../services/ai.service.js';

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    const task = await tasksService.createTask(userId, title, description);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const tasks = await tasksService.getAllTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const id = req.params.id as string;
    const data = req.body;
    if (!id) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }
    const task = await tasksService.updateTaskById(userId, id, data);
    res.json(task);
  } catch (error: any) {
    if (error.message === "Task not found or unauthorized") {
      res.status(404).json({ error: error.message });
      return;
    }
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const id = req.params.id as string;
    if (!id) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }
    await tasksService.deleteTaskById(userId, id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

export const getSummary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const briefing = await aiService.generateDailyBriefing(userId);
    res.json({ briefing });
  } catch (error: any) {
    console.error('AI Summary Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate AI briefing' });
  }
};
