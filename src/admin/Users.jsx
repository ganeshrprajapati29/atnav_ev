import React, { useEffect, useState } from 'react';
import { FaEdit, FaBan, FaCheck, FaCertificate } from 'react-icons/fa';
import adminService from '../services/adminService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getUsers();

      // FIX: Properly handle the response object
      setUsers(data.users || []);
      setPagination(data.pagination || {});
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]); // fallback
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  const handleUserUpdate = async (userId, updates) => {
    try {
      await adminService.updateUser(userId, updates);
      fetchUsers();
      setSelectedUser(null);
      alert('User updated successfully!');
    } catch (error) {
      alert('Failed to update user');
    }
  };

  const handleBlockUser = async (userId) => {
    if (window.confirm('Are you sure you want to block this user?')) {
      try {
        await adminService.blockUser(userId);
        fetchUsers();
        alert('User blocked successfully!');
      } catch (error) {
        alert('Failed to block user');
      }
    }
  };

  const handleUnblockUser = async (userId) => {
    if (window.confirm('Are you sure you want to unblock this user?')) {
      try {
        await adminService.unblockUser(userId);
        fetchUsers();
        alert('User unblocked successfully!');
      } catch (error) {
        alert('Failed to unblock user');
      }
    }
  };

  const handleSendCertificate = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to send a coin certificate to ${userName}?`)) {
      try {
        await adminService.sendCoinCertificate(userId);
        alert('Coin certificate sent successfully!');
      } catch (error) {
        alert('Failed to send certificate');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg">Loading Users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">User Management</h1>
          <p className="text-lg text-gray-600">View and manage all registered users</p>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-700">User</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Personal Details</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Contact & Address</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Documents</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Coins & Tier</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Payment & Service</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">

                    {/* User */}
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-3 text-2xl">👤</span>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">ID: {user.uniqueId}</p>
                        </div>
                      </div>
                    </td>

                    {/* Personal Details */}
                    <td className="px-4 py-3">
                      <p className="font-medium">DOB: {user.dob ? new Date(user.dob).toLocaleDateString('en-IN') : 'N/A'}</p>
                      <p className="text-sm text-gray-600">Gender: {user.gender || 'N/A'}</p>
                      {user.fatherName && <p className="text-sm text-gray-600">Father: {user.fatherName}</p>}
                    </td>

                    {/* Contact & Address */}
                    <td className="px-4 py-3">
                      <p className="font-medium">{user.email}</p>
                      <p className="text-sm text-gray-600">{user.phone}</p>
                      <p className="text-sm text-gray-600 mt-1">{user.address}</p>
                    </td>

                    {/* Documents */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Aadhaar:</span> {user.aadhaarNumber || 'Not provided'}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">PAN:</span> {user.panNumber || 'Not provided'}
                        </p>
                        {user.photoUrl && (
                          <a href={user.photoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm block">
                            View Photo
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Coins & Tier */}
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-2">💰</span>
                        <span className="font-semibold mr-3">{user.totalCoins}</span>
                        <span className={`mr-1 ${
                          user.tier === 'Platinum'
                            ? 'text-purple-500'
                            : user.tier === 'Gold'
                            ? 'text-yellow-500'
                            : 'text-gray-500'
                        }`}>
                          🏆
                        </span>
                        <span>{user.tier}</span>
                      </div>
                    </td>

                    {/* Payment & Service */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            user.paymentStatus === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          Payment: {user.paymentStatus}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            user.serviceActivated
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          Service: {user.serviceActivated ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col space-y-1">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            user.isAdmin
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            user.blocked
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {user.blocked ? "Blocked" : "Active"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-800 text-lg"
                          title="Edit User"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleSendCertificate(user._id, user.name)}
                          className="text-purple-600 hover:text-purple-800 text-lg"
                          title="Send Coin Certificate"
                        >
                          <FaCertificate />
                        </button>
                        {user.blocked ? (
                          <button
                            onClick={() => handleUnblockUser(user._id)}
                            className="text-green-600 hover:text-green-800 text-lg"
                            title="Unblock User"
                          >
                            <FaCheck />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBlockUser(user._id)}
                            className="text-red-600 hover:text-red-800 text-lg"
                            title="Block User"
                          >
                            <FaBan />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Edit User: {selectedUser.name}
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  handleUserUpdate(selectedUser._id, {
                    totalCoins: parseInt(fd.get('totalCoins')),
                    tier: fd.get('tier'),
                    isAdmin: fd.get('isAdmin') === 'on'
                  });
                }}
                className="space-y-5"
              >

                <div>
                  <label className="text-gray-700 font-medium">Total Wallet Coins</label>
                  <input
                    type="number"
                    name="totalCoins"
                    defaultValue={selectedUser.totalCoins}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium">Tier</label>
                  <select
                    name="tier"
                    defaultValue={selectedUser.tier}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  >
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isAdmin"
                    defaultChecked={selectedUser.isAdmin}
                    className="h-4 w-4"
                  />
                  <label className="text-gray-700 font-medium">Admin User</label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold"
                  >
                    Update User
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
