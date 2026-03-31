import { motion, useReducedMotion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Search, AlertTriangle, FileText } from 'lucide-react';

const FeaturesSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="features" className="bg-zinc-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-slate-900">
            Everything You Need to Understand Any Document
          </h2>
          <p className="text-slate-500 text-lg mt-3 max-w-2xl mx-auto font-sans">
            Built for legal professionals who need answers, not more reading.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <motion.div
          className="grid grid-cols-12 gap-6 mt-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-7">
            <Card className="h-full bg-white border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-500 transition-all duration-300">
              <Search className="w-8 h-8 text-amber-500 mb-4" strokeWidth={2} />
              <h3 className="font-heading font-semibold text-slate-900 text-xl mb-3">
                Instant Clause Search
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                Pinpoint any clause in seconds. CaseX scans your entire document and surfaces the exact provision you need — with its page and section cited.
              </p>
            </Card>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-5">
            <Card className="h-full bg-white border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-500 transition-all duration-300">
              <AlertTriangle className="w-8 h-8 text-amber-500 mb-4" strokeWidth={2} />
              <h3 className="font-heading font-semibold text-slate-900 text-xl mb-3">
                Risk Flag Detection
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                Flag high-risk terms before you sign. CaseX highlights penalty clauses, unusual liability terms, and one-sided obligations automatically.
              </p>
            </Card>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className="col-span-12">
            <Card className="bg-white border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-500 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="md:w-1/3 flex flex-col shrink-0">
                  <FileText className="w-8 h-8 text-amber-500 mb-4" strokeWidth={2} />
                  <h3 className="font-heading font-semibold text-slate-900 text-xl">
                    Plain-English Summaries
                  </h3>
                </div>
                <div className="md:w-2/3 md:pt-12">
                  <p className="text-slate-600 text-sm leading-relaxed font-sans">
                    Understand complex agreements without a law degree. Get a concise, jargon-free summary of any document section, on demand — in the language your clients actually understand.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;