import type { Task } from '@prisma/client';
import { prisma } from '../config/db.js';

export const createTask = async (userId: string, title: string, description?: string) => {
  return prisma.task.create({
    data: {
      userId,
      title,
      description: description ?? null,
    },
  });
};

export const getAllTasks = async (userId: string) => {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getPendingTasks = async (userId: string) => {
  return prisma.task.findMany({
    where: { userId, isCompleted: false },
    orderBy: { createdAt: 'desc' },
  });
};

export const deleteTaskById = async (userId: string, id: string) => {
  return prisma.task.deleteMany({
    where: { id, userId },
  });
};

export const updateTaskById = async (userId: string, id: string, data: Partial<Task>) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) {
    throw new Error("Task not found or unauthorized");
  }
  
  // Exclude fields we shouldn't update
  const { id: _id, userId: _userId, createdAt: _createdAt, updatedAt: _updatedAt, ...updateData } = data;

  return prisma.task.update({
    where: { id },
    data: updateData,
  });
};