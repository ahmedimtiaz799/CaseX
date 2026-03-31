import { motion, useReducedMotion } from 'framer-motion';

const steps = [
  {
    num: 1,
    title: "Upload Your Documents",
    desc: "Drag and drop any contract, rulebook, or case file. PDF support built in."
  },
  {
    num: 2,
    title: "Ask in Plain English",
    desc: "Type any question about your document, exactly as you'd ask a colleague."
  },
  {
    num: 3,
    title: "Get Cited Answers",
    desc: "Receive precise answers with exact document citations ready to act on immediately."
  }
];

const HowItWorksSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="bg-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white">
            How It Works
          </h2>
          <p className="text-slate-400 text-center mt-3 font-sans text-lg">
            Three steps. No training required.
          </p>
        </div>

        <div className="relative mt-14">

          <div
            className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px border-t-2 border-dashed border-amber-500/30 z-0"
            aria-hidden="true"
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  ease: 'easeOut',
                  delay: shouldReduceMotion ? 0 : index * 0.2
                }}
              >
                <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-900 font-heading font-bold text-xl flex items-center justify-center mx-auto ring-4 ring-amber-500/20 shadow-lg shadow-amber-500/20 bg-clip-padding">
                  {step.num}
                </div>

                <h3 className="text-white font-heading font-semibold text-lg mt-6">
                  {step.title}
                </h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed font-sans max-w-[260px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;