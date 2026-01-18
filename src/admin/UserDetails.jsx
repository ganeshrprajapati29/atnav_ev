import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye } from 'react-icons/fa';
import adminService from '../services/adminService';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await adminService.getUsers(page, 12);
      setUsers(Array.isArray(response.users) ? response.users : []);
      setPagination(response.pagination || {});
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg">Loading User Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Complete User Details</h1>
          <p className="text-lg text-gray-600">View comprehensive information for all users</p>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">

              {/* User Header */}
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">👤</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">ID: {user.uniqueId}</p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Email:</span>
                  <span className="text-sm text-gray-900">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Phone:</span>
                  <span className="text-sm text-gray-900">{user.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Father Name:</span>
                  <span className="text-sm text-gray-900">{user.fatherName || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">DOB:</span>
                  <span className="text-sm text-gray-900">
                    {user.dob ? new Date(user.dob).toLocaleDateString('en-IN') : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Gender:</span>
                  <span className="text-sm text-gray-900">{user.gender || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Address:</span>
                  <span className="text-sm text-gray-900">{user.address || 'N/A'}</span>
                </div>
              </div>

              {/* Documents */}
              <div className="border-t pt-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Documents</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Aadhaar:</span>
                    <span className="text-xs text-gray-900">{user.aadhaarNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">PAN:</span>
                    <span className="text-xs text-gray-900">{user.panNumber || 'N/A'}</span>
                  </div>
                  {user.photoUrl && (
                    <div className="mt-2">
                      <a href={user.photoUrl} target="_blank" rel="noopener noreferrer"
                         className="text-blue-600 hover:text-blue-800 text-xs underline">
                        View Photo
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Coins & Tier */}
              <div className="border-t pt-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Rewards</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Total Coins:</span>
                    <span className="text-lg font-bold text-yellow-600">{user.totalCoins}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Total Gold:</span>
                    <span className="text-sm text-gray-900">{user.totalGold}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Tier:</span>
                    <span className={`text-sm font-medium ${
                      user.tier === 'Platinum' ? 'text-purple-600' :
                      user.tier === 'Gold' ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      🏆 {user.tier}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              {user.bankDetails && (
                <div className="border-t pt-4 mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Bank Details</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Account Holder:</span>
                      <span className="text-xs text-gray-900">{user.bankDetails.accountHolderName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Account No:</span>
                      <span className="text-xs text-gray-900">{user.bankDetails.accountNumber || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">IFSC:</span>
                      <span className="text-xs text-gray-900">{user.bankDetails.ifsc || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Bank:</span>
                      <span className="text-xs text-gray-900">{user.bankDetails.bankName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">UPI:</span>
                      <span className="text-xs text-gray-900">{user.bankDetails.upiId || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Status & Activity */}
              <div className="border-t pt-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Status & Activity</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Payment Status:</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.paymentStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {user.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Service Activated:</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.serviceActivated ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.serviceActivated ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">KYC Status:</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.kycStatus === 'verified' ? 'bg-green-100 text-green-700' :
                      user.kycStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.kycStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Admin:</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.isAdmin ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Blocked:</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.blocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {user.blocked ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Login Count:</span>
                    <span className="text-xs text-gray-900">{user.loginCount || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Last Login:</span>
                    <span className="text-xs text-gray-900">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('en-IN') : 'Never'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Referral Info */}
              <div className="border-t pt-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Referral</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Referral Code:</span>
                    <span className="text-xs text-gray-900">{user.referralCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Referred By:</span>
                    <span className="text-xs text-gray-900">
                      {user.referredBy ? `${user.referredBy.name} (${user.referredBy.uniqueId})` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Total Referrals:</span>
                    <span className="text-xs text-gray-900">{user.referrals?.length || 0}</span>
                  </div>
                  {user.referrals && user.referrals.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-600 block mb-1">Referred Users:</span>
                      <div className="max-h-20 overflow-y-auto bg-gray-50 p-2 rounded">
                        {user.referrals.map((ref, index) => (
                          <div key={index} className="text-xs text-gray-700">
                            {ref.name} ({ref.uniqueId})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Timestamps</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Created:</span>
                    <span className="text-xs text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Updated:</span>
                    <span className="text-xs text-gray-900">
                      {new Date(user.updatedAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 border border-blue-600 rounded hover:bg-blue-50"
                    title="Edit User"
                  >
                    <FaEdit className="inline mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => window.open(`/admin/users?view=${user._id}`, '_blank')}
                    className="text-green-600 hover:text-green-800 text-sm px-3 py-1 border border-green-600 rounded hover:bg-green-50"
                    title="View Full Details"
                  >
                    <FaEye className="inline mr-1" /> View
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className={`px-4 py-2 rounded-lg font-medium ${
                  pagination.hasPrevPage
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      currentPage === pageNum
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className={`px-4 py-2 rounded-lg font-medium ${
                  pagination.hasNextPage
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Pagination Info */}
        {pagination.totalUsers > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Showing {((currentPage - 1) * pagination.limit) + 1} to {Math.min(currentPage * pagination.limit, pagination.totalUsers)} of {pagination.totalUsers} users
          </div>
        )}

        {/* Edit Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Edit User: {selectedUser.name}
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  handleUserUpdate(selectedUser._id, {
                    totalCoins: parseInt(fd.get('totalCoins')) || 0,
                    tier: fd.get('tier'),
                    isAdmin: fd.get('isAdmin') === 'on',
                    blocked: fd.get('blocked') === 'on'
                  });
                }}
                className="space-y-4"
              >

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 font-medium">Total Coins</label>
                    <input
                      type="number"
                      name="totalCoins"
                      defaultValue={selectedUser.totalCoins}
                      className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 font-medium">Tier</label>
                    <select
                      name="tier"
                      defaultValue={selectedUser.tier}
                      className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                    >
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isAdmin"
                      defaultChecked={selectedUser.isAdmin}
                      className="h-4 w-4 mr-2"
                    />
                    <label className="text-gray-700 font-medium text-sm">Admin User</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="blocked"
                      defaultChecked={selectedUser.blocked}
                      className="h-4 w-4 mr-2"
                    />
                    <label className="text-gray-700 font-medium text-sm">Blocked</label>
                  </div>
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

export default UserDetails;
