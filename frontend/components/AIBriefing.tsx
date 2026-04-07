import { Sparkles, Loader2, RefreshCw } from "lucide-react";

interface AIBriefingProps {
  briefing: string | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export function AIBriefing({ briefing, isLoading, onRefresh }: AIBriefingProps) {
  // Ultra-simple markdown parser for the gemini response
  const formatBriefing = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Bold strong
      let formattedLine = line;
      // Headers
      if (formattedLine.startsWith('##')) {
        return <h3 key={index} className="text-primary font-semibold mt-4 mb-2 text-base">{formattedLine.replace('##', '').trim()}</h3>;
      }
      if (formattedLine.startsWith('#')) {
        return <h2 key={index} className="text-white font-bold mt-4 mb-2 text-lg">{formattedLine.replace('#', '').trim()}</h2>;
      }
      // List items
      if (formattedLine.startsWith('* ') || formattedLine.startsWith('- ')) {
        const textPart = formattedLine.substring(2);
        // Quick bold parser for lists
        const boldSplit = textPart.split(/\*\*(.*?)\*\*/g);
        return (
          <li key={index} className="ml-4 flex items-start space-x-2 my-1">
            <span className="text-primary mt-1">•</span>
            <span>
              {boldSplit.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-slate-200">{part}</strong> : part)}
            </span>
          </li>
        );
      }
      // Empty lines
      if (formattedLine.trim() === '') return <div key={index} className="h-2"></div>;
      
      // Default text with bold
      const boldSplit = formattedLine.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={index} className="my-1.5 leading-relaxed">
          {boldSplit.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-slate-200">{part}</strong> : part)}
        </p>
      );
    });
  };

  return (
    <div className="glass-card overflow-hidden h-full flex flex-col border border-slate-700/50 shadow-2xl">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 border-b border-slate-800 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
        <div className="flex items-center space-x-2 text-primary relative z-10">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <h2 className="font-semibold text-lg drop-shadow-md">Daily Briefing</h2>
        </div>
        <button 
          onClick={onRefresh}
          disabled={isLoading}
          className="text-slate-400 hover:text-white transition-colors disabled:opacity-50 relative z-10 bg-slate-800/80 p-2 rounded-md hover:bg-slate-700 active:scale-95"
          title="Refresh Briefing"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm animate-pulse font-medium">AI is analyzing your tasks...</p>
          </div>
        ) : briefing ? (
          <div className="text-slate-300 text-sm">
            {formatBriefing(briefing)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-3 text-slate-500">
            <div className="bg-slate-800/50 p-4 rounded-full">
              <Sparkles className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-sm text-center">No briefing available.<br/>Add tasks and click refresh!</p>
          </div>
        )}
      </div>
    </div>
  );
}
