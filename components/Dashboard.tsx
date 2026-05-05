import React, { useEffect } from 'react';
import {
  LogOut, Settings, Heart, MessageSquare, Plus, Award, Activity, ShoppingBag, Briefcase,
  ChevronRight, User
} from 'lucide-react';

interface DashboardProps {
  user: {
    name: string;
    email: string;
    tier?: 'Essential' | 'Professional' | 'Platinum';
  };
  onLogout: () => void;
  navigate: (view: string) => void;
  favorites?: string[];
  businesses?: any[];
  recentMessages?: any[];
}

interface ActivityItem {
  id: string;
  type: 'message' | 'approval' | 'feature' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  icon: any;
  color: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, navigate, favorites = [], recentMessages = [] }) => {
  const savedItemsCount = favorites?.length || 0;
  const unreadMessages = recentMessages?.length || 3;
  const membershipTier = user.tier || 'Essential';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simple recent activity (2-3 items max)
  const recentActivity = [
    recentMessages?.[0] && {
      id: '1',
      title: 'Business replied to your inquiry',
      timestamp: '2 hours ago',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      id: '2',
      title: 'Profile verified',
      timestamp: '1 day ago',
      icon: Award,
      color: 'green'
    }
  ].filter(Boolean);

  const navigationCards = [
    {
      id: 'directory',
      title: 'Explore Directory',
      description: 'Browse verified businesses',
      icon: Briefcase,
      action: () => navigate('directory')
    },
    {
      id: 'add-business',
      title: 'Add Business Listing',
      description: 'Submit your business',
      icon: Plus,
      action: () => navigate('business-detail')
    },
    {
      id: 'marketplace',
      title: 'Marketplace Favorites',
      description: 'View saved products',
      icon: ShoppingBag,
      action: () => navigate('marketplace')
    },
    {
      id: 'profile',
      title: 'Profile & Settings',
      description: 'Account information',
      icon: User,
      action: () => navigate('profile')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* WELCOME HEADER */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">
              Welcome back, <span className="text-gold-400">{user.name}</span>
            </h1>
            <p className="text-slate-300 text-lg">Your Mpumalanga digital sanctuary awaits</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-200 hover:text-red-100 font-medium flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* MEMBERSHIP TIER */}
        <div className="mb-8 p-6 bg-slate-600 rounded-xl border border-slate-400/30">
          <p className="text-sm text-slate-200 mb-1 font-medium">Membership Tier</p>
          <h2 className="text-2xl font-bold text-slate-100">{membershipTier}</h2>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-sm text-slate-300 mb-2 font-medium">Saved Items</p>
            <h3 className="text-3xl font-bold text-white">{savedItemsCount}</h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-sm text-slate-300 mb-2 font-medium">Unread Messages</p>
            <h3 className="text-3xl font-bold text-white">{unreadMessages}</h3>
            <p className="text-xs text-slate-400 mt-1">from verified businesses</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-sm text-slate-300 mb-2 font-medium">Account Status</p>
            <h3 className="text-3xl font-bold text-emerald-400">Active</h3>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        {recentActivity.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity: any) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-start gap-3"
                  >
                    <Icon className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">{activity.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* QUICK NAVIGATION */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-white mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {navigationCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={card.action}
                  className="text-left bg-white/5 border border-white/10 hover:border-gold-400/50 hover:bg-white/10 rounded-lg p-4 transition-all"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <Icon className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{card.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{card.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-slate-400 text-sm mb-3">
            We exist to bridge the gap between quality businesses and quality audiences.
          </p>
          <p className="text-slate-500 text-xs">
            © 2026 LowveldHub Mpumalanga. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
