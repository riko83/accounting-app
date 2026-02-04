@echo off
echo ============================================
echo   Ndertimi i Struktures se Projektit KontabApp
echo ============================================
echo.

:: Kontrollo nese jemi ne direktoren e sakte
set "projectName=KontabApp"
echo Duke krijuar projektin: %projectName%

:: Krijo strukturën e folderave
echo [1/10] Duke krijuar strukturën e folderave...
mkdir %projectName%
cd %projectName%

mkdir public
mkdir src
mkdir src\components
mkdir src\components\common
mkdir src\components\layout
mkdir src\components\clients
mkdir src\components\documents
mkdir src\components\accounting
mkdir src\components\tasks
mkdir src\hooks
mkdir src\lib
mkdir src\services
mkdir src\store
mkdir src\types
mkdir src\utils
mkdir src\pages

echo [2/10] Folderat u krijuan me sukses!

:: Krijo skedarët bazë
echo [3/10] Duke krijuar skedarët TypeScript...

:: 1. package.json
echo { > package.json
echo   "name": "kontabapp", >> package.json
echo   "version": "1.0.0", >> package.json
echo   "private": true, >> package.json
echo   "type": "module", >> package.json
echo   "scripts": { >> package.json
echo     "dev": "vite", >> package.json
echo     "build": "tsc && vite build", >> package.json
echo     "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0", >> package.json
echo     "preview": "vite preview" >> package.json
echo   }, >> package.json
echo   "dependencies": { >> package.json
echo     "react": "^18.2.0", >> package.json
echo     "react-dom": "^18.2.0", >> package.json
echo     "react-router-dom": "^6.20.0", >> package.json
echo     "axios": "^1.6.0", >> package.json
echo     "date-fns": "^2.30.0", >> package.json
echo     "zustand": "^4.4.7", >> package.json
echo     "react-hook-form": "^7.48.2", >> package.json
echo     "@hookform/resolvers": "^3.3.2", >> package.json
echo     "zod": "^3.22.4", >> package.json
echo     "@tanstack/react-query": "^5.12.0", >> package.json
echo     "lucide-react": "^0.309.0", >> package.json
echo     "react-hot-toast": "^2.4.1", >> package.json
echo     "@tanstack/react-table": "^8.11.2", >> package.json
echo     "tailwindcss": "^3.3.0", >> package.json
echo     "autoprefixer": "^10.4.16", >> package.json
echo     "postcss": "^8.4.32" >> package.json
echo   }, >> package.json
echo   "devDependencies": { >> package.json
echo     "@types/react": "^18.2.45", >> package.json
echo     "@types/react-dom": "^18.2.18", >> package.json
echo     "@types/node": "^20.10.5", >> package.json
echo     "@typescript-eslint/eslint-plugin": "^6.14.0", >> package.json
echo     "@typescript-eslint/parser": "^6.14.0", >> package.json
echo     "@vitejs/plugin-react": "^4.2.0", >> package.json
echo     "eslint": "^8.54.0", >> package.json
echo     "eslint-plugin-react-hooks": "^4.6.0", >> package.json
echo     "eslint-plugin-react-refresh": "^0.4.5", >> package.json
echo     "typescript": "^5.3.0", >> package.json
echo     "vite": "^5.0.0" >> package.json
echo   } >> package.json
echo } >> package.json

:: 2. tsconfig.json
echo { > tsconfig.json
echo   "compilerOptions": { >> tsconfig.json
echo     "target": "ES2020", >> tsconfig.json
echo     "useDefineForClassFields": true, >> tsconfig.json
echo     "lib": ["ES2020", "DOM", "DOM.Iterable"], >> tsconfig.json
echo     "module": "ESNext", >> tsconfig.json
echo     "skipLibCheck": true, >> tsconfig.json
echo     "moduleResolution": "bundler", >> tsconfig.json
echo     "allowImportingTsExtensions": true, >> tsconfig.json
echo     "resolveJsonModule": true, >> tsconfig.json
echo     "isolatedModules": true, >> tsconfig.json
echo     "noEmit": true, >> tsconfig.json
echo     "jsx": "react-jsx", >> tsconfig.json
echo     "strict": true, >> tsconfig.json
echo     "noUnusedLocals": true, >> tsconfig.json
echo     "noUnusedParameters": true, >> tsconfig.json
echo     "noFallthroughCasesInSwitch": true, >> tsconfig.json
echo     "baseUrl": ".", >> tsconfig.json
echo     "paths": { >> tsconfig.json
echo       "@/*": ["src/*"] >> tsconfig.json
echo     } >> tsconfig.json
echo   }, >> tsconfig.json
echo   "include": ["src"], >> tsconfig.json
echo   "references": [{ "path": "./tsconfig.node.json" }] >> tsconfig.json
echo } >> tsconfig.json

:: 3. tsconfig.node.json
echo { > tsconfig.node.json
echo   "compilerOptions": { >> tsconfig.node.json
echo     "composite": true, >> tsconfig.node.json
echo     "skipLibCheck": true, >> tsconfig.node.json
echo     "module": "ESNext", >> tsconfig.node.json
echo     "moduleResolution": "bundler", >> tsconfig.node.json
echo     "allowSyntheticDefaultImports": true >> tsconfig.node.json
echo   }, >> tsconfig.node.json
echo   "include": ["vite.config.ts"] >> tsconfig.node.json
echo } >> tsconfig.node.json

:: 4. vite.config.ts
echo import { defineConfig } from 'vite' > vite.config.ts
echo import react from '@vitejs/plugin-react' >> vite.config.ts
echo import path from 'path' >> vite.config.ts
echo. >> vite.config.ts
echo // https://vitejs.dev/config/ >> vite.config.ts
echo export default defineConfig({ >> vite.config.ts
echo   plugins: [react()], >> vite.config.ts
echo   resolve: { >> vite.config.ts
echo     alias: { >> vite.config.ts
echo       '@': path.resolve(__dirname, './src'), >> vite.config.ts
echo     }, >> vite.config.ts
echo   }, >> vite.config.ts
echo }) >> vite.config.ts

:: 5. tailwind.config.js
echo /** @type {import('tailwindcss').Config} */ > tailwind.config.js
echo export default { >> tailwind.config.js
echo   content: [ >> tailwind.config.js
echo     "./index.html", >> tailwind.config.js
echo     "./src/**/*.{js,ts,jsx,tsx}", >> tailwind.config.js
echo   ], >> tailwind.config.js
echo   theme: { >> tailwind.config.js
echo     extend: { >> tailwind.config.js
echo       colors: { >> tailwind.config.js
echo         primary: { >> tailwind.config.js
echo           '50': '#eff6ff', >> tailwind.config.js
echo           '100': '#dbeafe', >> tailwind.config.js
echo           '200': '#bfdbfe', >> tailwind.config.js
echo           '300': '#93c5fd', >> tailwind.config.js
echo           '400': '#60a5fa', >> tailwind.config.js
echo           '500': '#3b82f6', >> tailwind.config.js
echo           '600': '#2563eb', >> tailwind.config.js
echo           '700': '#1d4ed8', >> tailwind.config.js
echo           '800': '#1e40af', >> tailwind.config.js
echo           '900': '#1e3a8a', >> tailwind.config.js
echo         }, >> tailwind.config.js
echo         success: { >> tailwind.config.js
echo           '50': '#f0fdf4', >> tailwind.config.js
echo           '100': '#dcfce7', >> tailwind.config.js
echo           '200': '#bbf7d0', >> tailwind.config.js
echo           '300': '#86efac', >> tailwind.config.js
echo           '400': '#4ade80', >> tailwind.config.js
echo           '500': '#22c55e', >> tailwind.config.js
echo           '600': '#16a34a', >> tailwind.config.js
echo           '700': '#15803d', >> tailwind.config.js
echo           '800': '#166534', >> tailwind.config.js
echo           '900': '#14532d', >> tailwind.config.js
echo         }, >> tailwind.config.js
echo         warning: { >> tailwind.config.js
echo           '50': '#fffbeb', >> tailwind.config.js
echo           '100': '#fef3c7', >> tailwind.config.js
echo           '200': '#fde68a', >> tailwind.config.js
echo           '300': '#fcd34d', >> tailwind.config.js
echo           '400': '#fbbf24', >> tailwind.config.js
echo           '500': '#f59e0b', >> tailwind.config.js
echo           '600': '#d97706', >> tailwind.config.js
echo           '700': '#b45309', >> tailwind.config.js
echo           '800': '#92400e', >> tailwind.config.js
echo           '900': '#78350f', >> tailwind.config.js
echo         }, >> tailwind.config.js
echo         danger: { >> tailwind.config.js
echo           '50': '#fef2f2', >> tailwind.config.js
echo           '100': '#fee2e2', >> tailwind.config.js
echo           '200': '#fecaca', >> tailwind.config.js
echo           '300': '#fca5a5', >> tailwind.config.js
echo           '400': '#f87171', >> tailwind.config.js
echo           '500': '#ef4444', >> tailwind.config.js
echo           '600': '#dc2626', >> tailwind.config.js
echo           '700': '#b91c1c', >> tailwind.config.js
echo           '800': '#991b1b', >> tailwind.config.js
echo           '900': '#7f1d1d', >> tailwind.config.js
echo         } >> tailwind.config.js
echo       }, >> tailwind.config.js
echo       fontFamily: { >> tailwind.config.js
echo         sans: ['Inter', 'system-ui', 'sans-serif'], >> tailwind.config.js
echo       }, >> tailwind.config.js
echo       boxShadow: { >> tailwind.config.js
echo         'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', >> tailwind.config.js
echo         'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', >> tailwind.config.js
echo       } >> tailwind.config.js
echo     } >> tailwind.config.js
echo   }, >> tailwind.config.js
echo   plugins: [], >> tailwind.config.js
echo } >> tailwind.config.js

:: 6. postcss.config.js
echo export default { > postcss.config.js
echo   plugins: { >> postcss.config.js
echo     tailwindcss: {}, >> postcss.config.js
echo     autoprefixer: {}, >> postcss.config.js
echo   }, >> postcss.config.js
echo } >> postcss.config.js

:: 7. index.html
echo ^<!DOCTYPE html^> > index.html
echo ^<html lang="en"^> >> index.html
echo   ^<head^> >> index.html
echo     ^<meta charset="UTF-8" /^> >> index.html
echo     ^<link rel="icon" type="image/svg+xml" href="/vite.svg" /^> >> index.html
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^> >> index.html
echo     ^<title^>KontabApp - Platforma e Kontabilitetit^</title^> >> index.html
echo     ^<link rel="preconnect" href="https://fonts.googleapis.com" /^> >> index.html
echo     ^<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /^> >> index.html
echo     ^<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" /^> >> index.html
echo   ^</head^> >> index.html
echo   ^<body^> >> index.html
echo     ^<div id="root"^>^</div^> >> index.html
echo     ^<script type="module" src="/src/main.tsx"^>^</script^> >> index.html
echo   ^</body^> >> index.html
echo ^</html^> >> index.html

echo [4/10] Skedarët e konfigurimit u krijuan!

:: Krijo skedarët e komponentëve
echo [5/10] Duke krijuar komponentët...

:: 1. App.tsx
echo import React from 'react'; > src\App.tsx
echo import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; >> src\App.tsx
echo import { Toaster } from 'react-hot-toast'; >> src\App.tsx
echo import Layout from './components/layout/Layout'; >> src\App.tsx
echo import Dashboard from './pages/Dashboard'; >> src\App.tsx
echo import Clients from './pages/Clients'; >> src\App.tsx
echo import Documents from './pages/Documents'; >> src\App.tsx
echo import Accounting from './pages/Accounting'; >> src\App.tsx
echo import Tasks from './pages/Tasks'; >> src\App.tsx
echo import ClientDetails from './pages/ClientDetails'; >> src\App.tsx
echo. >> src\App.tsx
echo function App() { >> src\App.tsx
echo   return ( >> src\App.tsx
echo     ^<Router^> >> src\App.tsx
echo       ^<Routes^> >> src\App.tsx
echo         ^<Route path="/" element={^<Layout /^>}^> >> src\App.tsx
echo           ^<Route index element={^<Dashboard /^>} /^> >> src\App.tsx
echo           ^<Route path="clients" element={^<Clients /^>} /^> >> src\App.tsx
echo           ^<Route path="clients/:id" element={^<ClientDetails /^>} /^> >> src\App.tsx
echo           ^<Route path="documents" element={^<Documents /^>} /^> >> src\App.tsx
echo           ^<Route path="accounting" element={^<Accounting /^>} /^> >> src\App.tsx
echo           ^<Route path="tasks" element={^<Tasks /^>} /^> >> src\App.tsx
echo         ^</Route^> >> src\App.tsx
echo       ^</Routes^> >> src\App.tsx
echo       ^<Toaster ^> >> src\App.tsx
echo         position="top-right" >> src\App.tsx
echo         toastOptions={{ >> src\App.tsx
echo           duration: 4000, >> src\App.tsx
echo           style: { >> src\App.tsx
echo             background: '#363636', >> src\App.tsx
echo             color: '#fff', >> src\App.tsx
echo           }, >> src\App.tsx
echo           success: { >> src\App.tsx
echo             duration: 3000, >> src\App.tsx
echo             iconTheme: { >> src\App.tsx
echo               primary: '#22c55e', >> src\App.tsx
echo               secondary: '#fff', >> src\App.tsx
echo             }, >> src\App.tsx
echo           }, >> src\App.tsx
echo         }} >> src\App.tsx
echo       /^> >> src\App.tsx
echo     ^</Router^> >> src\App.tsx
echo   ); >> src\App.tsx
echo } >> src\App.tsx
echo. >> src\App.tsx
echo export default App; >> src\App.tsx

:: 2. main.tsx
echo import React from 'react'; > src\main.tsx
echo import ReactDOM from 'react-dom/client'; >> src\main.tsx
echo import App from './App.tsx'; >> src\main.tsx
echo import './index.css'; >> src\main.tsx
echo. >> src\main.tsx
echo ReactDOM.createRoot(document.getElementById('root')!).render( >> src\main.tsx
echo   ^<React.StrictMode^> >> src\main.tsx
echo     ^<App /^> >> src\main.tsx
echo   ^</React.StrictMode^>, >> src\main.tsx
echo ) >> src\main.tsx

:: 3. index.css
echo @tailwind base; > src\index.css
echo @tailwind components; >> src\index.css
echo @tailwind utilities; >> src\index.css

echo [6/10] Komponentët bazë u krijuan!

:: Krijo komponentët e layout
echo [7/10] Duke krijuar komponentët e layout...

:: 1. Layout.tsx
echo import React from 'react'; > src\components\layout\Layout.tsx
echo import { Outlet } from 'react-router-dom'; >> src\components\layout\Layout.tsx
echo import Sidebar from './Sidebar'; >> src\components\layout\Layout.tsx
echo import Header from './Header'; >> src\components\layout\Layout.tsx
echo. >> src\components\layout\Layout.tsx
echo const Layout: React.FC = () => { >> src\components\layout\Layout.tsx
echo   return ( >> src\components\layout\Layout.tsx
echo     ^<div className="min-h-screen bg-gray-50"^> >> src\components\layout\Layout.tsx
echo       ^<Header /^> >> src\components\layout\Layout.tsx
echo       ^<div className="flex"^> >> src\components\layout\Layout.tsx
echo         ^<Sidebar /^> >> src\components\layout\Layout.tsx
echo         ^<main className="flex-1 p-6"^> >> src\components\layout\Layout.tsx
echo           ^<Outlet /^> >> src\components\layout\Layout.tsx
echo         ^</main^> >> src\components\layout\Layout.tsx
echo       ^</div^> >> src\components\layout\Layout.tsx
echo     ^</div^> >> src\components\layout\Layout.tsx
echo   ); >> src\components\layout\Layout.tsx
echo }; >> src\components\layout\Layout.tsx
echo. >> src\components\layout\Layout.tsx
echo export default Layout; >> src\components\layout\Layout.tsx

:: 2. Header.tsx (e shkurtuar për hapësirë)
echo import React from 'react'; > src\components\layout\Header.tsx
echo import { Search, Bell, ChevronDown } from 'lucide-react'; >> src\components\layout\Header.tsx
echo. >> src\components\layout\Header.tsx
echo const Header: React.FC = () => { >> src\components\layout\Header.tsx
echo   return ( >> src\components\layout\Header.tsx
echo     ^<header className="bg-white border-b border-gray-200 px-6 py-4"^> >> src\components\layout\Header.tsx
echo       ^<div className="flex items-center justify-between"^> >> src\components\layout\Header.tsx
echo         ^<div className="flex items-center space-x-4"^> >> src\components\layout\Header.tsx
echo           ^<h1 className="text-2xl font-bold text-gray-800"^>KontabApp^</h1^> >> src\components\layout\Header.tsx
echo           ^<div className="relative"^> >> src\components\layout\Header.tsx
echo             ^<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /^> >> src\components\layout\Header.tsx
echo             ^<input^> >> src\components\layout\Header.tsx
echo               type="text" >> src\components\layout\Header.tsx
echo               placeholder="Kerko kliente, dokumente, detyra..." >> src\components\layout\Header.tsx
echo               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80" >> src\components\layout\Header.tsx
echo             /^> >> src\components\layout\Header.tsx
echo           ^</div^> >> src\components\layout\Header.tsx
echo         ^</div^> >> src\components\layout\Header.tsx
echo         ^<div className="flex items-center space-x-4"^> >> src\components\layout\Header.tsx
echo           ^<button className="relative p-2 text-gray-600 hover:text-gray-900"^> >> src\components\layout\Header.tsx
echo             ^<Bell className="w-6 h-6" /^> >> src\components\layout\Header.tsx
echo             ^<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"^>^</span^> >> src\components\layout\Header.tsx
echo           ^</button^> >> src\components\layout\Header.tsx
echo           ^<div className="flex items-center space-x-3"^> >> src\components\layout\Header.tsx
echo             ^<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"^> >> src\components\layout\Header.tsx
echo               ^<span className="text-blue-600 font-semibold"^>K^</span^> >> src\components\layout\Header.tsx
echo             ^</div^> >> src\components\layout\Header.tsx
echo             ^<div^> >> src\components\layout\Header.tsx
echo               ^<p className="text-sm font-medium"^>Kontabilist User^</p^> >> src\components\layout\Header.tsx
echo               ^<p className="text-xs text-gray-500"^>Admin^</p^> >> src\components\layout\Header.tsx
echo             ^</div^> >> src\components\layout\Header.tsx
echo             ^<ChevronDown className="w-5 h-5 text-gray-400" /^> >> src\components\layout\Header.tsx
echo           ^</div^> >> src\components\layout\Header.tsx
echo         ^</div^> >> src\components\layout\Header.tsx
echo       ^</div^> >> src\components\layout\Header.tsx
echo     ^</header^> >> src\components\layout\Header.tsx
echo   ); >> src\components\layout\Header.tsx
echo }; >> src\components\layout\Header.tsx
echo. >> src\components\layout\Header.tsx
echo export default Header; >> src\components\layout\Header.tsx

:: 3. Sidebar.tsx (e shkurtuar për hapësirë)
echo import React from 'react'; > src\components\layout\Sidebar.tsx
echo import { NavLink } from 'react-router-dom'; >> src\components\layout\Sidebar.tsx
echo import { ^> >> src\components\layout\Sidebar.tsx
echo   LayoutDashboard, ^> >> src\components\layout\Sidebar.tsx
echo   Users, ^> >> src\components\layout\Sidebar.tsx
echo   FileText, ^> >> src\components\layout\Sidebar.tsx
echo   Calculator,^> >> src\components\layout\Sidebar.tsx
echo   CheckSquare,^> >> src\components\layout\Sidebar.tsx
echo   Calendar,^> >> src\components\layout\Sidebar.tsx
echo   Settings,^> >> src\components\layout\Sidebar.tsx
echo   HelpCircle^> >> src\components\layout\Sidebar.tsx
echo } from 'lucide-react'; >> src\components\layout\Sidebar.tsx
echo. >> src\components\layout\Sidebar.tsx
echo const Sidebar: React.FC = () => { >> src\components\layout\Sidebar.tsx
echo   const navItems = [^> >> src\components\layout\Sidebar.tsx
echo     { to: '/', icon: LayoutDashboard, label: 'Dashboard' },^> >> src\components\layout\Sidebar.tsx
echo     { to: '/clients', icon: Users, label: 'Klientet' },^> >> src\components\layout\Sidebar.tsx
echo     { to: '/documents', icon: FileText, label: 'Dokumentet' },^> >> src\components\layout\Sidebar.tsx
echo     { to: '/accounting', icon: Calculator, label: 'Kontabiliteti' },^> >> src\components\layout\Sidebar.tsx
echo     { to: '/tasks', icon: CheckSquare, label: 'Detyrat' },^> >> src\components\layout\Sidebar.tsx
echo     { to: '/calendar', icon: Calendar, label: 'Kalendar' },^> >> src\components\layout\Sidebar.tsx
echo     { to: '/settings', icon: Settings, label: 'Settings' },^> >> src\components\layout\Sidebar.tsx
echo     { to: '/help', icon: HelpCircle, label: 'Ndihem' },^> >> src\components\layout\Sidebar.tsx
echo   ]; >> src\components\layout\Sidebar.tsx
echo. >> src\components\layout\Sidebar.tsx
echo   return (^> >> src\components\layout\Sidebar.tsx
echo     ^<aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]"^>^> >> src\components\layout\Sidebar.tsx
echo       ^<nav className="p-4"^>^> >> src\components\layout\Sidebar.tsx
echo         ^<ul className="space-y-2"^>^> >> src\components\layout\Sidebar.tsx
echo           {navItems.map((item) => (^> >> src\components\layout\Sidebar.tsx
echo             ^<li key={item.to}^>^> >> src\components\layout\Sidebar.tsx
echo               ^<NavLink^> >> src\components\layout\Sidebar.tsx
echo                 to={item.to}^> >> src\components\layout\Sidebar.tsx
echo                 className={({ isActive }) =>^> >> src\components\layout\Sidebar.tsx
echo                   `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${^> >> src\components\layout\Sidebar.tsx
echo                     isActive^> >> src\components\layout\Sidebar.tsx
echo                       ? 'bg-blue-50 text-blue-600'^> >> src\components\layout\Sidebar.tsx
echo                       : 'text-gray-700 hover:bg-gray-50'^> >> src\components\layout\Sidebar.tsx
echo                   }`^> >> src\components\layout\Sidebar.tsx
echo                 }^> >> src\components\layout\Sidebar.tsx
echo                 ^<item.icon className="w-5 h-5" /^>^> >> src\components\layout\Sidebar.tsx
echo                 ^<span^>{item.label}^</span^>^> >> src\components\layout\Sidebar.tsx
echo               ^</NavLink^>^> >> src\components\layout\Sidebar.tsx
echo             ^</li^>^> >> src\components\layout\Sidebar.tsx
echo           ))}^> >> src\components\layout\Sidebar.tsx
echo         ^</ul^>^> >> src\components\layout\Sidebar.tsx
echo       ^</nav^>^> >> src\components\layout\Sidebar.tsx
echo     ^</aside^>^> >> src\components\layout\Sidebar.tsx
echo   );^> >> src\components\layout\Sidebar.tsx
echo };^> >> src\components\layout\Sidebar.tsx
echo. >> src\components\layout\Sidebar.tsx
echo export default Sidebar; >> src\components\layout\Sidebar.tsx

:: Krijo tipet
echo [8/10] Duke krijuar tipet TypeScript...

echo // Tipet themelore per kontabilistet > src\types\index.ts
echo export interface User { >> src\types\index.ts
echo   id: string; >> src\types\index.ts
echo   email: string; >> src\types\index.ts
echo   name: string; >> src\types\index.ts
echo   role: 'accountant' | admin' | 'client'; >> src\types\index.ts
echo   avatar?: string; >> src\types\index.ts
echo   createdAt: Date; >> src\types\index.ts
echo } >> src\types\index.ts
echo. >> src\types\index.ts
echo export interface Client { >> src\types\index.ts
echo   id: string; >> src\types\index.ts
echo   name: string; >> src\types\index.ts
echo   taxId: string; // NIPT >> src\types\index.ts
echo   address?: string; >> src\types\index.ts
echo   phone?: string; >> src\types\index.ts
echo   email: string; >> src\types\index.ts
echo   status: 'active' | 'inactive' | 'pending'; >> src\types\index.ts
echo   accountantId: string; >> src\types\index.ts
echo   createdAt: Date; >> src\types\index.ts
echo   notes?: string; >> src\types\index.ts
echo } >> src\types\index.ts
echo. >> src\types\index.ts
echo export interface Document { >> src\types\index.ts
echo   id: string; >> src\types\index.ts
echo   clientId: string; >> src\types\index.ts
echo   filename: string; >> src\types\index.ts
echo   originalName: string; >> src\types\index.ts
echo   fileType: 'invoice' | 'receipt' | 'bank_statement' | 'payroll' | 'tax' | 'other'; >> src\types\index.ts
echo   fileSize: number; >> src\types\index.ts
echo   uploadDate: Date; >> src\types\index.ts
echo   month: number; >> src\types\index.ts
echo   year: number; >> src\types\index.ts
echo   processed: boolean; >> src\types\index.ts
echo   ocrData?: Record<string, any>; >> src\types\index.ts
echo   amount?: number; >> src\types\index.ts
echo   vat?: number; >> src\types\index.ts
echo } >> src\types\index.ts
echo. >> src\types\index.ts
echo export interface AccountingEntry { >> src\types\index.ts
echo   id: string; >> src\types\index.ts
echo   clientId: string; >> src\types\index.ts
echo   date: Date; >> src\types\index.ts
echo   description: string; >> src\types\index.ts
echo   debitAccount: string; >> src\types\index.ts
echo   creditAccount: string; >> src\types\index.ts
echo   amount: number; >> src\types\index.ts
echo   documentId?: string; >> src\types\index.ts
echo   category: 'revenue' | 'expense' | 'asset' | 'liability' | 'equity'; >> src\types\index.ts
echo   vatRate?: number; >> src\types\index.ts
echo   vatAmount?: number; >> src\types\index.ts
echo } >> src\types\index.ts
echo. >> src\types\index.ts
echo export interface Task { >> src\types\index.ts
echo   id: string; >> src\types\index.ts
echo   title: string; >> src\types\index.ts
echo   description?: string; >> src\types\index.ts
echo   clientId: string; >> src\types\index.ts
echo   assignedTo: string; >> src\types\index.ts
echo   status: 'pending' | 'in_progress' | 'review' | 'completed'; >> src\types\index.ts
echo   priority: 'low' | 'medium' | 'high'; >> src\types\index.ts
echo   dueDate?: Date; >> src\types\index.ts
echo   createdAt: Date; >> src\types\index.ts
echo   completedAt?: Date; >> src\types\index.ts
echo   comments: Comment[]; >> src\types\index.ts
echo } >> src\types\index.ts
echo. >> src\types\index.ts
echo export interface Comment { >> src\types\index.ts
echo   id: string; >> src\types\index.ts
echo   taskId: string; >> src\types\index.ts
echo   userId: string; >> src\types\index.ts
echo   content: string; >> src\types\index.ts
echo   createdAt: Date; >> src\types\index.ts
echo } >> src\types\index.ts
echo. >> src\types\index.ts
echo export interface DashboardStats { >> src\types\index.ts
echo   totalClients: number; >> src\types\index.ts
echo   activeClients: number; >> src\types\index.ts
echo   pendingDocuments: number; >> src\types\index.ts
echo   pendingTasks: number; >> src\types\index.ts
echo   upcomingDeadlines: number; >> src\types\index.ts
echo   monthlyRevenue?: number; >> src\types\index.ts
echo } >> src\types\index.ts

:: Krijo store-in
echo [9/10] Duke krijuar store-in Zustand...

echo import { create } from 'zustand'; > src\store\useStore.ts
echo import { Client, Document, Task, User } from '../types'; >> src\store\useStore.ts
echo. >> src\store\useStore.ts
echo interface AppState { >> src\store\useStore.ts
echo   // User state >> src\store\useStore.ts
echo   user: User | null; >> src\store\useStore.ts
echo   setUser: (user: User | null) => void; >> src\store\useStore.ts
echo   // Clients state >> src\store\useStore.ts
echo   clients: Client[]; >> src\store\useStore.ts
echo   selectedClient: Client | null; >> src\store\useStore.ts
echo   setClients: (clients: Client[]) => void; >> src\store\useStore.ts
echo   setSelectedClient: (client: Client | null) => void; >> src\store\useStore.ts
echo   addClient: (client: Client) => void; >> src\store\useStore.ts
echo   updateClient: (id: string, updates: Partial<Client>) => void; >> src\store\useStore.ts
echo   // Documents state >> src\store\useStore.ts
echo   documents: Document[]; >> src\store\useStore.ts
echo   setDocuments: (documents: Document[]) => void; >> src\store\useStore.ts
echo   // Tasks state >> src\store\useStore.ts
echo   tasks: Task[]; >> src\store\useStore.ts
echo   setTasks: (tasks: Task[]) => void; >> src\store\useStore.ts
echo   // UI state >> src\store\useStore.ts
echo   isLoading: boolean; >> src\store\useStore.ts
echo   setIsLoading: (loading: boolean) => void; >> src\store\useStore.ts
echo   notification: { type: 'success' | 'error' | 'info'; message: string } | null; >> src\store\useStore.ts
echo   setNotification: (notification: AppState['notification']) => void; >> src\store\useStore.ts
echo } >> src\store\useStore.ts
echo. >> src\store\useStore.ts
echo export const useStore = create<AppState>((set) => ({ >> src\store\useStore.ts
echo   user: null, >> src\store\useStore.ts
echo   setUser: (user) => set({ user }), >> src\store\useStore.ts
echo   clients: [], >> src\store\useStore.ts
echo   selectedClient: null, >> src\store\useStore.ts
echo   setClients: (clients) => set({ clients }), >> src\store\useStore.ts
echo   setSelectedClient: (client) => set({ selectedClient: client }), >> src\store\useStore.ts
echo   addClient: (client) => set((state) => ({ clients: [...state.clients, client] })), >> src\store\useStore.ts
echo   updateClient: (id, updates) => set((state) => ({ >> src\store\useStore.ts
echo     clients: state.clients.map(client => ^> >> src\store\useStore.ts
echo       client.id === id ? { ...client, ...updates } : client >> src\store\useStore.ts
echo     ) >> src\store\useStore.ts
echo   })), >> src\store\useStore.ts
echo   documents: [], >> src\store\useStore.ts
echo   setDocuments: (documents) => set({ documents }), >> src\store\useStore.ts
echo   tasks: [], >> src\store\useStore.ts
echo   setTasks: (tasks) => set({ tasks }), >> src\store\useStore.ts
echo   isLoading: false, >> src\store\useStore.ts
echo   setIsLoading: (loading) => set({ isLoading: loading }), >> src\store\useStore.ts
echo   notification: null, >> src\store\useStore.ts
echo   setNotification: (notification) => set({ notification }), >> src\store\useStore.ts
echo })); >> src\store\useStore.ts

:: Krijo disa faqe të zbrazëta
echo [10/10] Duke krijuar faqet...

echo import React from 'react'; > src\pages\Dashboard.tsx
echo. >> src\pages\Dashboard.tsx
echo const Dashboard: React.FC = () => { >> src\pages\Dashboard.tsx
echo   return ( >> src\pages\Dashboard.tsx
echo     ^<div className="p-6"^> >> src\pages\Dashboard.tsx
echo       ^<h1 className="text-3xl font-bold text-gray-900 mb-4"^>Dashboard^</h1^> >> src\pages\Dashboard.tsx
echo       ^<p className="text-gray-600"^>Kjo faqe do te permbaje statistikat dhe aktivitetet.^</p^> >> src\pages\Dashboard.tsx
echo     ^</div^> >> src\pages\Dashboard.tsx
echo   ); >> src\pages\Dashboard.tsx
echo }; >> src\pages\Dashboard.tsx
echo. >> src\pages\Dashboard.tsx
echo export default Dashboard; >> src\pages\Dashboard.tsx

echo const Clients: React.FC = () => { > src\pages\Clients.tsx
echo   return ( >> src\pages\Clients.tsx
echo     ^<div className="p-6"^> >> src\pages\Clients.tsx
echo       ^<h1 className="text-3xl font-bold text-gray-900 mb-4"^>Klientet^</h1^> >> src\pages\Clients.tsx
echo       ^<p className="text-gray-600"^>Menaxhimi i klienteve.^</p^> >> src\pages\Clients.tsx
echo     ^</div^> >> src\pages\Clients.tsx
echo   ); >> src\pages\Clients.tsx
echo }; >> src\pages\Clients.tsx
echo. >> src\pages\Clients.tsx
echo export default Clients; >> src\pages\Clients.tsx

echo const ClientDetails: React.FC = () => { > src\pages\ClientDetails.tsx
echo   return ( >> src\pages\ClientDetails.tsx
echo     ^<div className="p-6"^> >> src\pages\ClientDetails.tsx
echo       ^<h1 className="text-3xl font-bold text-gray-900 mb-4"^>Detajet e Klientit^</h1^> >> src\pages\ClientDetails.tsx
echo     ^</div^> >> src\pages\ClientDetails.tsx
echo   ); >> src\pages\ClientDetails.tsx
echo }; >> src\pages\ClientDetails.tsx
echo. >> src\pages\ClientDetails.tsx
echo export default ClientDetails; >> src\pages\ClientDetails.tsx

echo const Documents: React.FC = () => { > src\pages\Documents.tsx
echo   return ( >> src\pages\Documents.tsx
echo     ^<div className="p-6"^> >> src\pages\Documents.tsx
echo       ^<h1 className="text-3xl font-bold text-gray-900 mb-4"^>Dokumentet^</h1^> >> src\pages\Documents.tsx
echo     ^</div^> >> src\pages\Documents.tsx
echo   ); >> src\pages\Documents.tsx
echo }; >> src\pages\Documents.tsx
echo. >> src\pages\Documents.tsx
echo export default Documents; >> src\pages\Documents.tsx

echo const Accounting: React.FC = () => { > src\pages\Accounting.tsx
echo   return ( >> src\pages\Accounting.tsx
echo     ^<div className="p-6"^> >> src\pages\Accounting.tsx
echo       ^<h1 className="text-3xl font-bold text-gray-900 mb-4"^>Kontabiliteti^</h1^> >> src\pages\Accounting.tsx
echo     ^</div^> >> src\pages\Accounting.tsx
echo   ); >> src\pages\Accounting.tsx
echo }; >> src\pages\Accounting.tsx
echo. >> src\pages\Accounting.tsx
echo export default Accounting; >> src\pages\Accounting.tsx

echo const Tasks: React.FC = () => { > src\pages\Tasks.tsx
echo   return ( >> src\pages\Tasks.tsx
echo     ^<div className="p-6"^> >> src\pages\Tasks.tsx
echo       ^<h1 className="text-3xl font-bold text-gray-900 mb-4"^>Detyrat^</h1^> >> src\pages\Tasks.tsx
echo     ^</div^> >> src\pages\Tasks.tsx
echo   ); >> src\pages\Tasks.tsx
echo }; >> src\pages\Tasks.tsx
echo. >> src\pages\Tasks.tsx
echo export default Tasks; >> src\pages\Tasks.tsx

:: Kthehu në folderin fillestar
cd ..

echo.
echo ============================================
echo   PROJEKTI U KRIJUA ME SUKSES!
echo ============================================
echo.
echo Udhëzimet për t'u nisur:
echo.
echo 1. Shko në folderin %projectName%:
echo    cd %projectName%
echo.
echo 2. Instalo dependencat:
echo    npm install
echo.
echo 3. Nise serverin e zhvillimit:
echo    npm run dev
echo.
echo 4. Hape browserin dhe shko ne:
echo    http://localhost:5173
echo.
echo ============================================
pause