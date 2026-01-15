import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import adminService from '../services/adminService';

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSetting, setSelectedSetting] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await adminService.getSettings();
      setSettings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      setSettings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingUpdate = async (key, updates) => {
    try {
      await adminService.updateSetting(key, updates);
      fetchSettings();
      setSelectedSetting(null);
      alert('Setting updated successfully!');
    } catch (error) {
      alert('Failed to update setting');
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
          <p className="text-gray-600 text-lg">Loading Settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">System Settings</h1>
          <p className="text-lg text-gray-600">Manage application settings</p>
        </div>

        {/* Settings Table */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-700">Key</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Value</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Category</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Description</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {settings.map((setting) => (
                  <tr key={setting._id} className="border-t">

                    {/* Key */}
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{setting.key}</p>
                    </td>

                    {/* Value */}
                    <td className="px-4 py-3">
                      <p className="text-sm">{JSON.stringify(setting.value)}</p>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                        {setting.category}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedSetting(setting)}
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
        {selectedSetting && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Edit Setting: {selectedSetting.key}
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  handleSettingUpdate(selectedSetting.key, {
                    value: fd.get('value'),
                    description: fd.get('description'),
                    category: fd.get('category')
                  });
                }}
                className="space-y-5"
              >

                <div>
                  <label className="text-gray-700 font-medium">Value</label>
                  <input
                    type="text"
                    name="value"
                    defaultValue={JSON.stringify(selectedSetting.value)}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium">Description</label>
                  <input
                    type="text"
                    name="description"
                    defaultValue={selectedSetting.description}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium">Category</label>
                  <select
                    name="category"
                    defaultValue={selectedSetting.category}
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  >
                    <option value="general">General</option>
                    <option value="rewards">Rewards</option>
                    <option value="payments">Payments</option>
                    <option value="notifications">Notifications</option>
                  </select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold"
                  >
                    Update Setting
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSetting(null)}
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

export default Settings;
