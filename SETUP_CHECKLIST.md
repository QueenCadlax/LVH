# LowveldHub Setup Checklist

**Quick validation before starting development. Use this to ensure your environment is ready.**

## Pre-Flight Checklist (Run Before `npm run dev`)

```powershell
# 1. Check Node.js & npm versions
node --version  # Should be 16+ (ideally 18+)
npm --version   # Should be 8+

# 2. Check PostgreSQL is running
netstat -ano | findstr ":5432"  # Should show LISTENING on port 5432
# If not: Services → PostgreSQL → Start

# 3. Check .env files exist
Test-Path backend\.env          # Should return True
Test-Path .env.local            # Should return True (GEMINI_API_KEY)

# 4. Verify .env has required variables
# backend\.env should contain:
# DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, JWT_SECRET, PORT=5000

# 5. Verify ports 3000 and 5000 are free
netstat -ano | findstr ":3000"  # Should be empty or LISTEN only
netstat -ano | findstr ":5000"  # Should be empty or LISTEN only

# 6. Clean up old processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# 7. Clean build artifacts
Remove-Item -Recurse -Force backend\dist -ErrorAction SilentlyContinue
```

## One-Command Full Setup

```powershell
# Run from project root
cd backend; npm install; npm run build; cd ..; npm install
```

Then in two separate terminals:

**Terminal 1 (Backend):**
```powershell
cd backend
npm run build
node dist/server.js
# Should output: "✅ Starting LowveldHub Backend Server..."
# And: "listening on port 5000"
```

**Terminal 2 (Frontend):**
```powershell
npm run dev
# Should output: "Local: http://localhost:3000"
```

## Health Checks

**Backend Health:**
```powershell
curl http://localhost:5000/health
# Should return: {"status":"ok","timestamp":"2026-01-29T..."}
```

**Frontend:**
- Open http://localhost:3000 in browser
- Should load without console errors

**Database Connection:**
```powershell
# From backend directory
npx tsc --noEmit
# Should have 0 errors
```

## Troubleshooting Quick Links

| Issue | Fix |
|-------|-----|
| `ECONNREFUSED :5432` | Start PostgreSQL service |
| `Port 5000 in use` | `Get-Process node \| Stop-Process -Force` |
| `Cannot find module` | `cd backend && npm install` |
| `TypeScript errors` | `npx tsc --noEmit` to see all errors |
| `API 404 errors` | Check backend is running on :5000 |
| `Blank frontend` | Check browser console for Vite errors |

## Reset Everything (Nuclear Option)

```powershell
# Kill all Node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Clean dependencies and builds
Remove-Item -Recurse -Force node_modules dist -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force backend\node_modules backend\dist -ErrorAction SilentlyContinue

# Reinstall
cd backend; npm install; npm run build; cd ..
npm install

# Start fresh
npm run dev  # Terminal 1
cd backend; node dist/server.js  # Terminal 2
```

## Database Reset (Local Dev Only)

```powershell
# From backend directory
npm run migrate        # Initialize schema
npm run seed          # Create default admin user
```

---

**Still having issues?** Check [BACKEND_STARTUP_DIAGNOSTIC_CHECKLIST](../.github/copilot-instructions.md#backend-startup-diagnostic-checklist) in copilot-instructions.md for detailed troubleshooting.
