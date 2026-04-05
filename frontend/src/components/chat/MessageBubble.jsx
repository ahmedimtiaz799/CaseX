import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, User, Check, Paperclip } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const [showSources, setShowSources] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isUser = message?.role === 'user';

  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2 mb-6`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="text-amber-400 w-3.5 h-3.5" />
        </div>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
        <div
          className={
            isUser
              ? 'rounded-2xl rounded-tr-sm px-4 py-3 font-sans text-sm font-medium'
              : 'bg-slate-800 border border-white/[0.08] text-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 font-sans text-sm leading-relaxed w-full'
          }
          style={isUser ? { backgroundColor: '#f59e0b', color: '#0f172a' } : {}}
        >
          {message.content}
        </div>

        {!isUser && message.sources?.length > 0 && (
          <div className="mt-2.5 flex flex-col items-start w-full">
            <button
              onClick={() => setShowSources(prev => !prev)}
              className="text-xs text-slate-500 font-medium cursor-pointer hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Paperclip className="w-3 h-3" />
              Sources ({message.sources.length})
            </button>

            {showSources && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="mt-2 space-y-1.5 w-full"
              >
                {message.sources.map((source, idx) => (
                  <div
                    key={source.id ?? idx}
                    className="text-xs text-slate-400 bg-slate-900 border border-white/[0.07] rounded-xl px-3 py-2.5"
                  >
                    {(source.page || source.section) && (
                      <span className="inline-flex items-center text-[11px] font-semibold text-emerald-400 mr-2">
                        <Check className="w-[10px] h-[10px] mr-1" />
                        Pg {source.page}
                        {source.section ? `, Sec ${source.section}` : ''}
                      </span>
                    )}
                    <span className="leading-relaxed">{source.text}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-full bg-slate-700 border border-white/[0.08] flex items-center justify-center text-slate-300 shrink-0">
          <User className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;