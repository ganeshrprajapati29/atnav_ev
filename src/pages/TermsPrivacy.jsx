import React, { useState } from 'react';
import { HiDocumentText as FileText, HiShieldCheck as Shield, HiScale as Scale } from 'react-icons/hi2';

const TermsPrivacy = () => {
  const [activeSection, setActiveSection] = useState('terms');

  const sections = [
    { id: 'terms', title: 'Terms of Service', icon: FileText },
    { id: 'privacy', title: 'Privacy Policy', icon: Shield },
    { id: 'cookies', title: 'Cookie Policy', icon: Scale }
  ];

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <FileText className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Privacy</h1>
          <p className="text-lg text-gray-600">Important information about our services and your data</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden sm:inline">{section.title}</span>
                  <span className="sm:hidden">{section.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">

          {/* Terms of Service */}
          {activeSection === 'terms' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="text-emerald-600" size={24} />
                  Terms of Service
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing and using RewardSystem, you accept and agree to be bound by the terms and provision of this agreement.
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Use License</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Permission is granted to temporarily use RewardSystem for personal, non-commercial transitory viewing only.
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to decompile or reverse engineer any software contained on our service</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3. User Accounts</h3>
                  <p className="text-gray-700 leading-relaxed">
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times.
                    You are responsible for safeguarding the password and for all activities that occur under your account.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Coins and Rewards</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Coins earned through our system are virtual currency that can be redeemed for services. Coins have no cash value and cannot be transferred to other users.
                    We reserve the right to modify coin earning rates and redemption options at any time.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Termination</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever,
                    including without limitation if you breach the Terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Limitation of Liability</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In no event shall RewardSystem or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit,
                    or due to business interruption) arising out of the use or inability to use the materials on our service.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Policy */}
          {activeSection === 'privacy' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="text-emerald-600" size={24} />
                  Privacy Policy
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Information We Collect</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, bank details</li>
                    <li><strong>Usage Data:</strong> Login history, coin transactions, service usage</li>
                    <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2. How We Use Your Information</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices and support messages</li>
                    <li>Communicate with you about products, services, and promotions</li>
                    <li>Monitor and analyze trends and usage</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Information Sharing</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
                    except as described in this policy. We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                    <li>With service providers who assist us in operating our platform</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and prevent fraud</li>
                    <li>In connection with a business transfer</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Data Security</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access,
                    alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Your Rights</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You have the right to access, update, or delete your personal information. You can do this by contacting us
                    or through your account settings. You may also opt out of marketing communications at any time.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Cookies</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts.
                    See our Cookie Policy for more details.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Cookie Policy */}
          {activeSection === 'cookies' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Scale className="text-emerald-600" size={24} />
                  Cookie Policy
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What Are Cookies</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Cookies are small text files that are placed on your device when you visit our website.
                    They help us provide you with a better browsing experience and allow certain features to work properly.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How We Use Cookies</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We use cookies for the following purposes:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                      <p className="text-sm text-gray-700">Required for the website to function properly, including authentication and security.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                      <p className="text-sm text-gray-700">Help us understand how visitors interact with our website.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Functional Cookies</h4>
                      <p className="text-sm text-gray-700">Remember your preferences and settings.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h4>
                      <p className="text-sm text-gray-700">Used to deliver relevant advertisements.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Managing Cookies</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You can control and manage cookies in various ways:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Most web browsers allow you to control cookies through their settings</li>
                    <li>You can delete all cookies that are already on your computer</li>
                    <li>You can set most browsers to prevent cookies from being placed</li>
                    <li>Note that disabling cookies may affect the functionality of our website</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Third-Party Cookies</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Some cookies may be set by third-party services that appear on our pages. We have no control over these cookies,
                    and they are subject to the respective third party's privacy policy.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Updates to This Policy</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page
                    and updating the "Last updated" date.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Our Policies?</h2>
          <p className="text-lg mb-6 opacity-90">
            If you have any questions about these terms or our privacy practices, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/help"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPrivacy;
