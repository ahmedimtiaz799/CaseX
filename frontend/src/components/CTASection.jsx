import { motion, useReducedMotion } from 'framer-motion';

const CTASection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-slate-900 py-24 px-6 relative overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-96 h-96 rounded-full bg-amber-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">

        <motion.h2
          className="font-heading text-4xl font-bold text-white text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' }}
        >
          Ready to Read Smarter?
        </motion.h2>

        <motion.p
          className="text-slate-400 text-center mt-4 text-lg max-w-xl mx-auto font-sans"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut', delay: shouldReduceMotion ? 0 : 0.1 }}
        >
          Join 500+ legal professionals who've stopped reading everything and started asking the right questions.
        </motion.p>

        <motion.button
          onClick={() => window.location.href = '/login'}
          className="mt-10 bg-amber-500 text-slate-900 px-8 py-3 rounded-lg font-heading font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut', delay: shouldReduceMotion ? 0 : 0.15 }}
        >
          Start Analyzing Free
        </motion.button>

      </div>
    </section>
  );
};

export default CTASection;