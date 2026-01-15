import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Trophy, Coins, Gift, Star, Shield, Sparkles, Clock, Award, ChevronRight } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">India's #1 Two-Wheeler Rewards Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Ride Smart, Earn
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent"> Gold Coins</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform every kilometer into valuable gold coins. Redeem for premium accessories, services, and exclusive offers across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {!user ? (
                <>
                  <Link 
                    to="/signup" 
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all hover:scale-105"
                  >
                    Start Earning Now
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    to="/login" 
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link 
                  to="/dashboard" 
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all hover:scale-105"
                >
                  Go to Dashboard
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Riders</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
                <div className="text-2xl font-bold text-gray-900">10M+</div>
                <div className="text-sm text-gray-600">Coins Earned</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Earn Gold Coins</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple and rewarding ways to collect coins with every ride
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Daily Rides */}
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Daily Rides</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn 10-75 gold coins per kilometer based on your tier. Track your rides automatically.
              </p>
            </div>
                
            {/* Service Rewards */}
            <div className="group bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-emerald-100">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Service Rewards</h3>
              <p className="text-gray-600 leading-relaxed">
                Get 500-2000 bonus coins for servicing at partner workshops. Premium services earn more.
              </p>
            </div>

            {/* Redeem Benefits */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Redeem Rewards</h3>
              <p className="text-gray-600 leading-relaxed">
                Exchange coins for helmets, accessories, parts, and services at partner stores nationwide.
              </p>
            </div>

            {/* Exclusive Perks */}
            <div className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Exclusive Perks</h3>
              <p className="text-gray-600 leading-relaxed">
                Access special deals on fuel, insurance, and VIP experiences available only to members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Membership Tiers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock better rewards as you ride more
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Silver Tier */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-md">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Silver Rider</h3>
                  <p className="text-sm text-gray-500">0 - 999 Coins</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">Perfect for new riders starting their journey</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Earn 10-20 coins per km</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Free basic service check-up</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Access to maintenance guides</span>
                </li>
              </ul>

              <div className="pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">Starting from</div>
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
                  <h3 className="text-2xl font-bold text-gray-900">Gold Rider</h3>
                  <p className="text-sm text-amber-700">1,000 - 4,999 Coins</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 font-medium">For passionate riders who love the road</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">Earn 25-40 coins per km</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">50% off premium services</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">Free helmet & riding gear</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">Priority customer support</span>
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
                  <h3 className="text-2xl font-bold text-white">Platinum Rider</h3>
                  <p className="text-sm text-purple-300">5,000+ Coins</p>
                </div>
              </div>
              
              <p className="text-purple-100 mb-6 font-medium">Elite status for dedicated riders</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">Earn 50-75 coins per km</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">Free annual service package</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">VIP event invitations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">Exclusive product launches</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">Dedicated account manager</span>
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
              Sign up now and get 100 bonus coins to kickstart your journey
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
                to="/dashboard" 
                className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
              >
                Continue to Dashboard
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 