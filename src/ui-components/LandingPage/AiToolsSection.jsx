import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

import img1 from "../../assets/img/1.png";
import img2 from "../../assets/img/2.png";
import img3 from "../../assets/img/3.png";
import img4 from "../../assets/img/4.png";
import img5 from "../../assets/img/5.png";
import img6 from "../../assets/img/6.png";
import img7 from "../../assets/img/7.png";
import img8 from "../../assets/img/8.png";
import img9 from "../../assets/img/9.png";
import img10 from "../../assets/img/10.png";
import img11 from "../../assets/img/11.png";

const tools = [
  {
    category: "Instant Support",
    brand: "AI Suite",
    title: "ChatBot",
    description:
      "Resolve any query about people or organizations through an AI-powered chat assistant.",
    image: img1,
    accentClass: "bg-green-500",
  },
  {
    category: "Smart Suggestions",
    brand: "AI Suite",
    title: "Profile Optimizer",
    description:
      "Analyze profile details and get AI-generated suggestions for better positioning and visibility.",
    image: img2,
    accentClass: "bg-teal-500",
  },
  {
    category: "Efficient Reviews",
    brand: "AI Suite",
    title: "Magic Pen",
    description:
      "Gain insights on strengths and areas for improvement across profiles and companies.",
    image: img3,
    accentClass: "bg-cyan-500",
  },
  {
    category: "AI Recommendations",
    brand: "AI Suite",
    title: "Automated Enhancer",
    description:
      "Generate actionable, AI-driven improvement tips for personal or company profiles.",
    image: img4,
    accentClass: "bg-sky-500",
  },
  {
    category: "AI Insights",
    brand: "AI Suite",
    title: "Insight Generator",
    description:
      "Receive data-backed insights tailored to individual or organizational profiles.",
    image: img5,
    accentClass: "bg-indigo-500",
  },
  {
    category: "Career Enhancement",
    brand: "AI Suite",
    title: "Career Predictor",
    description:
      "Forecast career growth paths and opportunities using AI-based profile analysis.",
    image: img6,
    accentClass: "bg-purple-500",
  },
  {
    category: "Industry Trends",
    brand: "AI Suite",
    title: "Market Trend Explorer",
    description:
      "Discover job market and industry trends to support recruitment and strategic decisions.",
    image: img7,
    accentClass: "bg-pink-500",
  },
  {
    category: "Automated Copywriting",
    brand: "AI Suite",
    title: "Message & Email Crafter",
    description:
      "Compose personalized messages and emails to engage prospects or stakeholders effectively.",
    image: img8,
    accentClass: "bg-rose-500",
  },
  {
    category: "Profile Benchmarking",
    brand: "AI Suite",
    title: "Profile Qualifier",
    description:
      "Benchmark profiles against industry standards or lead requirements to identify gaps.",
    image: img9,
    accentClass: "bg-orange-500",
  },
  {
    category: "Smart Comparisons",
    brand: "AI Suite",
    title: "Benchmarking Tool",
    description:
      "Evaluate profiles against key benchmarks and performance indicators for optimization.",
    image: img10,
    accentClass: "bg-amber-500",
  },
  {
    category: "Competitive Edge",
    brand: "AI Suite",
    title: "Competitor Analyzer",
    description:
      "Compare any profile with competitors to discover strengths and improvement areas using AI.",
    image: img11,
    accentClass: "bg-lime-500",
  },
];

const ToolCard = ({ tool }) => (
  <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_31.5%] min-w-0 px-3">
    <div className="flex flex-col h-full overflow-hidden text-center transition-all duration-300 bg-white border rounded-2xl border-border hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`w-full py-2 text-sm font-bold text-white ${tool.accentClass}`}
      >
        {tool.category}
      </div>
      <div className="flex flex-col flex-grow p-4">
        <div className="pb-4 mb-4 border-b border-border">
          <img
            src={tool.image}
            alt={tool.title}
            className="object-contain w-full h-32 mx-auto"
          />
        </div>
        <div className="flex flex-col flex-grow text-left">
          <p className="text-sm text-muted">{tool.brand}</p>
          <h3 className="mt-1 text-xl font-bold text-foreground">
            {tool.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted flex-grow">
            {tool.description}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const AiToolsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="aitools" className="py-16 bg-card md:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-wider uppercase text-accent">
            AI TOOLS FOR DATA INSIGHTS
          </p>
          <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
            AI-Powered Endpoints for
            <span className="relative inline-block ml-3">
              <span className="absolute top-10 w-full h-3 bg-accent/20"></span>
              <span className="relative">Smarter Decisions</span>
            </span>
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-3">
              {tools.map((tool) => (
                <ToolCard key={tool.title} tool={tool} />
              ))}
            </div>
          </div>

          <button
            className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-6 p-2 rounded-full bg-white shadow-md hover:bg-accent hover:text-white transition-colors"
            onClick={scrollPrev}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-6 p-2 rounded-full bg-white shadow-md hover:bg-accent hover:text-white transition-colors"
            onClick={scrollNext}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "bg-accent scale-125" : "bg-border"
              }`}
            />
          ))}
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
              <span className="flex items-center text-lg">GET TOOLS</span>
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

export default AiToolsSection;
