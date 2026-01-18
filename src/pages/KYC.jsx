import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as kycService from '../services/kycService';

import {
  HiDocumentText,
  HiPhoto,
  HiUser,
  HiCheckCircle,
  HiXCircle,
  HiClock,
  HiArrowUpTray,
} from 'react-icons/hi2';

const KYC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [kycStatus, setKycStatus] = useState(null);
  const [kycDetails, setKycDetails] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    aadhaarNumber: '',
    panNumber: ''
  });

  const [files, setFiles] = useState({
    aadhaarDocument: null,
    panDocument: null,
    selfie: null
  });

  const [filePreviews, setFilePreviews] = useState({
    aadhaarDocument: null,
    panDocument: null,
    selfie: null
  });

  useEffect(() => {
    checkKYCStatus();
  }, []);

  const checkKYCStatus = async () => {
    try {
      const statusResponse = await kycService.getKYCStatus();
      setKycStatus(statusResponse);

      if (statusResponse.status !== 'not_submitted') {
        const detailsResponse = await kycService.getKYCDetails();
        setKycDetails(detailsResponse);
      }
    } catch (error) {
      console.error('Error checking KYC:', error);
    } finally {
      setLoading(false);
    }
  };

  // handle input changes
  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // handle file uploads
  const handleFileChange = (e) => {
    const fileName = e.target.name;
    const file = e.target.files[0];
    if (!file) return;

    setFiles(prev => ({
      ...prev,
      [fileName]: file
    }));

    const previewUrl = URL.createObjectURL(file);
    setFilePreviews(prev => ({
      ...prev,
      [fileName]: previewUrl
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.fatherName || !formData.dateOfBirth ||
        !formData.gender || !formData.address ||
        !formData.aadhaarNumber || !formData.panNumber) {
      alert("Please fill all required fields.");
      return;
    }

    if (!files.aadhaarDocument || !files.panDocument || !files.selfie) {
      alert("Upload all required documents.");
      return;
    }

    setSubmitting(true);
    try {
      await kycService.submitKYC(formData, files);
      alert("KYC submitted successfully!");
      checkKYCStatus();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit KYC");
    } finally {
      setSubmitting(false);
    }
  };

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // IF ALREADY SUBMITTED
  if (kycStatus && kycStatus.status !== 'not_submitted') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-12 px-4">

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-600">KYC Status</h1>
            <p className="text-gray-600">Your verification details</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">

            <div className="text-center mb-8">
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-semibold ${
                kycStatus.status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : kycStatus.status === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {kycStatus.status === 'approved' && <HiCheckCircle size={24} />}
                {kycStatus.status === 'rejected' && <HiXCircle size={24} />}
                {kycStatus.status === 'pending' && <HiClock size={24} />}

                <span className="capitalize">{kycStatus.status}</span>
              </div>
            </div>

            {kycDetails && (
              <div className="grid md:grid-cols-2 gap-8">

                {/* LEFT PERSONAL INFO */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-700">Full Name</label>
                    <p className="font-semibold text-gray-900">{kycDetails.fullName}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-700">Father's Name</label>
                    <p className="font-semibold text-gray-900">{kycDetails.fatherName}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-700">DOB</label>
                    <p className="font-semibold text-gray-900">
                      {new Date(kycDetails.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-700">Gender</label>
                    <p className="font-semibold text-gray-900">{kycDetails.gender}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-700">Address</label>
                    <p className="font-semibold text-gray-900">{kycDetails.address}</p>
                  </div>
                </div>

                {/* RIGHT DOCUMENTS */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Documents</h3>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-700">Aadhaar Number</label>
                    <p className="font-semibold text-gray-900">{kycDetails.aadhaarNumber}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-700">PAN Number</label>
                    <p className="font-semibold text-gray-900">{kycDetails.panNumber}</p>
                  </div>

                  <div className="grid gap-4">
                    {kycDetails.aadhaarDocument?.url && (
                      <img
                        src={kycDetails.aadhaarDocument.url}
                        className="rounded-lg shadow cursor-pointer"
                        alt="Aadhaar"
                        onClick={() => window.open(kycDetails.aadhaarDocument.url)}
                      />
                    )}

                    {kycDetails.panDocument?.url && (
                      <img
                        src={kycDetails.panDocument.url}
                        className="rounded-lg shadow cursor-pointer"
                        alt="PAN"
                        onClick={() => window.open(kycDetails.panDocument.url)}
                      />
                    )}

                    {kycDetails.selfie?.url && (
                      <img
                        src={kycDetails.selfie.url}
                        className="rounded-lg shadow cursor-pointer"
                        alt="Selfie"
                        onClick={() => window.open(kycDetails.selfie.url)}
                      />
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  // === KYC FORM IF NOT SUBMITTED ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-12 px-4">

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 text-center mb-6">
          KYC Verification
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl">

          {/* PERSONAL */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HiUser /> Personal Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">

            <div>
              <label className="text-sm text-gray-700">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Father Name *</label>
              <input
                type="text"
                name="fatherName"
                required
                value={formData.fatherName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Gender *</label>
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-700">Address *</label>
              <textarea
                name="address"
                required
                rows="3"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              ></textarea>
            </div>

          </div>

          {/* DOCUMENT NUMBERS */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HiDocumentText /> Document Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">

            <div>
              <label className="text-sm text-gray-700">Aadhaar Number *</label>
              <input
                type="text"
                required
                maxLength={12}
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">PAN Number *</label>
              <input
                type="text"
                required
                maxLength={10}
                name="panNumber"
                value={formData.panNumber.toUpperCase()}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, panNumber: e.target.value.toUpperCase() }))
                }
                className="w-full p-3 border rounded-lg"
              />
            </div>

          </div>

          {/* DOCUMENT UPLOADS */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HiPhoto /> Upload Documents
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">

            {/* Aadhaar */}
            <div className="text-center">
              <label className="block text-sm mb-2">Aadhaar *</label>
              <label
                htmlFor="aadhaar-upload"
                className="block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-emerald-600"
              >
                {filePreviews.aadhaarDocument ? (
                  <img src={filePreviews.aadhaarDocument} className="w-full h-full rounded-lg" />
                ) : (
                  <HiArrowUpTray size={24} className="text-gray-400" />
                )}
              </label>
              <input id="aadhaar-upload" type="file" name="aadhaarDocument" className="hidden"
                     onChange={handleFileChange} />
            </div>

            {/* PAN */}
            <div className="text-center">
              <label className="block text-sm mb-2">PAN *</label>
              <label
                htmlFor="pan-upload"
                className="block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-emerald-600"
              >
                {filePreviews.panDocument ? (
                  <img src={filePreviews.panDocument} className="w-full h-full rounded-lg" />
                ) : (
                  <HiArrowUpTray size={24} className="text-gray-400" />
                )}
              </label>
              <input id="pan-upload" type="file" name="panDocument" className="hidden"
                     onChange={handleFileChange} />
            </div>

            {/* Selfie */}
            <div className="text-center">
              <label className="block text-sm mb-2">Selfie *</label>
              <label
                htmlFor="selfie-upload"
                className="block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-emerald-600"
              >
                {filePreviews.selfie ? (
                  <img src={filePreviews.selfie} className="w-full h-full rounded-lg" />
                ) : (
                  <HiArrowUpTray size={24} className="text-gray-400" />
                )}
              </label>
              <input id="selfie-upload" type="file" name="selfie" className="hidden"
                     onChange={handleFileChange} />
            </div>

          </div>

          {/* SUBMIT */}
          <div className="text-center">
            <button
              disabled={submitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold shadow-md transition disabled:bg-gray-400"
            >
              {submitting ? "Submitting..." : "Submit KYC Application"}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default KYC;
