@echo off
chcp 65001 > nul
echo.
echo ========================================
echo   ACCOUNTING APP - FILE CHECKER
echo ========================================
echo.

set ERROR_COUNT=0
set TOTAL_FILES=0
set OK_FILES=0

echo 📁 Checking project structure...
echo.

:: ========================================
:: ROOT FILES CHECK
:: ========================================
echo 📦 ROOT FILES:
echo ------------

call :check_file "package.json" root
call :check_file "tsconfig.base.json" root
call :check_file ".env.example" root
call :check_file ".gitignore" root
call :check_file "README.md" root
call :check_file "setup.bat" root
if exist "setup.sh" call :check_file "setup.sh" root
call :check_file "LICENSE" optional

echo.

:: ========================================
:: SHARED PACKAGE CHECK
:: ========================================
echo 🔗 SHARED PACKAGE:
echo ---------------

if not exist "packages\shared" (
    echo ❌ MISSING: packages\shared folder
    set /a ERROR_COUNT+=1
    goto :check_server
)

call :check_file "packages\shared\package.json" shared
call :check_file "packages\shared\tsconfig.json" shared
call :check_file "packages\shared\src\types.ts" shared
call :check_file "packages\shared\src\index.ts" shared

echo.

:: ========================================
:: SERVER PACKAGE CHECK
:: ========================================
:check_server
echo 🖥️ SERVER PACKAGE:
echo ---------------

if not exist "packages\server" (
    echo ❌ MISSING: packages\server folder
    set /a ERROR_COUNT+=1
    goto :check_client
)

:: Server root files
call :check_file "packages\server\package.json" server
call :check_file "packages\server\tsconfig.json" server
call :check_file "packages\server\prisma\schema.prisma" server

:: Server src files
call :check_file "packages\server\src\index.ts" server
call :check_file "packages\server\src\utils\logger.ts" server
call :check_file "packages\server\src\utils\prisma.ts" server
call :check_file "packages\server\src\middleware\auth.middleware.ts" server
call :check_file "packages\server\src\middleware\error.middleware.ts" server
call :check_file "packages\server\src\middleware\validation.middleware.ts" server

:: Server controllers
call :check_file "packages\server\src\controllers\auth.controller.ts" server
call :check_file "packages\server\src\controllers\client.controller.ts" server
call :check_file "packages\server\src\controllers\document.controller.ts" server

:: Server routes
call :check_file "packages\server\src\routes\auth.routes.ts" server
call :check_file "packages\server\src\routes\client.routes.ts" server
call :check_file "packages\server\src\routes\document.routes.ts" server

:: Server scripts
call :check_file "packages\server\src\scripts\seed.ts" server

echo.

:: ========================================
:: CLIENT PACKAGE CHECK
:: ========================================
:check_client
echo 💻 CLIENT PACKAGE:
echo ---------------

if not exist "packages\client" (
    echo ❌ MISSING: packages\client folder
    set /a ERROR_COUNT+=1
    goto :check_dirs
)

:: Client root files
call :check_file "packages\client\package.json" client
call :check_file "packages\client\tsconfig.json" client

:: Client src files
call :check_file "packages\client\src\App.tsx" client
call :check_file "packages\client\src\App.css" client
call :check_file "packages\client\src\index.tsx" client
call :check_file "packages\client\src\index.css" client

:: Client pages
call :check_file "packages\client\src\pages\LoginPage.tsx" client
call :check_file "packages\client\src\pages\DashboardPage.tsx" client
call :check_file "packages\client\src\pages\ClientsPage.tsx" client
call :check_file "packages\client\src\pages\DocumentsPage.tsx" client

:: Client components
call :check_file "packages\client\src\components\Layout.tsx" client
call :check_file "packages\client\src\components\ProtectedRoute.tsx" client

echo.

:: ========================================
:: DIRECTORY CHECK
:: ========================================
:check_dirs
echo 📁 DIRECTORY STRUCTURE:
echo --------------------

call :check_dir "database" required
call :check_dir "uploads" required
call :check_dir "logs" required
call :check_dir "packages" required
if exist "packages\shared" call :check_dir "packages\shared" required
if exist "packages\server" call :check_dir "packages\server" required
if exist "packages\client" call :check_dir "packages\client" required

echo.

:: ========================================
:: SUMMARY
:: ========================================
echo ========================================
echo 📊 CHECK SUMMARY:
echo ========================================
echo.
echo Total files checked: %TOTAL_FILES%
echo ✅ OK files: %OK_FILES%
echo ❌ Missing/Error: %ERROR_COUNT%
echo.

if %ERROR_COUNT% gtr 0 (
    echo ⚠️  Some files are missing or have issues.
    echo    Run the fix commands below.
) else (
    echo 🎉 All files are present and correct!
)

echo.
echo ========================================
echo 🚀 QUICK FIX COMMANDS:
echo ========================================
echo.
echo 1. Create missing directories:
echo    mkdir database uploads logs
echo.
echo 2. Install all dependencies:
echo    npm install --workspaces
echo    ^^ OR ^^
echo    .\install-all.bat
echo.
echo 3. Setup database:
echo    npx prisma generate
echo    npx prisma migrate dev --name init
echo    npm run db:seed
echo.
echo 4. Start the app:
echo    npm run dev
echo.
echo ========================================
pause
exit /b 0

:: ========================================
:: FUNCTIONS
:: ========================================
:check_file
set "file=%~1"
set "type=%~2"
set /a TOTAL_FILES+=1

if not exist "%file%" (
    echo ❌ MISSING: %file%
    if not "%type%"=="optional" set /a ERROR_COUNT+=1
    goto :eof
)

:: Check if file is empty
for %%F in ("%file%") do set "size=%%~zF"
if %size% equ 0 (
    echo ⚠️  EMPTY: %file%
    set /a ERROR_COUNT+=1
) else (
    echo ✅ OK: %file% (%size% bytes)
    set /a OK_FILES+=1
)
goto :eof

:check_dir
set "dir=%~1"
set "type=%~2"

if not exist "%dir%" (
    echo ❌ MISSING DIR: %dir%
    if not "%type%"=="optional" set /a ERROR_COUNT+=1
) else (
    echo ✅ OK DIR: %dir%
)
goto :eof