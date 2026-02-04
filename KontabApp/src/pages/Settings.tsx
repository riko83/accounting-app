// src/pages/Settings.tsx
import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  CreditCard, 
  Users,
  Save,
  Upload,
  Download
} from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Kontabilist User',
    email: 'kontabilist@example.com',
    phone: '+355 69 123 4567',
    company: 'Kontabilist & Partner',
    address: 'Tirana, Albania',
    language: 'sq',
    timezone: 'Europe/Tirane'
  });

  const tabs = [
    { id: 'profile', label: 'Profili', icon: User },
    { id: 'notifications', label: 'Njoftimet', icon: Bell },
    { id: 'security', label: 'Siguria', icon: Shield },
    { id: 'team', label: 'Ekipi', icon: Users },
    { id: 'billing', label: 'Faturimi', icon: CreditCard },
    { id: 'general', label: 'Të përgjithshme', icon: Globe },
  ];

  const saveSettings = () => {
    // Këtu do të implementohet logjika për ruajtjen e settings
    console.log('Settings saved:', profile);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Menaxhoni cilësimet e llogarisë suaj
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={Download}>
            Eksporto të dhënat
          </Button>
          <Button variant="primary" icon={Save} onClick={saveSettings}>
            Ruaj ndryshimet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200">
            <nav className="p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg mb-1 transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Profili Personal</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 text-2xl font-bold">
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <Button variant="outline" icon={Upload} className="mb-2">
                      Ndrysho foton
                    </Button>
                    <p className="text-sm text-gray-500">JPG, PNG deri në 5MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Emri i plotë"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    required
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    required
                  />

                  <Input
                    label="Telefon"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />

                  <Input
                    label="Kompania"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                  />

                  <div className="md:col-span-2">
                    <Input
                      label="Adresa"
                      value={profile.address}
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Njoftimet</h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Njoftime me email</h4>
                      <p className="text-sm text-gray-600">Dërgo njoftime për detyrat dhe afatet</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Njoftime push</h4>
                      <p className="text-sm text-gray-600">Njoftime në desktop për afate urgjente</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Përmbledhje javore</h4>
                      <p className="text-sm text-gray-600">Dërgo përmbledhjen e aktivitetit javor</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Siguria</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Fjalëkalimi aktual"
                    type="password"
                    placeholder="••••••••"
                  />

                  <Input
                    label="Fjalëkalimi i ri"
                    type="password"
                    placeholder="••••••••"
                  />

                  <Input
                    label="Konfirmo fjalëkalimin e ri"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <Button variant="primary">
                  Ndrysho fjalëkalimin
                </Button>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Seanca aktiv</h4>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Tirana, Albania</p>
                      <p className="text-sm text-gray-600">Chrome • Windows • IP: 192.168.1.1</p>
                    </div>
                    <span className="text-sm text-success-600 font-medium">Aktiv</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Cilësime të përgjithshme</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gjuha
                    </label>
                    <select
                      value={profile.language}
                      onChange={(e) => setProfile({...profile, language: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="sq">Shqip</option>
                      <option value="en">English</option>
                      <option value="it">Italiano</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zona kohore
                    </label>
                    <select
                      value={profile.timezone}
                      onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="Europe/Tirane">Europe/Tirane (GMT+1)</option>
                      <option value="Europe/London">Europe/London (GMT+0)</option>
                      <option value="Europe/Berlin">Europe/Berlin (GMT+1)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Formati i datës
                  </label>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      DD/MM/YYYY
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      MM/DD/YYYY
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      YYYY-MM-DD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;