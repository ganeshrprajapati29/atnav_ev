import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';
import { Pencil, Loader2 } from 'lucide-react';

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

  const handleUpdate = async (key, updates) => {
    try {
      await adminService.updateSetting(key, updates);
      fetchSettings();
      setSelectedSetting(null);
      alert('Setting updated!');
    } catch {
      alert('Update failed');
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-10">

      <h1 className="text-4xl font-bold mb-6">System Settings</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">

        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3">Key</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {settings.map((s) => (
              <tr key={s._id} className="border-t">

                <td className="px-4 py-3 font-semibold">{s.key}</td>

                <td className="px-4 py-3 text-sm">{JSON.stringify(s.value)}</td>

                <td className="px-4 py-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {s.category}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm">{s.description}</td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedSetting(s)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={20} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Edit Modal */}
      {selectedSetting && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">

            <h2 className="text-2xl font-bold mb-4">Edit: {selectedSetting.key}</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                handleUpdate(selectedSetting.key, {
                  value: fd.get('value'),
                  description: fd.get('description'),
                  category: fd.get('category')
                });
              }}
              className="space-y-4"
            >

              <div>
                <label>Value</label>
                <input
                  type="text"
                  name="value"
                  defaultValue={JSON.stringify(selectedSetting.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  defaultValue={selectedSetting.description}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label>Category</label>
                <select
                  name="category"
                  defaultValue={selectedSetting.category}
                  className="w-full border p-2 rounded"
                >
                  <option value="general">General</option>
                  <option value="rewards">Rewards</option>
                  <option value="payments">Payments</option>
                  <option value="notifications">Notifications</option>
                </select>
              </div>

              <div className="flex gap-4 mt-6">
                <button className="flex-1 bg-emerald-600 text-white py-2 rounded">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSetting(null)}
                  className="flex-1 bg-gray-200 py-2 rounded"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;
