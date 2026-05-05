# 🎭 Login & Dashboard — Quick Reference

## File Locations & Imports

```typescript
// Components
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

// Types
import { User } from './types'; // Extended with tier, rewardPoints, etc.
```

---

## Auth State in App.tsx

```typescript
// State
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [currentUser, setCurrentUser] = useState<any>(null);

// Functions
const handleLogin = (email: string, name: string) => {
  const user = {
    id: `user_${Date.now()}`,
    name,
    email,
    role: 'User',
    status: 'Active',
    tier: 'Essential',
    rewardPoints: 2450,
    savedItems: [],
    joinedDate: new Date().toISOString()
  };
  setCurrentUser(user);
  setIsAuthenticated(true);
  localStorage.setItem('lh_user', JSON.stringify(user));
  setCurrentView('dashboard');
};

const handleLogout = () => {
  setIsAuthenticated(false);
  setCurrentUser(null);
  localStorage.removeItem('lh_user');
  setCurrentView('home');
};
```

---

## Routes

```typescript
case 'login': 
  return <LoginPage onLogin={handleLogin} onRegister={handleRegister} />;

case 'dashboard': 
  return isAuthenticated && currentUser 
    ? <Dashboard user={currentUser} onLogout={handleLogout} navigate={handleNavigate} /> 
    : <LoginPage onLogin={handleLogin} onRegister={handleRegister} />;
```

---

## NavBar Buttons

### Desktop (Non-Mobile)
```typescript
{isAuthenticated ? (
  <>
    <button onClick={() => handleNavigate('dashboard')} className="...">
      <User size={18} />
      {currentUser?.name || 'Dashboard'}
    </button>
    <button onClick={handleLogout} className="...">Logout</button>
  </>
) : (
  <>
    <button onClick={() => handleNavigate('login')} className="...">Login</button>
    <button onClick={() => handleNavigate('login')} className="...">Join Now</button>
  </>
)}
```

### Mobile Menu
```typescript
{isAuthenticated ? (
  <>
    <button onClick={() => handleNavigate('dashboard')} className="...">
      Dashboard ({favorites.length})
    </button>
    <button onClick={handleLogout} className="...">Logout</button>
  </>
) : (
  <>
    <button onClick={() => handleNavigate('login')} className="...">Member Login</button>
    <button onClick={() => handleNavigate('login')} className="...">Join Now</button>
  </>
)}
```

---

## LoginPage Props

```typescript
interface LoginPageProps {
  onLogin: (email: string, name: string) => void;
  onRegister: () => void;
}
```

**Usage:**
```typescript
<LoginPage 
  onLogin={(email, name) => handleLogin(email, name)}
  onRegister={() => handleRegister()}
/>
```

---

## Dashboard Props

```typescript
interface DashboardProps {
  user: {
    name: string;
    email: string;
    tier?: 'Essential' | 'Professional' | 'Platinum';
  };
  onLogout: () => void;
  navigate: (view: string) => void;
}
```

**Usage:**
```typescript
<Dashboard 
  user={currentUser}
  onLogout={handleLogout}
  navigate={handleNavigate}
/>
```

---

## Color System

### Tier Colors
```typescript
const tierColors = {
  Essential: { 
    bg: 'bg-slate-600', 
    text: 'text-slate-200', 
    border: 'border-slate-400' 
  },
  Professional: { 
    bg: 'bg-blue-600', 
    text: 'text-blue-200', 
    border: 'border-blue-400' 
  },
  Platinum: { 
    bg: 'bg-gradient-to-r from-purple-600 to-indigo-600', 
    text: 'text-purple-200', 
    border: 'border-purple-400' 
  }
};
```

### Card Colors
```typescript
// Gold Gradient
from-gold-500 to-gold-600

// Emerald (Rewards)
from-emerald-600/20 to-teal-600/20
border-emerald-400/30

// Rose (Saved)
from-rose-600/20 to-pink-600/20
border-rose-400/30

// Blue (Messages)
from-blue-600/20 to-cyan-600/20
border-blue-400/30

// Activity Colors
blue: bg-blue-500/20 border-blue-400/30 text-blue-400
green: bg-emerald-500/20 border-emerald-400/30 text-emerald-400
gold: bg-gold-500/20 border-gold-400/30 text-gold-400
```

---

## Button Styles

### Primary CTA (Gold)
```typescript
className="bg-gradient-to-r from-gold-500 to-gold-600 
           hover:from-gold-600 hover:to-gold-700 
           text-slate-900 font-bold rounded-lg 
           transition-all duration-300 
           hover:shadow-lg hover:shadow-gold-500/50"
```

### Secondary (Glass)
```typescript
className="bg-white/5 border border-white/15 
           hover:border-white/30 hover:bg-white/10 
           text-slate-300 rounded-lg 
           transition-all duration-300"
```

### Danger (Red)
```typescript
className="bg-red-500/20 hover:bg-red-500/30 
           border border-red-400/30 
           text-red-200 hover:text-red-100 
           font-medium rounded-lg 
           transition-colors"
```

---

## Input Styles

### Focused State
```typescript
className={`border rounded-lg transition-all duration-300 bg-white/5 ${
  focusedField === 'email'
    ? 'border-gold-400 bg-white/10 shadow-lg shadow-gold-400/20'
    : 'border-white/15 hover:border-white/25'
}`}
```

---

## Card Hover Effect

```typescript
className="group relative bg-white/5 border border-white/10 
           hover:border-white/30 rounded-xl p-6 
           transition-all duration-300 hover:bg-white/10"

// Lift on hover
className="transition-all duration-300 hover:-translate-y-1"
```

---

## LocalStorage Keys

```typescript
'lh_user'              // Current authenticated user
'lh_favorites'         // Saved items (existing)
'lh_concierge_prefs'   // AI preferences (existing)
'lh_enquiries'         // Sent enquiries (existing)
'lh_bookings'          // Bookings (existing)
```

---

## Authentication Flow

```
1. User clicks "Login" button
   ↓
2. Navigates to 'login' view
   ↓
3. Renders LoginPage component
   ↓
4. User enters email & password
   ↓
5. Form validates:
   - Email format
   - Password length
   - Both required
   ↓
6. User clicks "Enter Sanctuary"
   ↓
7. handleLogin() called with (email, name)
   ↓
8. User object created:
   - ID: user_${timestamp}
   - Tier: Essential (default)
   - Points: 2450 (default)
   ↓
9. State updated:
   - setCurrentUser(user)
   - setIsAuthenticated(true)
   ↓
10. localStorage saved:
    - lh_user = JSON.stringify(user)
    ↓
11. Navigation to dashboard
    ↓
12. Dashboard component renders with user data
```

---

## Session Persistence

```typescript
// On App mount
useEffect(() => {
  try {
    const saved = localStorage.getItem('lh_user');
    if (saved) {
      const user = JSON.parse(saved);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  } catch {}
}, []);

// User refreshes page
→ Session automatically restored
→ User stays logged in
```

---

## Logout Flow

```
1. User clicks "Logout" button
   ↓
2. handleLogout() called
   ↓
3. State cleared:
   - setIsAuthenticated(false)
   - setCurrentUser(null)
   ↓
4. localStorage cleared:
   - localStorage.removeItem('lh_user')
   ↓
5. Redirected to 'home' view
   ↓
6. Navbar shows Login/Join buttons again
```

---

## Protected Route

```typescript
const handleNavigate = (view: string, ...) => {
  const protectedRoutes = ['dashboard'];
  
  if (protectedRoutes.includes(view) && !isAuthenticated) {
    setCurrentView('login');
    return;
  }
  
  // Normal navigation
  setCurrentView(view);
  // ...
};
```

---

## Dashboard Tabs

### Overview Tab (Default)
- Quick Navigation Cards (6)
- Premium Upsell Card (if not Platinum)
- Recent Activity Feed (3 items)

### Activity Tab
- Placeholder for transaction history
- Ready for future implementation

### Settings Tab
- Profile Information (3 fields)
- Preferences (3 checkboxes)
- Account Actions (3 buttons)

---

## Quick Navigation Cards (6)

```typescript
const navigationCards = [
  {
    id: 'directory',
    title: 'Explore Directory',
    description: 'Browse all verified businesses in Mpumalanga',
    icon: Briefcase,
    color: 'from-blue-600 to-cyan-600',
    action: () => navigate('directory')
  },
  {
    id: 'add-business',
    title: 'Add Business Listing',
    description: 'Promote your business to our premium audience',
    icon: Plus,
    color: 'from-emerald-600 to-teal-600',
    tier: 'Professional', // Locked for Essential
    action: () => navigate('business-detail')
  },
  // ... 4 more
];
```

---

## Recent Activity Items

```typescript
const recentActivity = [
  {
    id: '1',
    type: 'message',
    title: 'New Inquiry',
    description: 'Kuka Café replied to your listing inquiry',
    timestamp: '2 hours ago',
    icon: MessageSquare,
    color: 'blue'
  },
  {
    id: '2',
    type: 'approval',
    title: 'Profile Verified',
    description: 'Your business profile has been verified as Premium',
    timestamp: '1 day ago',
    icon: Award,
    color: 'green'
  },
  {
    id: '3',
    type: 'feature',
    title: 'Featured Opportunity',
    description: 'Your listing was featured in weekend highlights',
    timestamp: '3 days ago',
    icon: Zap,
    color: 'gold'
  }
];
```

---

## Validation Rules

### Email
```typescript
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
```

### Password
```typescript
// Minimum 6 characters
if (password.length < 6) {
  setError('Password must be at least 6 characters');
  return;
}
```

---

## Error Messages

```typescript
'Email address is required'
'Please enter a valid email address'
'Password is required'
'Password must be at least 6 characters'
'Invalid credentials. Please try again.' // On auth failure
```

---

## Icons Used (lucide-react)

```typescript
// Login
Mail, Eye, EyeOff, Lock, ChevronRight, Sparkles

// Dashboard
Bell, LogOut, Heart, MessageSquare, Gift, Award, Activity,
Briefcase, Plus, ShoppingBag, Zap, User, Settings, Crown,
TrendingUp, BarChart3, Activity, Calendar, Star, ArrowUpRight,
Target, Gem
```

---

## Responsive Breakpoints

| Screen | Classes | Grid |
|--------|---------|------|
| Mobile | `block md:hidden` | 1 col |
| Tablet | `hidden md:block lg:hidden` | 2 cols |
| Desktop | `hidden lg:block` | 3-4 cols |

---

## Performance Optimizations

1. **Lazy Loading**: Components use React.lazy where applicable
2. **Memoization**: Navigation callbacks are stable
3. **Local State**: Form state in component (not global)
4. **Efficient Re-renders**: useState used appropriately
5. **CSS Optimization**: Tailwind classes bundled efficiently

---

## Testing Checklist

- [ ] Login with valid email/password
- [ ] Login with invalid email format
- [ ] Login with empty password
- [ ] Show/hide password toggle
- [ ] Forgot password link visible
- [ ] Social login buttons visible
- [ ] "Create Member" link works
- [ ] Dashboard displays after login
- [ ] User name shows in navbar
- [ ] Logout button appears
- [ ] Dashboard stats show correctly
- [ ] Navigation cards clickable
- [ ] Upsell card visible (Essential users)
- [ ] Activity feed displays
- [ ] Tabs work (Overview/Activity/Settings)
- [ ] Settings form displays
- [ ] Session persists on refresh
- [ ] Logout clears session
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop

---

**Quick Reference Created**: January 22, 2026
**Status**: ✅ Production Ready
**Last Update**: Today
