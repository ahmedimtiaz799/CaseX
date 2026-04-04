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
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  }), [shouldReduceMotion]);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' },
    },
  }), [shouldReduceMotion]);

  return (
    <div className="relative bg-slate-950 flex flex-col items-center justify-center flex-1 px-6 py-16 overflow-hidden">

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.07,
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 w-full max-w-lg mx-auto">
        <h2 className="font-heading font-bold text-white text-xl text-center mb-2">
          What would you like to know?
        </h2>
        <p className="font-sans text-slate-400 text-sm text-center mb-10">
          Upload a document, then ask anything about it.
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                variants={itemVariants}
                onClick={() => onSendMessage(card.text)}
                type="button"
                className="group bg-slate-900/60 border border-white/[0.07] rounded-2xl p-4 cursor-pointer hover:border-amber-500/25 hover:bg-slate-900/90 hover:shadow-[0_0_24px_rgba(245,158,11,0.08)] transition-all duration-300 text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 group-hover:bg-amber-500/15 transition-colors duration-200">
                  <Icon className="text-amber-400 w-[18px] h-[18px]" />
                </div>
                <p className="font-sans text-sm text-slate-300 font-medium leading-relaxed">
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