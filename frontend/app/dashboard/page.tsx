"use client";

import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { TaskInput } from "../../components/TaskInput";
import { TaskList, Task } from "../../components/TaskList";
import { AIBriefing } from "../../components/AIBriefing";
import { useAuth } from "../../context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL as string;

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [briefing, setBriefing] = useState<string | null>(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingBriefing, setLoadingBriefing] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const { token, isLoading: authLoading } = useAuth();

  const fetchTasks = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
    if (!token) return;
    setLoadingBriefing(true);
    try {
      const res = await fetch(`${API_BASE}/tasks/summary`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBriefing(data.briefing);
      } else {
        try {
          const data = await res.json();
          setBriefing(data.error || "Failed to generate AI briefing. Please check your backend logs.");
        } catch {
          setBriefing("Failed to generate AI briefing. Please check your backend logs.");
        }
      }
    } catch (error) {
      console.error("Failed to fetch briefing", error);
      setBriefing("Failed to connect to the backend server. Ensure it's running on port 4000.");
    } finally {
      setLoadingBriefing(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
      fetchBriefing();
    }
  }, [token]);

  const handleAddTask = async (title: string, description?: string) => {
    if (!token) return;
    setAddingTask(true);
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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
    if (!token) return;
    // Optimistic UI update
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted } : t));
    
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isCompleted }),
      });
      if (!res.ok) {
        // Revert on failure
        setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !isCompleted } : t));
      }
    } catch (error) {
      console.error("Failed to update task", error);
      // Revert on failure
      setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !isCompleted } : t));
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!token) return;
    const previousTasks = [...tasks];
    // Optimistic UI update
    setTasks(tasks.filter(t => t.id !== id));
    
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        // Revert on failure
        setTasks(previousTasks);
      }
    } catch (error) {
      console.error("Failed to delete task", error);
      setTasks(previousTasks);
    }
  };

  if (authLoading || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-200 selection:bg-primary/30 font-sans pb-16">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-primary animate-spin mb-4"></div>
          <p className="text-slate-400">Loading your workspace...</p>
        </div>
      </div>
    );
  }

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
