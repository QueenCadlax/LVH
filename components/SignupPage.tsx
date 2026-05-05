import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';

interface SignupPageProps {
  onSignup: (email: string, name: string) => void;
  onLoginRedirect: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onLoginRedirect }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!firstName.trim()) {
      setError('First name is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // Call backend API to register
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName: '',
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store JWT token
        localStorage.setItem('token', data.token);
        setSuccess('Account created successfully! Redirecting to dashboard...');
        
        // Wait 2 seconds then redirect
        setTimeout(() => {
          const user = data.user || {};
          const userName = user.firstName || email.split('@')[0];
          onSignup(email, userName);
        }, 2000);
        return;
      }

      // Backend rejected registration
      setError(data.error || 'Failed to create account. Please try again.');
    } catch (err: any) {
      setError('Backend connection failed. Ensure server is running at http://localhost:5000');
      console.error('[SignupPage] Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24 pb-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">LowveldHub</h1>
          <p className="text-slate-300 text-sm">Verified businesses. Exclusive connections.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white mb-6">Create Account</h2>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-200">{success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your first name"
                className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder-slate-400 transition-all ${
                  focusedField === 'firstName'
                    ? 'border-gold-400/50 bg-white/10'
                    : 'border-white/10 hover:border-white/20'
                } focus:outline-none`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className={`w-full bg-white/5 border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 transition-all ${
                    focusedField === 'email'
                      ? 'border-gold-400/50 bg-white/10'
                      : 'border-white/10 hover:border-white/20'
                  } focus:outline-none`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="At least 8 characters"
                  className={`w-full bg-white/5 border rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-slate-400 transition-all ${
                    focusedField === 'password'
                      ? 'border-gold-400/50 bg-white/10'
                      : 'border-white/10 hover:border-white/20'
                  } focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Confirm your password"
                  className={`w-full bg-white/5 border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 transition-all ${
                    focusedField === 'confirmPassword'
                      ? 'border-gold-400/50 bg-white/10'
                      : 'border-white/10 hover:border-white/20'
                  } focus:outline-none`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 disabled:from-slate-600 disabled:to-slate-700 text-slate-900 font-bold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
              {!isLoading && <ChevronRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <button
              onClick={onLoginRedirect}
              className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>We exist to bridge the gap between quality businesses and quality audiences.</p>
          <p className="mt-2">© 2026 LowveldHub Mpumalanga. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
