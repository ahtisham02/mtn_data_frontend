import React from "react";
import { motion } from "framer-motion";
import {
  Database,
  Blocks,
  ShieldCheck,
  TrendingUp,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: Database,
    title: "Live Data Access",
    description:
      "Get 100% real-time data from trusted sources—never cached, always current.",
  },
  {
    icon: Blocks,
    title: "AI-Powered Insights",
    description:
      "Use advanced AI to extract smarter insights and streamline your workflows.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description:
      "Fully GDPR-compliant with zero data storage—your privacy is our priority.",
  },
  {
    icon: TrendingUp,
    title: "Always On",
    description:
      "Count on 100% uptime for uninterrupted data access, anytime, anywhere.",
  },
  {
    icon: Zap,
    title: "Ultra-Fast Response",
    description:
      "Global latency under 1000ms ensures smooth and efficient performance.",
  },
];


const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className="p-8 transition-all duration-300 bg-card rounded-2xl hover:shadow-2xl hover:-translate-y-2 ring-1 ring-border hover:ring-accent"
  >
    <div className="inline-flex p-3 mb-4 rounded-full bg-accent/10">
      <Icon className="w-6 h-6 text-accent" />
    </div>
    <h3 className="text-xl font-bold text-foreground">{title}</h3>
    <p className="mt-2 text-muted">{description}</p>
  </motion.div>
);

const WhyChooseUs = () => {
  return (
    <section id="WhyChooseUs" className="py-16 bg-card md:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          className="grid grid-cols-1 gap-16 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <p className="text-sm font-bold tracking-wider uppercase text-accent">
              Why Choose Us
            </p>
            <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
              Why
              <span className="relative inline-block ml-2">
                <span className="absolute bottom-0 w-full h-2 bg-accent/30"></span>
                <span className="relative">Choose</span>
              </span>
              <br />
              MTN AI Data API?
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2"
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}

            <motion.div
              variants={fadeInUp}
              className="relative flex flex-col items-center justify-end p-8 overflow-hidden text-center text-white transition-all duration-300 rounded-2xl bg-foreground sm:col-span-1 hover:-translate-y-2"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Team working together"
                className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold">Ready to Start?</h3>
                <p className="mt-2 text-slate-300">
                  Let's build something great together.
                </p>
                <ScrollLink
                  to="booking"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={800}
                  className="cursor-pointer"
                >
                  <button className="flex items-center justify-center w-full gap-2 px-6 py-3 mt-6 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-accent hover:bg-accent-hover hover:shadow-xl">
                    Work With Us
                    <ArrowRight size={18} />
                  </button>
                </ScrollLink>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
