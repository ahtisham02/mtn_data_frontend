import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const creditItems = [
  {
    title: "Basic Profile Retrieval",
    cost: "1 credit",
  },
  {
    title: "Additional Details",
    cost: "0.5 credits per option",
    description: "Add extra details like skills, certifications.",
  },
  {
    title: "AI-Powered Endpoints",
    cost: "Credits vary per feature",
  },
];

const CreditUsageSection = () => {
  return (
    <section className="py-16 bg-white text-black md:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <p className="text-sm font-bold tracking-wider uppercase text-accent">
              Credit Usage
            </p>
            <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
              Transparent
              <span className="relative inline-block ml-3">
                <span className="absolute top-10 w-full h-3 bg-accent/20"></span>
                <span className="relative">Credit Usage</span>
              </span>
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-4 font-semibold transition-colors text-accent hover:text-blue-400"
            >
              View full breakdown here <ArrowRight size={16} />
            </a>
          </motion.div>

          <motion.div className="space-y-6" variants={fadeInUp}>
            {creditItems.map((item) => (
              <div key={item.title}>
                <div className="flex items-baseline justify-between pb-2 border-b border-slate-700">
                  <h3 className="flex items-center gap-3 text-xl font-bold">
                    <CheckCircle size={20} className="text-accent" />
                    {item.title}
                  </h3>
                  <p className="font-semibold text-slate-700">{item.cost}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mt-24 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-foreground">
            <div className="p-3 rounded-full bg-accent/10">
              <ShieldCheck className="w-12 h-12 text-accent" />
            </div>
          </div>
          <div className="p-12 bg-foreground rounded-3xl">
            <p className="text-sm font-bold pt-8 tracking-wider uppercase text-accent">
              Security First
            </p>
            <h3 className="mt-2 text-3xl font-bold text-slate-200">
              Privacy and Security First
            </h3>
            <p className="max-w-xl mx-auto mt-4 text-slate-200">
              Your data security is our priority. We're 100% GDPR compliant and
              do not store any personal data.
            </p>
            <div className="mt-8">
              <ScrollLink
                to="booking"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
                className="cursor-pointer"
              >
                <button className="px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-accent hover:bg-accent-hover hover:shadow-xl hover:-translate-y-0.5">
                  Get a Free Quote →
                </button>
              </ScrollLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreditUsageSection;
