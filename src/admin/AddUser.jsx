import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import adminService from "../services/adminService";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    aadhaarNumber: "",
    panNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await adminService.createUser(formData);
      setMessage(
        "User created successfully! Credentials have been sent to their email."
      );

      setFormData({
        name: "",
        fatherName: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        gender: "",
        aadhaarNumber: "",
        panNumber: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-4xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold flex items-center gap-4 text-gray-900">
            <UserPlus className="text-emerald-600" size={32} />
            Add New User
          </h1>

          <p className="text-lg text-gray-600 mt-2">
            Create a new user with auto-generated credentials.
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Basic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  type="text"
                  className="w-full border px-4 py-3 rounded-lg"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Father's Name</label>
                <input
                  type="text"
                  className="w-full border px-4 py-3 rounded-lg"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full border px-4 py-3 rounded-lg"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone *</label>
                <input
                  type="tel"
                  required
                  className="w-full border px-4 py-3 rounded-lg"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Personal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium">DOB</label>
                <input
                  type="date"
                  className="w-full border px-4 py-3 rounded-lg"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Gender</label>
                <select
                  className="w-full border px-4 py-3 rounded-lg"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Address</label>
                <input
                  type="text"
                  className="w-full border px-4 py-3 rounded-lg"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Aadhaar</label>
                <input
                  type="text"
                  className="w-full border px-4 py-3 rounded-lg"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium">PAN</label>
                <input
                  type="text"
                  className="w-full border px-4 py-3 rounded-lg"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  style={{ textTransform: "uppercase" }}
                />
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.includes("success")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    Create User
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
