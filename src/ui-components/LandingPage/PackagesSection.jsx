import React, { useState, useMemo } from "react";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Stripe configuration remains the same
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_PUBLISHABLE_KEY?.startsWith("pk_")
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

if (!stripePromise) {
  console.warn(
    "Stripe Publishable Key is missing or invalid. Please set VITE_STRIPE_PUBLISHABLE_KEY in your .env file."
  );
}

// Renamed and rephrased the package data
const subscriptionTiers = [
  {
    id: "plan_pro", // Kept the ID for Stripe link consistency
    name: "All-Access Tier",
    price: 99.99,
    details: ["Unrestricted API Usage", "Built for Scale"],
    features: [
      { text: "Comprehensive Profile, Job, and Company Data", included: true },
      { text: "Advanced Sales & Company Intelligence", included: true },
      { text: "High-Throughput Bulk Operations", included: true },
      { text: "Access to All AI-Enhanced Endpoints", included: true },
      { text: "Exclusive Access to Advanced Endpoints", included: true },
      { text: "Dedicated Support via Chat & Email", included: true },
    ],
    rateLimit: "High-Capacity Rate Limiting for Enterprise Needs",
  },
];

// Renamed the component and its prop for clarity
const SubscriptionCard = ({ tier, onCtaClick, isLoading }) => {
  return (
    <div className="flex flex-col h-full p-8 transition-all duration-300 bg-white border rounded-2xl border-border hover:shadow-xl hover:-translate-y-1">
      <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
      <div className="flex items-end mt-4">
        <span className="text-5xl font-extrabold text-foreground">
          ${tier.price}
        </span>
        <span className="pb-1 ml-2 font-semibold text-muted">/per mo.</span>
      </div>
      <div className="mt-4 space-y-1 text-sm text-muted">
        {tier.details.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
      </div>
      <div className="flex flex-col flex-grow pt-8 mt-8 border-t border-border">
        <ul className="space-y-4">
          {tier.features.map((feature) => (
            <li key={feature.text} className="flex items-start gap-3">
              {feature.included ? (
                <CheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
              ) : (
                <XCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-rose-400" />
              )}
              <span
                className={
                  !feature.included
                    ? "text-muted line-through"
                    : "text-foreground"
                }
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        {tier.rateLimit && (
          <p className="mt-6 text-xs font-semibold text-muted">
            {tier.rateLimit}
          </p>
        )}
        <div className="mt-auto pt-6">
          <button
            onClick={onCtaClick}
            disabled={isLoading}
            className={`flex items-center justify-center w-full px-4 py-2 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-accent hover:bg-accent-hover hover:shadow-xl`}
          >
            {isLoading ? "Redirecting..." : "Subscribe Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Renamed the main section component
const PricingSection = () => {
  const [loadingPlanId, setLoadingPlanId] = useState(null);

  // This map's key must match the `id` in the data above
  const planToStripeCheckoutLinkUrl = useMemo(
    () => ({
      plan_pro: "https://buy.stripe.com/test_7sYaEX5T06oh63355pbfO00",
    }),
    []
  );

  const handlePlanSelect = async (planId) => {
    const checkoutLinkUrl = planToStripeCheckoutLinkUrl[planId];

    if (!checkoutLinkUrl) {
      toast.error("The payment link for this tier is not available.");
      return;
    }

    setLoadingPlanId(planId);

    try {
      if (!stripePromise) {
        toast.error("Payment system is currently unavailable.");
        throw new Error("Stripe has not been initialized.");
      }
      window.location.href = checkoutLinkUrl;
    } catch (error) {
      console.error("Stripe redirection failed:", error);
      toast.error("Could not redirect to the payment page. Please try again.");
      setLoadingPlanId(null);
    }
  };

  return (
    <section id="packages" className="py-16 bg-background md:py-24">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-wider uppercase text-accent">
            All-Inclusive Value
          </p>
          <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
            Everything You Need,
            <span className="relative inline-block ml-3">
              <span className="absolute bottom-1 w-full h-3 bg-accent/20"></span>
              <span className="relative">All in One Place</span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted">
            Gain full access to our entire suite of features with a single, transparent plan. No hidden fees or complex tiers—just powerful, unrestricted data access.
          </p>
        </div>

        <div className="flex justify-center mt-16">
          <div className="w-full max-w-md">
            {subscriptionTiers.map((tier) => (
              <SubscriptionCard
                key={tier.id}
                tier={tier}
                onCtaClick={() => handlePlanSelect(tier.id)}
                isLoading={loadingPlanId === tier.id}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center mt-16 text-center">
          <ScrollLink
            to="booking"
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            className="mt-6 cursor-pointer"
          >
            <button className="flex items-center gap-2 px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-accent hover:bg-accent-hover hover:shadow-xl hover:-translate-y-0.5">
              Book a Discovery Call <ArrowRight size={18} />
            </button>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;