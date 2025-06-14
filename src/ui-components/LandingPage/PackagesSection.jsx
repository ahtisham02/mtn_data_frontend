import React, { useState, useMemo } from "react";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_PUBLISHABLE_KEY?.startsWith("pk_") ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

if (!stripePromise) {
    console.warn("Stripe Publishable Key is missing or invalid. Please set VITE_STRIPE_PUBLISHABLE_KEY in your .env file.");
}

const packages = [
  {
    id: 'plan_basic',
    name: "Basic",
    price: 0,
    details: ["Credits: 100/month", "Requests: 150/month"],
    features: [
      { text: "LinkedIn Profile Data", included: true }, { text: "LinkedIn Jobs Data", included: true }, { text: "LinkedIn Company Data", included: true },
      { text: "Bulk Processing", included: false }, { text: "Premium Company Insights", included: false }, { text: "Sales Navigator Search", included: false },
      { text: "AI-Powered Endpoints", included: false }, { text: "Amazing Endpoints", included: false },
    ],
    rateLimit: "Rate Limit: 1000 requests/hour",
  },
  {
    id: 'plan_pro',
    name: "Pro",
    price: 49,
    details: ["Credits: 4500/month", "Requests: 6000/month"],
    features: [
      { text: "LinkedIn Profile Data", included: true }, { text: "LinkedIn Jobs Data", included: true }, { text: "LinkedIn Company Data", included: true },
      { text: "Bulk Processing", included: true }, { text: "Premium Company Insights", included: true }, { text: "Sales Navigator Search", included: true },
      { text: "Employee Search", included: true }, { text: "AI-Powered Endpoints", included: false }, { text: "Amazing Endpoints", included: false },
    ],
    rateLimit: "Rate Limit: 20 requests/minute",
  },
  {
    id: 'plan_ultra',
    name: "Ultra",
    price: 199,
    details: ["Credits: 15000/month", "Requests: 58,000/month"],
    features: [
      { text: "LinkedIn Profile Data", included: true }, { text: "LinkedIn Jobs Data", included: true }, { text: "LinkedIn Company Data", included: true },
      { text: "Bulk Processing", included: true }, { text: "Premium Company Insights", included: true }, { text: "Sales Navigator Search", included: true },
      { text: "Employee Search", included: true }, { text: "AI-Powered Endpoints", included: true }, { text: "Amazing Endpoints", included: false },
    ],
    rateLimit: "Rate Limit: 50 requests/minute",
  },
  {
    id: 'plan_mega',
    name: "Mega",
    price: 949,
    details: ["Credits: 250,000/month", "Requests: 300,000/month"],
    features: [
      { text: "LinkedIn Profile Data", included: true }, { text: "LinkedIn Jobs Data", included: true }, { text: "LinkedIn Company Data", included: true },
      { text: "Premium Company Insights", included: true }, { text: "Sales Navigator Search", included: true }, { text: "AI-Powered Endpoints", included: true },
      { text: "Amazing Endpoints", included: true },
    ],
    rateLimit: "Rate Limit: 150 requests/minute",
  },
];

const PackageCard = ({ pkg, onCtaClick, isLoading }) => {
  const isFreePlan = pkg.price === 0;
  
  return (
    <div className="flex flex-col h-full p-8 transition-all duration-300 bg-white border rounded-2xl border-border hover:shadow-xl hover:-translate-y-1">
      <h3 className="text-2xl font-bold text-foreground">{pkg.name}</h3>
      <div className="flex items-end mt-4">
        <span className="text-5xl font-extrabold text-foreground">${pkg.price}</span>
        <span className="pb-1 ml-2 font-semibold text-muted">/Month</span>
      </div>
      <div className="mt-4 space-y-1 text-sm text-muted">{pkg.details.map((detail) => (<p key={detail}>{detail}</p>))}</div>
      <div className="flex flex-col flex-grow pt-8 mt-8 border-t border-border">
        <ul className="space-y-4">{pkg.features.map((feature) => (<li key={feature.text} className="flex items-start gap-3">{feature.included ? (<CheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />) : (<XCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-rose-400" />)}<span className={!feature.included ? "text-muted line-through" : "text-foreground"}>{feature.text}</span></li>))}</ul>
        {pkg.rateLimit && (<p className="mt-6 text-xs font-semibold text-muted">{pkg.rateLimit}</p>)}
        <div className="mt-auto pt-6">
            <button 
                onClick={onCtaClick}
                disabled={isFreePlan || isLoading}
                className={`flex items-center justify-center w-full px-4 py-2 font-semibold text-white transition-all duration-300 rounded-full shadow-lg ${
                    isFreePlan 
                        ? 'bg-muted cursor-not-allowed' 
                        : 'bg-accent hover:bg-accent-hover hover:shadow-xl'
                }`}
            >
                {isLoading ? "Processing..." : (isFreePlan ? 'Free Plan' : 'Get Started')}
            </button>
        </div>
      </div>
    </div>
  );
};

const PackagesSection = () => {
    const [loadingPlanId, setLoadingPlanId] = useState(null);

    const planToStripeCheckoutLinkUrl = useMemo(() => ({
        "plan_pro": "https://buy.stripe.com/test_28E3cv32C1mi9HFd2A7wA02",
        "plan_ultra": "https://buy.stripe.com/test_28E6oH6eO9SO4nl3s07wA01",
        "plan_mega": "https://buy.stripe.com/test_28E6oH6eO9SO4nl3s07wA01",
    }), []);

    const handlePlanSelect = async (planId) => {
        const checkoutLinkUrl = planToStripeCheckoutLinkUrl[planId];

        if (!checkoutLinkUrl) {
            toast.error("Stripe Checkout Link for this plan is not configured.");
            console.error(`Stripe Checkout Link URL for plan ID '${planId}' is not configured.`);
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
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="text-center">
                    <p className="text-sm font-bold tracking-wider uppercase text-accent">Service Packages</p>
                    <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
                        Custom Solutions
                        <span className="relative inline-block ml-3">
                            <span className="absolute bottom-1 w-full h-3 bg-accent/20"></span>
                            <span className="relative">And Flexible Packages</span>
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-4">
                    {packages.map((pkg) => (
                        <PackageCard 
                            key={pkg.id} 
                            pkg={pkg} 
                            onCtaClick={() => handlePlanSelect(pkg.id)}
                            isLoading={loadingPlanId === pkg.id}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-16">
                    <ScrollLink to="booking" spy={true} smooth={true} offset={-70} duration={800} className="cursor-pointer">
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