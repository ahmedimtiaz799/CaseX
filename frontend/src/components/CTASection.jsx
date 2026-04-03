import { motion, useReducedMotion } from 'framer-motion';
import { Lock, ServerOff, CheckCircle2 } from 'lucide-react';

const CTASection = () => {
  const shouldReduceMotion = useReducedMotion();
  const dur = (d) => (shouldReduceMotion ? 0 : d);

  return (
    <section className="relative bg-slate-900 py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.15), transparent)' }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 65%)' }}
      />

      <div
        className="absolute inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
        <motion.div
          className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-widest"
          style={{ backgroundColor: 'rgba(245,158,11,0.08)' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: dur(0.45), ease: 'easeOut' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
          Get started today — it's free
        </motion.div>

        <motion.h2
          className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: dur(0.55), ease: 'easeOut', delay: dur(0.08) }}
        >
          Your next contract review{' '}
          <span style={{
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            starts here.
          </span>
        </motion.h2>

        <motion.p
          className="text-slate-400 text-lg mt-5 max-w-lg"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: dur(0.5), ease: 'easeOut', delay: dur(0.15) }}
        >
          Join 500+ legal professionals who've stopped reading everything
          and started asking the right questions with CaseX.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 mt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: dur(0.5), ease: 'easeOut', delay: dur(0.22) }}
        >
          <button
            onClick={() => window.location.href = '/signup'}
            style={{ backgroundColor: '#f59e0b', color: '#0f172a' }}
            className="h-12 px-8 rounded-xl font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-200 cursor-pointer shadow-[0_0_32px_rgba(245,158,11,0.4)] hover:shadow-[0_0_48px_rgba(245,158,11,0.55)]"
          >
            Start Analyzing Free →
          </button>

          <a
            href="#features"
            className="h-12 px-7 rounded-xl font-semibold text-sm text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 hover:bg-white/[0.04] transition-all duration-200 flex items-center"
          >
            See all features
          </a>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 mt-10 pt-8 border-t border-slate-800/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true , amount: 0.1}}
          transition={{ duration: dur(0.5), ease: 'easeOut', delay: dur(0.32) }}
        >
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <Lock className="w-4 h-4 text-slate-500" />
            End-to-end encrypted
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <ServerOff className="w-4 h-4 text-slate-500" />
            Documents never stored
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-500/80" />
            No credit card required
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.1), transparent)' }}
      />
    </section>
  );
};

export default CTASection;