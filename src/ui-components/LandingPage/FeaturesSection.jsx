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
    title: "Access Detailed Company Data",
    description:
      "Gain company data such as job listings, posts, employee counts, industry insights, and more.",
  },
  {
    icon: Users,
    title: "Identify C-Level Executives",
    description:
      "Quickly identify top executives and decision-makers within organizations.",
  },
  {
    icon: Search,
    title: "Advanced Search and Filtering",
    description:
      "Leverage LinkedIn’s filters to conduct precise and efficient searches for people and companies.",
  },
  {
    icon: ListTodo,
    title: "Bulk Data Processing",
    description:
      "Fetch LinkedIn profiles, companies, jobs, and posts in bulk—up to 1,000 profiles per minute.",
  },
  {
    icon: MailCheck,
    title: "Find Verified Emails Across LinkedIn",
    description:
      "Generate verified emails for decision-makers, hiring teams, and professionals using advanced algorithms.",
  },
  {
    icon: AtSign,
    title: "Email-to-LinkedIn Profile Lookup",
    description:
      "Find LinkedIn profiles directly from email addresses for targeted outreach.",
  },
  {
    icon: Activity,
    title: "Activity Insights",
    description:
      'Track recent activities, connections, and "open to work" statuses, including posts and interactions.',
  },
  {
    icon: Code,
    title: "Content Scraping with Pagination",
    description:
      "Extract posts, comments, reactions, and more with full pagination support for scalable data collection.",
  },
  {
    icon: Filter,
    title: "Get SalesNavigator Premium Insights",
    description:
      "Gain access to Premium info about accounts and leads using advanced filters to enhance your strategies.",
  },
  {
    icon: BookOpen,
    title: "Access User-Friendly API Documentation",
    description:
      "Integrate seamlessly with our API using clear, user-friendly documentation for an efficient developer experience.",
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
