import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../ui-components/LandingPage/Navbar";
import Footer from "../../ui-components/LandingPage/Footer";
import HeroSection from "../../ui-components/LandingPage/HeroSection";
import WhyChooseUs from "../../ui-components/LandingPage/WhyChooseUs";
import FeaturesSection from "../../ui-components/LandingPage/FeaturesSection";
import AiToolsSection from "../../ui-components/LandingPage/AiToolsSection";
import ApiEndpointsSection from "../../ui-components/LandingPage/ApiEndpointsSection";
import CreditUsageSection from "../../ui-components/LandingPage/CreditUsageSection";
import DetailCreditUsageSection from "../../ui-components/LandingPage/DetailCreditUsageSection";
import PackagesSection from "../../ui-components/LandingPage/PackagesSection";
import BookingSection from "../../ui-components/LandingPage/BookingSection";
import TestimonialsSection from "../../ui-components/LandingPage/TestimonialsSection";
import FaqSection from "../../ui-components/LandingPage/FaqSection";
import Intercom from "@intercom/messenger-js-sdk";

const LandingPage = () => {
  const location = useLocation();

      const intercomAppId = import.meta.env.VITE_INTERCOM_APP_ID;
  
      useEffect(() => {
      Intercom({
        app_id: intercomAppId,
      });
    }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <div className="font-plus-jakarta">
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <FeaturesSection /> 
        <AiToolsSection />
        <ApiEndpointsSection /> 
        <CreditUsageSection /> 
        <PackagesSection /> 
        <BookingSection /> 
        <TestimonialsSection />
        <DetailCreditUsageSection /> 
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;