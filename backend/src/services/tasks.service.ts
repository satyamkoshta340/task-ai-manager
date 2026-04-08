import type { Task } from '@prisma/client';
import { prisma } from '../config/db.js';

export const createTask = async (title: string, description?: string) => {
  return prisma.task.create({
    data: {
      title,
      description: description ?? null,
    },
  });
};

export const getAllTasks = async () => {
  return prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getPendingTasks = async () => {
  return prisma.task.findMany({
    where: { isCompleted: false },
    orderBy: { createdAt: 'desc' },
  });
};

export const deleteTaskById = async (id: string) => {
  return prisma.task.delete({
    where: { id },
  });
};

// only update field that are sent  
export const updateTaskById = async (id: string, data: Partial<Task>) => {
  return prisma.task.update({
    where: { id },
    data: {
      ...data,
    },
  });
};