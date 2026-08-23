import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/atvancoin', Icon: FaInstagram },
  { label: 'Facebook', href: 'https://www.facebook.com/atvancoin', Icon: FaFacebookF },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UC8DuhdcMdZWIvVloPtA1Few', Icon: FaYoutube },
  { label: 'X', href: 'https://x.com/atvancoin', Icon: FaXTwitter },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 flex justify-center gap-3">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-emerald-600 transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

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
