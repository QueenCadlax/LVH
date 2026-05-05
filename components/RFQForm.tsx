import React, { useState } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { Category, RFQStatus, MPUMALANGA_AREAS } from '../types';

interface RFQFormProps {
  onSubmit: (rfq: {
    title: string;
    description: string;
    category: Category;
    subcategory: string;
    area: string;
    budget: { min: number; max: number };
    timeline: string;
    requirements: string[];
    urgency: 'Low' | 'Medium' | 'High';
    contactPreference: 'Phone' | 'Email' | 'WhatsApp' | 'InApp';
    imageUrl?: string;
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const RFQForm: React.FC<RFQFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [subcategory, setSubcategory] = useState('');
  const [area, setArea] = useState('Nelspruit');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [timeline, setTimeline] = useState('');
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [contactPreference, setContactPreference] = useState<'Phone' | 'Email' | 'WhatsApp' | 'InApp'>('Email');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!category) newErrors.category = 'Category is required';
    if (!budgetMin) newErrors.budgetMin = 'Minimum budget is required';
    if (!budgetMax) newErrors.budgetMax = 'Maximum budget is required';
    if (parseInt(budgetMin) >= parseInt(budgetMax)) newErrors.budget = 'Max budget must be greater than min';
    if (!timeline.trim()) newErrors.timeline = 'Timeline is required';
    if (requirements.filter(r => r.trim()).length === 0) newErrors.requirements = 'At least one requirement is needed';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      title,
      description,
      category: category as Category,
      subcategory,
      area,
      budget: { min: parseInt(budgetMin), max: parseInt(budgetMax) },
      timeline,
      requirements: requirements.filter(r => r.trim()),
      urgency,
      contactPreference,
      imageUrl: imageUrl || undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Create Request for Quote</h2>
            <p className="text-amber-100 text-sm mt-1">Get competitive quotes from verified businesses</p>
          </div>
          <button onClick={onCancel} className="text-white hover:bg-amber-600 p-2 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Website Redesign for E-commerce Store"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about what you're looking for..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value as Category);
                  setSubcategory('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                {Object.values(Category).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
              <input
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                placeholder="e.g., Web Development, Graphic Design"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Area *</label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {MPUMALANGA_AREAS.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min Budget (R) *</label>
              <input
                type="number"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
                placeholder="5000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              {errors.budgetMin && <p className="text-red-500 text-xs mt-1">{errors.budgetMin}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Budget (R) *</label>
              <input
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                placeholder="15000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              {errors.budgetMax && <p className="text-red-500 text-xs mt-1">{errors.budgetMax}</p>}
            </div>
          </div>
          {errors.budget && <p className="text-red-500 text-xs">{errors.budget}</p>}

          {/* Timeline */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Timeline *</label>
            <input
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="e.g., ASAP, 2 weeks, By February 15"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements *</label>
            <div className="space-y-2">
              {requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder="e.g., ISO certified, 24/7 support"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  {requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mt-2"
              >
                <Plus size={18} /> Add requirement
              </button>
            </div>
            {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements}</p>}
          </div>

          {/* Urgency & Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Urgency</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as 'Low' | 'Medium' | 'High')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Contact</label>
              <select
                value={contactPreference}
                onChange={(e) => setContactPreference(e.target.value as 'Phone' | 'Email' | 'WhatsApp' | 'InApp')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="InApp">In-App Chat</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL (Optional)</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 font-medium transition disabled:opacity-50"
            >
              {isLoading ? 'Publishing...' : 'Publish RFQ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
