import React, { useState, useMemo } from "react";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_PUBLISHABLE_KEY?.startsWith("pk_")
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

if (!stripePromise) {
  console.warn(
    "Stripe Publishable Key is missing or invalid. Please set VITE_STRIPE_PUBLISHABLE_KEY in your .env file."
  );
}

const packages = [
  {
    id: "plan_pro",
    name: "Pro Plan",
    price: 99.99,
    details: ["Unlimited Credits", "High-Volume Requests"],
    features: [
      { text: "Full LinkedIn Profile, Jobs & Company Data", included: true },
      { text: "Premium Company & Sales Navigator Insights", included: true },
      { text: "Bulk Processing for All Endpoints", included: true },
      { text: "AI-Powered Endpoints Included", included: true },
      { text: "Amazing Endpoints Included", included: true },
      { text: "Priority Email & Chat Support", included: true },
    ],
    rateLimit: "Generous Rate Limits for Professional Use",
  },
];

const PackageCard = ({ pkg, onCtaClick, isLoading }) => {
  return (
    <div className="flex flex-col h-full p-8 transition-all duration-300 bg-white border rounded-2xl border-border hover:shadow-xl hover:-translate-y-1">
      <h3 className="text-2xl font-bold text-foreground">{pkg.name}</h3>
      <div className="flex items-end mt-4">
        <span className="text-5xl font-extrabold text-foreground">
          ${pkg.price}
        </span>
        <span className="pb-1 ml-2 font-semibold text-muted">/Month</span>
      </div>
      <div className="mt-4 space-y-1 text-sm text-muted">
        {pkg.details.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
      </div>
      <div className="flex flex-col flex-grow pt-8 mt-8 border-t border-border">
        <ul className="space-y-4">
          {pkg.features.map((feature) => (
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
        {pkg.rateLimit && (
          <p className="mt-6 text-xs font-semibold text-muted">
            {pkg.rateLimit}
          </p>
        )}
        <div className="mt-auto pt-6">
          <button
            onClick={onCtaClick}
            disabled={isLoading}
            className={`flex items-center justify-center w-full px-4 py-2 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-accent hover:bg-accent-hover hover:shadow-xl`}
          >
            {isLoading ? "Processing..." : "Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
};

const PackagesSection = () => {
  const [loadingPlanId, setLoadingPlanId] = useState(null);

  const planToStripeCheckoutLinkUrl = useMemo(
    () => ({
      plan_pro: "https://buy.stripe.com/test_7sYaEX5T06oh63355pbfO00",
    }),
    []
  );

  const handlePlanSelect = async (planId) => {
    const checkoutLinkUrl = planToStripeCheckoutLinkUrl[planId];

    if (!checkoutLinkUrl) {
      toast.error("Stripe Checkout Link for this plan is not configured.");
      return;
    }

    setLoadingPlanId(planId);

    try {
      if (!stripePromise) {
        toast.error("Stripe configuration is missing. Payments are disabled.");
        throw new Error("Stripe is not initialized.");
      }
      window.location.href = checkoutLinkUrl;
    } catch (error) {
      console.error("Error during Stripe redirection:", error);
      toast.error("An unexpected error occurred while redirecting to payment.");
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
            Simple, Powerful Pricing
          </p>
          <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
            The Only
            <span className="relative inline-block ml-3">
              <span className="absolute bottom-1 w-full h-3 bg-accent/20"></span>
              <span className="relative">Plan You'll Ever Need</span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted">
            Unlock every feature and endpoint with one straightforward plan. No
            tiers, no confusion—just pure API power.
          </p>
        </div>

        <div className="flex justify-center mt-16">
          <div className="w-full max-w-md">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onCtaClick={() => handlePlanSelect(pkg.id)}
                isLoading={loadingPlanId === pkg.id}
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
              Schedule a Free Consultation <ArrowRight size={18} />
            </button>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
