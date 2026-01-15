import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as serviceService from '../services/serviceService';
import { ShoppingCart, Coins, Star, AlertCircle, CheckCircle, X, Search } from 'lucide-react';

const Services = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [redeeming, setRedeeming] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceService.getServices();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setErrorMessage('Failed to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (service) => {
    if ((user?.totalCoins || 0) < service.pointsRequired) {
      setErrorMessage(`You need ${service.pointsRequired - (user?.totalCoins || 0)} more coins!`);
      return;
    }

    const confirmRedeem = window.confirm(
      `Redeem "${service.name}" for ${service.pointsRequired} coins?`
    );

    if (!confirmRedeem) return;

    try {
      setRedeeming(service._id);
      setErrorMessage('');
      await serviceService.redeemService(service._id);
      setSuccessMessage(`✓ "${service.name}" redeemed successfully!`);
      
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload();
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to redeem service. Please try again.');
    } finally {
      setRedeeming(null);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || service.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block mb-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Services...</h2>
          <p className="text-gray-600">Please wait while we fetch available services</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Available Services</h1>
          <p className="text-lg text-gray-600 mb-6">Redeem your coins for amazing services and rewards</p>

          {/* Coin Balance Card */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl">
                  💰
                </div>
                <div>
                  <p className="text-sm opacity-90 font-medium">Your Coin Balance</p>
                  <p className="text-4xl font-bold">{user?.totalCoins || 0}</p>
                  <p className="text-sm opacity-80 mt-1">Coins available to spend</p>
                </div>
              </div>
              <div className="text-right">
                <Coins size={32} className="opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3 animate-pulse">
            <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-emerald-700 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 font-medium">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage('')}
              className="text-red-600 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filterStatus === 'active'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Available
            </button>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const canRedeem = service.status === 'active' && (user?.totalCoins || 0) >= service.pointsRequired;
              const isRedeemingThis = redeeming === service._id;

              return (
                <div key={service._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
                  
                  {/* Service Image */}
                  {service.image && (
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                      {service.status === 'active' && (
                        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star size={14} fill="currentColor" />
                          Active
                        </div>
                      )}
                      {service.status !== 'active' && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">Unavailable</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                    {/* Points Required */}
                    <div className="mb-6 flex items-center gap-2 bg-emerald-50 p-3 rounded-lg">
                      <Coins className="text-emerald-600" size={20} />
                      <div>
                        <p className="text-xs text-gray-600">Cost</p>
                        <p className="text-xl font-bold text-emerald-600">{service.pointsRequired}</p>
                      </div>
                    </div>

                    {/* Insufficient Balance Warning */}
                    {service.status === 'active' && (user?.totalCoins || 0) < service.pointsRequired && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800 flex items-start gap-2">
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <span>Need {service.pointsRequired - (user?.totalCoins || 0)} more coins</span>
                      </div>
                    )}

                    {/* Redeem Button */}
                    <button
                      onClick={() => handleRedeem(service)}
                      disabled={!canRedeem || isRedeemingThis}
                      className={`w-full py-3 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                        canRedeem
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transform hover:scale-105'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isRedeemingThis ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Redeeming...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} />
                          <span>
                            {service.status !== 'active'
                              ? 'Unavailable'
                              : (user?.totalCoins || 0) < service.pointsRequired
                                ? 'Insufficient Coins'
                                : 'Redeem Now'
                            }
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Services Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Check back later for new services and rewards.'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Results Info */}
        {filteredServices.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            <p>Showing {filteredServices.length} of {services.length} services</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;