import React from "react";
import { motion } from "framer-motion";
import { InlineWidget } from "react-calendly";
import { Mountain, Clock, Calendar } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BookingSection = () => {
  return (
    <section id="booking" className="relative py-16 bg-white md:py-24">
      <div className="relative z-10 container px-4 mx-auto max-w-7xl">
        <motion.div
          className="text-center text-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <p className="text-sm font-bold tracking-wider uppercase text-accent">
            Book an Appointment
          </p>
          <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
            Ready to Unlock
            <span className="relative inline-block ml-3">
              <span className="absolute top-10 w-full h-3 bg-accent/20"></span>
              <span className="relative">LinkedIn Data?</span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-700">
            Book an appointment with our team to discover how MTN Data ScrapeX
            API can empower your applications.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 overflow-hidden border border-border bg-card rounded-2xl shadow-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="p-8 border-b lg:border-b-0 lg:border-r border-border">
              <div className="flex items-center gap-2">
                <Mountain className="w-8 h-8 text-accent" />
                <span className="text-xl font-bold text-foreground">
                  MTN DATA
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-bold text-foreground">
                Book your LinkedIn Data Solutions Call
              </h3>
              <div className="mt-6 space-y-4 text-muted">
                <div className="flex items-center gap-3">
                  <Clock size={20} />
                  <span>30 Mins</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={20} />
                  <span>Select a Date & Time</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-muted">
                See how MTN Data ScrapeX API can meet your needs for real-time
                LinkedIn data and AI-powered insights – let's find out if we're
                the right fit for you.
              </p>
            </div>

            <div className="lg:col-span-2 min-h-[700px]">
              <InlineWidget
                url="https://calendly.com/razorsgamer2005/30min"
                styles={{ height: "700px", width: "100%" }}
                pageSettings={{
                  backgroundColor: "ffffff",
                  hideEventTypeDetails: true,
                  hideLandingPageDetails: true,
                  primaryColor: "3b82f6",
                  textColor: "0f172a",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
