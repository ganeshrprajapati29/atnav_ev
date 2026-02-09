import React, { useState, useEffect, useContext } from 'react';
import { 
  Edit3, Save, X, Plus, Trash2, Image, Type, 
  ChevronUp, ChevronDown, Eye, EyeOff, Upload,
  TrendingUp, Shield, Award, Building, Coins,
  Users, Zap, QrCode, UserPlus, Wallet
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import homeService from '../services/homeService';
import Loader from '../components/Loader';

// Icon options for selection
const iconOptions = [
  { value: 'coins', label: 'Coins', icon: Coins },
  { value: 'trending-up', label: 'Trending Up', icon: TrendingUp },
  { value: 'shield', label: 'Shield', icon: Shield },
  { value: 'award', label: 'Award', icon: Award },
  { value: 'building', label: 'Building', icon: Building },
  { value: 'wallet', label: 'Wallet', icon: Wallet },
  { value: 'zap', label: 'Zap', icon: Zap },
  { value: 'qrcode', label: 'QR Code', icon: QrCode },
  { value: 'user-plus', label: 'User Plus', icon: UserPlus },
  { value: 'users', label: 'Users', icon: Users }
];

// Color options
const colorOptions = [
  { value: 'green', label: 'Green', color: 'bg-emerald-500' },
  { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
  { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
  { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
  { value: 'cyan', label: 'Cyan', color: 'bg-cyan-500' },
  { value: 'pink', label: 'Pink', color: 'bg-pink-500' },
  { value: 'gray', label: 'Gray', color: 'bg-gray-500' },
  { value: 'amber', label: 'Amber', color: 'bg-amber-500' }
];

const HomeAdmin = () => {
  const { updateHomeContent } = useContext(AppContext);
  const [homeContent, setHomeContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [addingSection, setAddingSection] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [newSectionData, setNewSectionData] = useState({
    id: '',
    type: 'hero',
    title: '',
    subtitle: '',
    content: [],
    images: [],
    styles: {},
    stats: [],
    benefits: [],
    steps: [],
    tiers: [],
    sharePriceData: [],
    order: 0,
    isActive: true
  });

  useEffect(() => {
    loadHomeContent();
  }, []);

  const loadHomeContent = async () => {
    try {
      const data = await homeService.getHomeContent();
      // Sort sections by order
      const sortedSections = data.sections.sort((a, b) => a.order - b.order);
      setHomeContent({ ...data, sections: sortedSections });
    } catch (error) {
      console.error('Error loading home content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSection = (section) => {
    setEditingSection(section.id);
    setEditedData({ ...section });
    setActiveTab('general');
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setEditedData({});
  };

  const handleSaveSection = async () => {
    try {
      setSaving(true);
      
      // Clean the data based on section type
      const cleanedData = cleanSectionData(editedData);
      
      // Update the section in homeContent
      const updatedSections = homeContent.sections.map(section =>
        section.id === editingSection ? cleanedData : section
      );
      
      await updateHomeContent({ sections: updatedSections });
      await loadHomeContent();
      setEditingSection(null);
      setEditedData({});
      
      alert('Section updated successfully!');
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Error saving: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const cleanSectionData = (data) => {
    const baseClean = {
      ...data,
      content: data.content?.filter(c => c.trim() !== '') || [],
      images: data.images?.filter(img => img.url.trim() !== '') || [],
    };

    // Type-specific cleaning
    switch (data.type) {
      case 'hero':
        return {
          ...baseClean,
          stats: data.stats?.filter(stat => stat.title || stat.description) || []
        };
      case 'features':
        return {
          ...baseClean,
          benefits: data.benefits?.filter(benefit => benefit.title || benefit.description) || []
        };
      case 'how-it-works':
        return {
          ...baseClean,
          steps: data.steps?.filter(step => step.title || step.description) || []
        };
      case 'tiers':
        return {
          ...baseClean,
          tiers: data.tiers?.filter(tier => tier.name) || []
        };
      case 'share-price':
        return {
          ...baseClean,
          sharePriceData: data.sharePriceData?.filter(item => item.date) || []
        };
      default:
        return baseClean;
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      try {
        const updatedSections = homeContent.sections.filter(s => s.id !== sectionId);
        await updateHomeContent({ sections: updatedSections });
        await loadHomeContent();
        if (editingSection === sectionId) {
          setEditingSection(null);
          setEditedData({});
        }
      } catch (error) {
        console.error('Error deleting section:', error);
        alert('Error deleting section: ' + error.message);
      }
    }
  };

  const handleToggleActive = async (sectionId) => {
    try {
      const updatedSections = homeContent.sections.map(section => 
        section.id === sectionId 
          ? { ...section, isActive: !section.isActive }
          : section
      );
      await updateHomeContent({ sections: updatedSections });
      await loadHomeContent();
    } catch (error) {
      console.error('Error toggling section:', error);
    }
  };

  const handleMoveSection = async (sectionId, direction) => {
    const sections = [...homeContent.sections];
    const index = sections.findIndex(s => s.id === sectionId);
    
    if (direction === 'up' && index > 0) {
      [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
    }
    
    // Update order numbers
    const updatedSections = sections.map((section, idx) => ({
      ...section,
      order: idx
    }));
    
    try {
      await updateHomeContent({ sections: updatedSections });
      await loadHomeContent();
    } catch (error) {
      console.error('Error moving section:', error);
    }
  };

  const handleSaveNewSection = async () => {
    try {
      setSaving(true);
      
      // Generate unique ID if not provided
      const sectionId = newSectionData.id || `section-${Date.now()}`;
      const order = homeContent.sections.length;
      
      const newSection = {
        ...newSectionData,
        id: sectionId,
        order,
        ...cleanSectionData(newSectionData)
      };
      
      const updatedSections = [...homeContent.sections, newSection];
      await updateHomeContent({ sections: updatedSections });
      await loadHomeContent();
      
      setAddingSection(false);
      setNewSectionData({
        id: '',
        type: 'hero',
        title: '',
        subtitle: '',
        content: [],
        images: [],
        styles: {},
        stats: [],
        benefits: [],
        steps: [],
        tiers: [],
        sharePriceData: [],
        order: 0,
        isActive: true
      });
      
      alert('New section added successfully!');
    } catch (error) {
      console.error('Error adding section:', error);
      alert('Error adding section: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Input handlers
  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStyleChange = (styleField, value) => {
    setEditedData(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        [styleField]: value
      }
    }));
  };

  const handleContentChange = (index, value) => {
    const newContent = [...(editedData.content || [])];
    newContent[index] = value;
    setEditedData(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const addContentItem = () => {
    setEditedData(prev => ({
      ...prev,
      content: [...(prev.content || []), '']
    }));
  };

  const removeContentItem = (index) => {
    const newContent = (editedData.content || []).filter((_, i) => i !== index);
    setEditedData(prev => ({
      ...prev,
      content: newContent
    }));
  };

  // Stats handlers (for hero section)
  const handleStatChange = (index, field, value) => {
    const newStats = [...(editedData.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    setEditedData(prev => ({
      ...prev,
      stats: newStats
    }));
  };

  const addStat = () => {
    setEditedData(prev => ({
      ...prev,
      stats: [...(prev.stats || []), { title: '', description: '', icon: 'coins' }]
    }));
  };

  const removeStat = (index) => {
    const newStats = (editedData.stats || []).filter((_, i) => i !== index);
    setEditedData(prev => ({
      ...prev,
      stats: newStats
    }));
  };

  // Benefits handlers (for features section)
  const handleBenefitChange = (index, field, value) => {
    const newBenefits = [...(editedData.benefits || [])];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setEditedData(prev => ({
      ...prev,
      benefits: newBenefits
    }));
  };

  const addBenefit = () => {
    setEditedData(prev => ({
      ...prev,
      benefits: [...(prev.benefits || []), { 
        title: '', 
        description: '', 
        icon: 'trending-up', 
        color: 'green' 
      }]
    }));
  };

  const removeBenefit = (index) => {
    const newBenefits = (editedData.benefits || []).filter((_, i) => i !== index);
    setEditedData(prev => ({
      ...prev,
      benefits: newBenefits
    }));
  };

  // Steps handlers (for how-it-works section)
  const handleStepChange = (index, field, value) => {
    const newSteps = [...(editedData.steps || [])];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setEditedData(prev => ({
      ...prev,
      steps: newSteps
    }));
  };

  const addStep = () => {
    const currentSteps = editedData.steps || [];
    setEditedData(prev => ({
      ...prev,
      steps: [...currentSteps, { 
        number: currentSteps.length + 1, 
        title: '', 
        description: '' 
      }]
    }));
  };

  const removeStep = (index) => {
    const newSteps = (editedData.steps || []).filter((_, i) => i !== index);
    // Renumber steps
    const renumberedSteps = newSteps.map((step, idx) => ({
      ...step,
      number: idx + 1
    }));
    setEditedData(prev => ({
      ...prev,
      steps: renumberedSteps
    }));
  };

  // Tiers handlers
  const handleTierChange = (index, field, value) => {
    const newTiers = [...(editedData.tiers || [])];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setEditedData(prev => ({
      ...prev,
      tiers: newTiers
    }));
  };

  const addTier = () => {
    setEditedData(prev => ({
      ...prev,
      tiers: [...(prev.tiers || []), { 
        name: '', 
        coinRange: '', 
        description: '', 
        features: [], 
        price: 0, 
        color: 'gray', 
        icon: 'shield' 
      }]
    }));
  };

  const removeTier = (index) => {
    const newTiers = (editedData.tiers || []).filter((_, i) => i !== index);
    setEditedData(prev => ({
      ...prev,
      tiers: newTiers
    }));
  };

  // Tier feature handlers
  const handleTierFeatureChange = (tierIndex, featIndex, value) => {
    const newTiers = [...(editedData.tiers || [])];
    newTiers[tierIndex].features[featIndex] = value;
    setEditedData(prev => ({
      ...prev,
      tiers: newTiers
    }));
  };

  const addTierFeature = (tierIndex) => {
    const newTiers = [...(editedData.tiers || [])];
    newTiers[tierIndex].features = [...(newTiers[tierIndex].features || []), ''];
    setEditedData(prev => ({
      ...prev,
      tiers: newTiers
    }));
  };

  const removeTierFeature = (tierIndex, featIndex) => {
    const newTiers = [...(editedData.tiers || [])];
    newTiers[tierIndex].features = newTiers[tierIndex].features.filter((_, i) => i !== featIndex);
    setEditedData(prev => ({
      ...prev,
      tiers: newTiers
    }));
  };

  // Share price data handlers
  const handleSharePriceChange = (index, field, value) => {
    const newData = [...(editedData.sharePriceData || [])];
    newData[index] = { ...newData[index], [field]: field === 'price' ? Number(value) : value };
    setEditedData(prev => ({
      ...prev,
      sharePriceData: newData
    }));
  };

  const addSharePriceRow = () => {
    const currentData = editedData.sharePriceData || [];
    setEditedData(prev => ({
      ...prev,
      sharePriceData: [...currentData, { 
        srNo: currentData.length, 
        date: '', 
        price: 0 
      }]
    }));
  };

  const removeSharePriceRow = (index) => {
    const newData = (editedData.sharePriceData || []).filter((_, i) => i !== index);
    // Resequence srNo
    const resequencedData = newData.map((item, idx) => ({
      ...item,
      srNo: idx
    }));
    setEditedData(prev => ({
      ...prev,
      sharePriceData: resequencedData
    }));
  };

  // Reset to default content
  const handleResetContent = async () => {
    if (window.confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
      try {
        await homeService.resetHomeContent();
        await loadHomeContent();
        alert('Content reset to default successfully!');
      } catch (error) {
        console.error('Error resetting content:', error);
        alert('Error resetting content: ' + error.message);
      }
    }
  };

  // Render edit form based on section type
  const renderEditForm = () => {
    if (!editedData.type) return null;

    return (
      <div className="space-y-6">
        {/* Section Type and ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Type</label>
            <input
              type="text"
              value={editedData.type}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section ID</label>
            <input
              type="text"
              value={editedData.id}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'general' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              General
            </button>
            {editedData.type === 'hero' && (
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'stats' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Stats
              </button>
            )}
            {editedData.type === 'features' && (
              <button
                onClick={() => setActiveTab('benefits')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'benefits' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Benefits
              </button>
            )}
            {editedData.type === 'how-it-works' && (
              <button
                onClick={() => setActiveTab('steps')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'steps' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Steps
              </button>
            )}
            {editedData.type === 'tiers' && (
              <button
                onClick={() => setActiveTab('tiers')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'tiers' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Tiers
              </button>
            )}
            {editedData.type === 'share-price' && (
              <button
                onClick={() => setActiveTab('prices')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'prices' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Price Data
              </button>
            )}
            <button
              onClick={() => setActiveTab('styles')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'styles' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Styles
            </button>
          </nav>
        </div>

        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <textarea
                value={editedData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Section title (use new line for subtitle in hero section)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={editedData.subtitle || ''}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Content Array */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Content Paragraphs</label>
                <button
                  onClick={addContentItem}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Paragraph
                </button>
              </div>
              {editedData.content?.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <textarea
                    value={item}
                    onChange={(e) => handleContentChange(index, e.target.value)}
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter content paragraph..."
                  />
                  <button
                    onClick={() => removeContentItem(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Active Toggle */}
            <div className="flex items-center gap-3">
              <label className="block text-sm font-medium text-gray-700">Section Active</label>
              <button
                onClick={() => handleInputChange('isActive', !editedData.isActive)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${editedData.isActive !== false ? 'bg-emerald-500' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${editedData.isActive !== false ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className="text-sm text-gray-600">
                {editedData.isActive !== false ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        )}

        {/* Stats Tab (for hero) */}
        {activeTab === 'stats' && editedData.type === 'hero' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Stats Cards</label>
              <button
                onClick={addStat}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
                Add Stat
              </button>
            </div>
            {editedData.stats?.map((stat, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                    <input
                      type="text"
                      value={stat.title || ''}
                      onChange={(e) => handleStatChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., 100% Secure"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                    <input
                      type="text"
                      value={stat.description || ''}
                      onChange={(e) => handleStatChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., Encrypted Coin Transfers"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Icon</label>
                    <select
                      value={stat.icon || 'coins'}
                      onChange={(e) => handleStatChange(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {iconOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => removeStat(index)}
                    className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits Tab (for features) */}
        {activeTab === 'benefits' && editedData.type === 'features' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Benefits Cards</label>
              <button
                onClick={addBenefit}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
                Add Benefit
              </button>
            </div>
            {editedData.benefits?.map((benefit, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                    <input
                      type="text"
                      value={benefit.title || ''}
                      onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., Guaranteed Return Program"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Icon</label>
                    <select
                      value={benefit.icon || 'trending-up'}
                      onChange={(e) => handleBenefitChange(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {iconOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                  <textarea
                    value={benefit.description || ''}
                    onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Description of the benefit..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Color Theme</label>
                    <select
                      value={benefit.color || 'green'}
                      onChange={(e) => handleBenefitChange(index, 'color', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {colorOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      onClick={() => removeBenefit(index)}
                      className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded"
                    >
                      Remove Benefit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Steps Tab (for how-it-works) */}
        {activeTab === 'steps' && editedData.type === 'how-it-works' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Steps</label>
              <button
                onClick={addStep}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>
            {editedData.steps?.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Step #</label>
                    <input
                      type="number"
                      value={step.number || index + 1}
                      onChange={(e) => handleStepChange(index, 'number', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      min="1"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                    <input
                      type="text"
                      value={step.title || ''}
                      onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., Sign Up"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                  <textarea
                    value={step.description || ''}
                    onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Description of this step..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => removeStep(index)}
                    className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded"
                  >
                    Remove Step
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tiers Tab */}
        {activeTab === 'tiers' && editedData.type === 'tiers' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Membership Tiers</label>
              <button
                onClick={addTier}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
                Add Tier
              </button>
            </div>
            {editedData.tiers?.map((tier, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Tier Name</label>
                    <input
                      type="text"
                      value={tier.name || ''}
                      onChange={(e) => handleTierChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., Silver Tier"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Coin Range</label>
                    <input
                      type="text"
                      value={tier.coinRange || ''}
                      onChange={(e) => handleTierChange(index, 'coinRange', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., 10-99 Coins"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={tier.price || ''}
                      onChange={(e) => handleTierChange(index, 'price', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., 100"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Icon</label>
                    <select
                      value={tier.icon || 'shield'}
                      onChange={(e) => handleTierChange(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {iconOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Color</label>
                    <select
                      value={tier.color || 'gray'}
                      onChange={(e) => handleTierChange(index, 'color', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {colorOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                  <textarea
                    value={tier.description || ''}
                    onChange={(e) => handleTierChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Description of this tier..."
                  />
                </div>
                
                {/* Features */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Features</label>
                    <button
                      onClick={() => addTierFeature(index)}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                    >
                      <Plus className="w-3 h-3" />
                      Add Feature
                    </button>
                  </div>
                  {tier.features?.map((feature, featIndex) => (
                    <div key={featIndex} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleTierFeatureChange(index, featIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="e.g., Buy 10 Atvan Coins at ₹10 each"
                      />
                      <button
                        onClick={() => removeTierFeature(index, featIndex)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => removeTier(index)}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded"
                  >
                    Remove Tier
                  </button>
                  {index === 1 && (
                    <span className="text-sm text-amber-600 font-medium">(This tier will be marked as "Most Popular")</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Share Price Data Tab */}
        {activeTab === 'prices' && editedData.type === 'share-price' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Share Price Data</label>
              <button
                onClick={addSharePriceRow}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
                Add Row
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">Sr. No.</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">Price (₹)</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {editedData.sharePriceData?.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        <input
                          type="number"
                          value={row.srNo}
                          onChange={(e) => handleSharePriceChange(index, 'srNo', parseInt(e.target.value))}
                          className="w-full px-2 py-1 border rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={row.date}
                          onChange={(e) => handleSharePriceChange(index, 'date', e.target.value)}
                          className="w-full px-2 py-1 border rounded text-sm"
                          placeholder="e.g., 1-Jan-26"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="number"
                          value={row.price}
                          onChange={(e) => handleSharePriceChange(index, 'price', parseFloat(e.target.value))}
                          className="w-full px-2 py-1 border rounded text-sm"
                          placeholder="e.g., 10"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => removeSharePriceRow(index)}
                          className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Styles Tab */}
        {activeTab === 'styles' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Styles</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Background Color</label>
                <input
                  type="text"
                  placeholder="#ffffff"
                  value={editedData.styles?.backgroundColor || ''}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Text Color</label>
                <input
                  type="text"
                  placeholder="#000000"
                  value={editedData.styles?.textColor || ''}
                  onChange={(e) => handleStyleChange('textColor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Font Size</label>
                <input
                  type="text"
                  placeholder="16px"
                  value={editedData.styles?.fontSize || ''}
                  onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Text Align</label>
                <select
                  value={editedData.styles?.textAlign || 'left'}
                  onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button
            onClick={handleCancelEdit}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveSection}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? <Loader /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Home Content Management</h1>
          <p className="text-sm text-gray-500">
            Manage all sections of your home page dynamically
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleResetContent}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Reset to Default
          </button>
          <button
            onClick={() => setAddingSection(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Section
          </button>
        </div>
      </div>

      {/* Add New Section Modal */}
      {addingSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Add New Section</h2>
                <button
                  onClick={() => setAddingSection(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Type</label>
                  <select
                    value={newSectionData.type}
                    onChange={(e) => setNewSectionData({...newSectionData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="hero">Hero Banner</option>
                    <option value="about">About Section</option>
                    <option value="features">Features/Benefits</option>
                    <option value="how-it-works">How It Works</option>
                    <option value="tiers">Membership Tiers</option>
                    <option value="share-price">Share Price Chart</option>
                    <option value="cta">Call to Action</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section ID (Unique)</label>
                  <input
                    type="text"
                    value={newSectionData.id}
                    onChange={(e) => setNewSectionData({...newSectionData, id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., hero-section"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newSectionData.title}
                    onChange={(e) => setNewSectionData({...newSectionData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Section title"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setAddingSection(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewSection}
                  disabled={saving}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                >
                  {saving ? 'Adding...' : 'Add Section'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sections List */}
      <div className="space-y-4">
        {homeContent?.sections?.map((section, index) => (
          <div key={section.id} className={`bg-white rounded-lg shadow-sm border ${section.isActive !== false ? 'border-gray-200' : 'border-gray-300'} ${!section.isActive && 'opacity-70'}`}>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${section.isActive !== false ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {section.type.replace(/-/g, ' ')}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        Order: {section.order}
                      </span>
                      {!section.isActive && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">ID: {section.id}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleMoveSection(section.id, 'up')}
                      disabled={index === 0}
                      className={`p-2 ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveSection(section.id, 'down')}
                      disabled={index === homeContent.sections.length - 1}
                      className={`p-2 ${index === homeContent.sections.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleToggleActive(section.id)}
                    className="flex items-center gap-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {section.isActive !== false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span className="text-sm">{section.isActive !== false ? 'Hide' : 'Show'}</span>
                  </button>
                  
                  <button
                    onClick={() => handleEditSection(section)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>

              {editingSection === section.id ? (
                renderEditForm()
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Title</p>
                      <p className="text-gray-800 truncate">{section.title || 'No title'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Subtitle</p>
                      <p className="text-gray-800 truncate">{section.subtitle || 'No subtitle'}</p>
                    </div>
                  </div>
                  
                  {/* Section-specific preview */}
                  {section.type === 'hero' && section.stats && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Stats</p>
                      <div className="flex flex-wrap gap-2">
                        {section.stats.map((stat, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                            {stat.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {section.type === 'features' && section.benefits && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Benefits</p>
                      <p className="text-gray-700 text-sm">
                        {section.benefits.length} benefit(s) configured
                      </p>
                    </div>
                  )}
                  
                  {section.type === 'how-it-works' && section.steps && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Steps</p>
                      <p className="text-gray-700 text-sm">
                        {section.steps.length} step(s) configured
                      </p>
                    </div>
                  )}
                  
                  {section.type === 'tiers' && section.tiers && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Tiers</p>
                      <div className="flex flex-wrap gap-2">
                        {section.tiers.map((tier, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                            {tier.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {section.type === 'share-price' && section.sharePriceData && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Price Data</p>
                      <p className="text-gray-700 text-sm">
                        {section.sharePriceData.length} price entry(s)
                      </p>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <button
                      onClick={() => handleDeleteSection(section.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete Section
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAdmin;