"use client";

import { Bot, CheckSquare, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass border-b-0">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-1.5 shadow-lg">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Task AI
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span className="font-medium text-slate-300">Connected</span>
          </div>
          {user && (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-slate-300 hidden sm:block truncate max-w-[120px]">
                {user.email}
              </span>
              <button 
                onClick={logout}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
