import { motion, useReducedMotion } from 'framer-motion';
import { UploadCloud, MessageSquare, BookOpen } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: UploadCloud,
    title: 'Upload Your Documents',
    desc: 'Drag and drop any contract, rulebook, or case file. PDF and DOCX support built in no formatting required.',
    detail: 'Supports PDF',
  },
  {
    num: '02',
    icon: MessageSquare,
    title: 'Ask in Plain English',
    desc: 'Type any question exactly as you\'d ask a colleague. No boolean queries, no search syntax just natural language.',
    detail: 'Natural language processing',
  },
  {
    num: '03',
    icon: BookOpen,
    title: 'Get Cited Answers',
    desc: 'Receive precise answers with exact document citations page number, section, and clause ready to act on immediately.',
    detail: 'Every answer is cited',
  },
];

const HowItWorksSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="relative bg-slate-900 py-28 px-6 overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.15), transparent)' }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-[0.07]"
        style={{ background: 'radial-gradient(ellipse, #f59e0b 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/60 text-slate-400 text-xs font-semibold uppercase tracking-widest">
            How It Works
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Three Steps. No Training Required.
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-md mx-auto">
            From upload to cited answer in under 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">

          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px z-0"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.25), rgba(245,158,11,0.25), transparent)' }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="relative z-10 group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.55,
                  ease: 'easeOut',
                  delay: shouldReduceMotion ? 0 : i * 0.15,
                }}
              >
                <div className="rounded-2xl border border-white/[0.07] bg-slate-950/70 p-7 hover:border-amber-500/20 transition-all duration-300 hover:shadow-[0_0_32px_rgba(245,158,11,0.06)] h-full cursor-pointer">

                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-amber-500/20 bg-amber-500/10 group-hover:bg-amber-500/15 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-amber-400" strokeWidth={1.75} />
                    </div>
                    <span className="text-4xl font-black text-white select-none group-hover:text-slate-200 transition-colors duration-300">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-lg mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {step.desc}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-400/80 bg-amber-500/8 border border-amber-500/15 px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(245,158,11,0.08)' }}>
                    <span className="w-1 h-1 rounded-full bg-amber-400 inline-block" />
                    {step.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;