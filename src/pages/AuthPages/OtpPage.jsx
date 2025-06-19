import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { KeyRound, ShieldCheck } from "lucide-react";
import AuthLayout from "../../routes/AuthLayout";
import FormInput from "../../ui-components/FormInput";
import apiRequest from "../../utils/apiRequest";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ThreeDotsLoader = ({ bgColorClass = "bg-white" }) => {
  const loaderVariants = {
    animation: { transition: { staggerChildren: 0.1 } }
  };
  const dotVariants = {
    animation: {
      y: [0, -8, 0],
      transition: { duration: 0.8, ease: "easeInOut", repeat: Infinity },
    },
  };
  return (
    <motion.div
      variants={loaderVariants}
      animate="animation"
      className="flex items-center justify-center gap-1"
      aria-label="Loading..."
    >
      <motion.span variants={dotVariants} className={`w-2 h-2 ${bgColorClass} rounded-full`} />
      <motion.span variants={dotVariants} className={`w-2 h-2 ${bgColorClass} rounded-full`} />
      <motion.span variants={dotVariants} className={`w-2 h-2 ${bgColorClass} rounded-full`} />
    </motion.div>
  );
};

export default function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);

//   useEffect(() => {
//     if (!email) {
//       toast.error("No email address found. Please start over.");
//       navigate('/forgot-password');
//     }
//   }, [email, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setIsResending(true);
    try {
      await apiRequest("post", "/auth/resend-verify-emai", { email });
      toast.info("A new OTP has been sent to your email.");
      setCountdown(60);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  const formik = useFormik({
    initialValues: { otp: '' },
    validationSchema: Yup.object({
      otp: Yup.string().matches(/^\d{6}$/, 'Must be a 6-digit code').required('OTP is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await apiRequest("post", "/auth/verify-otp", { email, otp: values.otp });
        toast.success("OTP verified successfully!");
        navigate("/reset-password", { state: { email, token: response.data.resetToken } });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Invalid OTP. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout
      pageTitle="Verify Your Identity"
      welcomeMessage="For your security, please enter the 6-digit code we sent to your email address."
    >
      <motion.div
        className="flex flex-col w-full h-full"
        initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <header className="text-center">
          <motion.h2 variants={itemVariants} className="mb-2 text-3xl font-bold text-card-foreground">
            Enter Verification Code
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-8 text-muted">
            A 6-digit code has been sent to <strong className="text-foreground">{email}</strong>.
          </motion.p>
        </header>

        <form onSubmit={formik.handleSubmit} className="flex-grow space-y-4">
          <FormInput
            icon={KeyRound}
            type="text"
            placeholder="6-Digit Code"
            name="otp"
            maxLength={6}
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.otp && formik.errors.otp ? (
            <div className="pt-[1px] text-xs text-red-500">{formik.errors.otp}</div>
          ) : null}
          <motion.button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            variants={itemVariants}
            className="flex items-center justify-center w-full h-[48px] font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-accent to-accent-hover hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? <ThreeDotsLoader /> : <><ShieldCheck className="w-5 h-5 mr-2" /> Verify Account</>}
          </motion.button>
        </form>

        <footer className="flex-shrink-0 mt-6">
          <motion.p variants={itemVariants} className="text-sm text-center text-muted">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={countdown > 0 || isResending}
              className="font-semibold text-accent hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? 'Sending...' : (countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code')}
            </button>
          </motion.p>
        </footer>
      </motion.div>
    </AuthLayout>
  );
}