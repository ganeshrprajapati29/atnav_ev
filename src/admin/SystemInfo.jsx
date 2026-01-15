import React, { useEffect, useState } from 'react';
import { FaServer, FaDatabase, FaMemory, FaMicrochip, FaClock, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemInfo();
  }, []);

  const fetchSystemInfo = async () => {
    try {
      setLoading(true);
      // Mock system information
      const mockSystemInfo = {
        server: {
          status: 'online',
          uptime: '5 days, 12 hours',
          version: 'Node.js 18.17.0',
          platform: 'Windows 10 Pro',
          architecture: 'x64'
        },
        database: {
          status: 'connected',
          type: 'MongoDB',
          version: '6.0.8',
          connectionPool: '5/10',
          lastBackup: '2024-01-15 02:00:00'
        },
        memory: {
          used: '256 MB',
          total: '8 GB',
          percentage: 3.2
        },
        cpu: {
          usage: 12.5,
          cores: 8,
          model: 'Intel Core i7-9750H'
        },
        services: [
          { name: 'Authentication Service', status: 'running', uptime: '99.9%' },
          { name: 'Reward Engine', status: 'running', uptime: '99.8%' },
          { name: 'Payment Gateway', status: 'running', uptime: '99.5%' },
          { name: 'Email Service', status: 'running', uptime: '98.2%' }
        ]
      };
      setSystemInfo(mockSystemInfo);
    } catch (error) {
      console.error('Failed to fetch system info:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'online':
      case 'connected':
      case 'running':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'offline':
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'online':
      case 'connected':
      case 'running':
        return <FaCheckCircle className="text-green-600" size={16} />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-600" size={16} />;
      case 'offline':
      case 'error':
        return <FaTimesCircle className="text-red-600" size={16} />;
      default:
        return <FaCheckCircle className="text-gray-600" size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg">Loading System Information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Information</h1>
          <p className="text-gray-600">Monitor system health, performance, and configuration</p>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Server Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <FaServer className="text-emerald-600 text-2xl" />
              {getStatusIcon(systemInfo.server.status)}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Server</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Status: <span className={`font-medium ${getStatusColor(systemInfo.server.status)}`}>{systemInfo.server.status}</span></p>
              <p>Uptime: {systemInfo.server.uptime}</p>
            </div>
          </div>

          {/* Database Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <FaDatabase className="text-blue-600 text-2xl" />
              {getStatusIcon(systemInfo.database.status)}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Database</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Status: <span className={`font-medium ${getStatusColor(systemInfo.database.status)}`}>{systemInfo.database.status}</span></p>
              <p>Type: {systemInfo.database.type}</p>
            </div>
          </div>

          {/* Memory Usage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <FaMemory className="text-purple-600 text-2xl" />
              <div className="text-right">
                <span className="text-lg font-bold text-purple-600">{systemInfo.memory.percentage}%</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Memory</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Used: {systemInfo.memory.used}</p>
              <p>Total: {systemInfo.memory.total}</p>
            </div>
          </div>

          {/* CPU Usage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <FaMicrochip className="text-orange-600 text-2xl" />
              <div className="text-right">
                <span className="text-lg font-bold text-orange-600">{systemInfo.cpu.usage}%</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">CPU</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Cores: {systemInfo.cpu.cores}</p>
              <p>Usage: {systemInfo.cpu.usage}%</p>
            </div>
          </div>

        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Server Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <FaServer className="text-emerald-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Server Details</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Version</span>
                <span className="text-gray-900">{systemInfo.server.version}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Platform</span>
                <span className="text-gray-900">{systemInfo.server.platform}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Architecture</span>
                <span className="text-gray-900">{systemInfo.server.architecture}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Uptime</span>
                <span className="text-gray-900">{systemInfo.server.uptime}</span>
              </div>
            </div>
          </div>

          {/* Database Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <FaDatabase className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Database Details</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Type</span>
                <span className="text-gray-900">{systemInfo.database.type}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Version</span>
                <span className="text-gray-900">{systemInfo.database.version}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Connections</span>
                <span className="text-gray-900">{systemInfo.database.connectionPool}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Last Backup</span>
                <span className="text-gray-900">{systemInfo.database.lastBackup}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Services Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaClock className="text-gray-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Services Status</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemInfo.services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <p className="font-semibold text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  service.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SystemInfo;
