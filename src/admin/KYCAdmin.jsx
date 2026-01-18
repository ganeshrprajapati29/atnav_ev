import React, { useState, useEffect } from 'react';
import * as kycService from '../services/kycService';
import {
  HiDocumentText,
  HiCheckCircle,
  HiXCircle,
  HiClock,
  HiEye,
  HiMagnifyingGlass,
  HiFilter,
  HiUser,
  HiPhoto
} from 'react-icons/hi2';

const KYCAdmin = () => {
  const [kycApplications, setKycApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadKYCData();
  }, [filter, search, currentPage]);

  const loadKYCData = async () => {
    try {
      setLoading(true);

      // Load stats
      const statsResponse = await kycService.getKYCStats();
      setStats(statsResponse);

      // Load applications
      const applicationsResponse = await kycService.getAllKYC({
        status: filter === 'all' ? '' : filter,
        search: search,
        page: currentPage,
        limit: 10
      });

      setKycApplications(applicationsResponse.kycApplications);
      setTotalPages(applicationsResponse.pagination.pages);
    } catch (error) {
      console.error('Error loading KYC data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id, status, rejectionReason = '') => {
    try {
      await kycService.reviewKYC(id, status, rejectionReason);
      setShowModal(false);
      setSelectedApplication(null);
      loadKYCData(); // Refresh data
      alert(`KYC application ${status} successfully!`);
    } catch (error) {
      console.error('Error reviewing KYC:', error);
      alert('Failed to review KYC application');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <HiCheckCircle size={16} />;
      case 'rejected': return <HiXCircle size={16} />;
      case 'pending': return <HiClock size={16} />;
      default: return <HiDocumentText size={16} />;
    }
  };

  if (loading && kycApplications.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">KYC Management</h1>
          <p className="text-gray-600">Review and manage KYC verification applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Applications</p>
                <p className="text-3xl font-bold text-blue-600">{stats.total || 0}</p>
              </div>
              <HiDocumentText size={32} className="text-blue-600 opacity-70" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending || 0}</p>
              </div>
              <HiClock size={32} className="text-yellow-600 opacity-70" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved || 0}</p>
              </div>
              <HiCheckCircle size={32} className="text-green-600 opacity-70" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected || 0}</p>
              </div>
              <HiXCircle size={32} className="text-red-600 opacity-70" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, Aadhaar, or PAN..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === status
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {kycApplications.map((application) => (
                  <tr key={application._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                            <HiUser className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{application.fullName}</div>
                          <div className="text-sm text-gray-500">{application.user?.name} ({application.user?.uniqueId})</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {application.aadhaarDocument && <HiPhoto className="text-green-500" size={16} />}
                        {application.panDocument && <HiDocumentText className="text-blue-500" size={16} />}
                        {application.selfie && <HiUser className="text-purple-500" size={16} />}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowModal(true);
                        }}
                        className="text-emerald-600 hover:text-emerald-900 flex items-center gap-1"
                      >
                        <HiEye size={16} />
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Review Modal */}
        {showModal && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review KYC Application</h2>

                {/* User Info */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div><strong>Name:</strong> {selectedApplication.fullName}</div>
                      <div><strong>Father Name:</strong> {selectedApplication.fatherName}</div>
                      <div><strong>DOB:</strong> {new Date(selectedApplication.dateOfBirth).toLocaleDateString()}</div>
                      <div><strong>Gender:</strong> {selectedApplication.gender}</div>
                      <div><strong>Address:</strong> {selectedApplication.address}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Document Information</h3>
                    <div className="space-y-3">
                      <div><strong>Aadhaar:</strong> {selectedApplication.aadhaarNumber}</div>
                      <div><strong>PAN:</strong> {selectedApplication.panNumber}</div>
                      <div><strong>Submitted:</strong> {new Date(selectedApplication.submittedAt).toLocaleDateString()}</div>
                      <div><strong>User:</strong> {selectedApplication.user?.name} ({selectedApplication.user?.uniqueId})</div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {selectedApplication.aadhaarDocument?.url && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Document</label>
                        <img
                          src={selectedApplication.aadhaarDocument.url}
                          alt="Aadhaar Document"
                          className="w-full h-48 object-cover rounded-lg border cursor-pointer"
                          onClick={() => window.open(selectedApplication.aadhaarDocument.url, '_blank')}
                        />
                      </div>
                    )}

                    {selectedApplication.panDocument?.url && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PAN Document</label>
                        <img
                          src={selectedApplication.panDocument.url}
                          alt="PAN Document"
                          className="w-full h-48 object-cover rounded-lg border cursor-pointer"
                          onClick={() => window.open(selectedApplication.panDocument.url, '_blank')}
                        />
                      </div>
                    )}

                    {selectedApplication.selfie?.url && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Selfie</label>
                        <img
                          src={selectedApplication.selfie.url}
                          alt="Selfie"
                          className="w-full h-48 object-cover rounded-lg border cursor-pointer"
                          onClick={() => window.open(selectedApplication.selfie.url, '_blank')}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Rejection Reason Input (only show if rejecting) */}
                {selectedApplication.status === 'pending' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleReview(selectedApplication._id, 'approved')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <HiCheckCircle size={20} />
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt('Enter rejection reason:');
                        if (reason) handleReview(selectedApplication._id, 'rejected', reason);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <HiXCircle size={20} />
                      Reject
                    </button>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedApplication(null);
                    }}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCAdmin;
