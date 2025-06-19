import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { ShieldCheck, LogIn } from 'lucide-react';
import AuthLayout from "../../routes/AuthLayout";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function VerifyEmailPage() {
  useEffect(() => {
    toast.success("Email verified successfully! You can now log in.");
  }, []);

  return (
    <AuthLayout
      pageTitle="Verification Complete"
      welcomeMessage="Thank you for verifying your email. You can now access all features of your account."
    >
      <motion.div
        className="flex flex-col items-center justify-center w-full h-full text-center"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-green-500/10"
        >
          <ShieldCheck className="w-10 h-10 text-green-500" />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="mb-2 text-3xl font-bold text-card-foreground"
        >
          Email Verified!
        </motion.h2>

        <motion.p variants={itemVariants} className="max-w-sm mb-8 text-muted">
          Your email address has been successfully verified. Welcome aboard!
        </motion.p>

        <motion.div variants={itemVariants} className="w-full">
          <Link
            to="/login"
            className="flex items-center justify-center w-full h-[48px] font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-accent to-accent-hover hover:shadow-xl hover:-translate-y-0.5"
          >
            <LogIn className="w-5 h-5 mr-2" /> Proceed to Login
          </Link>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}