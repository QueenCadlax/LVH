import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onClose: () => void;
  onVerified: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onClose,
  onVerified
}) => {
  const [status, setStatus] = useState<'pending' | 'verifying' | 'success' | 'error'>('pending');
  const [error, setError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    setStatus('verifying');
    setError(null);

    try {
      // Call backend to verify email
      const response = await fetch(`http://localhost:5000/api/newsletter/verify/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode })
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onVerified();
          onClose();
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.error || 'Verification failed. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      setError('Failed to verify email. Please try again.');
      setStatus('error');
    }
  };

  const handleResendCode = async () => {
    setStatus('verifying');
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/newsletter/verify/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resend: true })
      });

      if (response.ok) {
        setError(null);
        setStatus('pending');
        alert('Verification code sent to ' + email);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to resend code');
        setStatus('error');
      }
    } catch (err) {
      setError('Failed to resend code. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {status === 'success' ? (
              <CheckCircle className="text-green-500" size={64} />
            ) : (
              <Mail className="text-gold-500" size={64} />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
          <p className="text-gray-600 text-sm">
            We've sent a verification code to <span className="font-semibold">{email}</span>
          </p>
        </div>

        {/* Success State */}
        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold flex items-center gap-2">
              <CheckCircle size={20} />
              Email verified successfully!
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Verification Input */}
        {status !== 'success' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                placeholder="ENTER 6-DIGIT CODE"
                maxLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-2xl tracking-widest font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
              />
              <p className="text-xs text-gray-500 mt-2">
                Check your email for the 6-digit code
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {status === 'success' ? (
            <button
              onClick={onClose}
              className="w-full px-6 py-2 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-600 transition"
            >
              Done
            </button>
          ) : (
            <>
              <button
                onClick={handleVerify}
                disabled={status === 'verifying' || !verificationCode}
                className="w-full px-6 py-2 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {status === 'verifying' && <Loader size={18} className="animate-spin" />}
                Verify Email
              </button>
              
              {status !== 'verifying' && (
                <button
                  onClick={handleResendCode}
                  className="w-full px-6 py-2 border-2 border-gold-500 text-gold-600 font-semibold rounded-lg hover:bg-gold-50 transition"
                >
                  Resend Code
                </button>
              )}
            </>
          )}

          {status !== 'success' && (
            <button
              onClick={onClose}
              className="w-full px-6 py-2 text-gray-600 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Help Text */}
        {status !== 'success' && (
          <p className="text-xs text-gray-500 text-center mt-6">
            Didn't receive the code? Check your spam folder or try resending.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
