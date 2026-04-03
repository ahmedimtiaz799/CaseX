import { motion, useReducedMotion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    initials: 'SA',
    color: 'from-violet-500 to-indigo-500',
    name: 'Sara Ahmed',
    role: 'Contract Manager',
    company: 'PTCL',
    quote:
      'CaseX saved me 4 hours reviewing a vendor agreement. I found the penalty clause in 30 seconds. It\'s now part of every review I do.',
    featured: false,
    stars: 5,
  },
  {
    id: 2,
    initials: 'RK',
    color: 'from-amber-500 to-orange-500',
    name: 'Raza Khan',
    role: 'Startup Founder',
    company: 'Independent',
    quote:
      'We run every partnership deal through CaseX before signing. It flagged a liability clause our lawyer missed that alone paid for years of subscription.',
    featured: true,
    stars: 5,
  },
  {
    id: 3,
    initials: 'MF',
    color: 'from-emerald-500 to-teal-500',
    name: 'Maria Farooq',
    role: 'Legal Consultant',
    company: 'Self-employed',
    quote:
      'The plain English summaries are surprisingly accurate. My non-legal clients finally understand their contracts without calling me every five minutes.',
    featured: false,
    stars: 5,
  },
];

const StarRow = ({ count }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.13 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="testimonials" className="relative bg-slate-950 py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-slate-700 bg-slate-900 text-slate-400 text-xs font-semibold uppercase tracking-widest">
            Testimonials
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Legal & Business Professionals
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-lg mx-auto">
            Real feedback from people who handle contracts every day.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px', amount: 0.1 }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={itemVariants}
              className="relative group"
            >
              {t.featured && (
                <div className="absolute -inset-px rounded-2xl pointer-events-none z-0"
                  style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.5), rgba(251,191,36,0.2), transparent)' }}
                />
              )}

              <div className={`
                relative z-10 h-full rounded-2xl p-7 flex flex-col justify-between
                ${t.featured
                  ? 'bg-slate-900 border border-amber-500/20'
                  : 'bg-slate-900/60 border border-white/[0.07] hover:border-white/[0.12]'
                }
                transition-all duration-300
              `}>
                {t.featured && (
                  <div className="absolute top-5 right-5 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest">
                    Most cited
                  </div>
                )}

                <div className="mb-5">
                  <StarRow count={t.stars} />
                </div>

                <p className="text-slate-300 text-[15px] leading-relaxed flex-1 mb-7">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs mt-0.5">
                      {t.role}
                      {t.company !== 'Independent' && t.company !== 'Self-employed'
                        ? `, ${t.company}`
                        : ''}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;