import type { Request, Response } from 'express';
import * as tasksService from '../services/tasks.service.js';
import * as aiService from '../services/ai.service.js';

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    const task = await tasksService.createTask(title, description);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await tasksService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    if (!id) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }
    await tasksService.deleteTaskById(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

export const getSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const briefing = await aiService.generateDailyBriefing();
    res.json({ briefing });
  } catch (error: any) {
    console.error('AI Summary Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate AI briefing' });
  }
};
