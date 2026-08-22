import React, { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw, Save, Smartphone, Wrench } from 'lucide-react';
import adminService from '../services/adminService';

const defaults = {
  maintenanceMode: false,
  maintenanceTitle: 'App under maintenance',
  maintenanceMessage: 'We are improving ATVAN Coin. Please check back shortly.',
  maintenanceImageUrl: '',
  supportPhone: '9953701057'
};

const AppMaintenanceAdmin = () => {
  const [form, setForm] = useState(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAppConfig();
      setForm({ ...defaults, ...(data || {}) });
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Failed to load app maintenance config');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setMessage('');
  };

  const save = async () => {
    try {
      setSaving(true);
      await adminService.updateAppMaintenance(form);
      setMessage('App maintenance settings saved successfully.');
      await load();
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Failed to save maintenance settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">App Maintenance Mode</h1>
          <p className="text-sm text-gray-500">Controls only the mobile app maintenance screen.</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {message && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      <div className={`rounded-lg border p-4 ${form.maintenanceMode ? 'border-amber-300 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}>
        <div className="flex items-start gap-3">
          {form.maintenanceMode ? (
            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
          ) : (
            <Smartphone className="mt-0.5 h-5 w-5 text-emerald-600" />
          )}
          <div>
            <p className="font-semibold text-gray-900">
              Current status: {form.maintenanceMode ? 'Maintenance ON' : 'App Live'}
            </p>
            <p className="text-sm text-gray-600">
              Website stays live. The app checks this config on splash/startup.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <label className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4">
            <span>
              <span className="block font-semibold text-gray-900">Enable maintenance mode</span>
              <span className="text-sm text-gray-500">Turn this on to block the app with a maintenance message.</span>
            </span>
            <button
              type="button"
              onClick={() => update('maintenanceMode', !form.maintenanceMode)}
              className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition ${form.maintenanceMode ? 'bg-amber-500' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-white transition ${form.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </label>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
            <input
              value={form.maintenanceTitle}
              onChange={(e) => update('maintenanceTitle', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={form.maintenanceMessage}
              onChange={(e) => update('maintenanceMessage', e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
              <input
                value={form.maintenanceImageUrl}
                onChange={(e) => update('maintenanceImageUrl', e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Support phone</label>
              <input
                value={form.supportPhone}
                onChange={(e) => update('supportPhone', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Wrench className="h-4 w-4" />
            App Preview
          </div>
          <div className="rounded-[28px] border-8 border-gray-900 bg-[#FAF9F5] p-5 shadow-xl">
            {form.maintenanceImageUrl ? (
              <img src={form.maintenanceImageUrl} alt="" className="mx-auto mb-5 h-28 w-28 rounded-2xl object-cover" />
            ) : (
              <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Wrench className="h-10 w-10" />
              </div>
            )}
            <h2 className="text-center text-xl font-black text-emerald-900">{form.maintenanceTitle}</h2>
            <p className="mt-3 text-center text-sm leading-6 text-gray-600">{form.maintenanceMessage}</p>
            {form.supportPhone && (
              <div className="mt-5 rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-bold text-white">
                Call {form.supportPhone}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppMaintenanceAdmin;
