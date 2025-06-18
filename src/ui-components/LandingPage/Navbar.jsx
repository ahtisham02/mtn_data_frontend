import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mountain, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const userToken = useSelector((state) => state.auth.userToken);

  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: 'WhyChooseUs', label: 'Why Choose Us?' },
    { to: 'features', label: 'Features' },
    { to: 'aitools', label: 'AI Tools' },
    { to: 'packages', label: 'Packages' },
    { to: 'api', label: 'API Outputs' },
    { to: 'Credit Usage', label: 'Credit Usage' },
  ];

  const linkProps = {
    spy: true,
    smooth: true,
    offset: -70,
    duration: 500,
    className: 'cursor-pointer transition-colors hover:text-accent',
    activeClass: 'text-accent',
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg shadow-sm">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20">
          <ScrollLink to="home" {...linkProps} offset={-100} className="flex items-center gap-2 cursor-pointer">
            <Mountain className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">MTN DATA</span>
          </ScrollLink>

          <ul className="hidden space-x-8 font-semibold text-foreground lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <ScrollLink to={link.to} {...linkProps}>
                  {link.label}
                </ScrollLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {userToken ? (
              <RouterLink to="/dashboard" className="hidden px-6 py-2 font-semibold text-white transition-all duration-300 rounded-full shadow-lg sm:block bg-gradient-to-r from-accent to-accent-hover hover:shadow-xl hover:-translate-y-0.5">
                Dashboard
              </RouterLink>
            ) : (
              <RouterLink to="/login" className="hidden px-6 py-2 font-semibold text-white transition-all duration-300 rounded-full shadow-lg sm:block bg-gradient-to-r from-accent to-accent-hover hover:shadow-xl hover:-translate-y-0.5">
                Login
              </RouterLink>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 transition-colors rounded-lg text-foreground lg:hidden hover:bg-black/5"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden lg:hidden"
      >
        <ul className="flex flex-col items-center p-4 space-y-4 font-semibold bg-background/95 text-foreground">
          {navLinks.map((link) => (
            <li key={link.to}>
              <ScrollLink to={link.to} {...linkProps} onClick={() => setIsOpen(false)}>
                {link.label}
              </ScrollLink>
            </li>
          ))}
          <li>
            {userToken ? (
                <RouterLink to="/dashboard" className="block w-full px-8 py-3 text-center text-white transition-all duration-300 rounded-full bg-gradient-to-r from-accent to-accent-hover">
                  Dashboard
                </RouterLink>
              ) : (
                <RouterLink to="/login" className="block w-full px-8 py-3 text-center text-white transition-all duration-300 rounded-full bg-gradient-to-r from-accent to-accent-hover">
                  Login
                </RouterLink>
              )}
          </li>
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;