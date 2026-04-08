import { GoogleGenAI } from '@google/genai';
import { getPendingTasks } from './tasks.service.js';

export const generateDailyBriefing = async () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing in environment configuration.');
  }

  const pendingTasks = await getPendingTasks();

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

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text;
};
