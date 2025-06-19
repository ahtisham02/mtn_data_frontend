import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MailCheck, ArrowLeft } from "lucide-react";
import AuthLayout from "../../routes/AuthLayout";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function VerifyPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  const handleContactClick = () => {
    navigate("/", { state: { scrollTo: "booking" } });
  };

  return (
    <AuthLayout
      pageTitle="Verify Your Email"
      welcomeMessage="Your account is almost ready. Please check your inbox to complete the registration."
    >
      <motion.div
        className="flex flex-col items-center justify-center w-full h-full text-center"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-accent/10"
        >
          <MailCheck className="w-10 h-10 text-accent" />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="mb-2 text-3xl font-bold text-card-foreground"
        >
          Check Your Email
        </motion.h2>

        <motion.p variants={itemVariants} className="max-w-sm mb-8 text-muted">
          We've sent a verification link to{" "}
          {email ? (
            <strong className="text-foreground">{email}</strong>
          ) : (
            "your email address"
          )}
          . Please click the link in that email to activate your account.
        </motion.p>

        <motion.div variants={itemVariants} className="w-full">
          <Link
            to="/login"
            className="flex items-center justify-center w-full h-[48px] font-semibold text-accent transition-all duration-300 bg-transparent border rounded-lg border-accent hover:bg-accent/10 hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Login
          </Link>
        </motion.div>

        <motion.p variants={itemVariants} className="mt-6 text-xs text-muted">
          Didn't receive the email?{" "}
          <button
            onClick={handleContactClick}
            className="font-semibold text-accent hover:underline"
          >
            Contact Us
          </button>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
}
