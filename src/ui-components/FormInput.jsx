import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const FormInput = ({ icon: Icon, endIcon, ...props }) => {
  return (
    <motion.div variants={itemVariants} className="relative w-full">
      {Icon && (
        <div className="absolute top-3.5 left-4">
          <Icon className="w-5 h-5 text-muted peer-focus:text-accent" />
        </div>
      )}
      <input
        {...props}
        className="w-full py-3 pl-12 pr-12 bg-transparent border rounded-lg peer border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-muted transition-colors duration-300"
      />
      {endIcon && (
        <div className="absolute top-3.5 right-4">
          {endIcon}
        </div>
      )}
    </motion.div>
  );
};

export default FormInput;