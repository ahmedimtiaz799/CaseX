import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FileText, AlertTriangle, Calendar, ShieldAlert } from 'lucide-react';

const CARDS = [
  { id: 'summarize', text: 'Summarize this contract', icon: FileText },
  { id: 'penalties', text: 'What are the penalty clauses?', icon: AlertTriangle },
  { id: 'expiry', text: 'When does this agreement expire?', icon: Calendar },
  { id: 'risky', text: 'Flag any unusual or risky terms', icon: ShieldAlert },
];

const SuggestionCards = ({ onSendMessage }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }), [shouldReduceMotion]);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' },
    },
  }), [shouldReduceMotion]);

  return (
    <div className="relative flex flex-col items-center justify-center flex-1 px-6 py-16 overflow-hidden">

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.09) 0%, transparent 65%)',
          transform: 'translateZ(0)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">

        <div
          className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-widest"
          style={{ backgroundColor: 'rgba(245,158,11,0.08)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
          CaseX
        </div>

        <h2 className="font-heading font-bold text-white text-2xl text-center mb-2 tracking-tight">
          What would you like to know?
        </h2>
        <p className="font-sans text-slate-400 text-sm text-center mb-10 max-w-sm">
          Upload a document, then ask anything about it.
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full items-start"
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                variants={itemVariants}
                onClick={() => onSendMessage(card.text)}
                type="button"
                className="group bg-slate-900/60 border border-white/[0.07] rounded-2xl p-4 flex flex-col items-start cursor-pointer hover:border-amber-500/25 hover:bg-slate-900/90 hover:shadow-[0_0_24px_rgba(245,158,11,0.08)] transition-all duration-300 text-left w-full"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2 group-hover:bg-amber-500/15 transition-colors duration-200 shrink-0">
                  <Icon className="text-amber-400 w-4 h-4" />
                </div>
                <p className="font-sans text-sm text-slate-300 font-medium leading-snug">
                  {card.text}
                </p>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default SuggestionCards;