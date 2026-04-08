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

    if (error.code === 'CONFIG_ERROR') {
      res.status(503).json({ error: 'Service Unavailable: AI briefing is not configured on the server.' });
      return;
    }

    if (error.code === 'DB_ERROR') {
      res.status(500).json({ error: 'Internal Server Error: Could not fetch tasks for briefing.' });
      return;
    }

    if (error.code === 'API_ERROR') {
      const msg = error.message.toLowerCase();
      if (msg.includes('quota') || msg.includes('429') || msg.includes('rate limit')) {
        res.status(429).json({ error: 'Too Many Requests: AI service rate limit exceeded. Please try again later.' });
        return;
      }
      if (msg.includes('key') || msg.includes('auth') || msg.includes('401') || msg.includes('403')) {
        res.status(502).json({ error: 'Bad Gateway: AI service configuration is invalid.' });
        return;
      }
      if (msg.includes('503') || msg.includes('500') || msg.includes('server error') || msg.includes('overloaded')) {
        res.status(503).json({ error: 'AI service is currently facing downtime or heavy traffic. Please try again later.' });
        return;
      }
      if (msg.includes('timeout') || msg.includes('408') || msg.includes('504')) {
        res.status(504).json({ error: 'Gateway Timeout: AI service took too long to respond.' });
        return;
      }
      res.status(502).json({ error: 'Bad Gateway: AI service is temporarily unavailable. Please try again later.' });
      return;
    }

    res.status(500).json({ error: 'An unexpected error occurred while generating the AI briefing.' });
  }
};
