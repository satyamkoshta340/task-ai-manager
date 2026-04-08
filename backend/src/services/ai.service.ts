import { GoogleGenAI } from '@google/genai';
import { getPendingTasks } from './tasks.service.js';

export const generateDailyBriefing = async (userId: string) => {
  if (!process.env.GEMINI_API_KEY) {
    const err = new Error('GEMINI_API_KEY is missing in environment configuration.');
    (err as any).code = 'CONFIG_ERROR';
    throw err;
  }

  let pendingTasks;
  try {
    pendingTasks = await getPendingTasks(userId);
  } catch (error) {
    const err = new Error('Failed to fetch pending tasks from the database.');
    (err as any).code = 'DB_ERROR';
    throw err;
  }

  if (pendingTasks.length === 0) {
    return "You have no pending tasks. Enjoy your day!";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const taskListText = pendingTasks.map((t: any, i: number) => `${i + 1}. ${t.title}${t.description ? ` - ${t.description}` : ''}`).join('\n');
  const prompt = `You are an AI daily briefing assistant.
    Look at my pending tasks today and provide a concise, friendly, 
    and motivational plain-English briefing summarizing what I have to do. 
    Be professional yet encouraging.
    \n\nHere are my tasks:\n
    ${taskListText}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error: any) {
    const err = new Error(error.message || 'Failed to communicate with AI service');
    (err as any).code = 'API_ERROR';
    (err as any).originalError = error;
    throw err;
  }
};
