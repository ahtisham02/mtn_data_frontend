import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Mountain } from "lucide-react";
import Intercom from "@intercom/messenger-js-sdk";

const AuthLayout = ({ children, pageTitle, welcomeMessage }) => {
  const intercomAppId = import.meta.env.VITE_INTERCOM_APP_ID;

  useEffect(() => {
    Intercom({
      app_id: intercomAppId,
    });
  }, []);
  return (
    <div className="flex font-plus-jakarta items-center justify-center min-h-screen bg-gradient-to-r from-stone-100 via-rose-50 to-stone-100 bg-[length:200%_200%] animate-aurora">
      <div className="relative flex flex-col w-full max-w-5xl m-3 overflow-hidden shadow-2xl rounded-2xl md:flex-row">
        <div className="flex flex-col justify-center w-full p-6 bg-card text-card-foreground sm:p-8 md:p-12 md:w-1/2">
          {children}
        </div>

        <motion.div
          className="relative hidden p-10 text-white bg-foreground md:flex md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
            <motion.div
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              >
                <Mountain className="w-12 h-12 text-accent" />
              </motion.div>
              <span className="text-4xl font-bold text-white">MTN DATA</span>
            </motion.div>

            <motion.h2
              className="mb-2 text-4xl font-bold leading-tight text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {pageTitle}
            </motion.h2>

            <motion.p
              className="max-w-md text-lg text-muted-foreground"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {welcomeMessage}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
