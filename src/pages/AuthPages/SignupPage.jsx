import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { User, Mail, Lock, UserPlus, Chrome, Eye, EyeOff, Check } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import AuthLayout from "../../routes/AuthLayout";
import FormInput from "../../ui-components/FormInput";
import apiRequest from "../../utils/apiRequest";
import { setUserInfo } from "../../auth/authSlice";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ThreeDotsLoader = ({ bgColorClass = "bg-white" }) => {
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
      <motion.span variants={dotVariants} className={`w-2 h-2 ${bgColorClass} rounded-full`} />
      <motion.span variants={dotVariants} className={`w-2 h-2 ${bgColorClass} rounded-full`} />
      <motion.span variants={dotVariants} className={`w-2 h-2 ${bgColorClass} rounded-full`} />
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

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuthSuccess = (data) => {
    if (data?.token) {
      dispatch(setUserInfo({ token: data.token, data: data.user }));
      toast.success("Login successful! Redirecting...");
      navigate("/dashboard");
    } else {
      throw new Error("Invalid response from server.");
    }
  };

  const handleGoogleAuth = async (googleProfile) => {
    setIsGoogleLoading(true);
    try {
      const response = await apiRequest("post", "/auth/google-login", {
        name: googleProfile.name,
        email: googleProfile.email,
        googleId: googleProfile.id,
      });
      handleAuthSuccess(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Google login failed.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      try {
        const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        await handleGoogleAuth(googleResponse.data);
      } catch (err) {
        toast.error("Failed to fetch Google profile.");
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      toast.error("Google Login was cancelled or failed.");
      setIsGoogleLoading(false);
    },
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Full name must be at least 3 characters").required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[0-9]/, 'Password must contain a number')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await apiRequest("post", "/auth/signup", values);
        toast.success("Account created successfully!");
        navigate("/verify", { state: { email: values.email } });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Signup failed. Please try again later.");
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
      <motion.div className="flex flex-col w-full h-full" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        <header>
          <motion.h2 variants={itemVariants} className="mb-8 text-3xl font-bold text-center text-card-foreground">
            Create an Account
          </motion.h2>
        </header>

        <form onSubmit={formik.handleSubmit} className="flex-grow space-y-3.5">
          <FormInput icon={User} type="text" placeholder="Full Name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.name && formik.errors.name ? (<div className="!mt-2 text-xs text-red-500">{formik.errors.name}</div>) : null}
          <FormInput icon={Mail} type="email" placeholder="Email Address" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.email && formik.errors.email ? (<div className="!mt-2 text-xs text-red-500">{formik.errors.email}</div>) : null}
          <FormInput icon={Lock} type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} endIcon={<button type="button" onClick={() => setShowPassword(!showPassword)} className="transition-colors text-muted hover:text-accent">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>}/>
          <div className="!mt-2 space-y-1">
            <ValidationItem isValid={formik.values.password.length >= 8} text="At least 8 characters" />
            <ValidationItem isValid={/[A-Z]/.test(formik.values.password) && /[a-z]/.test(formik.values.password)} text="Uppercase & lowercase letters" />
            <ValidationItem isValid={/[0-9]/.test(formik.values.password)} text="At least one number" />
          </div>
          <motion.button type="submit" disabled={formik.isSubmitting || !formik.isValid} variants={itemVariants} className="flex items-center justify-center w-full h-[48px] font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-accent to-accent-hover hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
            {formik.isSubmitting ? <ThreeDotsLoader /> : <><UserPlus className="w-5 h-5 mr-2" /> Create Account</>}
          </motion.button>
        </form>

        <footer className="flex-shrink-0 mt-2">
          <motion.div variants={itemVariants} className="flex items-center my-4"><div className="flex-grow border-t border-border"></div><span className="mx-4 text-xs font-bold text-muted">OR</span><div className="flex-grow border-t border-border"></div></motion.div>
          <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => handleGoogleLogin()}
              disabled={isGoogleLoading}
              className="flex items-center justify-center flex-1 w-full gap-3 py-2 text-sm font-semibold transition-all duration-300 border rounded-lg sm:rounded-md border-border text-muted hover:bg-zinc-100 hover:text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <>
                  <ThreeDotsLoader bgColorClass="bg-accent" />
                  <span className="py-2.5"></span>
                </>
              ) : (
                <>
                  <Chrome className="w-5 h-5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Continue with Google</span>
                </>
              )}
            </button>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 text-sm text-center text-muted">Already have an account?{" "}<Link to="/login" className="font-semibold text-accent hover:underline">Log In</Link></motion.p>
        </footer>
      </motion.div>
    </AuthLayout>
  );
};

export default SignupPage;