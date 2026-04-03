import { motion, useReducedMotion } from 'framer-motion';
import { Search, AlertTriangle, FileText, Zap } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Search,
    label: 'Instant Clause Search',
    description:
      'Pinpoint any clause in seconds. CaseX scans your entire document and surfaces the exact provision you need with its page and section cited.',
    span: 'col-span-12 md:col-span-7',
    accent: 'from-amber-500/10 to-transparent',
  },
  {
    id: 2,
    icon: AlertTriangle,
    label: 'Risk Flag Detection',
    description:
      'Flag high risk terms before you sign. CaseX highlights penalty clauses, unusual liability terms, and one sided obligations automatically.',
    span: 'col-span-12 md:col-span-5',
    accent: 'from-red-500/8 to-transparent',
  },
  {
    id: 3,
    icon: FileText,
    label: 'Plain-English Summaries',
    description:
      'Understand complex agreements without a law degree. Get a concise, jargon free summary of any document section on demand in the language your clients actually understand.',
    span: 'col-span-12 md:col-span-5',
    accent: 'from-sky-500/8 to-transparent',
  },
  {
    id: 4,
    icon: Zap,
    label: 'Cited Answers in Seconds',
    description:
      'Every answer links back to the exact paragraph. No hallucinations, no vague references just pinpoint accuracy your team can act on immediately.',
    span: 'col-span-12 md:col-span-7',
    accent: 'from-emerald-500/8 to-transparent',
  },
];

const FeaturesSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.55, ease: 'easeOut' },
    },
  };

  return (
    <section id="features" className="relative bg-slate-950 py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-slate-700 bg-slate-900 text-slate-400 text-xs font-semibold uppercase tracking-widest">
            Features
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need to{' '}
            <span style={{
              background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Understand Any Document
            </span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-xl mx-auto">
            Built for legal professionals who need answers, not more reading.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-12 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px', amount: 0.1 }}
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                variants={itemVariants}
                className={`${feat.span} group`}
              >
                <div className="relative h-full rounded-2xl border border-white/[0.07] bg-slate-900/60 overflow-hidden p-7 hover:border-amber-500/25 transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.06)] cursor-pointer">
                  <div className={`absolute top-0 left-0 w-48 h-48 rounded-br-full bg-gradient-to-br ${feat.accent} pointer-events-none opacity-60`} />

                  <div className="relative z-10 inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 border border-amber-500/20 bg-amber-500/10 group-hover:bg-amber-500/15 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-amber-400" strokeWidth={1.75} />
                  </div>

                  <h3 className="relative z-10 font-bold text-white text-lg mb-2.5">
                    {feat.label}
                  </h3>
                  <p className="relative z-10 text-slate-400 text-sm leading-relaxed max-w-sm">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;