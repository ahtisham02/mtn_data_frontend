import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const creditData = [
  {
    category: "Personal Data",
    endpoints: [
      {
        name: "Get Personal Profile (Basic Call)",
        credits: "1",
        description: "Retrieves essential profile details.",
      },
      {
        name: "Get Personal Profile (Additional Options)",
        credits: "+0.5 per option",
        description: "Adds skills, certifications, etc.",
      },
      {
        name: "Get Profile’s Posts",
        credits: "2",
        description: "Retrieves posts from a profile.",
      },
      {
        name: "Detect Activity Time",
        credits: "2",
        description: "Checks the most recent activity time of a profile.",
      },
      {
        name: "Search Posts",
        credits: "2",
        description: "Searches posts on LinkedIn.",
      },
    ],
  },
  {
    category: "Company Data",
    endpoints: [
      {
        name: "Get Company By URL",
        credits: "1",
        description: "Retrieves data for a company by URL.",
      },
      {
        name: "Get Company’s Posts",
        credits: "2",
        description: "Retrieves posts from a company.",
      },
      {
        name: "Get Company By Domain",
        credits: "1",
        description: "Fetches company data using its domain.",
      },
      {
        name: "Get Company By ID",
        credits: "1",
        description: "Fetches company data by ID.",
      },
      {
        name: "Get Company Insights (Sales Nav)",
        credits: "5",
        description:
          "Provides insights into the company using Sales Navigator.",
      },
      {
        name: "Find Custom Headcount",
        credits: "1",
        description: "Retrieves custom headcount data.",
      },
      {
        name: "Count Job Openings",
        credits: "1",
        description: "Counts active job postings for the company.",
      },
      {
        name: "Get Crunchbase Details",
        credits: "2",
        description: "Fetches Crunchbase details of the company.",
      },
    ],
  },
  {
    category: "Job Search",
    endpoints: [
      {
        name: "Search Employees (Sales Nav)",
        credits: "Step 1: 50, Step 2: Free, Step 3: 0.5 per profile",
        description: "Credits per search request, status checks are free.",
      },
      {
        name: "Search Companies (Sales Nav)",
        credits: "Step 1: 25, Step 2: Free, Step 3: 0.3 per company",
        description: "Credits per search request, status checks are free.",
      },
      {
        name: "Search Jobs",
        credits: "2",
        description: "Searches job postings on LinkedIn.",
      },
      {
        name: "Get Job Details",
        credits: "1",
        description: "Fetches detailed information about a job posting.",
      },
      {
        name: "Search LinkedIn Profiles Via Google",
        credits: "2",
        description: "Searches LinkedIn profiles through Google.",
      },
    ],
  },
  {
    category: "Other",
    endpoints: [
      {
        name: "Get Recommendation Given",
        credits: "1",
        description: "Retrieves recommendations given by a profile.",
      },
      {
        name: "Get Recommendation Received",
        credits: "1",
        description: "Retrieves recommendations received by a profile.",
      },
      {
        name: "Get Years of Experience",
        credits: "1",
        description: "Fetches total years of experience for a profile.",
      },
      {
        name: "Get Open To Work Status",
        credits: "1",
        description: "Checks if the profile is open to work.",
      },
      {
        name: "Get Open Profile Status",
        credits: "1",
        description: "Checks if the profile is open to messaging.",
      },
      {
        name: "Get Profile PDF CV",
        credits: "1",
        description: "Fetches the profile’s CV in PDF format.",
      },
      {
        name: "Get Extra Profile Data",
        credits: "1",
        description: "Retrieves additional data from a profile.",
      },
      {
        name: "Search LinkedIn Company Pages Via Google",
        credits: "2",
        description: "Searches for LinkedIn company pages through Google.",
      },
    ],
  },
];

const CreditUsageSection = () => {
  const [activeCategory, setActiveCategory] = useState(creditData[0].category);
  const activeData = creditData.find((d) => d.category === activeCategory);

  return (
    <section id="Credit Usage" className="py-16 bg-background md:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-wider uppercase text-accent">
            Full Breakdown
          </p>
          <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
            Credit
            <span className="relative inline-block ml-2">
              <span className="absolute bottom-0 w-full h-2 bg-accent/30"></span>
              <span className="relative">Usage</span>
            </span>
            <br />
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted">
            For the latest update on our credit usage details, please contact us
            directly.
          </p>
        </div>

        <div className="w-full max-w-6xl p-4 mx-auto mt-12 border rounded-2xl bg-card border-border shadow-lg sm:p-6">
          <div className="flex flex-wrap md:justify-center items-center gap-2 p-2 border rounded-full bg-background border-border">
            {creditData.map((item) => (
              <button
                key={item.category}
                onClick={() => setActiveCategory(item.category)}
                className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300 flex-grow sm:flex-grow-0 ${
                  activeCategory === item.category
                    ? "bg-accent text-white"
                    : "text-muted hover:bg-white"
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-x-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <table className="w-full text-left table-auto">
                  <thead className="bg-background">
                    <tr>
                      <th className="p-4 font-semibold rounded-tl-lg">
                        Endpoint
                      </th>
                      <th className="p-4 font-semibold text-center">Credits</th>
                      <th className="p-4 font-semibold rounded-tr-lg">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeData.endpoints.map((endpoint) => (
                      <tr
                        key={endpoint.name}
                        className="border-b border-border last:border-b-0 hover:bg-background"
                      >
                        <td className="p-4 font-medium text-foreground">
                          {endpoint.name}
                        </td>
                        <td className="p-4 font-mono text-center text-accent">
                          {endpoint.credits}
                        </td>
                        <td className="p-4 text-muted">
                          {endpoint.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-12">
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
                CONTACT US FOR ALL API ENDPOINTS
              </span>
              <span className="text-xs font-normal tracking-wider uppercase">
                Schedule a Free Consultation
              </span>
            </button>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default CreditUsageSection;
