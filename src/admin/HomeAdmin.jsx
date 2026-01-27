import React, { useState, useEffect, useContext } from 'react';
import { Edit3, Save, X, Plus, Trash2, Image, Type } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import homeService from '../services/homeService';
import Loader from '../components/Loader';

const HomeAdmin = () => {
  const { updateHomeContent } = useContext(AppContext);
  const [homeContent, setHomeContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionData, setNewSectionData] = useState({
    id: '',
    type: 'hero',
    title: '',
    subtitle: '',
    content: [],
    images: [],
    styles: {}
  });

  useEffect(() => {
    loadHomeContent();
  }, []);

  const loadHomeContent = async () => {
    try {
      const data = await homeService.getHomeContent();
      setHomeContent(data);
    } catch (error) {
      console.error('Error loading home content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSection = (section) => {
    setEditingSection(section.id);
    setEditedData({ ...section });
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setEditedData({});
  };

  const handleSaveSection = async () => {
    try {
      setSaving(true);
      // Clean the data: remove empty content and images
      const cleanedData = {
        ...editedData,
        content: editedData.content.filter(c => c.trim() !== ''),
        images: editedData.images.filter(img => img.url.trim() !== '')
      };
      // Update the section in homeContent
      const updatedSections = homeContent.sections.map(section =>
        section.id === editingSection ? cleanedData : section
      );
      await updateHomeContent({ sections: updatedSections });
      await loadHomeContent(); // Reload local state
      setEditingSection(null);
      setEditedData({});
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Error saving: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async () => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      const updatedSections = homeContent.sections.filter(s => s.id !== editingSection);
      await updateHomeContent({ sections: updatedSections });
      await loadHomeContent(); // Reload local state
      setEditingSection(null);
      setEditedData({});
    }
  };

  const handleSaveNewSection = async () => {
    const cleanedData = {
      ...newSectionData,
      content: newSectionData.content.filter(c => c.trim() !== ''),
      images: newSectionData.images.filter(img => img.url.trim() !== '')
    };
    const updatedSections = [...homeContent.sections, cleanedData];
    await updateHomeContent({ sections: updatedSections });
    await loadHomeContent(); // Reload local state
    setAddingSection(false);
    setNewSectionData({
      id: '',
      type: 'hero',
      title: '',
      subtitle: '',
      content: [],
      images: [],
      styles: {}
    });
  };

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
    const newContent = [...editedData.content];
    newContent[index] = value;
    setEditedData(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const addContentItem = () => {
    setEditedData(prev => ({
      ...prev,
      content: [...prev.content, '']
    }));
  };

  const removeContentItem = (index) => {
    const newContent = editedData.content.filter((_, i) => i !== index);
    setEditedData(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const handleImageChange = (index, field, value) => {
    const newImages = [...editedData.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setEditedData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImage = () => {
    setEditedData(prev => ({
      ...prev,
      images: [...prev.images, { url: '', alt: '', width: 'auto', height: 'auto' }]
    }));
  };

  const removeImage = (index) => {
    const newImages = editedData.images.filter((_, i) => i !== index);
    setEditedData(prev => ({
      ...prev,
      images: newImages
    }));
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Home Content Management</h1>
        <button
          onClick={() => setAddingSection(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Section
        </button>
      </div>

      <div className="space-y-4">
        {homeContent?.sections?.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {section.type.replace('-', ' ')}
                  </h3>
                  <p className="text-sm text-gray-500">Section ID: {section.id}</p>
                </div>
                <button
                  onClick={() => handleEditSection(section)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              </div>

              {editingSection === section.id ? (
                <div className="space-y-6">
                  {/* Basic Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={editedData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  </div>

                  {/* Content Array */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Content</label>
                      <button
                        onClick={addContentItem}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                    {editedData.content?.map((item, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <textarea
                          value={item}
                          onChange={(e) => handleContentChange(index, e.target.value)}
                          rows={2}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Enter content..."
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

                  {/* Styles */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Styles</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <input
                        type="text"
                        placeholder="Font Size"
                        value={editedData.styles?.fontSize || ''}
                        onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Text Color"
                        value={editedData.styles?.textColor || ''}
                        onChange={(e) => handleStyleChange('textColor', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Background Color"
                        value={editedData.styles?.backgroundColor || ''}
                        onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Text Align"
                        value={editedData.styles?.textAlign || ''}
                        onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Images</label>
                      <button
                        onClick={addImage}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        <Image className="w-4 h-4" />
                        Add Image
                      </button>
                    </div>
                    {editedData.images?.map((image, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 mb-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                          <input
                            type="text"
                            placeholder="Image URL"
                            value={image.url}
                            onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Alt Text"
                            value={image.alt}
                            onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Width"
                              value={image.width}
                              onChange={(e) => handleImageChange(index, 'width', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-20"
                            />
                            <input
                              type="text"
                              placeholder="Height"
                              value={image.height}
                              onChange={(e) => handleImageChange(index, 'height', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-20"
                            />
                          </div>
                          <button
                            onClick={() => removeImage(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveSection}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {saving ? <Loader /> : <Save className="w-4 h-4" />}
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>Title:</strong> {section.title || 'No title'}</p>
                  <p className="text-gray-700"><strong>Subtitle:</strong> {section.subtitle || 'No subtitle'}</p>
                  <p className="text-gray-700"><strong>Content Items:</strong> {section.content?.length || 0}</p>
                  <p className="text-gray-700"><strong>Images:</strong> {section.images?.length || 0}</p>
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
