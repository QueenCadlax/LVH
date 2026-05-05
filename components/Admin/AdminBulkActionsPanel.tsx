import React, { useState } from 'react';
import { CheckSquare, XSquare, Trash2, AlertCircle, FileText, Send } from 'lucide-react';

export interface BusinessSubmission {
  id: string;
  businessName: string;
  category: string;
  location: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  email: string;
}

interface AdminBulkActionsPanelProps {
  submissions: BusinessSubmission[];
  onApprove: (ids: string[]) => void;
  onReject: (ids: string[]) => void;
  onDelete: (ids: string[]) => void;
  onSendMessage: (ids: string[], message: string) => void;
}

export default function AdminBulkActionsPanel({
  submissions,
  onApprove,
  onReject,
  onDelete,
  onSendMessage
}: AdminBulkActionsPanelProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [bulkMessage, setBulkMessage] = useState('');

  const allSelected = selectedIds.size === submissions.length && submissions.length > 0;
  const hasPending = Array.from(selectedIds).some(
    id => submissions.find(s => s.id === id)?.status === 'pending'
  );

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(submissions.map(s => s.id)));
    }
  };

  const toggleId = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleBulkApprove = () => {
    if (confirm(`Approve ${selectedIds.size} submission(s)?`)) {
      onApprove(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  const handleBulkReject = () => {
    if (confirm(`Reject ${selectedIds.size} submission(s)?`)) {
      onReject(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedIds.size} submission(s)? This cannot be undone.`)) {
      onDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  const handleSendMessage = () => {
    if (bulkMessage.trim()) {
      onSendMessage(Array.from(selectedIds), bulkMessage);
      setBulkMessage('');
      setShowMessageDialog(false);
      setSelectedIds(new Set());
    }
  };

  return (
    <div className="bg-black border border-yellow-600/40 rounded-lg p-6 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Bulk Actions</h2>
          <p className="text-sm text-gray-400 mt-1">{selectedIds.size} of {submissions.length} selected</p>
        </div>
        <button
          onClick={toggleAll}
          className={`px-4 py-2 rounded-lg font-bold transition text-sm ${
            allSelected
              ? 'bg-yellow-600 text-black hover:bg-yellow-500'
              : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
          }`}
        >
          {allSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      {/* SUBMISSION LIST WITH CHECKBOXES */}
      <div className="space-y-2 max-h-64 overflow-y-auto border border-white/10 rounded-lg">
        {submissions.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <AlertCircle size={32} className="mx-auto mb-3 text-gray-600" />
            <p>No submissions to manage</p>
          </div>
        ) : (
          submissions.map((submission) => (
            <div
              key={submission.id}
              className="flex items-center gap-3 p-3 hover:bg-white/5 border-b border-white/10 last:border-b-0 cursor-pointer transition"
              onClick={() => toggleId(submission.id)}
            >
              <input
                type="checkbox"
                checked={selectedIds.has(submission.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleId(submission.id);
                }}
                className="w-5 h-5 accent-yellow-600 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{submission.businessName}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <span>{submission.category}</span>
                  <span>•</span>
                  <span>{submission.location}</span>
                  <span>•</span>
                  <span
                    className={`font-semibold ${
                      submission.status === 'pending'
                        ? 'text-yellow-400'
                        : submission.status === 'approved'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {submission.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ACTION BUTTONS */}
      {selectedIds.size > 0 && (
        <div className="space-y-3 p-4 bg-white/5 border border-white/10 rounded-lg">
          <div className="grid grid-cols-2 gap-2">
            {hasPending && (
              <>
                <button
                  onClick={handleBulkApprove}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600/30 hover:bg-green-600/50 border border-green-600/50 text-green-300 rounded-lg font-bold transition text-sm"
                >
                  <CheckSquare size={16} />
                  Approve
                </button>
                <button
                  onClick={handleBulkReject}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600/30 hover:bg-red-600/50 border border-red-600/50 text-red-300 rounded-lg font-bold transition text-sm"
                >
                  <XSquare size={16} />
                  Reject
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setShowMessageDialog(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/40 text-blue-300 rounded-lg font-bold transition text-sm"
          >
            <Send size={16} />
            Send Email to {selectedIds.size}
          </button>

          <button
            onClick={handleBulkDelete}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 text-red-300 rounded-lg font-bold transition text-sm"
          >
            <Trash2 size={16} />
            Delete ({selectedIds.size})
          </button>
        </div>
      )}

      {/* MESSAGE DIALOG */}
      {showMessageDialog && (
        <div className="p-4 bg-white/10 border border-white/20 rounded-lg space-y-3">
          <label className="block">
            <p className="text-sm font-semibold text-white mb-2">
              Message to {selectedIds.size} business owner{selectedIds.size > 1 ? 's' : ''}
            </p>
            <textarea
              value={bulkMessage}
              onChange={(e) => setBulkMessage(e.target.value)}
              placeholder="e.g., 'Your submission has been reviewed. Please address the following...'"
              className="w-full px-3 py-2 bg-black/50 border border-white/20 text-white rounded-lg focus:outline-none focus:border-yellow-600/50 resize-none h-24"
            />
          </label>

          {/* TEMPLATES */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 font-semibold">Quick Templates:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setBulkMessage('Your submission requires additional documentation. Please resubmit with required files.')}
                className="px-2 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded text-xs border border-white/20 transition"
              >
                Need Docs
              </button>
              <button
                onClick={() => setBulkMessage('Welcome to LowveldHub! Your business is now approved and pending payment.')}
                className="px-2 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded text-xs border border-white/20 transition"
              >
                Approved
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSendMessage}
              disabled={!bulkMessage.trim()}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold transition text-sm"
            >
              Send
            </button>
            <button
              onClick={() => {
                setShowMessageDialog(false);
                setBulkMessage('');
              }}
              className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition text-sm border border-white/20"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* INFO */}
      <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3 text-xs text-blue-200">
        <p className="font-semibold mb-1">💡 Bulk Actions Guide:</p>
        <ul className="space-y-0.5 ml-2">
          <li>• Select multiple submissions to take action on all at once</li>
          <li>• Approval/Rejection sends automated emails to business owners</li>
          <li>• Custom messages are added to default approval/rejection emails</li>
        </ul>
      </div>
    </div>
  );
}
