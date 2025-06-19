import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { User, Mail, Lock, UserPlus, Chrome, Facebook, Eye, EyeOff } from "lucide-react";

import AuthLayout from "../../routes/AuthLayout";
import FormInput from "../../ui-components/FormInput";
import apiRequest from "../../utils/apiRequest";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ThreeDotsLoader = () => {
  const loaderVariants = {
    animation: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const dotVariants = {
    animation: {
      y: [0, -8, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity,
      },
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

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Full name must be at least 3 characters")
        .required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await apiRequest("post", "/auth/signup", values);
        toast.success("Account created successfully! Please log in.");
        navigate("/login");
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "Signup failed. Please try again later.";
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout
      pageTitle="Secure & Seamless"
      welcomeMessage="Create an account to unlock exclusive features. Your security is our priority."
    >
      <motion.div
        className="flex flex-col w-full h-full"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <header>
          <motion.h2
            variants={itemVariants}
            className="mb-8 text-3xl font-bold text-center text-card-foreground"
          >
            Create an Account
          </motion.h2>
        </header>

        <form onSubmit={formik.handleSubmit} className="flex-grow space-y-4">
          <FormInput
            icon={User}
            type="text"
            placeholder="Full Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="pt-1 text-xs text-red-500">{formik.errors.name}</div>
          ) : null}

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
            <div className="pt-1 text-xs text-red-500">{formik.errors.email}</div>
          ) : null}

          <FormInput
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            endIcon={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="transition-colors text-muted hover:text-accent"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="pt-1 text-xs text-red-500">{formik.errors.password}</div>
          ) : null}

          <motion.button
            type="submit"
            disabled={formik.isSubmitting}
            variants={itemVariants}
            className="flex items-center justify-center w-full h-[48px] font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-accent to-accent-hover hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? (
              <ThreeDotsLoader />
            ) : (
              <>
                <UserPlus className="w-5 h-5 mr-2" /> Create Account
              </>
            )}
          </motion.button>
        </form>

        <footer className="flex-shrink-0 mt-6">
          <motion.div variants={itemVariants} className="flex items-center my-4">
            <div className="flex-grow border-t border-border"></div>
            <span className="mx-4 text-xs font-bold text-muted">OR</span>
            <div className="flex-grow border-t border-border"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row">
            <button className="flex items-center justify-center flex-1 w-full gap-3 py-2 text-sm font-semibold transition-all duration-300 border rounded-full sm:rounded-md border-border text-muted hover:bg-zinc-100 hover:text-foreground">
              <Chrome className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Continue with Google</span>
            </button>
            {/* <button className="flex items-center justify-center flex-1 w-full gap-3 py-2 text-sm font-semibold transition-all duration-300 border rounded-full sm:rounded-md border-border text-muted hover:bg-zinc-100 hover:text-foreground">
              <Facebook className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Continue with Facebook</span>
            </button> */}
          </motion.div>

          <motion.p variants={itemVariants} className="mt-6 text-sm text-center text-muted">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-accent hover:underline">
              Log In
            </Link>
          </motion.p>
        </footer>
      </motion.div>
    </AuthLayout>
  );
};

export default SignupPage;