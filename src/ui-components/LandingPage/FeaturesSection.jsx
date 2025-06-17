import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Library,
  Users,
  Search,
  ListTodo,
  MailCheck,
  AtSign,
  Activity,
  Code,
  Filter,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: Library,
    title: "Access Company Data",
    description:
      "View detailed company profiles, including job listings, posts, employee size, and industry insights.",
  },
  {
    icon: Users,
    title: "Find Key Decision-Makers",
    description:
      "Instantly identify executives and top-level professionals within any organization.",
  },
  {
    icon: Search,
    title: "Smart Search & Filters",
    description:
      "Use advanced filters to quickly find relevant people, companies, and content across platforms.",
  },
  {
    icon: ListTodo,
    title: "Bulk Data Access",
    description:
      "Fetch thousands of profiles, companies, jobs, or posts per minute with seamless bulk processing.",
  },
  {
    icon: MailCheck,
    title: "Verified Email Discovery",
    description:
      "Find verified email addresses of professionals and decision-makers using intelligent detection.",
  },
  {
    icon: AtSign,
    title: "Email-to-Profile Match",
    description:
      "Look up public profiles from email addresses for precise targeting and outreach.",
  },
  {
    icon: Activity,
    title: "Activity Tracking",
    description:
      "Monitor recent activity, interests, and engagement signals from profiles and posts.",
  },
  {
    icon: Code,
    title: "Content Scraping with Pagination",
    description:
      "Extract posts, comments, and reactions at scale with full pagination support.",
  },
  {
    icon: Filter,
    title: "Premium Insights & Filters",
    description:
      "Access enriched premium-level insights and fine-tuned filters to power your strategy.",
  },
  {
    icon: BookOpen,
    title: "Developer-Friendly Docs",
    description:
      "Easy-to-follow documentation for fast, smooth integration into your workflow.",
  },
];

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section id="features" className="py-16 bg-background md:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-wider uppercase text-accent">
            Features
          </p>
          <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
            What Can You Do with
            <span className="relative inline-block ml-3">
              <span className="absolute top-10 w-full h-3 bg-accent/20"></span>
              <span className="relative">MTN Data ScrapeX API?</span>
            </span>
          </h2>
        </div>

        <div className="relative mt-16 group overflow-hidden mask-gradient">
          <motion.div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused]">
            {[...features, ...features].map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveFeature(feature)}
                className="flex items-center flex-shrink-0 gap-3 px-6 py-3 transition-all duration-300 border rounded-full cursor-pointer bg-card border-border hover:bg-accent hover:text-white"
              >
                <feature.icon className="w-5 h-5" />
                <span className="font-semibold">{feature.title}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative mt-8 min-h-[160px] w-full max-w-4xl mx-auto px-8 pt-10 rounded-2xl bg-card shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center md:flex-row md:text-left md:gap-8"
            >
              <div className="flex-shrink-0 p-4 rounded-full bg-accent/10">
                <activeFeature.icon className="w-10 h-10 text-accent" />
              </div>
              <div>
                <p className="mt-2 text-lg text-muted">
                  {activeFeature.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
