import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Chrome, Facebook, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../../routes/AuthLayout';
import FormInput from '../../ui-components/FormInput';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout
      pageTitle="Welcome Back"
      welcomeMessage="Sign in to continue to your personalized dashboard. We're glad to have you back."
    >
      <motion.div 
        className="flex flex-col w-full h-full"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <header>
          <motion.h2 variants={itemVariants} className="mb-8 text-3xl font-bold text-center text-card-foreground">
            Login to Your Account
          </motion.h2>
        </header>

        <main className="flex-grow space-y-4">
          <FormInput
            icon={Mail}
            type="email"
            placeholder="Email Address"
          />
          <FormInput
            icon={Lock}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            endIcon={
              <button type="button" onClick={togglePasswordVisibility} className="transition-colors text-muted hover:text-accent">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
          />
          <motion.button 
            variants={itemVariants} 
            className="flex items-center justify-center w-full py-3 font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-accent to-accent-hover hover:shadow-xl hover:-translate-y-0.5"
          >
            <LogIn className="w-5 h-5 mr-2" /> Log In
          </motion.button>
        </main>
        
        <footer className="flex-shrink-0 mt-6">
          <motion.div variants={itemVariants} className="flex items-center my-4">
            <div className="flex-grow border-t border-border"></div>
            <span className="mx-4 text-xs font-bold text-muted">OR</span>
            <div className="flex-grow border-t border-border"></div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row">
            <button className="flex items-center justify-center flex-1 w-full gap-3 py-2 text-sm font-semibold transition-all duration-300 border rounded-full sm:rounded-md border-border text-muted hover:bg-zinc-100 hover:text-foreground">
              <Chrome className="w-5 h-5 sm:w-4 sm:h-4"/>
              <span className="hidden sm:inline">Continue with Google</span>
            </button>
            <button className="flex items-center justify-center flex-1 w-full gap-3 py-2 text-sm font-semibold transition-all duration-300 border rounded-full sm:rounded-md border-border text-muted hover:bg-zinc-100 hover:text-foreground">
              <Facebook className="w-5 h-5 sm:w-4 sm:h-4"/>
              <span className="hidden sm:inline">Continue with Facebook</span>
            </button>
          </motion.div>

          <motion.p variants={itemVariants} className="mt-6 text-sm text-center text-muted">
            Don't have an account? <Link to="/signup" className="font-semibold text-accent hover:underline">Sign Up</Link>
          </motion.p>
        </footer>
      </motion.div>
    </AuthLayout>
  );
};

export default LoginPage;