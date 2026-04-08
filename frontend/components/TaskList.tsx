import { Check, Trash2, Calendar } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export function TaskList({ tasks, onToggle, onDelete, isLoading = false }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-4 animate-pulse flex items-center space-x-4">
            <div className="w-5 h-5 rounded border border-slate-700/50 bg-slate-800"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-3 bg-slate-800 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="glass-card p-8 text-center flex flex-col items-center justify-center">
        <div className="bg-slate-800/50 p-4 rounded-full mb-4">
          <Check className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-lg font-medium text-slate-300 mb-1">No tasks remaining</h3>
        <p className="text-slate-500 text-sm">You're all caught up! Add a new task above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className={`glass-card p-4 group flex items-start space-x-3 transition-all duration-300 ${
            task.isCompleted ? 'opacity-50 grayscale' : ''
          }`}
        >
          <button
            onClick={() => onToggle(task.id, !task.isCompleted)}
            className={`mt-1 flex-shrink-0 w-5 h-5 rounded border flex flex-col items-center justify-center transition-colors ${
              task.isCompleted 
                ? 'bg-primary border-primary text-white' 
                : 'border-slate-500 hover:border-primary text-transparent hover:text-primary/20'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium truncate transition-all ${
              task.isCompleted ? 'line-through text-slate-400' : 'text-slate-200 mt-0.5'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex items-center text-xs text-slate-600 mt-2.5 space-x-1 font-medium">
              <Calendar className="w-3 h-3" />
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={() => onDelete(task.id)}
            className="opacity-50 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all flex-shrink-0"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
