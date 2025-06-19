import React, { useState, useMemo } from "react";
import { CheckCircle, XCircle, ArrowRight, Gift, Zap, TrendingUp, Rocket, Building2 } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_PUBLISHABLE_KEY?.startsWith("pk_") ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

const packages = [
  {
    id: 'plan_free',
    name: "Basic",
    price: 0,
    icon: <Gift className="w-7 h-7 text-muted-foreground" />,
    details: ["100 Credits"],
    features: [
      { text: "LinkedIn Profile Data", included: true }, { text: "LinkedIn Jobs Data", included: true }, { text: "LinkedIn Company Data", included: true },
      { text: "Bulk Processing", included: false }, { text: "Premium Company Insights", included: false }, { text: "Sales Navigator Search", included: false },
    ],
    rateLimit: "Rate Limit: 1000 requests/hour",
  },
  {
    id: 'plan_pro',
    name: "Pro",
    price: 49,
    icon: <Zap className="w-7 h-7 text-accent" />,
    details: ["20,000 Credits"],
    features: [
      { text: "LinkedIn Profile Data", included: true }, { text: "LinkedIn Jobs Data", included: true }, { text: "LinkedIn Company Data", included: true },
      { text: "Bulk Processing", included: true }, { text: "Sales Navigator Search", included: true }, { text: "Employee Search", included: false },
    ],
    rateLimit: "Rate Limit: 20 requests/minute",
  },
  {
    id: 'plan_growth',
    name: "Growth",
    price: 99,
    icon: <TrendingUp className="w-7 h-7 text-accent" />,
    details: ["100,000 Credits"],
    features: [
      { text: "All Pro Features", included: true }, { text: "Premium Company Insights", included: true }, { text: "Employee Search", included: true },
      { text: "AI-Powered Endpoints", included: false },
    ],
    rateLimit: "Rate Limit: 35 requests/minute",
  },
  {
    id: 'plan_ultra',
    name: "Ultra",
    price: 199,
    icon: <Rocket className="w-7 h-7 text-accent" />,
    details: ["350,000 Credits"],
    features: [
      { text: "All Growth Features", included: true }, { text: "AI-Powered Endpoints", included: true }, { text: "Amazing Endpoints", included: true }, { text: "Priority Support", included: true },
    ],
    rateLimit: "Rate Limit: 50 requests/minute",
  },
  {
    id: 'plan_mega',
    name: "Custom / Enterprise",
    price: 'Custom',
    description: "Need a tailor-made solution? Let's build a plan that fits your unique scale, support, and data requirements.",
    features: [
      { text: "Custom Credit Volume" }, { text: "Dedicated Onboarding" }, { text: "Custom Rate Limits & SLAs" },
    ],
  },
];

const PackageCard = ({ pkg, onCtaClick, isLoading }) => {
  const isFreePlan = pkg.price === 0;

  return (
    <div className="flex flex-col h-full p-8 transition-all duration-300 bg-white border rounded-2xl border-border hover:shadow-2xl hover:-translate-y-2">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${isFreePlan ? 'bg-gray-100' : 'bg-accent/10'}`}>
        {pkg.icon}
      </div>
      <h3 className="text-2xl font-bold text-foreground">{pkg.name}</h3>
      <div className="flex items-end mt-4">
        {typeof pkg.price === 'number' ? (
          <>
            <span className="text-5xl font-extrabold text-foreground">${pkg.price}</span>
            <span className="pb-1 ml-2 font-semibold text-muted">/Month</span>
          </>
        ) : (
          <span className="text-4xl font-extrabold text-foreground">{pkg.price}</span>
        )}
      </div>
      <div className="mt-4 space-y-1 text-sm text-muted font-semibold">{pkg.details.map((detail) => (<p key={detail}>{detail}</p>))}</div>
      <div className="flex flex-col flex-grow pt-8 mt-8 border-t border-border">
        <ul className="space-y-4">{pkg.features.map((feature) => (<li key={feature.text} className="flex items-start gap-3">{feature.included ? (<CheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />) : (<XCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-rose-400" />)}<span className={!feature.included ? "text-muted line-through" : "text-foreground"}>{feature.text}</span></li>))}</ul>
        {pkg.rateLimit && (<p className="mt-6 text-xs font-semibold text-muted">{pkg.rateLimit}</p>)}
        <div className="mt-auto pt-8">
          <button
            onClick={onCtaClick}
            disabled={isFreePlan || isLoading}
            className={`flex items-center justify-center w-full px-4 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg ${isFreePlan ? 'bg-muted cursor-not-allowed' : 'bg-accent hover:bg-accent-hover hover:shadow-xl'}`}
          >
            {isLoading ? "Processing..." : (isFreePlan ? 'Current Plan' : 'Get Started')}
          </button>
        </div>
      </div>
    </div>
  );
};

const PackagesSection = () => {
    const [loadingPlanId, setLoadingPlanId] = useState(null);
    const standardPackages = packages.filter(p => p.price !== 'Custom');
    const customPackage = packages.find(p => p.price === 'Custom');

    const planToStripeCheckoutLinkUrl = useMemo(() => ({
        "plan_pro": "https://buy.stripe.com/test_00w14n1CKaExcrrapJbfO01",
        "plan_growth": "https://buy.stripe.com/test_8x27sL818cMFfDD1TdbfO02",
        "plan_ultra": "https://buy.stripe.com/test_bJe00j6X45kd2QRapJbfO03",
    }), []);

    const handlePlanSelect = async (planId) => {
        const checkoutLinkUrl = planToStripeCheckoutLinkUrl[planId];

        if (!checkoutLinkUrl || checkoutLinkUrl.startsWith("YOUR_")) {
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
            toast.error("An unexpected error occurred while redirecting to payment.");
            setLoadingPlanId(null);
        }
    };

    return (
        <section id="packages" className="py-16 bg-background md:py-24">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="text-center">
                    <p className="text-sm font-bold tracking-wider uppercase text-accent">All-Inclusive Value</p>
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

                <div className="grid grid-cols-1 gap-4 mt-16 md:grid-cols-2 lg:grid-cols-4">
                    {standardPackages.map((pkg) => (
                        <PackageCard
                            key={pkg.id}
                            pkg={pkg}
                            onCtaClick={() => handlePlanSelect(pkg.id)}
                            isLoading={loadingPlanId === pkg.id}
                        />
                    ))}
                </div>

                {customPackage && (
                    <div className="relative p-8 mt-16 overflow-hidden text-white transition-all duration-300 rounded-2xl bg-foreground hover:shadow-2xl">
                        <Building2 className="absolute w-40 h-40 text-white/10 -top-8 -right-8" />
                        <div className="relative items-center justify-between lg:flex">
                            <div className="lg:w-3/5">
                                <h3 className="text-3xl font-bold">{customPackage.name}</h3>
                                <p className="mt-2 text-lg text-white/80">{customPackage.description}</p>
                                <ul className="flex flex-wrap mt-4 gap-x-6 gap-y-2">
                                    {customPackage.features.map(feature => (
                                        <li key={feature.text} className="flex items-center gap-2 text-sm font-semibold">
                                            <CheckCircle className="flex-shrink-0 w-4 h-4 text-white/80" />
                                            {feature.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-6 lg:mt-0 lg:w-auto lg:ml-8">
                                <ScrollLink to="booking" spy={true} smooth={true} offset={-70} duration={800} className="cursor-pointer">
                                    <button className="flex items-center justify-center w-full gap-2 px-8 py-3 font-bold text-accent transition-all duration-300 bg-white rounded-full shadow-lg lg:w-auto hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5">
                                        Contact Sales <ArrowRight size={18} />
                                    </button>
                                </ScrollLink>
                            </div>
                        </div>
                    </div>
                )}
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