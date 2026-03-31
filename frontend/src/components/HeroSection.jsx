import { motion, useReducedMotion } from 'framer-motion';

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-gradient-to-br from-zinc-50 to-white py-20 lg:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">

        <motion.div
          className="w-full lg:w-[55%] flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }}
        >
          <div className="text-sm text-slate-400 font-medium mb-6">
            ⚡ Trusted by 500+ legal professionals worldwide
          </div>

          <h1 className="font-heading text-5xl font-bold text-slate-900 leading-tight">
            Every Contract Has Answers. CaseX Finds{' '}
            <span className="text-amber-500">Them.</span>
          </h1>

          <p className="text-slate-600 text-lg mt-6 max-w-lg font-sans">
            Upload contracts, rulebooks, or case files. Ask in plain English get cited answers in seconds. No legal background needed.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">
            <motion.button
              animate={{ scale: [1, 1.02, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold font-heading hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Analyze Your First Document
            </motion.button>

            <button className="border-2 border-slate-900 text-slate-900 px-6 py-3 rounded-lg font-semibold font-heading hover:bg-slate-50 transition-colors cursor-pointer">
              Watch Demo
            </button>
          </div>
        </motion.div>

        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
          <motion.div
            className="w-full max-w-md bg-white border border-zinc-200 shadow-xl shadow-amber-500/10 rounded-2xl p-6 origin-bottom-right"
            initial={{ opacity: 0, x: 30, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              delay: shouldReduceMotion ? 0 : 0.2,
              ease: 'easeOut',
            }}
          >
            <div className="text-xs font-medium text-slate-400 font-heading uppercase tracking-wide mb-4">
              Service Agreement — Section 4.2
            </div>

            <div className="h-2 bg-slate-100 rounded w-full mt-3"></div>
            <div className="h-2 bg-slate-100 rounded w-4/5 mt-2"></div>
            <div className="h-2 bg-slate-100 rounded w-11/12 mt-2"></div>

            <div className="h-2 bg-amber-200 rounded w-3/4 mt-4"></div>

            <div className="h-2 bg-slate-100 rounded w-full mt-4"></div>
            <div className="h-2 bg-slate-100 rounded w-2/3 mt-2"></div>
            <div className="h-2 bg-slate-100 rounded w-5/6 mt-2"></div>

            <div className="mt-6 inline-flex items-center gap-1 bg-amber-500/10 text-amber-700 text-xs font-medium px-3 py-1 rounded-full border border-amber-500/20">
              ✓ Penalty clause found — Section 4.2
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;