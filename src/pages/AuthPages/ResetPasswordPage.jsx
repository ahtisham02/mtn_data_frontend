import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { Lock, Eye, EyeOff, Check, KeyRound, CheckCircle } from 'lucide-react';
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

const ValidationItem = ({ isValid, text }) => (
  <motion.div
    variants={itemVariants}
    className={`flex items-center gap-2 text-xs transition-colors ${isValid ? 'text-green-500' : 'text-muted'}`}
  >
    <Check className="w-4 h-4 flex-shrink-0" />
    <span>{text}</span>
  </motion.div>
);

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');
    const emailFromState = location.state?.email;

    if (tokenFromUrl) setToken(tokenFromUrl);
    if (emailFromState) setEmail(emailFromState);

    // if (!tokenFromUrl) {
    //   toast.error("Invalid or missing password reset token.");
    //   navigate('/login');
    // }
  }, [location, navigate]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[0-9]/, 'Password must contain a number')
        .required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await apiRequest("post", "/auth/reset-password", { ...values, token, email });
        setIsSuccess(true);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to reset password. The link may be invalid or expired.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (isSuccess) {
    return (
      <AuthLayout pageTitle="Success!" welcomeMessage="Your password has been updated. You can now log in with your new credentials.">
        <motion.div
          className="flex flex-col items-center justify-center w-full h-full text-center"
          initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-green-500/10">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <motion.h2 variants={itemVariants} className="mb-2 text-3xl font-bold text-card-foreground">
            Password Changed!
          </motion.h2>
          <motion.p variants={itemVariants} className="max-w-sm mb-8 text-muted">
            You can now use your new password to log in to your account.
          </motion.p>
          <motion.div variants={itemVariants} className="w-full">
            <Link to="/login" className="flex items-center justify-center w-full h-[48px] font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-accent to-accent-hover hover:shadow-xl hover:-translate-y-0.5">
              Return to Login
            </Link>
          </motion.div>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout pageTitle="New Password" welcomeMessage="Create a new, strong password for your account. Make sure it meets the requirements below.">
      <motion.div
        className="flex flex-col w-full h-full"
        initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <header>
          <motion.h2 variants={itemVariants} className="mb-8 text-3xl font-bold text-center text-card-foreground">
            Set New Password
          </motion.h2>
        </header>

        <form onSubmit={formik.handleSubmit} className="flex-grow space-y-4">
          <FormInput
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            endIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="transition-colors text-muted hover:text-accent">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
          />

          <div className="pt-1 space-y-1.5">
            <ValidationItem isValid={formik.values.password.length >= 8} text="At least 8 characters" />
            <ValidationItem isValid={/[A-Z]/.test(formik.values.password) && /[a-z]/.test(formik.values.password)} text="Uppercase & lowercase letters" />
            <ValidationItem isValid={/[0-9]/.test(formik.values.password)} text="At least one number" />
          </div>

          <FormInput
            icon={Lock}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            endIcon={
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="transition-colors text-muted hover:text-accent">
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="pt-[1px] text-xs text-red-500">{formik.errors.confirmPassword}</div>
          ) : null}

          <motion.button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            variants={itemVariants}
            className="flex items-center justify-center w-full h-[48px] font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-accent to-accent-hover hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? <ThreeDotsLoader /> : <><KeyRound className="w-5 h-5 mr-2" /> Set New Password</>}
          </motion.button>
        </form>
      </motion.div>
    </AuthLayout>
  );
}