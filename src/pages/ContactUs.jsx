import React, { useState } from 'react';
import { HiOutlineMail as Mail, HiOutlinePhone as Phone, HiOutlineLocationMarker as MapPin, HiOutlineClock as Clock, HiOutlinePaperAirplane as Send, HiOutlineUser as User, HiOutlineAtSymbol as AtSymbol } from 'react-icons/hi';
import { LuMessageSquare as MessageSquare } from 'react-icons/lu';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <MessageSquare className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">Get in touch with our support team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <AtSymbol className="absolute left-3 top-3.5 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    placeholder="Please describe your question or issue in detail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">

            {/* Contact Cards */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-emerald-500 rounded"></div>
                Get in Touch
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Support</h4>
                    <p className="text-gray-600">support@rewardsystem.com</p>
                    <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone Support</h4>
                    <p className="text-gray-600">+91 9876 543 210</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9AM-6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Office Address</h4>
                    <p className="text-gray-600">Delhi, India</p>
                    <p className="text-sm text-gray-500 mt-1">Serving customers nationwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">Monday - Friday</p>
                    <p className="text-sm text-gray-500 mt-1">9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Quick Answers</h3>
              <p className="text-emerald-100 mb-6">
                Check our Help Center for instant answers to common questions.
              </p>
              <a
                href="/help"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Visit Help Center
              </a>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors">
                  <span className="text-lg font-bold">f</span>
                </a>
                <a href="#" className="w-12 h-12 bg-blue-400 hover:bg-blue-500 rounded-lg flex items-center justify-center text-white transition-colors">
                  <span className="text-lg font-bold">t</span>
                </a>
                <a href="#" className="w-12 h-12 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center text-white transition-colors">
                  <span className="text-lg font-bold">i</span>
                </a>
                <a href="#" className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center justify-center text-white transition-colors">
                  <span className="text-lg font-bold">in</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section (Placeholder) */}
        <div className="mt-10 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Us</h2>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">Interactive map would be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Delhi, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
