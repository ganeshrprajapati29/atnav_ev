import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import adminService from '../services/adminService';

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const data = await adminService.getUserDetails();
      setUserDetails(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      setUserDetails([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailUpdate = async (userId, updates) => {
    try {
      // Assuming we have an update function, but for now, just refetch
      await adminService.updateUser(userId, updates); // Reuse updateUser or create new
      fetchUserDetails();
      setSelectedDetail(null);
      alert('User details updated successfully!');
    } catch (error) {
      alert('Failed to update user details');
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
          <h1 className="text-4xl font-bold text-gray-900">User Details Management</h1>
          <p className="text-lg text-gray-600">View and manage detailed user information</p>
        </div>

        {/* User Details Table */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-700">User</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Address</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Personal Info</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Social Links</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {userDetails.map((detail) => (
                  <tr key={detail._id} className="border-t">

                    {/* User */}
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-3 text-2xl">👤</span>
                        <div>
                          <p className="font-semibold text-gray-900">{detail.user?.name}</p>
                          <p className="text-sm text-gray-600">{detail.user?.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="px-4 py-3">
                      <p>{detail.address?.street}, {detail.address?.city}</p>
                      <p className="text-sm text-gray-600">{detail.address?.state}, {detail.address?.zipCode}</p>
                    </td>

                    {/* Personal Info */}
                    <td className="px-4 py-3">
                      <p>DOB: {detail.dateOfBirth ? new Date(detail.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                      <p className="text-sm text-gray-600">Gender: {detail.gender || 'N/A'}</p>
                    </td>

                    {/* Social Links */}
                    <td className="px-4 py-3">
                      <p>FB: {detail.socialLinks?.facebook || 'N/A'}</p>
                      <p className="text-sm text-gray-600">IG: {detail.socialLinks?.instagram || 'N/A'}</p>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedDetail(detail)}
                          className="text-blue-600 hover:text-blue-800 text-lg"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {selectedDetail && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Edit User Details: {selectedDetail.user?.name}
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  handleDetailUpdate(selectedDetail.user._id, {
                    // Add fields as needed
                  });
                }}
                className="space-y-5"
              >

                {/* Add form fields for editing user details */}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold"
                  >
                    Update Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDetail(null)}
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
