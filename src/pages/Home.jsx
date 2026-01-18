import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
  PlayCircle,
  Heart,
  Target
} from 'lucide-react';

const HeroBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
      </linearGradient>

      <pattern id="pattern-circles" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
        <circle cx="30" cy="30" r="2" fill="rgba(255,255,255,0.25)" />
        <circle cx="120" cy="60" r="3" fill="rgba(255,255,255,0.18)" />
        <circle cx="70" cy="120" r="2" fill="rgba(255,255,255,0.15)" />
      </pattern>
    </defs>

    {/* Smooth gradient wash */}
    <rect width="100%" height="100%" fill="url(#grad1)" />

    {/* Soft circles pattern */}
    <rect width="100%" height="100%" fill="url(#pattern-circles)" />

    {/* Big decorative curves */}
    <path
      d="M0 300 C 200 200 400 400 700 150 L 700 0 L 0 0 Z"
      fill="rgba(255, 255, 255, 0.08)"
    />
    <path
      d="M0 500 C 250 450 450 650 700 400 L 700 300 C 400 500 250 350 0 450 Z"
      fill="rgba(255,255,255,0.05)"
    />
  </svg>
);

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />

     {/* Hero Section */}
<section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 pt-20 pb-32 overflow-hidden">
  
  {/* SVG Background */}
  <HeroBackground />

  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
        <Coins className="w-4 h-4 text-yellow-400" />
        <span className="text-sm font-medium text-white">Welcome to Atvan Coins</span>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
        Earn Coins,
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
           
        </span>
      </h1>

      <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
        Join India's premier  rewards platform. Track your work, earn valuable coins, and redeem for exclusive benefits with Atvan Coins.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        {!user ? (
          <>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-emerald-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 transition-all hover:scale-105"
            >
              Join Atvan Coins
              <ChevronRight className="w-5 h-5" />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all hover:scale-105 border border-white/30"
            >
              Sign In
            </Link>
          </>
        ) : (
          <Link
            to="/user/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-emerald-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 transition-all hover:scale-105"
          >
            Go to Dashboard
            <ChevronRight className="w-5 h-5" />
          </Link>
        )}
      </div>

    {/* Stats */}
<div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">

  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm">
    <div className="text-2xl font-bold text-white">Atvan Coin</div>
    <div className="text-sm text-emerald-100"> New Rewards Platform</div>
  </div>

  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm">
    <div className="text-2xl font-bold text-white">100% Secure</div>
    <div className="text-sm text-emerald-100">Encrypted Coin Transfers</div>
  </div>

  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm">
    <div className="text-2xl font-bold text-white">Growing Fast</div>
    <div className="text-sm text-emerald-100">New Features Rolling Out</div>
  </div>

</div>


    </div>
  </div>
</section>

{/* Features Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Atvan Coins?</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        A powerful rewards system designed to help you earn, save, and grow faster.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

      {/* Earn Coins */}
      <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-blue-100">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
          <Coins className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Earn Coins Easily</h3>
        <p className="text-gray-600 leading-relaxed">
          Collect coins through daily tasks, bonuses, achievements, and special Atvan reward campaigns.
        </p>
      </div>

      {/* Redeem Rewards */}
      <div className="group bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-emerald-100">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Redemption</h3>
        <p className="text-gray-600 leading-relaxed">
          Use your coins to unlock exclusive discounts, premium offers, and limited-time Atvan perks.
        </p>
      </div>

      {/* Referral Program */}
      <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-purple-100">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Invite & Earn</h3>
        <p className="text-gray-600 leading-relaxed">
          Earn bonus coins for every friend who joins using your referral link. Unlock multi-level rewards.
        </p>
      </div>

      {/* Secure Payments */}
      <div className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-orange-100">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Withdrawals</h3>
        <p className="text-gray-600 leading-relaxed">
          Withdraw your coins as real money through bank transfer, UPI, or wallet payout — instantly.
        </p>
      </div>

      {/* QR Transfers */}
      <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-cyan-100">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
          <Smartphone className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">QR Coin Transfers</h3>
        <p className="text-gray-600 leading-relaxed">
          Send or receive coins instantly through QR scanning. Simple, fast, and secure.
        </p>
      </div>

      {/* Exclusive Bonus Events */}
      <div className="group bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-rose-100">
        <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Special Bonus Events</h3>
        <p className="text-gray-600 leading-relaxed">
          Participate in seasonal events, challenges, and surprise drops to earn massive bonus coins.
        </p>
      </div>

    </div>
  </div>
</section>


      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sign Up</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your free account with basic details and verify your identity through KYC.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Start work</h3>
              <p className="text-gray-600 leading-relaxed">
                work at time and earn coins automatically based on time period and tier.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Earn & Redeem</h3>
              <p className="text-gray-600 leading-relaxed">
                Accumulate coins and redeem them for services, accessories, or cash withdrawals.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Level Up</h3>
              <p className="text-gray-600 leading-relaxed">
                Reach higher tiers for better rewards, exclusive perks, and premium benefits.
              </p>
            </div>
          </div>
        </div>
      </section>
{/* Membership Tiers */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">

    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Atvan Coins Membership Tiers</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Upgrade your tier as you earn more coins and unlock premium benefits.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

      {/* Silver Tier */}
      <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-300 transition-all hover:shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center shadow-md">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Silver Tier</h3>
            <p className="text-sm text-gray-500">0 - 999 Coins</p>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          Best for new users exploring Atvan Coins and starting their rewards journey.
        </p>

        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Earn up to **1.2×** reward multiplier</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Access to basic Atvan offers & coupons</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Free monthly bonus scratch card</span>
          </li>
        </ul>

        <div className="pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500 mb-2">Unlock Starts At</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">0</span>
            <span className="text-gray-500">coins</span>
          </div>
        </div>
      </div>

      {/* Gold Tier */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-400 hover:border-amber-500 transition-all shadow-xl hover:shadow-2xl relative">
        
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          MOST POPULAR
        </div>

        <div className="flex items-center gap-3 mb-6 mt-2">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Gold Tier</h3>
            <p className="text-sm text-amber-700">1,000 - 4,999 Coins</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6 font-medium">
          Perfect for active users who redeem coins frequently and enjoy premium perks.
        </p>

        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-800 font-medium">Earn **1.5×** reward multiplier</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-800 font-medium">Priority access to Atvan discounts</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-800 font-medium">Exclusive partner coupons & vouchers</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-800 font-medium">Enhanced monthly bonus rewards</span>
          </li>
        </ul>

        <div className="pt-6 border-t border-amber-200">
          <div className="text-sm text-amber-700 mb-2">Unlock at</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">1,000</span>
            <span className="text-amber-700">coins</span>
          </div>
        </div>
      </div>

      {/* Platinum Tier */}
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 border-2 border-purple-500 hover:border-purple-400 transition-all hover:shadow-2xl text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Platinum Tier</h3>
            <p className="text-sm text-purple-300">5,000+ Coins</p>
          </div>
        </div>

        <p className="text-purple-100 mb-6 font-medium">
          Premium status for power users who unlock maximum Atvan Coins benefits.
        </p>

        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white font-medium">Earn **2×** reward multiplier</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white font-medium">Free premium Atvan reward packs</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white font-medium">Exclusive monthly surprise bonuses</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white font-medium">VIP access to partner deals</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white font-medium">Dedicated priority support</span>
          </li>
        </ul>

        <div className="pt-6 border-t border-purple-700">
          <div className="text-sm text-purple-300 mb-2">Unlock at</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">5,000</span>
            <span className="text-purple-300">coins</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

    {/* Testimonials / Community Stories */}
<section className="py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800">
  <div className="container mx-auto px-4">
    
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-white mb-4">
        Thousands Trust Atvan Coins
      </h2>
      <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
        Real feedback from Atvan Coins users
      </p>
    </div>

    {/* Testimonials */}
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">

      {/* Testimonial 1 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-white mb-4 leading-relaxed">
          "Atvan Coins helped me save a lot on services and purchases. The reward system is smooth, and the coins add up quickly. Very useful platform!"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <div>
            <div className="text-white font-semibold">Ankit Verma</div>
            <div className="text-emerald-200 text-sm">Atvan User • Pune</div>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-white mb-4 leading-relaxed">
          "The referral program is amazing! I earned thousands of coins just by inviting my friends. Atvan Coins is super easy to use and gives real value."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">R</span>
          </div>
          <div>
            <div className="text-white font-semibold">Riya Patel</div>
            <div className="text-emerald-200 text-sm">Verified User • Mumbai</div>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-white mb-4 leading-relaxed">
          "Coin transfers are instant and the app experience is really smooth. Atvan Coins brings great offers and rewards that genuinely help."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <div>
            <div className="text-white font-semibold">Saurabh Mehta</div>
            <div className="text-emerald-200 text-sm">Active User • Jaipur</div>
          </div>
        </div>
      </div>

    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-2">80K+</div>
        <div className="text-emerald-200">Active Users</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-2">150K+</div>
        <div className="text-emerald-200">Coin Transfers</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-2">50K+</div>
        <div className="text-emerald-200">Referrals Completed</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-2">₹4M+</div>
        <div className="text-emerald-200">Rewards Issued</div>
      </div>
    </div>

  </div>
</section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Join 50,000+ riders already earning</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Earning Gold Coins?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Sign up now and get 100 bonus coins to kickstart your journey. No hidden fees, completely free to join!
            </p>

            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
                >
                  Create Free Account
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all"
                >
                  Already a Member? Sign In
                </Link>
              </div>
            ) : (
              <Link
                to="/user/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
              >
                Continue to Dashboard
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Free Registration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Instant Rewards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
