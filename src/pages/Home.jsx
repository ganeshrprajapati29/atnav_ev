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
  Heart,
  Target,
  PiggyBank,
  Award as AwardIcon,
  Wallet,
  QrCode,
  UserPlus,
  Building
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />
{/* Hero Section */}
<section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 pt-20 pb-32 overflow-hidden">

  {/* Decorative SVG Background */}
  <div className="absolute inset-0 pointer-events-none">

    {/* Wave */}
    <svg
      className="absolute bottom-0 left-0 w-full h-48 opacity-25"
      viewBox="0 0 1440 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="white"
        d="M0,192L60,197.3C120,203,240,213,360,208C480,203,600,181,720,176C840,171,960,181,1080,202.7C1200,224,1320,256,1380,272L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      />
    </svg>

    {/* Top Glow Blob */}
    <svg
      className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-20 blur-2xl"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#FACC15"
        d="M46.3,-55.7C60.5,-45.3,73,-30.1,74.5,-13.3C75.9,3.6,66.2,21.9,54.5,38.2C42.7,54.5,28.9,68.7,11.6,73.2C-5.6,77.7,-26.3,72.4,-41.4,61C-56.5,49.6,-66,32,-68.3,13.2C-70.6,-5.5,-65.7,-25.3,-54.3,-40.3C-42.9,-55.3,-25,-65.6,-6.6,-57.9C11.8,-50.3,23.7,-24.6,46.3,-55.7Z"
        transform="translate(100 100)"
      />
    </svg>

    {/* Coin Ring */}
    <div className="absolute top-24 left-20 w-72 h-72 rounded-full border border-yellow-400/40 blur-xl opacity-40" />
    <div className="absolute bottom-32 right-32 w-96 h-96 rounded-full border border-white/20 blur-2xl opacity-20" />
  </div>

  {/* Content */}
  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl mx-auto text-center">

      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
        <Coins className="w-4 h-4 text-yellow-400" />
        <span className="text-sm font-medium text-white">
          Welcome to Atvan Coins
        </span>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
        Atvan Coin
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent block">
          Your Wealth Platform
        </span>
      </h1>

      <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
        Join India's premier wealth platform. Track your growth, earn valuable coins,
        and redeem for exclusive benefits with Atvan Coins.
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
          <div className="text-2xl font-bold text-white">100% Secure</div>
          <div className="text-sm text-emerald-100">
            Encrypted Coin Transfers
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm">
          <div className="text-2xl font-bold text-white">Fast Growing</div>
          <div className="text-sm text-emerald-100">
            New Features Rolling Out
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm">
          <div className="text-2xl font-bold text-white">Wealth Platform</div>
          <div className="text-sm text-emerald-100">
            India's Premier Choice
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

   {/* About Atvan Section */}
<section className="relative py-24 bg-gradient-to-b from-white to-emerald-50 overflow-hidden">
  {/* Background Decorative Elements */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-200/20 rounded-full blur-3xl"></div>
  </div>

  <div className="container mx-auto px-6 relative z-10">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
       What <span className="text-emerald-600">is Atvan?</span>
      </h2>
      <div className="mt-4 w-28 h-1 bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-full mx-auto"></div>
      <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
        Discover the revolutionary force behind India's EV transformation and wealth creation platform.
      </p>
    </div>

    {/* Content Cards */}
    <div className="max-w-7xl mx-auto grid md:grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Card 1: Company Overview */}
      <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-emerald-100">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
          <Building className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Legacy & Vision</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          Atvan is a part of the CIBORI GROUP, established in 2010, with a strong presence
          across hospitality, tourism, health & nutrition, finance, import & export, and
          electric vehicle manufacturing. As an electric vehicle manufacturing company,
          Atvan is committed to building a safer, smarter, and eco-friendly future by
          developing an advanced ecosystem that positions India as a global EV hub and
          drives the next wave of innovation.
        </p>
      </div>

      {/* Card 2: Coin System */}
      <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-emerald-100">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
          <Coins className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Atvan Coin Revolution</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          Atvan has introduced a total supply of 10 crore coins, out of which 70% are
          available for sale at an initial price of ₹10 per coin. With a guaranteed
          return program, the value of the Atvan coin is designed to increase every year,
          offering a unique opportunity to secure long-term growth by owning just 10
          coins. The first milestone targets ₹1500 per coin, with a long-term vision of
          achieving ₹100,000 per coin.
        </p>
      </div>

      {/* Card 3: Value Proposition */}
      <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-emerald-100">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Growth</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          With every sale, Atvan transfers ₹5,000–₹15,000 worth of coins, ensuring direct
          value distribution. As electric vehicles represent the future of mobility,
          growing EV adoption will naturally increase demand and benefits for coin
          holders. Each individual is limited to 10 coins, maintaining scarcity,
          preventing unnecessary trading, and accelerating value growth through healthy
          market competition.
        </p>
      </div>

    </div>

    {/* Bottom CTA */}
    <div className="text-center mt-16">
      <div className="inline-flex items-center gap-2 bg-emerald-100 px-6 py-3 rounded-full">
        <Sparkles className="w-5 h-5 text-emerald-600" />
        <span className="text-emerald-800 font-medium">Join the EV Revolution Today</span>
      </div>
    </div>

  </div>
</section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits of Atvan Coins?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A powerful wealthy system designed to help you to earn, save, and grow faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Guaranteed Return Program */}
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Guaranteed Return Program</h3>
              <p className="text-gray-600 leading-relaxed">
                We will increase the price of our coin every year, which will provide coin holders with a guaranteed fixed return.
              </p>
            </div>

            {/* Instant Loan Facility */}
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Loan Facility</h3>
              <p className="text-gray-600 leading-relaxed">
                We will provide loan facilities to our coin holders against their coins.
              </p>
            </div>

            {/* Special Reward System */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <AwardIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Special Reward System</h3>
              <p className="text-gray-600 leading-relaxed">
                We will provide free home, car, pension, etc, to our premium coin holders.
              </p>
            </div>

            {/* Fast Withdrawals */}
            <div className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Withdrawals</h3>
              <p className="text-gray-600 leading-relaxed">
                Withdraw your coins as real money through bank transfer, UPI, or wallet payout — instantly.
              </p>
            </div>

            {/* QR Coin Transfers */}
            <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-cyan-100">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">QR Coin Transfers</h3>
              <p className="text-gray-600 leading-relaxed">
                Send or receive coins instantly through QR scanning. Simple, fast, and secure.
              </p>
            </div>

            {/* Invite & Earn */}
            <div className="group bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-rose-100">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Invite & Earn</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn bonus coins for every friend who joins using your referral link. Unlock multi-level rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Buy Coins</h3>
              <p className="text-gray-600 leading-relaxed">
                Work at time and earn coins automatically based on time period and tier.
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Refer & Earn</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn bonus coins for every friend who joins using your referral link. Unlock multi-level rewards.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Promote Yourself</h3>
              <p className="text-gray-600 leading-relaxed">
                Reach higher tiers for better rewards, exclusive perks, and premium benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Atvan Coins Membership</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your tier and start building wealth with Atvan Coins.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Silver Tier */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-emerald-300 transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Silver Tier</h3>
                  <p className="text-sm text-gray-500">10-99 Coins</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6 flex-grow">
                Perfect for beginners starting their Atvan Coins journey with essential benefits.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Buy 10 Atvan Coins at ₹10 each</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Free monthly bonus scratch card</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Basic rewards and support</span>
                </li>
              </ul>

              <div className="mt-auto">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">₹100</div>
                  <div className="text-sm text-gray-500">One-time purchase</div>
                </div>
                {user ? (
                  <Link
                    to="/payment?amount=100"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Buy Now
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg cursor-not-allowed"
                  >
                    Login to Buy
                  </Link>
                )}
              </div>
            </div>

            {/* Gold Tier */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-8 border-2 border-amber-400 hover:border-amber-500 transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-2 relative flex flex-col h-full">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                MOST POPULAR
              </div>

              <div className="flex items-center gap-3 mb-6 mt-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Gold Tier</h3>
                  <p className="text-sm text-amber-700">100-999 Coins</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6 font-medium flex-grow">
                Ideal for active users seeking enhanced rewards and premium features.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">Buy 100 Atvan Coins at ₹10 each</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">Free monthly bonus scratch card</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">Enhanced monthly bonus rewards</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">Priority customer support</span>
                </li>
              </ul>

              <div className="mt-auto">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">₹1000</div>
                  <div className="text-sm text-gray-500">One-time purchase</div>
                </div>
                {user ? (
                  <Link
                    to="/payment?amount=1000"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Buy Now
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg cursor-not-allowed"
                  >
                    Login to Buy
                  </Link>
                )}
              </div>
            </div>

            {/* Platinum Tier */}
            <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl p-8 border-2 border-purple-500 hover:border-purple-400 transition-all hover:shadow-3xl hover:-translate-y-2 text-white flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Platinum Tier</h3>
                  <p className="text-sm text-purple-300">1000+ Coins</p>
                </div>
              </div>

              <p className="text-purple-100 mb-6 font-medium flex-grow">
                Ultimate tier for premium users with maximum benefits and exclusive perks.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">Buy 1000 Atvan Coins at ₹10 each</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">Free monthly bonus scratch card</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">Enhanced monthly bonus rewards</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">VIP access to partner deals</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">Dedicated priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">Exclusive premium features</span>
                </li>
              </ul>

              <div className="mt-auto">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-white mb-1">₹10000</div>
                  <div className="text-sm text-purple-300">One-time purchase</div>
                </div>
                {user ? (
                  <Link
                    to="/payment?amount=10000"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Buy Now
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg cursor-not-allowed"
                  >
                    Login to Buy
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATVAN Share Price Chart */}
      <section className="relative py-32 bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Background Elements */}
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
            {/* Decorative elements */}
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
              ATVAN <span className="text-emerald-600">Share Price Chart</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Track the projected growth of Atvan share prices over the years, demonstrating our commitment to delivering exceptional value to our investors.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden">
              {/* Chart Background Icons */}
              <div className="absolute top-4 right-4 opacity-10">
                <Coins className="w-16 h-16 text-emerald-600" />
              </div>
              <div className="absolute bottom-4 left-4 opacity-10">
                <TrendingUp className="w-12 h-12 text-blue-600" />
              </div>

              {/* Share Price Table */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-emerald-600 text-white">
                      <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Sr. No.</th>
                      <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Date</th>
                      <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Price (₹)</th>
                      <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Sr. No.</th>
                      <th className="px-4 py-3 text-left font-semibold border-r border-emerald-500">Date</th>
                      <th className="px-4 py-3 text-left font-semibold">Price (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">0</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-26</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-emerald-600 font-semibold">10</td>
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">8</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-34</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">300</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-white transition-colors">
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">1</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-27</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-emerald-600 font-semibold">15</td>
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">9</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-35</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">500</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">2</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-28</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-emerald-600 font-semibold">25</td>
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">10</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-36</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">650</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-white transition-colors">
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">3</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-29</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-emerald-600 font-semibold">40</td>
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">11</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-37</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">800</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">4</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-30</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-emerald-600 font-semibold">55</td>
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">12</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-38</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">1000</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-white transition-colors">
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">5</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-31</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-emerald-600 font-semibold">75</td>
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">13</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-39</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">1150</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">6</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-32</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-emerald-600 font-semibold">100</td>
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">14</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-40</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">1300</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-white transition-colors">
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">7</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-33</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-emerald-600 font-semibold">200</td>
                      <td className="px-4 py-3 border-r border-gray-200 font-medium">15</td>
                      <td className="px-4 py-3 border-r border-gray-200">1-Jan-41</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">1500</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Key Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">₹10</div>
                  <div className="text-sm text-gray-600">Starting Price</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">₹1500</div>
                  <div className="text-sm text-gray-600">Target 2041</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">16 Years</div>
                  <div className="text-sm text-gray-600">Growth Period</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">150x</div>
                  <div className="text-sm text-gray-600">Potential Return</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Coins className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Start Your Wealth Journey</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Earning with Atvan Coins?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Sign up and buy 10 coins to kickstart your journey.
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
