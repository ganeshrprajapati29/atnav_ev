import React, { useEffect, useState } from 'react';
import { FaBell, FaPlus, FaEdit, FaTrash, FaPaperPlane, FaUsers, FaUser } from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    target: 'all',
    scheduledFor: ''
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Mock notifications data
      const mockNotifications = [
        {
          id: 1,
          title: 'Welcome to the Rewards System!',
          message: 'Thank you for joining our rewards program. Start earning coins today!',
          type: 'info',
          target: 'all',
          status: 'sent',
          sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          recipients: 150
        },
        {
          id: 2,
          title: 'New Services Available',
          message: 'Check out our latest reward services now available in your dashboard.',
          type: 'promotion',
          target: 'active_users',
          status: 'scheduled',
          scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
          recipients: 89
        },
        {
          id: 3,
          title: 'System Maintenance',
          message: 'Scheduled maintenance will occur tonight from 2-4 AM. Service may be temporarily unavailable.',
          type: 'warning',
          target: 'all',
          status: 'draft',
          recipients: 0
        }
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNotification) {
        // Update existing notification
        setNotifications(prev => prev.map(n =>
          n.id === editingNotification.id
            ? { ...n, ...formData, status: 'draft' }
            : n
        ));
      } else {
        // Create new notification
        const newNotification = {
          id: Date.now(),
          ...formData,
          status: 'draft',
          createdAt: new Date().toISOString()
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save notification:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'info',
      target: 'all',
      scheduledFor: ''
    });
    setEditingNotification(null);
    setShowCreateForm(false);
  };

  const editNotification = (notification) => {
    setFormData({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      target: notification.target,
      scheduledFor: notification.scheduledFor || ''
    });
    setEditingNotification(notification);
    setShowCreateForm(true);
  };

  const deleteNotification = async (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const sendNotification = async (id) => {
    try {
      setNotifications(prev => prev.map(n =>
        n.id === id
          ? { ...n, status: 'sent', sentAt: new Date().toISOString() }
          : n
      ));
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'promotion': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
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
          <p className="text-gray-600 text-lg">Loading Notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">Manage system-wide notifications and announcements</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaPlus size={16} />
              Create Notification
            </button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingNotification ? 'Edit Notification' : 'Create New Notification'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTrash size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="info">Information</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="promotion">Promotion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                  <select
                    value={formData.target}
                    onChange={(e) => setFormData(prev => ({ ...prev, target: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="all">All Users</option>
                    <option value="active_users">Active Users Only</option>
                    <option value="new_users">New Users Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule For (Optional)</label>
                  <input
                    type="datetime-local"
                    value={formData.scheduledFor}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {editingNotification ? 'Update' : 'Create'} Notification
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(notification.type)}`}>
                      {notification.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}>
                      {notification.status}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3">{notification.message}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      {notification.target === 'all' ? <FaUsers size={14} /> : <FaUser size={14} />}
                      {notification.target === 'all' ? 'All Users' :
                       notification.target === 'active_users' ? 'Active Users' : 'New Users'}
                    </span>
                    {notification.sentAt && (
                      <span>Sent: {new Date(notification.sentAt).toLocaleString()}</span>
                    )}
                    {notification.scheduledFor && notification.status === 'scheduled' && (
                      <span>Scheduled: {new Date(notification.scheduledFor).toLocaleString()}</span>
                    )}
                    {notification.recipients > 0 && (
                      <span>Recipients: {notification.recipients}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {notification.status === 'draft' && (
                    <button
                      onClick={() => sendNotification(notification.id)}
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                      <FaPaperPlane size={12} />
                      Send
                    </button>
                  )}
                  <button
                    onClick={() => editNotification(notification)}
                    className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    <FaEdit size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    <FaTrash size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Notifications;
