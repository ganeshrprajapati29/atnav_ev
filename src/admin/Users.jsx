import React, { useEffect, useState } from "react";
import {
  Pencil,
  Ban,
  Check,
  Award,
  UserCircle,
  Trash2,
  UserCheck,
} from "lucide-react";
import adminService from "../services/adminService";

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

      setUsers(data.users || []);
      setPagination(data.pagination || {});
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
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
      alert("User updated successfully!");
    } catch (error) {
      alert("Failed to update user");
    }
  };

  const handleBlockUser = async (userId) => {
    if (window.confirm("Are you sure you want to block this user?")) {
      try {
        await adminService.blockUser(userId);
        fetchUsers();
        alert("User blocked successfully!");
      } catch (error) {
        alert("Failed to block user");
      }
    }
  };

  const handleUnblockUser = async (userId) => {
    if (window.confirm("Are you sure you want to unblock this user?")) {
      try {
        await adminService.unblockUser(userId);
        fetchUsers();
        alert("User unblocked successfully!");
      } catch (error) {
        alert("Failed to unblock user");
      }
    }
  };

  const handleSendCertificate = async (userId, userName) => {
    if (
      window.confirm(
        `Are you sure you want to send a coin certificate to ${userName}?`
      )
    ) {
      try {
        await adminService.sendCoinCertificate(userId);
        alert("Coin certificate sent successfully!");
      } catch (error) {
        alert("Failed to send certificate");
      }
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (
      window.confirm(
        `Are you sure you want to permanently delete user ${userName}? This action cannot be undone and will remove all associated data.`
      )
    ) {
      try {
        await adminService.deleteUser(userId);
        fetchUsers();
        alert("User deleted successfully!");
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  const handleActivateUser = async (userId, userName, userEmail) => {
    if (window.confirm(`Are you sure you want to activate ${userName}'s account? This will send an activation email and grant full access to the platform.`)) {
      try {
        await adminService.activateUserAccount(userId);
        fetchUsers();
        alert(`User ${userName} activated successfully! Activation email sent to ${userEmail}.`);
      } catch (error) {
        alert("Failed to activate user account");
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

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">User Management</h1>
          <p className="text-lg text-gray-600">
            View and manage all registered users
          </p>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-700">User</th>
                <th className="px-4 py-3 font-medium text-gray-700">Personal</th>
                <th className="px-4 py-3 font-medium text-gray-700">Contact</th>
                <th className="px-4 py-3 font-medium text-gray-700">Documents</th>
                <th className="px-4 py-3 font-medium text-gray-700">Coins</th>
                <th className="px-4 py-3 font-medium text-gray-700">Payment</th>
                <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">

                  {/* NAME */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <UserCircle className="text-gray-400" size={32} />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">
                          ID: {user.uniqueId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* PERSONAL */}
                  <td className="px-4 py-3">
                    <p className="font-medium">
                      DOB:{" "}
                      {user.dob
                        ? new Date(user.dob).toLocaleDateString("en-IN")
                        : "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Gender: {user.gender || "N/A"}
                    </p>
                  </td>

                  {/* CONTACT */}
                  <td className="px-4 py-3">
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {user.address}
                    </p>
                  </td>

                  {/* DOCUMENTS */}
                  <td className="px-4 py-3 text-sm">
                    <p>
                      <b>Aadhaar:</b> {user.aadhaarNumber || "N/A"}
                    </p>
                    <p>
                      <b>PAN:</b> {user.panNumber || "N/A"}
                    </p>
                  </td>

                  {/* COINS */}
                  <td className="px-4 py-3">
                    <span className="font-bold">{user.totalCoins}</span>
                  </td>

                  {/* PAYMENT */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.paymentStatus === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.paymentStatus}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.blocked
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.blocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit User"
                    >
                      <Pencil size={20} />
                    </button>

                    <button
                      onClick={() =>
                        handleSendCertificate(user._id, user.name)
                      }
                      className="text-purple-600"
                      title="Send Certificate"
                    >
                      <Award size={20} />
                    </button>

                    {user.paymentStatus !== "completed" && (
                      <button
                        onClick={() => handleActivateUser(user._id, user.name, user.email)}
                        className="text-green-600 hover:text-green-800"
                        title="Activate User Account"
                      >
                        <UserCheck size={20} />
                      </button>
                    )}

                    {user.blocked ? (
                      <button
                        onClick={() => handleUnblockUser(user._id)}
                        className="text-green-600"
                        title="Unblock User"
                      >
                        <Check size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUser(user._id)}
                        className="text-red-600"
                        title="Block User"
                      >
                        <Ban size={20} />
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteUser(user._id, user.name)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete User"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* EDIT MODAL */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              <h2 className="text-2xl font-bold mb-6">
                Edit User: {selectedUser.name}
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);

                  handleUserUpdate(selectedUser._id, {
                    name: fd.get("name"),
                    email: fd.get("email"),
                    phone: fd.get("phone"),
                    address: fd.get("address"),
                    dob: fd.get("dob") ? new Date(fd.get("dob")) : null,
                    gender: fd.get("gender"),
                    aadhaarNumber: fd.get("aadhaarNumber"),
                    panNumber: fd.get("panNumber"),
                    totalCoins: parseInt(fd.get("totalCoins")),
                    tier: fd.get("tier"),
                    isAdmin: fd.get("isAdmin") === "on",
                    blocked: fd.get("blocked") === "on",
                    paymentStatus: fd.get("paymentStatus"),
                  });
                }}
                className="space-y-4"
              >
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={selectedUser.name}
                      required
                      className="w-full mt-1 border px-3 py-2 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={selectedUser.email}
                      required
                      className="w-full mt-1 border px-3 py-2 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={selectedUser.phone}
                      className="w-full mt-1 border px-3 py-2 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      defaultValue={selectedUser.dob ? new Date(selectedUser.dob).toISOString().split('T')[0] : ''}
                      className="w-full mt-1 border px-3 py-2 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">Gender</label>
                    <select
                      name="gender"
                      defaultValue={selectedUser.gender || ''}
                      className="w-full mt-1 border px-3 py-2 rounded-lg"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">Aadhaar Number</label>
                    <input
                      type="text"
                      name="aadhaarNumber"
                      defaultValue={selectedUser.aadhaarNumber}
                      className="w-full mt-1 border px-3 py-2 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">PAN Number</label>
                    <input
                      type="text"
                      name="panNumber"
                      defaultValue={selectedUser.panNumber}
                      className="w-full mt-1 border px-3 py-2 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">Total Wallet Coins</label>
                    <input
                      type="number"
                      name="totalCoins"
                      defaultValue={selectedUser.totalCoins}
                      required
                      className="w-full mt-1 border px-3 py-2 rounded-lg"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="font-medium text-gray-700">Address</label>
                  <textarea
                    name="address"
                    defaultValue={selectedUser.address}
                    rows={3}
                    className="w-full mt-1 border px-3 py-2 rounded-lg"
                  />
                </div>

                {/* Account Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-gray-700">Tier</label>
                    <select
                      name="tier"
                      defaultValue={selectedUser.tier}
                      className="w-full mt-1 border px-3 py-2 rounded-lg"
                    >
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">Payment Status</label>
                    <select
                      name="paymentStatus"
                      defaultValue={selectedUser.paymentStatus}
                      className="w-full mt-1 border px-3 py-2 rounded-lg"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isAdmin"
                      defaultChecked={selectedUser.isAdmin}
                    />
                    <label>Admin User</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="blocked"
                      defaultChecked={selectedUser.blocked}
                    />
                    <label>Blocked User</label>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700"
                  >
                    Update User
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
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
