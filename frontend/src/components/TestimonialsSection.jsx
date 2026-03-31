import { motion, useReducedMotion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    initials: "SA",
    name: "Sara Ahmed",
    role: "Contract Manager, PTCL",
    quote: "CaseX saved me 4 hours reviewing a vendor agreement. I found the penalty clause in 30 seconds.",
    featured: false,
  },
  {
    id: 2,
    initials: "RK",
    name: "Raza Khan",
    role: "Startup Founder",
    quote: "We use this before signing every partnership deal. It flagged a liability clause our lawyer missed.",
    featured: true, 
  },
  {
    id: 3,
    initials: "MF",
    name: "Maria Farooq",
    role: "Legal Consultant",
    quote: "The plain-English summaries are surprisingly accurate. My non-legal clients finally understand their contracts.",
    featured: false,
  }
];

const TestimonialsSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="testimonials" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-slate-900">
            Trusted by Legal & Business Professionals
          </h2>
          <p className="text-slate-500 text-center mt-3 text-lg font-sans">
            Real feedback from people who handle contracts every day.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className={`
                bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:border-amber-500 flex flex-col justify-between
                ${testimonial.featured
                  ? 'border border-amber-500/30 shadow-lg'
                  : 'border border-zinc-200 shadow-sm'
                }
              `}
            >
              <div>
                <div className="text-7xl font-serif text-amber-500/30 leading-none select-none -mb-4">
                  &ldquo;
                </div>
                <p className="text-slate-600 italic text-sm leading-relaxed font-sans relative z-10">
                  {testimonial.quote}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-heading font-bold text-sm shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-heading font-semibold text-slate-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-400 text-xs font-sans">
                    {testimonial.role}
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