import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Mail, Send } from "lucide-react";
import AuthLayout from "../../routes/AuthLayout";
import FormInput from "../../ui-components/FormInput";
import apiRequest from "../../utils/apiRequest";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ThreeDotsLoader = () => {
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
      <motion.span variants={dotVariants} className="w-2 h-2 bg-white rounded-full" />
      <motion.span variants={dotVariants} className="w-2 h-2 bg-white rounded-full" />
      <motion.span variants={dotVariants} className="w-2 h-2 bg-white rounded-full" />
    </motion.div>
  );
};

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await apiRequest("post", "/auth/forgot-password", values);
        toast.info("If an account with that email exists, a verification code has been sent.");
        navigate("/otp", { state: { email: values.email } });
      } catch (error) {
        const errorMessage = error?.response?.data?.message || "An error occurred. Please try again.";
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout
      pageTitle="Forgot Password?"
      welcomeMessage="No worries! Enter your email below and we'll send you a link to reset your password."
    >
      <motion.div
        className="flex flex-col w-full h-full"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <header className="text-center">
          <motion.h2 variants={itemVariants} className="mb-2 text-3xl font-bold text-card-foreground">
            Reset Your Password
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-8 text-muted">
            Please enter the email address associated with your account. We will send a secure link to your inbox.
          </motion.p>
        </header>

        <form onSubmit={formik.handleSubmit} className="flex-grow space-y-4">
          <FormInput
            icon={Mail}
            type="email"
            placeholder="Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="pt-[1px] text-xs text-red-500">{formik.errors.email}</div>
          ) : null}

          <motion.button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            variants={itemVariants}
            className="flex items-center justify-center w-full h-[48px] font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-accent to-accent-hover hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? <ThreeDotsLoader /> : <><Send className="w-5 h-5 mr-2" /> Send Reset Link</>}
          </motion.button>
        </form>

        <footer className="flex-shrink-0 mt-6">
          <motion.p variants={itemVariants} className="mt-6 text-sm text-center text-muted">
            Remembered your password?{" "}
            <Link to="/login" className="font-semibold text-accent hover:underline">
              Back to Login
            </Link>
          </motion.p>
        </footer>
      </motion.div>
    </AuthLayout>
  );
}