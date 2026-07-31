import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageSquare, Bot } from 'lucide-react';

interface AIChatLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  unreadCount?: number;
}

export const AIChatLauncher: React.FC<AIChatLauncherProps> = ({
  isOpen,
  onToggle,
  unreadCount = 0
}) => {
  if (isOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 bg-neutral-900 text-white p-2.5 sm:pr-5 sm:pl-3.5 rounded-full shadow-2xl border border-neutral-700/80 cursor-pointer overflow-hidden"
    >
      {/* Icon Ring with Pulsing Gradient */}
      <div className="relative w-11 h-11 rounded-full orixnal-gradient-bg p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
        <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
        </div>
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-neutral-900 animate-pulse" />
      </div>

      {/* Label (Desktop) */}
      <div className="hidden sm:flex flex-col text-left pr-1">
        <span className="text-xs font-extrabold tracking-tight text-white flex items-center gap-1.5">
          <span>Ask AI Advisor</span>
          <span className="bg-purple-500/20 text-purple-300 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md border border-purple-500/30">
            Gemini
          </span>
        </span>
        <span className="text-[10px] text-neutral-400 font-medium">
          Instant Answers & CTAs
        </span>
      </div>

      {unreadCount > 0 && (
        <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-neutral-900">
          {unreadCount}
        </span>
      )}
    </motion.button>
  );
};
