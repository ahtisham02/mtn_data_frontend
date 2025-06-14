import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "MTN Data ScrapeX API has revolutionized how we access LinkedIn data. The real-time information and AI-powered insights are unparalleled.",
    name: "Alex J.",
    title: "CTO | Tech Innovators Inc.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Reliable dummy
  },
  {
    quote:
      "The custom solutions offered by MTN Data ScrapeX perfectly fit our enterprise needs. Highly recommended!",
    name: "Maria G.",
    title: "Lead Developer | Global Solutions Ltd.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg", // Reliable dummy
  },
  {
    quote:
      "Incredible speed and accuracy. The API documentation is clean and made our integration process a breeze.",
    name: "David Chen",
    title: "Senior Engineer | DataDriven Co.",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg", // Reliable dummy
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const TestimonialCard = ({ quote, name, title, avatar }) => (
  <motion.div
    variants={fadeInUp}
    className="flex flex-col h-full p-8 rounded-2xl shadow-lg bg-card/80 backdrop-blur-lg"
  >
    <Quote className="w-8 h-8 text-accent/50" />
    <p className="flex-grow mt-4 text-lg italic leading-relaxed text-foreground">
      "{quote}"
    </p>
    <div className="flex items-center gap-4 pt-6 mt-6 border-t border-border">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
      <div>
        <p className="font-bold text-foreground">{name}</p>
        <p className="text-sm text-muted">{title}</p>
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative py-16 overflow-hidden bg-background md:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/80 to-foreground"></div>

      <div className="relative z-10 container px-4 mx-auto max-w-7xl">
        <motion.div
          className="text-center text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <p className="text-sm font-bold tracking-wider uppercase text-accent">
            What Our Clients Say
          </p>
          <h2 className="mt-2 text-4xl font-bold text-gray-100 md:text-5xl">
            <span className="relative inline-block ml-2">
              <span className="absolute bottom-0 w-full h-2 bg-accent/30"></span>
              <span className="relative">Testimonials</span>
            </span>
            <br />
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
