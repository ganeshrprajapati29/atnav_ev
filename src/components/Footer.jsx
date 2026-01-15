import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, HelpCircle, FileText, MessageSquare } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-4 border-emerald-500">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">💰</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-600">RewardSystem</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Earn coins through daily logins and redeem them for amazing services. Upgrade your tier to unlock exclusive rewards and benefits!
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-500 rounded"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center gap-2">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center gap-2">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/withdraw" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center gap-2">
                  Withdraw
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center gap-2">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-500 rounded"></div>
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center gap-2">
                  <HelpCircle size={16} />
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center gap-2">
                  <MessageSquare size={16} />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center gap-2">
                  <FileText size={16} />
                  Terms & Privacy
                </Link>
              </li>
              <li>
                <Link to="/faq" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center gap-2">
                  <HelpCircle size={16} />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-500 rounded"></div>
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a href="mailto:support@rewardsystem.com" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    support@rewardsystem.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <a href="tel:+919876543210" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    +91 9876 543 210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-emerald-600 font-medium">Delhi, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent my-8"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-600 text-sm">
              © {currentYear} <span className="font-bold text-emerald-600">Reward System</span>. All rights reserved.
            </p>
          </div>

          {/* Payment Methods */}
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium mb-2">Secure Payments</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-medium">PayPal</span>
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-medium">Stripe</span>
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-medium">UPI</span>
            </div>
          </div>

          {/* Quick Legal Links */}
          <div className="text-center md:text-right">
            <p className="text-gray-600 text-sm">
              <Link to="/privacy" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-600 transition-colors">Privacy</Link>
              <span className="mx-2">•</span>
              <Link to="/terms" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-600 transition-colors">Terms</Link>
              <span className="mx-2">•</span>
              <Link to="/cookies" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-600 transition-colors">Cookies</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Top Scroll Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-all hidden lg:flex items-center justify-center"
        title="Back to top"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;