@echo off
REM Setup PostgreSQL user and database for LowveldHub
REM This script will attempt multiple connection methods

echo.
echo ============================================================
echo Setting up PostgreSQL user 'lowveld' and database
echo ============================================================
echo.

REM Try to execute SQL using different methods
REM Method 1: Try without password (Windows auth might work)
echo Attempting Method 1: Connection as postgres (Windows auth)...
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -h localhost -d postgres -f setup-db.sql 2>nul
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS with Method 1
    goto success
)

REM Method 2: Try with common default password
echo Attempting Method 2: Connection with default password...
set PGPASSWORD=postgres
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -h localhost -d postgres -f setup-db.sql 2>nul
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS with Method 2
    set PGPASSWORD=
    goto success
)
set PGPASSWORD=

REM Method 3: Try with empty password
echo Attempting Method 3: Connection with empty password...
set PGPASSWORD=
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -h localhost -d postgres -f setup-db.sql 2>nul
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS with Method 3
    goto success
)

REM If all fail, provide instructions
echo.
echo [!] Could not connect to PostgreSQL automatically
echo [!] You may need to manually run the SQL commands:
echo.
echo Commands to run as postgres superuser:
echo.
echo   CREATE USER lowveld WITH PASSWORD 'lowveld2026';
echo   CREATE DATABASE lowveldhub OWNER lowveld;
echo   GRANT ALL PRIVILEGES ON DATABASE lowveldhub TO lowveld;
echo.
echo To do this manually:
echo   1. Open pgAdmin (if installed) or use:
echo      psql -U postgres -h localhost -d postgres
echo   2. Paste the commands above
echo.
goto end

:success
echo.
echo ============================================================
echo SUCCESS: Database setup complete!
echo ============================================================
echo.
echo Verifying connection with new user...
set PGPASSWORD=lowveld2026
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U lowveld -h localhost -d lowveldhub -c "SELECT current_user, current_database();" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Verification: Connected as lowveld user successfully
) else (
    echo Verification: Could not verify connection
)
set PGPASSWORD=

:end
echo.
echo Setup script completed.
pause
