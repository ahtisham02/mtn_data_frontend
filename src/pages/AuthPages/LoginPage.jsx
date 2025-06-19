import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Mail, Lock, LogIn, Chrome, Facebook, Eye, EyeOff } from "lucide-react";

import AuthLayout from "../../routes/AuthLayout";
import FormInput from "../../ui-components/FormInput";
import { setUserInfo } from "../../auth/authSlice";
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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await apiRequest("post", "/auth/login", values);
        
        if (response?.data?.token) {
          const { token } = response.data;
          dispatch(setUserInfo({ token, data: null }));

          toast.success("Login successful! Redirecting...");
          navigate("/dashboard");
        } else {
          throw new Error("Invalid response from server.");
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "Login failed. Please check your credentials.";
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout
      pageTitle="Access Your Account"
      welcomeMessage="Enter your credentials below to access your workspace and manage your projects."
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
            Login to Your Account
          </motion.h2>
        </header>

        <form onSubmit={formik.handleSubmit} className="flex-grow space-y-4">
          <FormInput
            icon={Mail}
            type="email"
            placeholder="Your Email"
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
            placeholder="Your Password"
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
                <LogIn className="w-5 h-5 mr-2" /> Log In
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
            New to our platform?{" "}
            <Link to="/signup" className="font-semibold text-accent hover:underline">
              Create an Account
            </Link>
          </motion.p>
        </footer>
      </motion.div>
    </AuthLayout>
  );
};

export default LoginPage;