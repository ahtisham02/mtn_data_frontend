import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Volume2 } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const HeroSection = () => {
  return (
    <section id="home" className="py-16 bg-sky-100 md:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
            >
              Fuel Your{" "}
              <span className="text-accent">Pipeline</span> with Real-Time
              <span className="relative inline-block">
                <span className="absolute top-12 w-full h-3 bg-accent/20"></span>
                <span className="relative">B2B Intelligence</span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg text-muted md:text-xl"
            >
              Mtn gives you the most robust European mobile phone numbers and B2B emails of people you want to do business with.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-10">
              <ScrollLink
                to="booking"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
                className="cursor-pointer"
              >
                <button className="inline-flex flex-col items-center px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-accent to-accent-hover hover:shadow-xl hover:-translate-y-0.5">
                  <span className="flex items-center text-lg">
                    GET STARTED
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                  <span className="text-xs font-normal tracking-wider uppercase">
                    Schedule a Free Consultation
                  </span>
                </button>
              </ScrollLink>
            </motion.div>
          </div>

          {/* Right Column: SIMPLIFIED Video Player */}
          <motion.div variants={fadeInUp} className="w-full max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 p-3 font-bold text-white rounded-t-lg bg-accent">
              <Volume2 size={20} />
              CLICK BELOW TO WATCH!
            </div>
            <div className="overflow-hidden rounded-b-lg shadow-2xl aspect-w-16 aspect-h-[8.7] relative">
              <video
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                loop
                playsInline
                controls
                className="w-full h-auto rounded-b-lg"
              ></video>
            </div>
            <p className="mt-4 font-semibold text-center text-muted">
              MTN DATA SCRAPEX API INTRO
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
