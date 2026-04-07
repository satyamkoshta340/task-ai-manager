"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface TaskInputProps {
  onAdd: (title: string, description?: string) => void;
  isSubmitting?: boolean;
}

export function TaskInput({ onAdd, isSubmitting = false }: TaskInputProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;
    onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-4 space-y-3 relative overflow-hidden group">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <input
        type="text"
        placeholder="What needs to be done?"
        className="w-full bg-transparent border-none text-foreground placeholder-slate-500 text-lg focus:outline-none focus:ring-0 relative z-10"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSubmitting}
      />
      
      <div className={`transition-all duration-300 ${title ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <input
          type="text"
          placeholder="Add details (optional)"
          className="w-full bg-slate-900/50 rounded-md px-3 py-2 text-sm text-slate-300 placeholder-slate-600 border border-slate-700/50 focus:outline-none focus:border-primary transition-colors relative z-10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-between items-center pt-2 relative z-10">
        <div className="text-xs text-slate-500">Press Enter to add task</div>
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
        >
          <Plus className={`w-4 h-4 mr-1 ${isSubmitting ? 'animate-spin' : ''}`} />
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}
