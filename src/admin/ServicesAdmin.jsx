import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import * as serviceService from '../services/serviceService';

const ServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pointsRequired: '',
    status: 'active',
    image: '',
    category: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceService.getServices();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await serviceService.updateService(editingService._id, formData);
        alert('Service updated successfully!');
      } else {
        await serviceService.createService(formData);
        alert('Service created successfully!');
      }
      fetchServices();
      resetForm();
    } catch (error) {
      alert('Failed to save service');
    }
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await serviceService.deleteService(serviceId);
      alert('Service deleted successfully!');
      fetchServices();
    } catch (error) {
      alert('Failed to delete service');
    }
  };

  const handleToggleStatus = async (serviceId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await serviceService.updateService(serviceId, { status: newStatus });
      fetchServices();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      pointsRequired: '',
      status: 'active',
      image: '',
      category: ''
    });
    setEditingService(null);
    setShowForm(false);
  };

  const startEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      pointsRequired: service.pointsRequired,
      status: service.status,
      image: service.image || '',
      category: service.category || ''
    });
    setEditingService(service);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg">Loading Services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Service Management</h1>
            <p className="text-lg text-gray-600">Create & manage redeemable services</p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md font-semibold transition flex items-center"
          >
            <span className="text-xl mr-2">+</span> Add Service
          </button>
        </div>

        {/* Services List */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-700">Service</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Points Required</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Category</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id} className="border-t">
                    <td className="px-4 py-3">
                      <p className="font-semibold">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </td>

                    <td className="px-4 py-3 font-semibold">{service.pointsRequired}</td>

                    <td className="px-4 py-3">{service.category || 'N/A'}</td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          service.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex space-x-3 text-lg">
                        <button
                          onClick={() => startEdit(service)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleToggleStatus(service._id, service.status)}
                          className={
                            service.status === 'active'
                              ? 'text-yellow-600 hover:text-yellow-800'
                              : 'text-green-600 hover:text-green-800'
                          }
                        >
                          {service.status === 'active' ? <FaToggleOff /> : <FaToggleOn />}
                        </button>

                        <button
                          onClick={() => handleDelete(service._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label className="text-gray-700 font-medium">Service Name</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>
                </div>

                <div>
                  <label className="text-gray-700 font-medium">Points Required</label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                    value={formData.pointsRequired}
                    onChange={(e) =>
                      setFormData({ ...formData, pointsRequired: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium">Category</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium">Image URL</label>
                  <input
                    type="url"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium">Status</label>
                  <select
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold"
                  >
                    {editingService ? 'Update Service' : 'Create Service'}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
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

export default ServicesAdmin;
