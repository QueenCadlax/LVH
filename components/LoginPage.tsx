import React, { useState, useEffect } from 'react';
import { Mail, Eye, EyeOff, Lock as LockIcon, ChevronRight } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, name: string) => void;
  onRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      // Call backend API for authentication
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store JWT token
        localStorage.setItem('token', data.token);
        const user = data.user || {};
        const userName = user.firstName || email.split('@')[0];
        onLogin(email, userName);
        return;
      }

      // Backend rejected credentials
      setError(data.error || 'Invalid email or password. For demo, try: admin@lowveld.co.za / lowveld2026');
    } catch (err: any) {
      setError('Backend connection failed. Ensure server is running at http://localhost:5000');
      console.error('[LoginPage] Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24 pb-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">LowveldHub</h1>
          <p className="text-slate-300 text-sm">Verified businesses. Exclusive connections.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-white mb-6">Sign In</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
                <LockIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 disabled:from-slate-600 disabled:to-slate-700 text-slate-900 font-bold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ChevronRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <button className="text-sm text-slate-400 hover:text-gold-400 transition-colors">
              Forgot password?
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-white/10"></div>

          {/* Signup Link */}
          <div className="text-center text-sm text-slate-400">
            Not a member?{' '}
            <button
              onClick={onRegister}
              className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
            >
              Create Account
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

export default LoginPage;
