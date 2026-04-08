"use client";

import { Bot, CheckSquare, LogOut, Zap } from "lucide-react";
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
            <div className="relative group">
              {/* The AI Avatar core */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 bg-slate-950 shadow-[0_0_15px_rgba(139,92,246,0.2)] cursor-pointer group-hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] group-hover:border-primary/70 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-indigo-500/20 animate-pulse"></div>
                <Zap className="w-4 h-4 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
              </div>

              {/* Hover Dropdown panel */}
              <div className="absolute right-0 top-full pt-2 w-60 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                <div className="p-1 rounded-2xl border border-slate-700/50 shadow-2xl backdrop-blur-xl bg-slate-900/90 flex flex-col space-y-1">
                  <div className="px-3 py-3 relative overflow-hidden rounded-t-xl group/card">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-primary/80 mb-1 flex items-center">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse mr-2"></span>
                      Neural Link Active
                    </p>
                    <p className="text-sm font-medium text-slate-200 truncate relative z-10">{user.email}</p>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-2"></div>
                  <button 
                    onClick={logout}
                    className="flex items-center justify-between w-full px-3 py-2.5 my-1 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors group/btn"
                  >
                    <span className="text-sm font-medium">Sign Out</span>
                    <LogOut className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
