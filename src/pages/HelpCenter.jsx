import React, { useState } from 'react';
import { HiChevronDown as ChevronDown, HiChevronUp as ChevronUp, HiMagnifyingGlass as Search, HiQuestionMarkCircle as HelpCircle, HiChatBubbleLeft as MessageSquare, HiPhone as Phone, HiEnvelope as Mail, HiClock as Clock } from 'react-icons/hi2';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I earn coins?",
      answer: "You earn coins by logging in daily, completing services, and participating in our reward system. Different actions give different amounts of coins based on your tier level."
    },
    {
      question: "What are the different tiers?",
      answer: "We have three tiers: Silver (0-999 coins), Gold (1000-4999 coins), and Platinum (5000+ coins). Higher tiers unlock more rewards and better coin multipliers."
    },
    {
      question: "How do I withdraw my coins?",
      answer: "Go to the Withdraw page, add your bank details, and request a withdrawal. Minimum withdrawal amount is 100 coins. Processing takes 1-2 business days."
    },
    {
      question: "Can I transfer coins to other users?",
      answer: "Currently, coin transfers between users are not supported. All coins must be earned through our system activities."
    },
    {
      question: "What happens if I forget my password?",
      answer: "Click on 'Forgot Password' on the login page, enter your email, and we'll send you a reset link. The link expires in 10 minutes."
    },
    {
      question: "How do I update my profile information?",
      answer: "Go to your Profile page to update your personal information, bank details, and other account settings."
    },
    {
      question: "Are there any fees for withdrawals?",
      answer: "We charge a small processing fee of 10 coins per withdrawal to cover banking charges. This fee is deducted from your withdrawal amount."
    },
    {
      question: "How long does it take to receive my withdrawal?",
      answer: "Once processed, withdrawals typically arrive in your bank account within 1-2 business days. You'll receive an email confirmation when it's processed."
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <HelpCircle className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600">Find answers to common questions and get support</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Help Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <MessageSquare className="mx-auto mb-4 text-emerald-600" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Get instant help from our support team</p>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Start Chat
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <Mail className="mx-auto mb-4 text-emerald-600" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours</p>
            <a href="mailto:support@rewardsystem.com" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors inline-block">
              Send Email
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <Phone className="mx-auto mb-4 text-emerald-600" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Call us for immediate assistance</p>
            <a href="tel:+919876543210" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors inline-block">
              Call Now
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="px-6 py-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="text-gray-500" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-500" size={20} />
                  )}
                </button>

                {expandedFAQ === index && (
                  <div className="mt-3 pl-2 border-l-4 border-emerald-500">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="px-6 py-12 text-center">
              <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-sm font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Still Need Help?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Mail className="text-emerald-200 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-emerald-100">support@rewardsystem.com</p>
                <p className="text-sm text-emerald-200 mt-1">We respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-emerald-200 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-1">Call Us</h3>
                <p className="text-emerald-100">+91 9876 543 210</p>
                <p className="text-sm text-emerald-200 mt-1">Mon-Fri, 9AM-6PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-emerald-200 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-1">Response Time</h3>
                <p className="text-emerald-100">Live Chat: Instant</p>
                <p className="text-sm text-emerald-200 mt-1">Email: Within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MessageSquare className="text-emerald-200 mt-1" size={24} />
              <div>
                <h3 className="font-semibold mb-1">Live Support</h3>
                <p className="text-emerald-100">Available 24/7</p>
                <p className="text-sm text-emerald-200 mt-1">For urgent issues</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
