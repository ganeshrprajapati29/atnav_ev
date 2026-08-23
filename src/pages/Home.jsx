import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import api from '../utils/api'; // Direct api import
import {
  DollarSign as Coins,
  Gift,
  Star,
  Shield,
  Sparkles,
  Trophy as Award,
  ChevronRight,
  Truck as Bike,
  Zap,
  TrendingUp,
  Trophy,
  Clock,
  Users,
  CreditCard,
  Smartphone,
  MapPin,
  CheckCircle,
  ArrowRight,
  Heart,
  Target,
  PiggyBank,
  Award as AwardIcon,
  Wallet,
  QrCode,
  UserPlus,
  Building,
  Download,
  ExternalLink
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';

// Icon mapping
const iconComponents = {
  'coins': Coins,
  'gift': Gift,
  'star': Star,
  'shield': Shield,
  'sparkles': Sparkles,
  'award': Award,
  'trending-up': TrendingUp,
  'trophy': Trophy,
  'clock': Clock,
  'users': Users,
  'credit-card': CreditCard,
  'smartphone': Smartphone,
  'map-pin': MapPin,
  'check-circle': CheckCircle,
  'arrow-right': ArrowRight,
  'heart': Heart,
  'target': Target,
  'piggy-bank': PiggyBank,
  'award-icon': AwardIcon,
  'wallet': Wallet,
  'qrcode': QrCode,
  'user-plus': UserPlus,
  'building': Building,
  'zap': Zap
};

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.atvanev.atvancoin';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/atvancoin', Icon: FaInstagram },
  { label: 'Facebook', href: 'https://www.facebook.com/atvancoin', Icon: FaFacebookF },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UC8DuhdcMdZWIvVloPtA1Few', Icon: FaYoutube },
  { label: 'X', href: 'https://x.com/atvancoin', Icon: FaXTwitter },
];

const promoImages = [
  { src: '/promo/atvan-wealth-banner.png', alt: 'Atvan Coin wealth platform banner' },
  { src: '/promo/atvan-price-chart.png', alt: 'Atvan projected price chart' },
  { src: '/promo/atvan-referral-app.jpeg', alt: 'Atvan Coin referral app screen' },
];

const HindiPromoSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
              <Sparkles className="w-4 h-4" />
              ATVAN Coin App
            </span>
            <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              आज ही ATVAN से जुड़ें
            </h2>
            <p className="mt-5 text-xl text-gray-700 leading-relaxed">
              छोटा निवेश, बेहतर ग्रोथ और आसान वॉलेट मैनेजमेंट के लिए ऐप डाउनलोड करें।
              Referral, QR, wallet और reward tracking सब एक जगह।
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-7 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-800 transition-all hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                App Download
              </a>
              <a
                href={socialLinks[2].href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-emerald-200 text-emerald-800 px-7 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors"
              >
                YouTube Videos
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-emerald-700 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <img
              src={promoImages[0].src}
              alt={promoImages[0].alt}
              className="sm:col-span-2 w-full rounded-2xl shadow-xl border border-emerald-100 object-cover"
            />
            {promoImages.slice(1).map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="w-full h-full max-h-[420px] rounded-2xl shadow-lg border border-emerald-100 object-cover object-top"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => {
  const { user } = useAuth();
  const [homeContent, setHomeContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHomeContent = async () => {
      try {
        console.log("🔄 Home.jsx: Loading home content from database...");
        
        // Direct API call using api (not homeService)
        const data = await api.get('/home-content');
        
        console.log("✅ Home.jsx: Data received from database:", data);
        console.log("📊 Sections count:", data.sections?.length);
        
        if (data && data.sections && data.sections.length > 0) {
          console.log("🔍 First section from database:", data.sections[0]);
          setHomeContent(data);
        } else {
          console.error("❌ Database returned empty sections");
          setError("No content found in database");
        }
        
      } catch (error) {
        console.error('❌ Home.jsx: Error loading home content:', error);
        console.error('❌ Error details:', error.response?.data || error.message);
        setError(error.message || 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };
    
    loadHomeContent();
  }, []);

  const getIconComponent = (iconName) => {
    const Icon = iconComponents[iconName] || Coins;
    return <Icon />;
  };

  const renderSection = (section) => {
    if (!section) return null;
    
    const { type, title, subtitle, content, images, styles, stats, benefits, steps, tiers, sharePriceData } = section;

    switch (type) {
      case 'hero':
        return (
          <section key={section.id} className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 pt-20 pb-32 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute bottom-0 left-0 w-full h-48 opacity-25" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M0,192L60,197.3C120,203,240,213,360,208C480,203,600,181,720,176C840,171,960,181,1080,202.7C1200,224,1320,256,1380,272L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
              </svg>
              <svg className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-20 blur-2xl" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FACC15" d="M46.3,-55.7C60.5,-45.3,73,-30.1,74.5,-13.3C75.9,3.6,66.2,21.9,54.5,38.2C42.7,54.5,28.9,68.7,11.6,73.2C-5.6,77.7,-26.3,72.4,-41.4,61C-56.5,49.6,-66,32,-68.3,13.2C-70.6,-5.5,-65.7,-25.3,-54.3,-40.3C-42.9,-55.3,-25,-65.6,-6.6,-57.9C11.8,-50.3,23.7,-24.6,46.3,-55.7Z" transform="translate(100 100)" />
              </svg>
              <div className="absolute top-24 left-20 w-72 h-72 rounded-full border border-yellow-400/40 blur-xl opacity-40" />
              <div className="absolute bottom-32 right-32 w-96 h-96 rounded-full border border-white/20 blur-2xl opacity-20" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-white">
                    {subtitle || 'Welcome to Atvan Coins'}
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {title || 'Atvan Coin'}
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent block">
                    Your Wealth Platform
                  </span>
                </h1>
                
                <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                  {content?.[0] || "Join India's premier wealth platform. Track your growth, earn valuable coins, and redeem for exclusive benefits with Atvan Coins."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  {!user ? (
                    <>
                      <Link to="/signup" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-emerald-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 transition-all hover:scale-105">
                        Join Atvan Coins
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                      <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all hover:scale-105 border border-white/30">
                        Sign In
                      </Link>
                    </>
                  ) : (
                    <Link to="/user/dashboard" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-emerald-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 transition-all hover:scale-105">
                      Go to Dashboard
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  )}
                </div>

                {/* Dynamic Stats */}
                <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {stats?.map((stat, index) => (
                    <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm">
                      <div className="text-2xl font-bold text-white">{stat.title}</div>
                      <div className="text-sm text-emerald-100">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case 'about':
        return (
          <section key={section.id} className="relative py-24 bg-gradient-to-b from-white to-emerald-50 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                  {title || 'What is Atvan?'}
                </h2>
                <div className="mt-4 w-28 h-1 bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-full mx-auto"></div>
                <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
                  {subtitle || 'Discover the revolutionary force behind India\'s EV transformation and wealth creation platform.'}
                </p>
              </div>

              <div className="max-w-7xl mx-auto grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                {content?.map((paragraph, index) => (
                  <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-emerald-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                      {getIconComponent(['building', 'coins', 'trending-up'][index])}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {['Our Legacy & Vision', 'Atvan Coin Revolution', 'Sustainable Growth'][index]}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-16">
                <div className="inline-flex items-center gap-2 bg-emerald-100 px-6 py-3 rounded-full">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-800 font-medium">
                    Join the EV Revolution Today
                  </span>
                </div>
              </div>
            </div>
          </section>
        );

      case 'features':
        return (
          <section key={section.id} className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{title || 'Benefits of Atvan Coins?'}</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {subtitle || 'A powerful wealthy system designed to help you to earn, save, and grow faster.'}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {benefits?.map((benefit, index) => {
                  const colorClasses = {
                    green: 'from-green-50 to-emerald-50 border-green-100 from-green-500 to-emerald-600',
                    blue: 'from-blue-50 to-indigo-50 border-blue-100 from-blue-500 to-indigo-600',
                    purple: 'from-purple-50 to-pink-50 border-purple-100 from-purple-500 to-pink-600',
                    orange: 'from-orange-50 to-red-50 border-orange-100 from-orange-500 to-red-600',
                    cyan: 'from-cyan-50 to-blue-50 border-cyan-100 from-cyan-500 to-blue-600',
                    pink: 'from-rose-50 to-pink-50 border-rose-100 from-rose-500 to-pink-600'
                  };
                  
                  const colors = colorClasses[benefit.color || 'green']?.split(' ') || colorClasses.green.split(' ');
                  
                  return (
                    <div key={index} className={`group bg-gradient-to-br ${colors[0]} ${colors[1]} rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border ${colors[2]}`}>
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors[3]} ${colors[4]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                        {getIconComponent(benefit.icon || 'trending-up')}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );

      case 'how-it-works':
        return (
          <section key={section.id} className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{title || 'How It Works'}</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {subtitle || 'Get started in 4 simple steps'}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {steps?.map((step, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-2xl font-bold text-white">{step.number || index + 1}</span>
                      </div>
                      {index < (steps.length - 1) && <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-transparent"></div>}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title || `Step ${index + 1}`}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'tiers':
        return null;

      case 'tiers-hidden':
        return (
          <section key={section.id} className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{title || 'Atvan Coins Membership'}</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {subtitle || 'Choose your tier and start building wealth with Atvan Coins.'}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {tiers?.map((tier, index) => {
                  const isPopular = index === 1;
                  const tierColors = {
                    gray: 'from-gray-400 to-gray-600 border-gray-200 hover:border-emerald-300 from-emerald-500 to-green-600',
                    amber: 'from-amber-500 to-yellow-600 border-amber-400 hover:border-amber-500 from-amber-500 to-yellow-600 text-amber-700',
                    purple: 'from-purple-400 to-pink-500 border-purple-500 hover:border-purple-400 from-purple-500 to-pink-600 text-purple-300'
                  };
                  
                  const colors = tierColors[tier.color || 'gray']?.split(' ') || tierColors.gray.split(' ');
                  
                  return (
                    <div key={index} className={`${isPopular ? 'bg-gradient-to-br from-amber-50 to-yellow-50 shadow-2xl' : tier.color === 'purple' ? 'bg-gradient-to-br from-slate-900 to-purple-900 text-white' : 'bg-white'} rounded-3xl p-8 border-2 ${colors[2]} ${colors[3]} transition-all hover:shadow-3xl hover:-translate-y-2 relative flex flex-col h-full`}>
                      {isPopular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                          MOST POPULAR
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-6 mt-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${colors[0]} ${colors[1]} rounded-2xl flex items-center justify-center shadow-lg`}>
                          {getIconComponent(tier.icon || 'shield')}
                        </div>
                        <div>
                          <h3 className={`text-2xl font-bold ${tier.color === 'purple' ? 'text-white' : 'text-gray-900'}`}>{tier.name}</h3>
                          <p className={`text-sm ${tier.color === 'purple' ? colors[5] : colors[4] || 'text-gray-500'}`}>{tier.coinRange}</p>
                        </div>
                      </div>
                      
                      <p className={`${tier.color === 'purple' ? 'text-purple-100' : isPopular ? 'text-gray-700' : 'text-gray-600'} mb-6 font-medium flex-grow`}>
                        {tier.description}
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        {tier.features?.map((feature, featIndex) => (
                          <li key={featIndex} className="flex items-start gap-3">
                            <CheckCircle className={`w-5 h-5 ${isPopular ? 'text-amber-600' : tier.color === 'purple' ? 'text-yellow-400' : 'text-emerald-500'} mt-0.5 flex-shrink-0`} />
                            <span className={tier.color === 'purple' ? 'text-white font-medium' : isPopular ? 'text-gray-800 font-medium' : 'text-gray-700'}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-auto">
                        <div className="text-center mb-4">
                          <div className={`text-3xl font-bold ${tier.color === 'purple' ? 'text-white' : 'text-gray-900'} mb-1`}>₹{tier.price}</div>
                          <div className={`text-sm ${tier.color === 'purple' ? 'text-purple-300' : 'text-gray-500'}`}>One-time purchase</div>
                        </div>
                        {user ? (
                          <Link to={`/payment?amount=${tier.price}`} className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${colors[6]} ${colors[7]} text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105`}>
                            Buy Now
                            <ChevronRight className="w-5 h-5" />
                          </Link>
                        ) : (
                          <Link to="/login" className="w-full inline-flex items-center justify-center gap-2 bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg cursor-not-allowed">
                            Buy
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );

      case 'share-price':
        return (
          <section key={section.id} className="relative py-32 bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 overflow-hidden">
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <rect width="1200" height="600" fill="url(#chartGradient)" />
                <circle cx="200" cy="150" r="30" fill="#10b981" opacity="0.1" />
                <circle cx="1000" cy="200" r="40" fill="#3b82f6" opacity="0.1" />
                <circle cx="600" cy="400" r="25" fill="#6366f1" opacity="0.1" />
                <path d="M50,300 Q300,200 600,250 T1100,300" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.3" />
              </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                  <span className="text-lg font-semibold text-gray-800">Share Price Chart</span>
                </div>
                <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
                  {title || 'ATVAN Share Price Chart'}
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  {subtitle}
                </p>
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden">
                  <div className="absolute top-4 right-4 opacity-10">
                    <Coins className="w-16 h-16 text-emerald-600" />
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-10">
                    <TrendingUp className="w-12 h-12 text-blue-600" />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-emerald-600 text-white">
                          <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Sr. No.</th>
                          <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Year</th>
                          <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Price</th>
                          <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Value @Rs.100</th>
                          <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Sr. No.</th>
                          <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Year</th>
                          <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Price</th>
                          <th className="px-4 py-3 text-left font-semibold">Value @Rs.100</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sharePriceData?.slice(0, Math.ceil(sharePriceData.length / 2)).map((row, index) => {
                          const secondHalfIndex = index + Math.ceil(sharePriceData.length / 2);
                          const secondRow = sharePriceData[secondHalfIndex];
                          
                          return (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-white'}>
                              <td className="px-4 py-3 border-r border-gray-200 font-medium">{row.srNo}</td>
                              <td className="px-4 py-3 border-r border-gray-200">{row.date}</td>
                              <td className="px-4 py-3 border-r border-gray-200 text-emerald-600 font-semibold">{row.price}</td>
                              <td className="px-4 py-3 border-r border-gray-200 font-semibold">{row.valueAt100 || row.price * 10}</td>
                              {secondRow && (
                                <>
                                  <td className="px-4 py-3 border-r border-gray-200 font-medium">{secondRow.srNo}</td>
                                  <td className="px-4 py-3 border-r border-gray-200">{secondRow.date}</td>
                                  <td className="px-4 py-3 border-r border-gray-200 text-emerald-600 font-semibold">{secondRow.price}</td>
                                  <td className="px-4 py-3 text-emerald-600 font-semibold">{secondRow.valueAt100 || secondRow.price * 10}</td>
                                </>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">₹{sharePriceData?.[0]?.price || 10}</div>
                      <div className="text-sm text-gray-600">Starting Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">₹{sharePriceData?.[sharePriceData?.length - 1]?.price || 1500}</div>
                      <div className="text-sm text-gray-600">Target {sharePriceData?.[sharePriceData?.length - 1]?.date?.split('-')[2] || '2041'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{sharePriceData?.length || 16} Years</div>
                      <div className="text-sm text-gray-600">Growth Period</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        {Math.round(((sharePriceData?.[sharePriceData?.length - 1]?.price || 1500) / (sharePriceData?.[0]?.price || 10)) * 10) / 10}x
                      </div>
                      <div className="text-sm text-gray-600">Potential Return</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'cta':
        return (
          <section key={section.id} className="py-20 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Coins className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    Start Your Wealth Journey
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {title || 'Ready to Start Earning with Atvan Coins?'}
                </h2>
                <p className="text-xl text-white/90 mb-10">
                  {subtitle || 'Sign up and buy 10 coins to kickstart your journey.'}
                </p>
                
                {!user ? (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/signup" className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105">
                      Create Free Account
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                    <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all">
                      Already a Member? Sign In
                    </Link>
                  </div>
                ) : (
                  <Link to="/user/dashboard" className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105">
                    Continue to Dashboard
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                )}

                <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/80">
                  {content?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader />
            <p className="mt-4 text-gray-600">Loading home content from database...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!homeContent || !homeContent.sections || homeContent.sections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Content Available</h2>
            <p className="text-gray-600 mb-6">Home content is empty or not found in database.</p>
            <Link 
              to="/admin/home-content" 
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Go to Admin Panel
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />
      
      {homeContent.sections
        .filter(section => section.isActive !== false && section.type !== 'tiers')
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((section) => (
          <React.Fragment key={section.id}>
            {renderSection(section)}
          </React.Fragment>
        ))}

      <HindiPromoSection />
      
      <Footer />
    </div>
  );
};

export default Home;
