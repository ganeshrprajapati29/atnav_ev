import React, { useEffect, useState } from 'react';
import * as kycService from '../services/kycService';
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Search,
  Filter,
  User,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';

const KYCAdmin = () => {
  const [kycApplications, setKycApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    loadData();
  }, [filter, search, page]);

  const loadData = async () => {
    try {
      setLoading(true);

      const statsRes = await kycService.getKYCStats();
      setStats(statsRes);

      const res = await kycService.getAllKYC({
        status: filter === 'all' ? '' : filter,
        search,
        page,
        limit: 10
      });

      setKycApplications(res.kycApplications);
      setPages(res.pagination.pages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const approveOrReject = async (id, status, reason = '') => {
    try {
      await kycService.reviewKYC(id, status, reason);
      setShowModal(false);
      setSelectedApplication(null);
      loadData();
    } catch {
      alert('Failed to update status');
    }
  };

  const getColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle size={14} />;
      case 'rejected': return <XCircle size={14} />;
      case 'pending': return <Clock size={14} />;
      default: return <FileText size={14} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="py-8 px-4">

      <h1 className="text-3xl font-bold mb-4">KYC Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

        <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow">
          <p>Total Applications</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border-l-4 border-yellow-500 shadow">
          <p>Pending</p>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border-l-4 border-green-500 shadow">
          <p>Approved</p>
          <p className="text-3xl font-bold">{stats.approved}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border-l-4 border-red-500 shadow">
          <p>Rejected</p>
          <p className="text-3xl font-bold">{stats.rejected}</p>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4 mb-6">

        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-10 border p-2 rounded"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {['all','pending','approved','rejected'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === f ? 'bg-emerald-600 text-white' : 'bg-gray-100'
            }`}
          >
            {f}
          </button>
        ))}

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Documents</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {kycApplications.map((app) => (
              <tr key={app._id} className="border-t">

                <td className="px-4 py-3 flex items-center gap-3">
                  <User size={22} className="text-emerald-600" />
                  <div>
                    <p className="font-semibold">{app.fullName}</p>
                    <p className="text-sm text-gray-500">
                      {app.user?.name} ({app.user?.uniqueId})
                    </p>
                  </div>
                </td>

                <td className="px-4 py-3 flex items-center gap-2">
                  {app.aadhaarDocument && <ImageIcon size={16} className="text-green-600" />}
                  {app.panDocument && <FileText size={16} className="text-blue-600" />}
                  {app.selfie && <User size={16} className="text-purple-600" />}
                </td>

                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getColor(app.status)}`}>
                    {getIcon(app.status)}
                    {app.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(app.submittedAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => { setSelectedApplication(app); setShowModal(true); }}
                    className="text-emerald-600 flex items-center gap-1"
                  >
                    <Eye size={18} /> Review
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Review KYC Application</h2>
              <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${getColor(selectedApplication.status)}`}>
                {getIcon(selectedApplication.status)}
                {selectedApplication.status}
              </span>
            </div>

            {/* User Information */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="font-medium">{selectedApplication.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Father's Name:</span>
                      <span className="font-medium">{selectedApplication.fatherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date of Birth:</span>
                      <span className="font-medium">{new Date(selectedApplication.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-medium">{selectedApplication.gender}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Identification Numbers</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aadhaar Number:</span>
                      <span className="font-medium font-mono">{selectedApplication.aadhaarNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">PAN Number:</span>
                      <span className="font-medium font-mono">{selectedApplication.panNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Address</h3>
                  <p className="text-gray-700">{selectedApplication.address}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Application Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">User ID:</span>
                      <span className="font-medium">{selectedApplication.user?.uniqueId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">User Name:</span>
                      <span className="font-medium">{selectedApplication.user?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Submitted:</span>
                      <span className="font-medium">{new Date(selectedApplication.submittedAt).toLocaleString()}</span>
                    </div>
                    {selectedApplication.reviewedAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reviewed:</span>
                        <span className="font-medium">{new Date(selectedApplication.reviewedAt).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Submitted Documents</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {selectedApplication.aadhaarDocument && (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ImageIcon size={20} className="text-blue-600" />
                      <span className="font-medium">Aadhaar Document</span>
                    </div>
                    <img
                      src={selectedApplication.aadhaarDocument.url}
                      alt="Aadhaar Document"
                      className="w-full h-32 object-cover rounded cursor-pointer"
                      onClick={() => window.open(selectedApplication.aadhaarDocument.url, '_blank')}
                    />
                  </div>
                )}

                {selectedApplication.panDocument && (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={20} className="text-green-600" />
                      <span className="font-medium">PAN Document</span>
                    </div>
                    <img
                      src={selectedApplication.panDocument.url}
                      alt="PAN Document"
                      className="w-full h-32 object-cover rounded cursor-pointer"
                      onClick={() => window.open(selectedApplication.panDocument.url, '_blank')}
                    />
                  </div>
                )}

                {selectedApplication.selfie && (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User size={20} className="text-purple-600" />
                      <span className="font-medium">Selfie</span>
                    </div>
                    <img
                      src={selectedApplication.selfie.url}
                      alt="Selfie"
                      className="w-full h-32 object-cover rounded cursor-pointer"
                      onClick={() => window.open(selectedApplication.selfie.url, '_blank')}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Rejection Reason */}
            {selectedApplication.status === 'rejected' && selectedApplication.rejectionReason && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-red-800 mb-2">Rejection Reason</h3>
                <p className="text-red-700">{selectedApplication.rejectionReason}</p>
              </div>
            )}

            {/* Approve & Reject */}
            {selectedApplication.status === 'pending' && (
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => approveOrReject(selectedApplication._id, 'approved')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Approve Application
                </button>

                <button
                  onClick={() => {
                    const reason = prompt('Enter rejection reason:');
                    if (reason && reason.trim()) {
                      approveOrReject(selectedApplication._id, 'rejected', reason.trim());
                    }
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <XCircle size={20} />
                  Reject Application
                </button>
              </div>
            )}

            <button
              onClick={() => { setShowModal(false); setSelectedApplication(null); }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
            >
              Close Review
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default KYCAdmin;
