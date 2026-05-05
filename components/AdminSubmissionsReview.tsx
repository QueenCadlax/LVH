import React, { useState, useEffect } from 'react';
import { Check, X, Eye, Download, Mail } from 'lucide-react';
import { PendingSubmission } from '../backend/src/models/PendingSubmission';

interface AdminSubmissionsReviewProps {
  isAdmin: boolean;
  token?: string;
}

export default function AdminSubmissionsReview({ isAdmin, token }: AdminSubmissionsReviewProps) {
  const [submissions, setSubmissions] = useState<PendingSubmission[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0, revenueExpected: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<PendingSubmission | null>(null);
  const [filterStatus, setFilterStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [rejectionReason, setRejectionReason] = useState('');
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    if (isAdmin && token) {
      fetchSubmissions();
      fetchStats();
    }
  }, [isAdmin, token, filterStatus]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/submissions?status=${filterStatus}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch submissions');
      const data = await response.json();
      setSubmissions(data.data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/submissions/stats/overview',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data.data || {});
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleApprove = async (submissionId: number) => {
    setProcessingId(submissionId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/submissions/${submissionId}/approve`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({})
        }
      );

      if (!response.ok) throw new Error('Failed to approve');
      
      setSubmissions(submissions.filter(s => s.id !== submissionId));
      setSelectedSubmission(null);
      fetchStats();
    } catch (error) {
      console.error('Error approving submission:', error);
      alert('Failed to approve submission');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (submissionId: number) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    setProcessingId(submissionId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/submissions/${submissionId}/reject`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ rejectionReason })
        }
      );

      if (!response.ok) throw new Error('Failed to reject');
      
      setSubmissions(submissions.filter(s => s.id !== submissionId));
      setSelectedSubmission(null);
      setRejectionReason('');
      fetchStats();
    } catch (error) {
      console.error('Error rejecting submission:', error);
      alert('Failed to reject submission');
    } finally {
      setProcessingId(null);
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-900">Admin access required to view submissions</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Submissions</p>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Pending Review</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Approved</p>
          <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Expected Revenue</p>
          <p className="text-3xl font-bold text-purple-600">R{stats.revenueExpected?.toLocaleString()}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="border-b p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Business Submissions</h2>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {loading ? (
              <div className="p-6 text-center text-gray-500">Loading submissions...</div>
            ) : submissions.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No submissions found</div>
            ) : (
              <div className="divide-y">
                {submissions.map(submission => (
                  <div
                    key={submission.id}
                    onClick={() => setSelectedSubmission(submission)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition border-l-4 ${
                      selectedSubmission?.id === submission.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{submission.business_name}</h3>
                        <p className="text-sm text-gray-600">{submission.category} • {submission.location}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Package: <span className="font-medium capitalize">{submission.selected_package}</span> - R{submission.package_amount}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        {selectedSubmission && (
          <div className="bg-white rounded-lg shadow sticky top-6 max-h-[80vh] overflow-y-auto">
            <div className="border-b p-6">
              <h3 className="text-lg font-bold">{selectedSubmission.business_name}</h3>
            </div>

            <div className="p-6 space-y-4">
              {/* Basic Info */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Category</p>
                <p className="font-medium">{selectedSubmission.category} {selectedSubmission.sub_category && `(${selectedSubmission.sub_category})`}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Location</p>
                <p className="font-medium">{selectedSubmission.location}</p>
                {selectedSubmission.address && <p className="text-sm text-gray-600">{selectedSubmission.address}</p>}
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Contact</p>
                <p className="font-medium">{selectedSubmission.contact_phone}</p>
                {selectedSubmission.contact_email && <p className="text-sm text-gray-600">{selectedSubmission.contact_email}</p>}
              </div>

              {selectedSubmission.description && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Description</p>
                  <p className="text-sm text-gray-700">{selectedSubmission.description}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Package</p>
                <p className="font-bold text-blue-600 text-lg capitalize">{selectedSubmission.selected_package} - R{selectedSubmission.package_amount}</p>
              </div>

              {selectedSubmission.images.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Images</p>
                  <p className="text-sm">{selectedSubmission.images.length} images uploaded</p>
                </div>
              )}

              {selectedSubmission.amenities?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Amenities</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSubmission.amenities.map(amenity => (
                      <span key={amenity} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(selectedSubmission.website_url || selectedSubmission.facebook_url || selectedSubmission.instagram_url || selectedSubmission.twitter_url || selectedSubmission.tiktok_url || selectedSubmission.linkedin_url || selectedSubmission.youtube_url) && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">Social Media & Web</p>
                  <div className="space-y-2 text-sm">
                    {selectedSubmission.website_url && (
                      <a href={selectedSubmission.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 block">
                        🌐 {selectedSubmission.website_url}
                      </a>
                    )}
                    {selectedSubmission.facebook_url && (
                      <a href={selectedSubmission.facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 block">
                        f Facebook
                      </a>
                    )}
                    {selectedSubmission.instagram_url && (
                      <a href={selectedSubmission.instagram_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 block">
                        📷 Instagram
                      </a>
                    )}
                    {selectedSubmission.twitter_url && (
                      <a href={selectedSubmission.twitter_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 block">
                        𝕏 Twitter
                      </a>
                    )}
                    {selectedSubmission.tiktok_url && (
                      <a href={selectedSubmission.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 block">
                        ♪ TikTok
                      </a>
                    )}
                    {selectedSubmission.linkedin_url && (
                      <a href={selectedSubmission.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 block">
                        in LinkedIn
                      </a>
                    )}
                    {selectedSubmission.youtube_url && (
                      <a href={selectedSubmission.youtube_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 block">
                        ▶ YouTube
                      </a>
                    )}
                  </div>
                </div>
              )}

              {selectedSubmission.proof_of_business_url && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">Files</p>
                  <a
                    href={selectedSubmission.proof_of_business_url}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Proof of Business
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              {selectedSubmission.status === 'pending' && (
                <div className="pt-4 border-t space-y-3">
                  <button
                    onClick={() => handleApprove(selectedSubmission.id)}
                    disabled={processingId === selectedSubmission.id}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    Approve Submission
                  </button>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">Rejection Reason (if rejecting)</label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Why is this submission being rejected?"
                      className="w-full border border-gray-300 rounded p-2 text-sm"
                      rows={3}
                    />
                    <button
                      onClick={() => handleReject(selectedSubmission.id)}
                      disabled={processingId === selectedSubmission.id}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Reject Submission
                    </button>
                  </div>
                </div>
              )}

              {selectedSubmission.status === 'rejected' && selectedSubmission.rejection_reason && (
                <div className="bg-red-50 border border-red-200 rounded p-3 mt-4">
                  <p className="text-xs font-medium text-red-900">Rejection Reason:</p>
                  <p className="text-sm text-red-800 mt-1">{selectedSubmission.rejection_reason}</p>
                </div>
              )}

              {selectedSubmission.status === 'approved' && (
                <div className="bg-green-50 border border-green-200 rounded p-3 mt-4">
                  <p className="text-sm text-green-800">✓ This business has been approved and added to the directory</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
