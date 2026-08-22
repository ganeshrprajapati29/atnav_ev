import React, { useState, useEffect } from 'react';
import {
  Edit3, Save, X, Plus, Trash2, Upload, Eye, EyeOff, RotateCcw,
  Shield, Gift, Crown, Building2, PieChart, Smartphone, BadgeCheck,
  QrCode, Wallet, TrendingUp, Zap, Phone, Info, Star, Check, BarChart3,
  Users, Lock, ShieldCheck, Sparkles, FileText, ListChecks, LineChart,
  LayoutGrid, ListOrdered, Megaphone, PhoneCall, Image as ImageIcon,
  Layers
} from 'lucide-react';
import onboardingService from '../services/onboardingService';
import Loader from '../components/Loader';

const blockTypes = [
  { value: 'hero', label: 'Hero', icon: Sparkles },
  { value: 'paragraph', label: 'Paragraph', icon: FileText },
  { value: 'bullets', label: 'Bullets', icon: ListChecks },
  { value: 'chart', label: 'Chart', icon: LineChart },
  { value: 'features', label: 'Features', icon: LayoutGrid },
  { value: 'steps', label: 'Steps', icon: ListOrdered },
  { value: 'promo', label: 'Promo', icon: Megaphone },
  { value: 'callCta', label: 'Call CTA', icon: PhoneCall },
  { value: 'note', label: 'Note', icon: Info },
  { value: 'imageSlider', label: 'Image Slider', icon: ImageIcon }
];

const iconOptions = [
  { value: 'shield', label: 'Shield', icon: Shield },
  { value: 'gift', label: 'Gift', icon: Gift },
  { value: 'premium', label: 'Premium', icon: Crown },
  { value: 'apartment', label: 'Apartment', icon: Building2 },
  { value: 'pie_chart', label: 'Pie Chart', icon: PieChart },
  { value: 'smartphone', label: 'Smartphone', icon: Smartphone },
  { value: 'verified', label: 'Verified', icon: BadgeCheck },
  { value: 'qr_code', label: 'QR Code', icon: QrCode },
  { value: 'upload', label: 'Upload', icon: Upload },
  { value: 'wallet', label: 'Wallet', icon: Wallet },
  { value: 'trending_up', label: 'Trending Up', icon: TrendingUp },
  { value: 'bolt', label: 'Bolt', icon: Zap },
  { value: 'call', label: 'Call', icon: Phone },
  { value: 'info', label: 'Info', icon: Info },
  { value: 'star', label: 'Star', icon: Star },
  { value: 'check', label: 'Check', icon: Check },
  { value: 'chart', label: 'Chart', icon: BarChart3 },
  { value: 'users', label: 'Users', icon: Users },
  { value: 'lock', label: 'Lock', icon: Lock },
  { value: 'security', label: 'Security', icon: ShieldCheck }
];

const cardStyles = ['plain', 'card', 'gradient', 'gold', 'dark'];
const textAligns = ['left', 'center', 'right'];
const fontSizes = ['small', 'medium', 'large'];
const fontWeights = ['normal', 'bold', 'extrabold'];

const usesContent = (type) => ['paragraph', 'bullets', 'note', 'callCta', 'promo'].includes(type);
const usesBenefits = (type) => ['features', 'steps', 'promo'].includes(type);
const usesChart = (type) => type === 'chart';
const usesImages = (type) => type === 'imageSlider';
const usesIcon = (type) => ['hero', 'paragraph', 'callCta'].includes(type);

const typeIcon = (type) => (blockTypes.find((t) => t.value === type)?.icon) || Layers;

const emptyForm = () => ({
  id: '',
  page: 0,
  order: 1,
  type: 'paragraph',
  icon: 'star',
  title: '',
  subtitle: '',
  content: [''],
  benefits: [{ icon: 'star', title: '', description: '' }],
  chartRows: [{ year: '', price: '' }],
  images: [],
  styles: { cardStyle: 'card', textAlign: 'left', fontSize: 'medium', fontWeight: 'normal', textColor: '', backgroundColor: '' },
  isActive: true
});

const OnboardingAdmin = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm());

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const data = await onboardingService.getOnboardingContent();
      setBlocks(Array.isArray(data?.blocks) ? data.blocks : []);
    } catch (error) {
      console.error('Error loading onboarding content:', error);
      alert('Error loading onboarding content: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ ...emptyForm(), order: blocks.length + 1 });
    setFormOpen(true);
  };

  const openEditForm = (block) => {
    setEditingId(block.id);
    setFormData({
      ...emptyForm(),
      ...block,
      content: block.content?.length ? [...block.content] : [''],
      benefits: block.benefits?.length ? block.benefits.map((b) => ({ icon: b.icon || 'star', title: b.title || '', description: b.description || '' })) : [{ icon: 'star', title: '', description: '' }],
      chartRows: block.chartRows?.length ? block.chartRows.map((r) => ({ year: r.year || '', price: r.price ?? '' })) : [{ year: '', price: '' }],
      images: block.images?.length ? [...block.images] : [],
      styles: { cardStyle: 'card', textAlign: 'left', fontSize: 'medium', fontWeight: 'normal', textColor: '', backgroundColor: '', ...(block.styles || {}) }
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const handleField = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));
  const handleStyle = (field, value) => setFormData((prev) => ({ ...prev, styles: { ...prev.styles, [field]: value } }));

  const handleContentChange = (index, value) => {
    const next = [...formData.content];
    next[index] = value;
    handleField('content', next);
  };
  const addContentLine = () => handleField('content', [...formData.content, '']);
  const removeContentLine = (index) => handleField('content', formData.content.filter((_, i) => i !== index));

  const handleBenefitChange = (index, field, value) => {
    const next = [...formData.benefits];
    next[index] = { ...next[index], [field]: value };
    handleField('benefits', next);
  };
  const addBenefit = () => handleField('benefits', [...formData.benefits, { icon: 'star', title: '', description: '' }]);
  const removeBenefit = (index) => handleField('benefits', formData.benefits.filter((_, i) => i !== index));

  const handleChartRowChange = (index, field, value) => {
    const next = [...formData.chartRows];
    next[index] = { ...next[index], [field]: value };
    handleField('chartRows', next);
  };
  const addChartRow = () => handleField('chartRows', [...formData.chartRows, { year: '', price: '' }]);
  const removeChartRow = (index) => handleField('chartRows', formData.chartRows.filter((_, i) => i !== index));

  const removeImage = (index) => handleField('images', formData.images.filter((_, i) => i !== index));

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await onboardingService.uploadImage(file);
      const url = res?.url;
      if (url) handleField('images', [...formData.images, { url, alt: '' }]);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploadingImage(false);
    }
  };

  const buildBody = () => ({
    id: formData.id.trim(),
    page: Number(formData.page) || 0,
    order: Number(formData.order) || blocks.length + 1,
    type: formData.type,
    icon: formData.icon,
    title: formData.title.trim(),
    subtitle: formData.subtitle.trim(),
    content: formData.content.map((c) => c.trim()).filter(Boolean),
    benefits: formData.benefits.filter((b) => b.title.trim()).map((b) => ({ icon: b.icon, title: b.title.trim(), description: (b.description || '').trim() })),
    chartRows: formData.chartRows.filter((r) => `${r.year}`.trim()).map((r) => ({ year: `${r.year}`.trim(), price: Number(r.price) || 0 })),
    images: formData.images.filter((img) => img.url?.trim()),
    styles: {
      cardStyle: formData.styles.cardStyle,
      textAlign: formData.styles.textAlign,
      fontSize: formData.styles.fontSize,
      fontWeight: formData.styles.fontWeight,
      textColor: (formData.styles.textColor || '').trim(),
      backgroundColor: (formData.styles.backgroundColor || '').trim()
    },
    isActive: formData.isActive
  });

  const handleSubmit = async () => {
    const blockId = formData.id.trim();
    if (!blockId) {
      alert('Please enter a Block ID');
      return;
    }
    if (!editingId && blocks.some((b) => b.id === blockId)) {
      alert('A block with this ID already exists');
      return;
    }
    setSaving(true);
    try {
      const body = buildBody();
      if (editingId) {
        await onboardingService.updateBlock(editingId, body);
      } else {
        await onboardingService.updateOnboardingContent([...blocks, body]);
      }
      await loadContent();
      closeForm();
    } catch (error) {
      console.error('Error saving block:', error);
      alert('Error saving block: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (block) => {
    if (!window.confirm(`Delete block "${block.title || block.id}"? This removes it from the onboarding slider.`)) return;
    try {
      const next = blocks.filter((b) => b.id !== block.id);
      await onboardingService.updateOnboardingContent(next);
      await loadContent();
    } catch (error) {
      console.error('Error deleting block:', error);
      alert('Error deleting block: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleToggleActive = async (block) => {
    try {
      await onboardingService.updateBlock(block.id, { isActive: block.isActive === false });
      await loadContent();
    } catch (error) {
      console.error('Error toggling block:', error);
      alert('Error toggling block: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all onboarding content to default? This cannot be undone.')) return;
    try {
      await onboardingService.resetOnboardingContent();
      await loadContent();
      alert('Onboarding content reset to default');
    } catch (error) {
      console.error('Error resetting onboarding content:', error);
      alert('Error resetting content: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  const grouped = blocks.reduce((acc, block) => {
    const page = Number(block.page) || 0;
    (acc[page] = acc[page] || []).push(block);
    return acc;
  }, {});
  const pages = Object.keys(grouped).map(Number).sort((a, b) => a - b);
  pages.forEach((p) => grouped[p].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Onboarding Content Management</h1>
          <p className="text-sm text-gray-500">Control every onboarding slide - text, chart, images and styles</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </button>
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Block
          </button>
        </div>
      </div>

      {/* Slides */}
      {pages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center text-gray-500">
          No onboarding blocks configured yet.
        </div>
      ) : (
        <div className="space-y-8">
          {pages.map((page) => (
            <div key={page}>
              <h2 className="text-sm font-bold text-emerald-700 mb-3">Slide {page + 1}</h2>
              <div className="space-y-3">
                {grouped[page].map((block) => {
                  const Icon = typeIcon(block.type);
                  const active = block.isActive !== false;
                  return (
                    <div key={block.id} className={`bg-white rounded-lg shadow-sm border ${active ? 'border-gray-200' : 'border-gray-300 opacity-70'} p-4`}>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-emerald-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-gray-900 truncate">{block.title || block.id}</h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{block.type}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">Order {block.order ?? '-'}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                              {active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-0.5">ID: {block.id}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleToggleActive(block)}
                            title={active ? 'Hide' : 'Show'}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                          >
                            {active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => openEditForm(block)}
                            title="Edit"
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(block)}
                            title="Delete"
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{editingId ? 'Edit Block' : 'New Block'}</h2>
                <button onClick={closeForm} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Block ID</label>
                  <input
                    type="text"
                    value={formData.id}
                    disabled={!!editingId}
                    onChange={(e) => handleField('id', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                    placeholder="e.g., hero"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Block Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleField('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    {blockTypes.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slide (page)</label>
                  <input
                    type="number"
                    value={formData.page}
                    onChange={(e) => handleField('page', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="0, 1, 2..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order in slide</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => handleField('order', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleField('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <textarea
                  value={formData.subtitle}
                  onChange={(e) => handleField('subtitle', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {usesIcon(formData.type) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => handleField('icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Active</label>
                <button
                  onClick={() => handleField('isActive', !formData.isActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${formData.isActive !== false ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${formData.isActive !== false ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm text-gray-600">{formData.isActive !== false ? 'Active' : 'Inactive'}</span>
              </div>

              {/* Content lines */}
              {usesContent(formData.type) && (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Content lines</label>
                    <button onClick={addContentLine} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">
                      <Plus className="w-4 h-4" /> Add line
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {formData.type === 'callCta'
                      ? 'Line 1: phone number, e.g. 9953701057'
                      : formData.type === 'promo'
                      ? 'Line 1: big number, 2: left chip, 3: right chip, 4: tagline, 5: footnote'
                      : 'One line per paragraph / bullet point'}
                  </p>
                  {formData.content.map((line, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <textarea
                        value={line}
                        onChange={(e) => handleContentChange(i, e.target.value)}
                        rows={2}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder={`Line ${i + 1}`}
                      />
                      <button
                        onClick={() => removeContentLine(i)}
                        disabled={formData.content.length === 1}
                        className="p-2 text-red-500 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Benefits / Steps */}
              {usesBenefits(formData.type) && (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      {formData.type === 'steps' ? 'Steps' : 'Feature tiles'}
                    </label>
                    <button onClick={addBenefit} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">
                      <Plus className="w-4 h-4" /> Add item
                    </button>
                  </div>
                  {formData.benefits.map((b, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3 mb-2 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={b.icon}
                          onChange={(e) => handleBenefitChange(i, 'icon', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          {iconOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeBenefit(i)}
                          disabled={formData.benefits.length === 1}
                          className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        value={b.title}
                        onChange={(e) => handleBenefitChange(i, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={b.description}
                        onChange={(e) => handleBenefitChange(i, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Description (optional)"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Chart rows */}
              {usesChart(formData.type) && (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Chart rows</label>
                    <button onClick={addChartRow} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">
                      <Plus className="w-4 h-4" /> Add row
                    </button>
                  </div>
                  {formData.chartRows.map((r, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={r.year}
                        onChange={(e) => handleChartRowChange(i, 'year', e.target.value)}
                        className="flex-[3] px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Year label"
                      />
                      <input
                        type="number"
                        value={r.price}
                        onChange={(e) => handleChartRowChange(i, 'price', e.target.value)}
                        className="flex-[2] px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Price ₹"
                      />
                      <button
                        onClick={() => removeChartRow(i)}
                        disabled={formData.chartRows.length === 1}
                        className="p-2 text-red-500 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Images */}
              {usesImages(formData.type) && (
                <div className="border-t pt-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Slider images</label>
                  {formData.images.map((img, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2 border border-gray-200 rounded-lg p-2">
                      <img src={img.url} alt={img.alt || ''} className="w-12 h-12 rounded object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                      <span className="flex-1 text-xs text-gray-600 truncate">{img.url}</span>
                      <button onClick={() => removeImage(i)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer text-sm">
                    <Upload className="w-4 h-4" />
                    {uploadingImage ? 'Uploading...' : 'Upload image'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                  </label>
                </div>
              )}

              {/* Styles */}
              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Stylish effect</label>
                <p className="text-xs text-gray-500 mb-2">Controls how this block looks on the onboarding slider</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Card style</label>
                    <select
                      value={formData.styles.cardStyle}
                      onChange={(e) => handleStyle('cardStyle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {cardStyles.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Text align</label>
                    <select
                      value={formData.styles.textAlign}
                      onChange={(e) => handleStyle('textAlign', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {textAligns.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Font size</label>
                    <select
                      value={formData.styles.fontSize}
                      onChange={(e) => handleStyle('fontSize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {fontSizes.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Font weight</label>
                    <select
                      value={formData.styles.fontWeight}
                      onChange={(e) => handleStyle('fontWeight', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {fontWeights.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Text color (hex, optional)</label>
                    <input
                      type="text"
                      value={formData.styles.textColor}
                      onChange={(e) => handleStyle('textColor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="#FFFFFF"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Background (hex, optional)</label>
                    <input
                      type="text"
                      value={formData.styles.backgroundColor}
                      onChange={(e) => handleStyle('backgroundColor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="#087F5B"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button onClick={closeForm} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : editingId ? 'Save block' : 'Create block'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingAdmin;
