// src/pages/Help.tsx
import React, { useState } from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  Video, 
  MessageSquare,
  Search,
  ChevronRight,
  FileText,
  Users,
  Calculator,
  Calendar
} from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'getting-started',
      title: 'Fillimi',
      description: 'Mësoni si të filloni me KontabApp',
      icon: HelpCircle,
      color: 'bg-blue-100 text-blue-600',
      articles: [
        { title: 'Si të krijoni klientin tuaj të parë', time: '3 min' },
        { title: 'Ngarkimi i dokumenteve tuaja të para', time: '5 min' },
        { title: 'Krijoni detyrën tuaj të parë', time: '2 min' },
        { title: 'Konfigurimi i profilit tuaj', time: '4 min' }
      ]
    },
    {
      id: 'clients',
      title: 'Klientët',
      description: 'Menaxhimi i klientëve dhe të dhënave të tyre',
      icon: Users,
      color: 'bg-green-100 text-green-600',
      articles: [
        { title: 'Si të shtoni një klient të ri', time: '3 min' },
        { title: 'Menaxhimi i informacionit të klientit', time: '4 min' },
        { title: 'Importimi i klientëve nga Excel', time: '5 min' },
        { title: 'Kategorizimi i klientëve', time: '2 min' }
      ]
    },
    {
      id: 'documents',
      title: 'Dokumentet',
      description: 'Ngarkimi dhe menaxhimi i dokumenteve',
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
      articles: [
        { title: 'Formatet e dokumenteve të mbështetura', time: '4 min' },
        { title: 'Ngarkim i shumëfishtë i dokumenteve', time: '3 min' },
        { title: 'Organizimi i dokumenteve sipas klientit', time: '5 min' },
        { title: 'Kërkimi i dokumenteve', time: '2 min' }
      ]
    },
    {
      id: 'accounting',
      title: 'Kontabiliteti',
      description: 'Shënime kontabël dhe raporte',
      icon: Calculator,
      color: 'bg-yellow-100 text-yellow-600',
      articles: [
        { title: 'Shtimi i shënimeve kontabël', time: '4 min' },
        { title: 'Gjenerimi i bilancit', time: '5 min' },
        { title: 'Raportet financiare', time: '6 min' },
        { title: 'Eksporti i të dhënave', time: '3 min' }
      ]
    },
    {
      id: 'calendar',
      title: 'Kalendari',
      description: 'Menaxhimi i afateve dhe takimeve',
      icon: Calendar,
      color: 'bg-red-100 text-red-600',
      articles: [
        { title: 'Shtimi i afateve të reja', time: '3 min' },
        { title: 'Njoftimet për afatet', time: '2 min' },
        { title: 'Sharing i kalendarit me ekipin', time: '4 min' },
        { title: 'Eksporti i kalendarit', time: '3 min' }
      ]
    }
  ];

  const popularArticles = [
    { title: 'Si të ndryshoni fjalëkalimin', category: 'Siguria' },
    { title: 'Eksporti i të dhënave në Excel', category: 'Kontabiliteti' },
    { title: 'Ngarkimi i faturave me OCR', category: 'Dokumentet' },
    { title: 'Shtimi i anëtarëve të ekipit', category: 'Ekipi' }
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const selectedCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ndihmë & Mbështetje</h1>
          <p className="text-gray-600 mt-2">
            Gjeni përgjigjet për pyetjet më të shpeshta ose kontaktoni mbështetjen
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={Video}>
            Video Tutorials
          </Button>
          <Button variant="primary" icon={MessageSquare}>
            Kontakto mbështetjen
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <HelpCircle className="w-8 h-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Si mund të ndihmojmë?</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Kërko ndihmë, pyetje ose artikuj..."
              className="pl-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Përdorni fjalë kyçe si: "klient", "dokument", "faturë", "raport"
          </p>
        </div>
      </div>

      {/* Content */}
      {!activeCategory ? (
        <>
          {/* Popular Articles */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Artikujt më të kërkuar</h3>
              <BookOpen className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularArticles.map((article, index) => (
                <button
                  key={index}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">{article.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{article.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <div className="text-sm text-primary-600 font-medium">
                    {category.articles.length} artikuj
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Support */}
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-8">
            <div className="text-center max-w-2xl mx-auto">
              <MessageSquare className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nuk gjetët atë që kërkoni?
              </h3>
              <p className="text-gray-600 mb-6">
                Ekipi ynë i mbështetjes është këtu për t'ju ndihmuar. Na kontaktoni në çdo kohë.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="primary" size="lg" icon={MessageSquare}>
                  Bisedë live
                </Button>
                <Button variant="outline" size="lg">
                  Email: support@kontabapp.com
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Category Detail View */
        <div className="space-y-6">
          {/* Back Button */}
          <button
            onClick={() => setActiveCategory(null)}
            className="flex items-center text-primary-600 hover:text-primary-800"
          >
            <ChevronRight className="w-5 h-5 transform rotate-180 mr-2" />
            Kthehu te kategoritë
          </button>

          {selectedCategory && (
            <>
              {/* Category Header */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${selectedCategory.color}`}>
                    <selectedCategory.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedCategory.title}
                    </h2>
                    <p className="text-gray-600">{selectedCategory.description}</p>
                  </div>
                </div>
              </div>

              {/* Articles List */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Artikuj në këtë kategori</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {selectedCategory.articles.map((article, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {article.title}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{selectedCategory.title}</span>
                            <span>•</span>
                            <span>{article.time} lexim</span>
                          </div>
                        </div>
                        <button className="text-primary-600 hover:text-primary-800 font-medium">
                          Lexo më shumë
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <Video className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h4 className="font-medium text-gray-900 mb-2">Video Tutorials</h4>
          <p className="text-sm text-gray-600 mb-3">Mësoni me video të shkurtra</p>
          <Button variant="outline" size="sm">
            Shiko tani
          </Button>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h4 className="font-medium text-gray-900 mb-2">Dokumentacioni</h4>
          <p className="text-sm text-gray-600 mb-3">Udhëzues i plotë i përdorimit</p>
          <Button variant="outline" size="sm">
            Lexo dokumentacionin
          </Button>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <MessageSquare className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h4 className="font-medium text-gray-900 mb-2">FAQ</h4>
          <p className="text-sm text-gray-600 mb-3">Pyetjet më të shpeshta</p>
          <Button variant="outline" size="sm">
            Shiko FAQ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Help;