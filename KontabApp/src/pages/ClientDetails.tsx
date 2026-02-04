// src/pages/ClientDetails.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  DollarSign, 
  Calendar,
  Edit,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  MoreVertical,
  Download,
  Share2
} from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useStore } from '../store/useStore';

const ClientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { clients, documents, tasks } = useStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState<any>(null);
  
  const client = clients.find(c => c.id === id);
  
  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Klienti nuk u gjet</h2>
          <p className="text-gray-600 mb-4">Klienti me këtë ID nuk ekziston ose është fshirë</p>
          <Button variant="primary" onClick={() => navigate('/clients')}>
            Kthehu te lista
          </Button>
        </div>
      </div>
    );
  }

  const clientDocuments = documents.filter(d => d.clientId === id);
  const clientTasks = tasks.filter(t => t.clientId === id);
  const pendingTasks = clientTasks.filter(t => t.status !== 'completed');

  const handleSave = () => {
    // Këtu do të implementohet logjika për ruajtjen e ndryshimeve
    setIsEditing(false);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'text-success-600', bg: 'bg-success-50', icon: CheckCircle, label: 'Aktiv' };
      case 'pending':
        return { color: 'text-warning-600', bg: 'bg-warning-50', icon: Clock, label: 'Në Pritje' };
      case 'inactive':
        return { color: 'text-danger-600', bg: 'bg-danger-50', icon: AlertCircle, label: 'Jo Aktiv' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-50', icon: AlertCircle, label: 'E panjohur' };
    }
  };

  const statusInfo = getStatusInfo(client.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/clients')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
            <div className="flex items-center space-x-3 mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                <statusInfo.icon className="w-4 h-4 mr-1.5" />
                {statusInfo.label}
              </span>
              <span className="text-sm text-gray-500">NIPT: {client.taxId}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={Download}>
            Eksporto
          </Button>
          <Button variant="outline" icon={Share2}>
            Shpërndaj
          </Button>
          <Button 
            variant="primary" 
            icon={Edit}
            onClick={() => {
              setIsEditing(true);
              setEditedClient(client);
            }}
          >
            Modifiko
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Client Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information Card */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Informacionet e Klientit
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Building className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{client.name}</h4>
                      <p className="text-sm text-gray-500">Klient që nga {new Date(client.createdAt).toLocaleDateString('sq-AL')}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{client.email}</p>
                      </div>
                    </div>
                    {client.phone && (
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Telefon</p>
                          <p className="font-medium text-gray-900">{client.phone}</p>
                        </div>
                      </div>
                    )}
                    {client.address && (
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Adresa</p>
                          <p className="font-medium text-gray-900">{client.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Statistikat</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{clientDocuments.length}</p>
                        <p className="text-sm text-gray-500">Dokumente</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{clientTasks.length}</p>
                        <p className="text-sm text-gray-500">Detyra</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{pendingTasks.length}</p>
                        <p className="text-sm text-gray-500">Në pritje</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                        <p className="text-sm text-gray-500">Muaj aktiv</p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {client.notes && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Shënime</h4>
                      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                        <p className="text-sm text-gray-700">{client.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Dokumentet e Fundit
              </h3>
              <Button variant="ghost" size="sm">
                Shiko të gjitha
              </Button>
            </div>
            <div className="p-6">
              {clientDocuments.length > 0 ? (
                <div className="space-y-3">
                  {clientDocuments.slice(0, 5).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.originalName}</p>
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <span>{doc.fileType}</span>
                            <span>•</span>
                            <span>{new Date(doc.uploadDate).toLocaleDateString('sq-AL')}</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Nuk ka dokumente të ngarkuara</p>
                  <Button variant="outline" className="mt-3" size="sm">
                    Ngarko dokumentin e parë
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Tasks and Actions */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Detyrat në Pritje
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {pendingTasks.length} detyra të papërfunduara
              </p>
            </div>
            <div className="p-6">
              {pendingTasks.length > 0 ? (
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                          {task.description && (
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          )}
                          <div className="flex items-center space-x-3">
                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                              task.priority === 'high' 
                                ? 'bg-danger-100 text-danger-800'
                                : task.priority === 'medium'
                                ? 'bg-warning-100 text-warning-800'
                                : 'bg-success-100 text-success-800'
                            }`}>
                              {task.priority === 'high' ? 'Urgjente' : 
                               task.priority === 'medium' ? 'Normale' : 'Të ulëta'}
                            </span>
                            {task.dueDate && (
                              <span className="text-xs text-gray-500">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {new Date(task.dueDate).toLocaleDateString('sq-AL')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-success-300 mx-auto mb-3" />
                  <p className="text-gray-500">Nuk ka detyra në pritje</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Veprime të Shpejta
            </h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full" icon={FileText}>
                Ngarko Dokument
              </Button>
              <Button variant="outline" className="w-full" icon={DollarSign}>
                Regjistro Pagesë
              </Button>
              <Button variant="outline" className="w-full" icon={Calendar}>
                Shto Afat
              </Button>
              <Button variant="outline" className="w-full" icon={FileText}>
                Gjenero Raport
              </Button>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Përmbledhje Financiare
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Të ardhurat totale</span>
                <span className="font-medium text-gray-900">45,800 €</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Shpenzimet totale</span>
                <span className="font-medium text-gray-900">28,400 €</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bilanci aktual</span>
                <span className="font-medium text-success-600">17,400 €</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-900">Fitimi neto</span>
                <span className="font-bold text-success-600">17,400 €</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Modifiko Klientin</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
            </div>

            <form className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Emri i Kompanisë"
                  value={editedClient?.name || ''}
                  onChange={(e) => setEditedClient({...editedClient, name: e.target.value})}
                  required
                />

                <Input
                  label="NIPT"
                  value={editedClient?.taxId || ''}
                  onChange={(e) => setEditedClient({...editedClient, taxId: e.target.value})}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  value={editedClient?.email || ''}
                  onChange={(e) => setEditedClient({...editedClient, email: e.target.value})}
                  required
                />

                <Input
                  label="Telefon"
                  value={editedClient?.phone || ''}
                  onChange={(e) => setEditedClient({...editedClient, phone: e.target.value})}
                />

                <div className="md:col-span-2">
                  <Input
                    label="Adresa"
                    value={editedClient?.address || ''}
                    onChange={(e) => setEditedClient({...editedClient, address: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statusi
                  </label>
                  <select
                    value={editedClient?.status || 'active'}
                    onChange={(e) => setEditedClient({...editedClient, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="active">Aktiv</option>
                    <option value="pending">Në Pritje</option>
                    <option value="inactive">Jo Aktiv</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shënime
                </label>
                <textarea
                  value={editedClient?.notes || ''}
                  onChange={(e) => setEditedClient({...editedClient, notes: e.target.value})}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Shënime shtesë për klientin..."
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                >
                  Anulo
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSave}
                >
                  Ruaj Ndryshimet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetails;