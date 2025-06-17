import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, MessageSquare } from 'lucide-react';
import { Link as ScrollLink } from "react-scroll";

const inquiryData = [
  {
    question: 'How up-to-date is the information?',
    answer: 'Our data is sourced live and on-demand. We do not rely on caches, which means every request you make pulls the most current information available directly from the source.'
  },
  {
    question: 'What are your privacy & security measures?',
    answer: 'We prioritize your security above all else. Our platform is built with industry-leading security protocols and is fully GDPR compliant. We never store end-user personal data on our servers.'
  },
  {
    question: 'Are there options for custom solutions?',
    answer: 'Yes, we excel at creating tailored solutions. We recognize that one size doesn\'t fit all, and we are happy to discuss custom plans and integrations to meet your project\'s unique demands.'
  }
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="faq" className="py-16 bg-card md:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-wider uppercase text-accent">Common Inquiries</p>
          <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
            Clearing Your
            <span className="relative inline-block ml-3">
              <span className="absolute top-10 w-full h-3 bg-accent/20"></span>
              <span className="relative">Doubts</span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-3 lg:gap-16">
          <div className="flex flex-col gap-4">
            {inquiryData.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-full p-4 text-lg font-semibold text-left rounded-lg transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white hover:bg-white hover:shadow-md'
                }`}
              >
                {item.question}
              </button>
            ))}
          </div>

          <div className="relative lg:col-span-2 min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="p-8 bg-white border border-border rounded-lg shadow-sm"
              >
                <p className="text-lg leading-relaxed text-muted">
                  {inquiryData[activeIndex].answer}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative mt-24">
          <div className="absolute top-0 flex justify-center w-full -translate-y-1/2">
            <div className="p-4 rounded-full bg-foreground">
                <div className="p-3 text-white rounded-full bg-accent">
                    <HelpCircle className="w-12 h-12" />
                </div>
            </div>
          </div>
          <div className="px-8 py-12 text-center text-white rounded-3xl bg-foreground pt-20">
            <p className="text-sm font-bold tracking-wider uppercase text-accent mb-2">Need More Info?</p>
            <h3 className="text-3xl font-bold">Can't Find Your Answer?</h3>
            <p className="max-w-xl mx-auto mt-4 text-slate-300">
              If your question isn't listed here, please don't hesitate to reach out. Our team is ready to assist you.
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
              <button className="flex items-center gap-2 px-6 py-3 mx-auto font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-accent hover:bg-accent-hover hover:shadow-xl hover:-translate-y-0.5">
                <MessageSquare size={18} />
                Get in Touch
              </button>
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;