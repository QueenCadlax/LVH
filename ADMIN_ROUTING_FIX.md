# Admin Routing Fix - URL Path Based Detection

## Problem
When accessing `/admin/login` or other `/admin/*` paths, the single-page app (App.tsx) doesn't recognize these routes because:

1. **No Admin Routes in Switch Statement:** The main `currentView` switch statement in App.tsx only handles views like 'home', 'directory', 'login', 'dashboard', etc. It has **no cases for 'admin-login' or 'admin-dashboard'**.

2. **No URL-to-View Mapping:** `handleNavigate()` manually updates state, but there's no mechanism to detect when the user directly accesses `/admin/*` paths via browser navigation or bookmarks.

3. **AdminApp.tsx Exists But Is Unreachable:** The separate admin app component exists at the root level, but the main App.tsx never renders it based on the URL path.

## Solution
Add URL-based routing detection at the top level of App.tsx to render AdminApp when the path starts with `/admin`.

### Implementation Steps

1. **Detect Admin Path on Mount**
   ```typescript
   useEffect(() => {
     const path = window.location.pathname;
     if (path.startsWith('/admin')) {
       setIsAdminApp(true);
     }
   }, []);
   ```

2. **Conditionally Render AdminApp or Main App**
   ```typescript
   if (isAdminApp) {
     return <AdminApp />;  // Render admin dashboard
   }
   
   // Otherwise render main app
   return (
     <ErrorBoundary>
       {renderView()}
     </ErrorBoundary>
   );
   ```

3. **Update handleNavigate to Support Admin Routes**
   ```typescript
   const handleNavigate = (view: string, ...) => {
     if (view === 'admin-login' || view === 'admin-dashboard') {
       window.location.href = `/admin/${view === 'admin-login' ? 'login' : 'dashboard'}`;
       return;
     }
     // ... existing navigation logic
   };
   ```

## Expected Behavior After Fix

- **URL:** `http://localhost:3000/admin/login` → Renders `<AdminApp />` with login flow
- **URL:** `http://localhost:3000/admin/dashboard` → Renders `<AdminApp />` with admin dashboard
- **URL:** `http://localhost:3000/login` → Renders main `App.tsx` with login page
- **URL:** `http://localhost:3000/dashboard` → Renders main `App.tsx` with user dashboard

## Files to Modify

1. **App.tsx** (Main App Component)
   - Add `isAdminApp` state
   - Add `useEffect` to detect `/admin` paths on mount
   - Conditionally render `<AdminApp />` or main app
   - Update `handleNavigate()` to support admin routes

2. **AdminApp.tsx** (if needed)
   - Ensure it has its own routing logic for `/admin/login`, `/admin/dashboard`, etc.
   - Should be self-contained and not depend on App.tsx state

## Testing

After implementing:

1. Visit `http://localhost:3000/admin/login` in browser
   - Should render AdminApp login page
   - Should NOT render main app navbar

2. Visit `http://localhost:3000/login`
   - Should render main App.tsx login page
   - Should render main app navbar

3. Click "Admin Login" from main login page
   - Should navigate to `/admin/login`
   - Should transition to AdminApp

4. Click "Back to User App" or similar
   - Should navigate to `/`
   - Should transition back to main App.tsx

## Code Additions Required

```typescript
// At top of App.tsx component
const [isAdminApp, setIsAdminApp] = useState(false);

useEffect(() => {
  const path = window.location.pathname;
  if (path.startsWith('/admin')) {
    setIsAdminApp(true);
  }
}, []);

// In render, before ErrorBoundary:
if (isAdminApp) {
  return <AdminApp />;
}

// Rest of app rendering continues...
```

## Notes

- This is a **client-side routing pattern** for a single-page app
- Admin routes are detected by URL path, not by separate backend routing
- AdminApp should be fully self-contained
- No backend changes required (works with existing API)
