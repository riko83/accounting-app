@echo off
chcp 65001 > nul
echo.
echo ========================================
echo   ACCOUNTING APP - QUICK SETUP
echo ========================================
echo.

echo 📁 Creating directories...
mkdir database 2>nul
mkdir uploads 2>nul
mkdir logs 2>nul

echo.
echo 📦 Installing dependencies...
call npm install --workspaces
if %errorlevel% neq 0 (
    echo ⚠️  Workspaces failed, trying manual install...
    call npm install
    cd packages\shared && call npm install && cd ..\..
    cd packages\server && call npm install && cd ..\..
    cd packages\client && call npm install && cd ..\..
)

echo.
echo 🗄️ Setting up database...
if not exist "database\accounting.db" (
    echo Creating SQLite database...
    echo. > database\accounting.db
)

echo Generating Prisma client...
npx prisma generate
if %errorlevel% neq 0 (
    echo ❌ Prisma generate failed
    pause
    exit /b 1
)

echo Running migrations...
npx prisma migrate dev --name init
if %errorlevel% neq 0 (
    echo ⚠️  Migration may have issues, continuing...
)

echo.
echo 🎉 Setup completed!
echo.
echo 📊 URLs:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.
echo 👤 Default credentials:
echo    Admin: admin@accounting.app / admin123
echo    Accountant: accountant@accounting.app / accountant123
echo.
echo 🚀 Starting the app...
echo.
npm run dev