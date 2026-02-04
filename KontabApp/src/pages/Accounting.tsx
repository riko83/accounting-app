// src/pages/Accounting.tsx
import React, { useState } from 'react';
import { Plus, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react';
import Button from '../components/common/Button';

const Accounting: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('this_month');

  const entries = [
    {
      id: '1',
      date: '2024-03-15',
      description: 'Faturë shitje - Tech Solutions',
      debitAccount: '4010 - Të ardhura',
      creditAccount: '1110 - Llogari bankare',
      amount: 12500,
      vat: 2500,
      category: 'revenue'
    },
    {
      id: '2',
      date: '2024-03-14',
      description: 'Blerje pajisjesh zyre',
      debitAccount: '5210 - Pajisje zyre',
      creditAccount: '1110 - Llogari bankare',
      amount: 3500,
      vat: 700,
      category: 'expense'
    },
    {
      id: '3',
      date: '2024-03-10',
      description: 'Paguar qira lokali',
      debitAccount: '6310 - Shpenzime qiraje',
      creditAccount: '1110 - Llogari bankare',
      amount: 2000,
      vat: 0,
      category: 'expense'
    },
    {
      id: '4',
      date: '2024-03-05',
      description: 'Faturë për shërbime konsulencë',
      debitAccount: '4010 - Të ardhura',
      creditAccount: '1110 - Llogari bankare',
      amount: 8000,
      vat: 1600,
      category: 'revenue'
    },
    {
      id: '5',
      date: '2024-03-01',
      description: 'Kredi bankare',
      debitAccount: '1110 - Llogari bankare',
      creditAccount: '2410 - Kredi afatshkurtra',
      amount: 50000,
      vat: 0,
      category: 'liability'
    }
  ];

  const periods = [
    { value: 'today', label: 'Sot' },
    { value: 'this_week', label: 'Këtë javë' },
    { value: 'this_month', label: 'Këtë muaj' },
    { value: 'this_quarter', label: 'Këtë tremujor' },
    { value: 'this_year', label: 'Këtë vit' }
  ];

  const accounts = [
    { code: '1110', name: 'Llogari bankare', type: 'asset', balance: 65200 },
    { code: '1210', name: 'Arkë', type: 'asset', balance: 1500 },
    { code: '1310', name: 'Llogari të arkëtueshme', type: 'asset', balance: 28400 },
    { code: '2110', name: 'Llogari të pagueshme', type: 'liability', balance: 15200 },
    { code: '2410', name: 'Kredi afatshkurtra', type: 'liability', balance: 50000 },
    { code: '3110', name: 'Kapital', type: 'equity', balance: 100000 },
    { code: '4010', name: 'Të ardhura', type: 'revenue', balance: 85000 },
    { code: '5210', name: 'Pajisje zyre', type: 'expense', balance: 3500 },
    { code: '6310', name: 'Shpenzime qiraje', type: 'expense', balance: 2000 }
  ];

  const calculateTotals = () => {
    const totalRevenue = entries
      .filter(e => e.category === 'revenue')
      .reduce((sum, entry) => sum + entry.amount, 0);
    
    const totalExpenses = entries
      .filter(e => e.category === 'expense')
      .reduce((sum, entry) => sum + entry.amount, 0);
    
    const totalVAT = entries.reduce((sum, entry) => sum + (entry.vat || 0), 0);
    
    return {
      revenue: totalRevenue,
      expenses: totalExpenses,
      vat: totalVAT,
      profit: totalRevenue - totalExpenses
    };
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kontabiliteti</h1>
          <p className="text-gray-600 mt-2">
            Menaxhoni shënimet kontabël dhe gjeneroni raporte
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={Download}>
            Eksporto Raport
          </Button>
          <Button variant="primary" icon={Plus}>
            Shto Shënim
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Periudha:</span>
          </div>
          <div className="flex items-center space-x-2">
            {periods.map(period => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">Të ardhurat</div>
            <TrendingUp className="w-5 h-5 text-success-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {totals.revenue.toLocaleString()} €
          </div>
          <div className="text-sm text-success-600 mt-1">+12% nga muaji i kaluar</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">Shpenzimet</div>
            <TrendingDown className="w-5 h-5 text-danger-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {totals.expenses.toLocaleString()} €
          </div>
          <div className="text-sm text-danger-600 mt-1">-5% nga muaji i kaluar</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">TVSH</div>
            <div className="text-primary-500 font-bold">V</div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {totals.vat.toLocaleString()} €
          </div>
          <div className="text-sm text-gray-600 mt-1">Të pagueshme</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">Fitimi neto</div>
            <div className={`w-5 h-5 ${totals.profit >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
              {totals.profit >= 0 ? '↑' : '↓'}
            </div>
          </div>
          <div className={`text-2xl font-bold ${totals.profit >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
            {totals.profit.toLocaleString()} €
          </div>
          <div className={`text-sm ${totals.profit >= 0 ? 'text-success-600' : 'text-danger-600'} mt-1`}>
            {totals.profit >= 0 ? '+24%' : '-8%'} nga muaji i kaluar
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Entries */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Shënimet e Fundit
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Transaksionet e fundit kontabël
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Përshkrimi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shuma
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {entry.description}
                      </div>
                      <div className="text-xs text-gray-500">
                        {entry.debitAccount} / {entry.creditAccount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        entry.category === 'revenue' 
                          ? 'text-success-600' 
                          : entry.category === 'expense'
                          ? 'text-danger-600'
                          : 'text-gray-900'
                      }`}>
                        {entry.amount.toLocaleString()} €
                      </div>
                      {entry.vat > 0 && (
                        <div className="text-xs text-gray-500">
                          TVSH: {entry.vat.toLocaleString()} €
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart of Accounts */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Plani Kontabël
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Llogaritë dhe bilancet aktuale
            </p>
          </div>
          <div className="overflow-y-auto max-h-[400px]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kod
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Llogaria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bilanci
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {accounts.map((account) => (
                  <tr key={account.code} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {account.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {account.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        account.type === 'asset' ? 'bg-blue-100 text-blue-800' :
                        account.type === 'liability' ? 'bg-red-100 text-red-800' :
                        account.type === 'equity' ? 'bg-green-100 text-green-800' :
                        account.type === 'revenue' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {account.type === 'asset' ? 'Aktive' :
                         account.type === 'liability' ? 'Detyrime' :
                         account.type === 'equity' ? 'Kapital' :
                         account.type === 'revenue' ? 'Të ardhura' : 'Shpenzime'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {account.balance.toLocaleString()} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Raporte të Shpejta
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="text-left p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <div className="text-sm font-medium text-gray-900">Bilanci i Gjendjes</div>
            <div className="text-xs text-gray-500 mt-1">Aktivet = Detyrimet + Kapitali</div>
          </button>
          <button className="text-left p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <div className="text-sm font-medium text-gray-900">Pasqyra e Fitimit</div>
            <div className="text-xs text-gray-500 mt-1">Të ardhura - Shpenzime</div>
          </button>
          <button className="text-left p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <div className="text-sm font-medium text-gray-900">Deklarata TVSH</div>
            <div className="text-xs text-gray-500 mt-1">Për periudhën aktuale</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accounting;