import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-slate-950 text-slate-200">
      {/* Background aesthetics */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="z-10 text-center max-w-2xl px-6">
        <div className="inline-flex items-center justify-center p-3 bg-slate-800/50 rounded-full mb-6 border border-slate-700/50 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center mr-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <span className="font-semibold text-slate-200 pr-2">Task AI Manager</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
          Supercharge your productivity
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto">
          Experience the next generation of task management. An elegant, AI-driven interface designed to keep you relentlessly focused on what matters most.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            href="/signup"
            className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
          >
            Get Started Free
          </Link>
          <Link 
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium rounded-xl border border-slate-700 transition-all backdrop-blur-md active:scale-95"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
