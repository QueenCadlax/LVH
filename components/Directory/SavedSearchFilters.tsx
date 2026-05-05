import React, { useState } from 'react';
import { Save, Trash2, Clock, Filter, Edit2, Check } from 'lucide-react';

export interface SavedSearchFilter {
  id: string;
  name: string;
  category?: string;
  area?: string;
  priceRange?: { min: number; max: number };
  rating?: number;
  createdAt: string;
  lastUsed: string;
  useCount: number;
}

interface SavedSearchFiltersProps {
  savedFilters: SavedSearchFilter[];
  currentFilters: {
    category?: string;
    area?: string;
    priceRange?: { min: number; max: number };
    rating?: number;
  };
  onLoadFilter: (filter: SavedSearchFilter) => void;
  onDeleteFilter: (filterId: string) => void;
  onSaveFilter: (name: string) => void;
}

export default function SavedSearchFilters({
  savedFilters,
  currentFilters,
  onLoadFilter,
  onDeleteFilter,
  onSaveFilter
}: SavedSearchFiltersProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleSave = () => {
    if (filterName.trim()) {
      onSaveFilter(filterName);
      setFilterName('');
      setShowSaveDialog(false);
    }
  };

  const handleEditSave = (filter: SavedSearchFilter) => {
    if (editingName.trim()) {
      // In production, would call onUpdateFilter
      setEditingId(null);
      setEditingName('');
    }
  };

  return (
    <div className="space-y-4">
      {/* SAVE CURRENT FILTER BUTTON */}
      <div className="bg-white/5 border border-yellow-600/30 rounded-lg p-4">
        <button
          onClick={() => setShowSaveDialog(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg font-bold transition"
        >
          <Save size={18} />
          Save Current Search
        </button>
        <p className="text-xs text-gray-400 text-center mt-2">
          {currentFilters.category || currentFilters.area ? 'Save this search for quick access later' : 'Apply filters first to save a search'}
        </p>
      </div>

      {/* SAVE DIALOG */}
      {showSaveDialog && (
        <div className="bg-white/10 border border-yellow-600/50 rounded-lg p-4 space-y-3">
          <label className="block">
            <p className="text-sm font-semibold text-white mb-2">Filter Name</p>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder="e.g., 'Nelspruit Fine Dining' or 'Budget Hotels'"
              className="w-full px-3 py-2 bg-black/50 border border-white/20 text-white rounded-lg focus:outline-none focus:border-yellow-600/50"
              autoFocus
            />
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={!filterName.trim()}
              className="flex-1 px-3 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-lg font-bold transition text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setShowSaveDialog(false)}
              className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition text-sm border border-white/20"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* SAVED FILTERS LIST */}
      {savedFilters.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Filter size={16} />
            <span>Saved Searches ({savedFilters.length})</span>
          </div>

          {savedFilters.map((filter) => {
            const isEditing = editingId === filter.id;
            const filterSummary = [
              filter.category && `${filter.category}`,
              filter.area && `${filter.area}`,
              filter.rating && `Rating: ${filter.rating}+`,
              filter.priceRange && `R${filter.priceRange.min} - R${filter.priceRange.max}`
            ]
              .filter(Boolean)
              .join(' • ');

            return (
              <div key={filter.id} className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition">
                <div className="flex items-start justify-between gap-2 mb-2">
                  {isEditing ? (
                    <div className="flex-1 flex gap-1">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1 px-2 py-1 bg-black/50 border border-white/20 text-white text-sm rounded focus:outline-none focus:border-yellow-600/50"
                        autoFocus
                      />
                      <button
                        onClick={() => handleEditSave(filter)}
                        className="p-1 bg-green-600/30 text-green-400 hover:bg-green-600/50 rounded transition"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{filter.name}</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{filterSummary || 'No filters'}</p>
                    </div>
                  )}

                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => {
                        setEditingId(filter.id);
                        setEditingName(filter.name);
                      }}
                      className="p-1.5 text-gray-400 hover:text-yellow-400 transition"
                      title="Edit name"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => onDeleteFilter(filter.id)}
                      className="p-1.5 text-gray-400 hover:text-red-400 transition"
                      title="Delete filter"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* METADATA */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2 px-1">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(filter.lastUsed).toLocaleDateString()}
                  </span>
                  <span>Used {filter.useCount}x</span>
                </div>

                {/* LOAD BUTTON */}
                <button
                  onClick={() => onLoadFilter(filter)}
                  className="w-full px-3 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 border border-yellow-600/50 rounded text-sm font-semibold transition"
                >
                  Load This Search
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* EMPTY STATE */}
      {savedFilters.length === 0 && !showSaveDialog && (
        <div className="text-center py-6 bg-white/5 border border-white/10 rounded-lg">
          <Filter size={24} className="text-gray-600 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No saved searches yet</p>
          <p className="text-xs text-gray-500 mt-1">Create one to quickly apply your favorite filters</p>
        </div>
      )}

      {/* TIPS */}
      <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3 text-xs text-blue-200 space-y-1">
        <p className="font-semibold">💡 Pro Tip:</p>
        <ul className="space-y-1 ml-2">
          <li>• Save searches for categories you browse often</li>
          <li>• Edit filter names to make them more descriptive</li>
          <li>• Filters are saved locally and never shared</li>
        </ul>
      </div>
    </div>
  );
}
