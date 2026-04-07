import { Bot, CheckSquare } from "lucide-react";

export function Header() {
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
        <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
          <Bot className="w-4 h-4 text-emerald-400" />
          <span className="font-medium text-slate-300">Connected</span>
        </div>
      </div>
    </header>
  );
}
