@echo off
chcp 65001 > nul
echo.
echo ========================================
echo   FIX: ONE NODE_MODULES IN ROOT
echo ========================================
echo.

echo 🗑️  Removing node_modules from packages...
rmdir /s /q packages\shared\node_modules 2>nul
rmdir /s /q packages\server\node_modules 2>nul
rmdir /s /q packages\client\node_modules 2>nul
echo ✅ Removed package node_modules

echo.
echo 📄 Removing package-lock files from packages...
del packages\shared\package-lock.json 2>nul
del packages\server\package-lock.json 2>nul
del packages\client\package-lock.json 2>nul
echo ✅ Removed package-lock files

echo.
echo 📝 Simplifying package.json files...

:: Simplify shared package.json
(
echo {
echo   "name": "@accounting/shared",
echo   "version": "1.0.0",
echo   "description": "Shared types and utilities",
echo   "main": "dist/index.js",
echo   "types": "dist/index.d.ts",
echo   "scripts": {
echo     "build": "tsc",
echo     "watch": "tsc --watch"
echo   }
echo }
) > packages\shared\package.json
echo ✅ Simplified shared package.json

:: Simplify server package.json
(
echo {
echo   "name": "@accounting/server",
echo   "version": "1.0.0",
echo   "description": "Backend API",
echo   "main": "dist/index.js",
echo   "scripts": {
echo     "dev": "nodemon --exec ts-node src/index.ts",
echo     "build": "tsc",
echo     "start": "node dist/index.js"
echo   }
echo }
) > packages\server\package.json
echo ✅ Simplified server package.json

:: Simplify client package.json
(
echo {
echo   "name": "@accounting/client",
echo   "version": "0.1.0",
echo   "private": true,
echo   "scripts": {
echo     "start": "react-scripts start",
echo     "build": "react-scripts build",
echo     "test": "react-scripts test",
echo     "eject": "react-scripts eject"
echo   },
echo   "eslintConfig": {
echo     "extends": ["react-app", "react-app/jest"]
echo   },
echo   "browserslist": {
echo     "production": [">0.2%", "not dead", "not op_mini all"],
echo     "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
echo   }
echo }
) > packages\client\package.json
echo ✅ Simplified client package.json

echo.
echo 📦 Now install ALL dependencies in root...
echo    npm install
echo.
echo ========================================
echo 🎉 READY FOR SINGLE NODE_MODULES!
echo ========================================
echo.
echo 🚀 After npm install, run:
echo    npm run dev
echo.
pause