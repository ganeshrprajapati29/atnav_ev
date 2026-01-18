import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">

        <p className="text-sm text-gray-400">
          All rights reserved 2026 Atvan Coins.{" "}

          <Link 
            to="/privacy" 
            className="text-gray-300 hover:text-white transition-colors mx-1"
          >
            Privacy
          </Link>

          •

          <Link 
            to="/terms" 
            className="text-gray-300 hover:text-white transition-colors mx-1"
          >
            Terms
          </Link>

          •

          <Link 
            to="/cookies" 
            className="text-gray-300 hover:text-white transition-colors mx-1"
          >
            Cookies
          </Link>
        </p>

      </div>
    </footer>
  );
};

export default Footer;
