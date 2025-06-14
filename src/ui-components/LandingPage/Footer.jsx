import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Mountain, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { to: 'home', label: 'Home' },
    { to: 'features', label: 'Why Choose Us' },
    { to: 'aitools', label: 'AI Tools' },
    { to: 'packages', label: 'Packages' },
  ];

  const resourceLinks = [
    { to: 'api', label: 'API Outputs' },
    { to: 'credit-usage', label: 'Credit Usage' },
    { to: 'testimonials', label: 'Testimonials' },
    { to: 'faq', label: 'FAQ' },
  ];

  const linkProps = {
    spy: true,
    smooth: true,
    offset: -70,
    duration: 800,
    className: 'transition-colors hover:text-accent cursor-pointer',
  };

  return (
    <footer className="pt-20 pb-[68px] px-16 bg-footer-bg text-foreground">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[32fr_20fr_20fr_28fr]">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <Mountain className="w-10 h-10 text-accent" />
              <span className="text-3xl font-bold">MTN DATA</span>
            </div>
            <p className="max-w-xs text-muted">
              Your trusted partner for AI-powered data solutions and API integrations.
            </p>
            <p className="mt-8 text-sm text-muted-foreground">
              © {new Date().getFullYear()} MTN Data ScrapeX API. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-muted">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <ScrollLink to={link.to} {...linkProps}>
                    {link.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="mb-4 text-xl font-semibold">Resources</h3>
            <ul className="space-y-3 text-muted">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <ScrollLink to={link.to} {...linkProps}>
                    {link.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="mb-4 text-xl font-semibold">Contact Us</h3>
            <address className="space-y-4 not-italic text-muted">
              <a href="tel:+11234567890" className="flex items-center gap-3 transition-colors hover:text-accent">
                <Phone size={18} className="text-accent"/>
                <span>+1 (123) 456-7890</span>
              </a>
              <a href="mailto:contact@mtndatascrapex.com" className="flex items-center gap-3 transition-colors hover:text-accent">
                <Mail size={18} className="text-accent"/>
                <span>contact@mtndatascrapex.com</span>
              </a>
              <p className="flex items-center gap-3">
                <MapPin size={18} className="flex-shrink-0 text-accent"/>
                <span>123 Innovation Drive, Suite 100, Tech City, USA</span>
              </p>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;