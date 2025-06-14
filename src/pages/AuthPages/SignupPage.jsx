import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, LogIn, Chrome, Facebook, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../../routes/AuthLayout';
import FormInput from '../../ui-components/FormInput';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          <motion.h2 variants={itemVariants} className="mb-8 text-3xl font-bold text-center text-card-foreground">
            Create an Account
          </motion.h2>
        </header>

        <main className="flex-grow space-y-3">
          <FormInput
            icon={User}
            type="text"
            placeholder="Full Name"
          />
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
            <LogIn className="w-5 h-5 mr-2" /> Sign Up
          </motion.button>
        </main>
        
        <footer className="flex-shrink-0 mt-4">
          <motion.div variants={itemVariants} className="flex items-center my-3">
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

          <motion.p variants={itemVariants} className="mt-4 text-sm text-center text-muted">
            Already have an account? <Link to="/login" className="font-semibold text-accent hover:underline">Log In</Link>
          </motion.p>
        </footer>
      </motion.div>
    </AuthLayout>
  );
};

export default SignupPage;