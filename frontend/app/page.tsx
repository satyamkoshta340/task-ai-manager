"use client";

import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { TaskInput } from "../components/TaskInput";
import { TaskList, Task } from "../components/TaskList";
import { AIBriefing } from "../components/AIBriefing";

const API_BASE = "http://localhost:4000";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [briefing, setBriefing] = useState<string | null>(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingBriefing, setLoadingBriefing] = useState(false);
  const [addingTask, setAddingTask] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const fetchBriefing = async () => {
    setLoadingBriefing(true);
    try {
      const res = await fetch(`${API_BASE}/tasks/summary`);
      if (res.ok) {
        const data = await res.json();
        setBriefing(data.briefing);
      } else {
        setBriefing("Failed to generate AI briefing. Please check your backend logs.");
      }
    } catch (error) {
      console.error("Failed to fetch briefing", error);
      setBriefing("Failed to connect to the backend server. Ensure it's running on port 4000.");
    } finally {
      setLoadingBriefing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // Initially fetch briefing
    fetchBriefing();
  }, []);

  const handleAddTask = async (title: string, description?: string) => {
    setAddingTask(true);
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        const newTask = await res.json();
        // Since we sort by latest first
        setTasks([newTask, ...tasks]);
      }
    } catch (error) {
      console.error("Failed to add task", error);
    } finally {
      setAddingTask(false);
    }
  };

  const handleToggleTask = async (id: string, isCompleted: boolean) => {
    // Optimistic UI update
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted } : t));
    
    // Attempt backend update (if a PATCH route existed)
    // NOTE: Current backend controller does not have a toggle endpoint yet.
    // So this will revert on refresh unless implemented later!
  };

  const handleDeleteTask = async (id: string) => {
    const previousTasks = [...tasks];
    // Optimistic UI update
    setTasks(tasks.filter(t => t.id !== id));
    
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) {
        // Revert on failure
        setTasks(previousTasks);
      }
    } catch (error) {
      console.error("Failed to delete task", error);
      setTasks(previousTasks);
    }
  };

  return (
    <div className="min-h-screen text-slate-200 selection:bg-primary/30 font-sans pb-16">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          
          {/* Main Task Area */}
          <div className="lg:col-span-7 space-y-8 relative z-10">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center text-white drop-shadow-md">
                Focus for Today
              </h2>
              <TaskInput onAdd={handleAddTask} isSubmitting={addingTask} />
            </div>
            
            <div className="pt-2">
              <TaskList 
                tasks={tasks} 
                onToggle={handleToggleTask} 
                onDelete={handleDeleteTask} 
                isLoading={loadingTasks} 
              />
            </div>
          </div>
          
          {/* Sidebar / Briefing Area */}
          <div className="lg:col-span-5 relative z-10">
            <div className="sticky top-24 h-[600px] max-h-[calc(100vh-8rem)]">
              <AIBriefing 
                briefing={briefing} 
                isLoading={loadingBriefing} 
                onRefresh={fetchBriefing} 
              />
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
