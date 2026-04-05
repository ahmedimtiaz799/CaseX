import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, FileType, Zap } from 'lucide-react';

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const ease = 'easeOut';
  const dur = (d) => (shouldReduceMotion ? 0 : d);

  return (
    <section className="relative bg-slate-950 overflow-hidden min-h-[92vh] flex items-center">

      
      <div
        className="absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          transform: 'translate(0)',
          willChange: 'transform',
        }}
      />

      
      <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.13) 0%, transparent 70%)',
          willChange: 'transform',

         }}
      />

      
      <div className="absolute bottom-0 left-0 right-0 h-32 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #020617)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

          
          <motion.div
            className="w-full lg:w-[54%] flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.65), ease }}
          >
            
            <motion.div
              className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/8 text-amber-400 text-xs font-semibold tracking-wide uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.5), ease, delay: dur(0.1) }}
              style={{ backgroundColor: 'rgba(245,158,11,0.08)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
              Trusted by 500+ legal professionals
            </motion.div>

           
            <motion.h1
              className="text-[2.85rem] lg:text-[3.5rem] font-extrabold text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.65), ease, delay: dur(0.15) }}
            >
              Every Contract<br />
              Has Answers.{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CaseX Finds Them.
              </span>
            </motion.h1>

            
            <motion.p
              className="text-slate-400 text-lg mt-6 max-w-[480px] leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.6), ease, delay: dur(0.25) }}
            >
              Upload contracts, rulebooks, or case files. Ask in plain English
              and get cited answers in seconds no legal background needed.
            </motion.p>

            
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.55), ease, delay: dur(0.35) }}
            >
              <button
                onClick={() => window.location.href = '/login'}
                style={{ backgroundColor: '#f59e0b', color: '#0f172a' }}
                className="h-12 px-7 rounded-xl font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-200 cursor-pointer shadow-[0_0_28px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]"
              >
                Analyze Your First Document →
              </button>

              <button
                onClick={() => {}}
                className="h-12 px-6 rounded-xl font-semibold text-sm text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 hover:bg-white/[0.04] transition-all duration-200 cursor-pointer inline-flex items-center gap-2.5"
              >
                <span className="w-7 h-7 rounded-full border border-slate-600 flex items-center justify-center">
                  <svg className="w-3 h-3 text-amber-400 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Watch Demo
              </button>
            </motion.div>

            
            <motion.div
  className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-slate-800/50"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: dur(0.6), ease, delay: dur(0.5) }}
>
  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
    <ShieldCheck className="w-4 h-4 text-amber-500/80" />
    End-to-end encrypted
  </div>
  
  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
    <FileType className="w-4 h-4 text-slate-500" />
    PDF support
  </div>
  
  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
    <Zap className="w-4 h-4 text-amber-500/80" />
    Answers in seconds
  </div>
</motion.div>
          </motion.div>

          
          <motion.div
            className="w-full lg:w-[46%] flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: dur(0.75), ease, delay: dur(0.2) }}
          >
            <div className="relative w-full max-w-[420px]">

              
              <div className="absolute inset-0 rounded-2xl blur-2xl opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, #f59e0b 0%, transparent 70%)',
                  willChange: 'transform',
                 }}
              />

              
              <div className="relative rounded-2xl border border-white/[0.09] bg-slate-900/80 backdrop-blur-sm overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)]">

                
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07] bg-slate-950/60">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                    service_agreement_v3.pdf
                  </span>
                  <div className="w-16" />
                </div>

                
                <div className="px-5 pt-5 pb-4">
                  <div className="text-[10px] font-semibold text-amber-400/80 uppercase tracking-widest mb-3">
                    Section 4.2 — Penalty Clause
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 rounded-full bg-slate-700/60 w-full" />
                    <div className="h-1.5 rounded-full bg-slate-700/60 w-[88%]" />
                    
                    <div className="relative h-5 rounded flex items-center px-2 overflow-hidden"
                      style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}>
                      <div className="h-1.5 rounded-full w-[72%]" style={{ background: 'rgba(245,158,11,0.5)' }} />
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-700/60 w-[95%]" />
                    <div className="h-1.5 rounded-full bg-slate-700/60 w-[60%]" />
                  </div>
                </div>

                
                <div className="mx-5 border-t border-white/[0.06]" />

                
                <div className="px-5 py-4 space-y-3">
                  
                  <div className="flex justify-end">
                    <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-br-sm text-xs font-medium text-slate-100"
                      style={{ background: 'rgba(245,158,11,0.18)', border: '1px solid rgba(245,158,11,0.22)' }}>
                      What are the penalty terms if we miss a deadline?
                    </div>
                  </div>

                  
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: dur(0.5), delay: dur(0.9) }}
                  >
                    <div className="max-w-[86%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-slate-800 border border-slate-700/60">
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Per <span className="text-amber-400 font-semibold">§4.2</span>, late delivery incurs a 2% daily penalty capped at 20% of contract value. Clause is on{' '}
                        <span className="text-amber-400 font-semibold">Page 7</span>.
                      </p>
                    </div>
                  </motion.div>

                 
                  <motion.div
                    className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: dur(0.4), delay: dur(1.1) }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Citation verified — Section 4.2, Page 7
                  </motion.div>
                </div>

               
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-slate-700/70 bg-slate-950/60">
                    <span className="text-slate-600 text-xs flex-1">Ask anything about this document…</span>
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(245,158,11,0.9)' }}>
                      <svg className="w-3 h-3 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;