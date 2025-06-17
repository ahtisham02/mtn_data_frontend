import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ChevronRight } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

const endpoints = [
  {
    title: "Person Data Endpoints",
    description:
      "Access individual profile data, including personal info, activities, and professional details. Supports both single and bulk requests.",
    features: [
      "Fetch profile data via URL or URN (single/bulk).",
      "Get followers, connections, and recommendations.",
      "Retrieve education, experience, skills, and profile images.",
    ],
    code: `{
  "status": "success",
  "data": {
    "firstName": "Aneeq",
    "lastName": "Khurram",
    "fullName": "Aneeq Khurram",
    "connections": 3339,
    "followerCount": 3434,
    "headline": "Full-Stack Web Developer"
  }
}`,
  },
  {
    title: "Employee Search (Sales Nav)",
    description:
      "Perform filtered searches for employees and retrieve structured profile data.",
    features: [
      "Perform filtered searches for employees by role or department.",
      "Retrieve structured employee profile data.",
      "Check search status for ongoing bulk queries.",
    ],
    code: `{
  "status": "success",
  "data": [
    {
      "full_name": "Muhammad Talha Iqbal",
      "position": "QA Automation Engineer",
      "company": "Devsinc"
    },
    {
      "full_name": "Muhammad Umer",
      "position": "Tracking Areas of Impact",
      "company": "Devsinc"
    }
  ]
}`,
  },
  {
    title: "Company Data Endpoints",
    description:
      "Get detailed company information, key contacts, and media assets. Supports both single and bulk company profile queries.",
    features: [
      "Fetch company profiles by URL or domain.",
      "Retrieve logos, cover images, and job listings.",
      "Get follower counts, employee counts, and C-level contacts.",
    ],
    code: `{
  "status": "success",
  "data": {
    "urn": "urn:li:fsd_company:162479",
    "name": "Apple",
    "description": "We’re a diverse collective of thinkers and doers...",
    "employeeCount": 164741
  }
}`,
  },
  {
    title: "Jobs Endpoints",
    description:
      "Search for jobs and retrieve hiring-related data, including job descriptions and hiring team information.",
    features: [
      "Perform job searches and get job details.",
      "Access hiring team members and contact info.",
      "Supports structured data for job trends and role insights.",
    ],
    code: `{
  "status": "success",
  "data": [
    {
      "jobId": 4075053693,
      "title": "iOS Application Developer",
      "companyName": "Maqsood Labs",
      "applicants": 67
    }
  ]
}`,
  },
  {
    title: "AI Powered Endpoints",
    description:
      "AI-enhanced APIs for profile recommendations, benchmarking, and content optimization.",
    features: [
      "Generate AI-based recommendations for profile improvements.",
      "Craft personalized LinkedIn messages and emails.",
      "Benchmark profiles and analyze competitor data.",
    ],
    code: `{
  "status": "success",
  "data": {
    "recommendation": "Add quantifiable results to your job descriptions to showcase impact."
  }
}`,
  },
  {
    title: "Company Search (Sales Nav)",
    description:
      "Search for companies based on various attributes and retrieve detailed company profiles.",
    features: [
      "Search for companies with filters (industry, size, location).",
      "Bulk search support for multiple companies.",
      "Retrieve structured company data for prospecting.",
    ],
    code: `{
  "status": "success",
  "data": [
    {
      "name": "Devsinc",
      "description": "Global IT services company.",
      "employeeCount": "1.5K+"
    }
  ]
}`,
  },
  {
    title: "Credit-Savers Endpoints",
    description:
      "Efficient endpoints for finding decision-makers, key contacts, and employee data while minimizing API credit usage.",
    features: [
      "Retrieve decision-maker and key person details in bulk.",
      "Search employees by department or role.",
      "Optimized queries for lower credit consumption.",
    ],
    code: `{
  "status": "success",
  "data": [
    {
      "fullName": "Ahsan Ellahi",
      "position": "Senior Director of Engineering",
      "company": "Devsinc"
    }
  ]
}`,
  },
  {
    title: "Geo-Locations",
    description:
      "Provides geographic information based on coordinates or IP addresses.",
    features: [
      "Get geographic details based on location inputs.",
      "Reverse geolocation support (coordinates to address).",
      "IP-based location lookups for regional analysis.",
    ],
    code: `{
  "status": "success",
  "data": {
    "location": "Los Angeles",
    "country": "United States",
    "geoData": { "latitude": 34.0522 }
  }
}`,
  },
  {
    title: "Amazing Endpoints",
    description:
      "Utility endpoints for accessing LinkedIn profile data, including CV downloads and job status.",
    features: [
      "Open and retrieve profiles directly.",
      "Download CVs as PDFs.",
      'Check LinkedIn "Open to Work" status.',
    ],
    code: `{
  "status": "success",
  "data": {
    "sendMessage": true
  }
}`,
  },
  {
    title: "Give Away Endpoints",
    description: "Retrieve promotional giveaway deals and offers.",
    features: [
      "Get lists of active giveaways and promotions.",
      "Access detailed deal information.",
    ],
    code: `{
  "status": "success",
  "data": {
    "giveawayId": "12345",
    "title": "Win a $100 Amazon Gift Card!"
  }
}`,
  },
  {
    title: "Sales Navigator Complete",
    description:
      "A set of endpoints for searching LinkedIn Sales Navigator data, enabling detailed searches for leads, companies, and related suggestions.",
    features: [
      "Lead & Company Search: Retrieve detailed profiles by name, company, or URL.",
      "Suggestions & Filters: Supports search suggestions for job titles, industries, and more.",
      "Custom Filters: Filter results by seniority, experience, headcount, and language.",
    ],
    code: `{
  "status": "success",
  "data": {
    "fullName": "Aneeq Khurram",
    "headline": "Full-Stack Web Developer",
    "connections": 3392
  }
}`,
  },
];

const ApiEndpointsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEndpoint = endpoints[activeIndex];

  return (
    <section id="api" className="py-16 bg-background md:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-wider uppercase text-accent">
            API Outputs
          </p>
          <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
            Explore Our Powerful
            <span className="relative inline-block ml-3">
              <span className="absolute top-10 w-full h-3 bg-accent/20"></span>
              <span className="relative">Search Endpoints</span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ul className="space-y-2">
              {endpoints.map((endpoint, index) => (
                <li key={endpoint.title}>
                  <button
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex justify-between items-center ${
                      activeIndex === index
                        ? "bg-accent text-white shadow-lg"
                        : "bg-card hover:bg-white"
                    }`}
                  >
                    <span className="font-semibold">{endpoint.title}</span>
                    <ChevronRight
                      className={`transition-transform duration-300 ${
                        activeIndex === index ? "rotate-90" : "rotate-0"
                      }`}
                      size={20}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEndpoint.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-2xl bg-card"
              >
                <h3 className="text-2xl font-bold text-foreground">
                  {activeEndpoint.title}
                </h3>
                <p className="mt-2 text-muted">{activeEndpoint.description}</p>

                <h4 className="mt-6 mb-2 font-bold text-foreground">
                  Key Features:
                </h4>
                <ul className="space-y-2 list-disc list-inside text-muted">
                  {activeEndpoint.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>

                <div className="mt-8 overflow-hidden rounded-lg">
                  <SyntaxHighlighter
                    language="json"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1.5rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    {activeEndpoint.code.trim()}
                  </SyntaxHighlighter>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8">
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
        </div>
      </div>
    </section>
  );
};

export default ApiEndpointsSection;
