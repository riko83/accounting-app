import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Download } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ApiResponse, Client, ClientStatus } from '@accounting/shared';

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    nipt: '',
    email: '',
    phone: '',
    address: '',
    status: 'ACTIVE' as ClientStatus
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get<ApiResponse<Client[]>>('/clients');
      if (response.data.success) {
        setClients(response.data.data || []);
      }
    } catch (error) {
      toast.error('Gabim në marrjen e klientëve');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<ApiResponse<Client>>('/clients', formData);
      if (response.data.success) {
        toast.success('Klienti u krijua me sukses');
        setShowCreateModal(false);
        setFormData({
          name: '',
          nipt: '',
          email: '',
          phone: '',
          address: '',
          status: 'ACTIVE'
        });
        fetchClients();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Gabim në krijimin e klientit');
    }
  };

  const handleEditClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    try {
      const response = await axios.put<ApiResponse<Client>>(`/clients/${selectedClient.id}`, formData);
      if (response.data.success) {
        toast.success('Klienti u përditësua me sukses');
        setShowEditModal(false);
        setSelectedClient(null);
        fetchClients();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Gabim në përditësimin e klientit');
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!window.confirm('Jeni i sigurt që dëshironi të fshini këtë klient?')) return;

    try {
      const response = await axios.delete<ApiResponse>(`/clients/${id}`);
      if (response.data.success) {
        toast.success('Klienti u fshi me sukses');
        fetchClients();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Gabim në fshirjen e klientit');
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.nipt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="card">
        <p>Duke ngarkuar klientët...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Klientët</h3>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={20} />
            Shto Klient të Ri
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '40px' }}
              placeholder="Kërko klientët..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Emri</th>
                <th>NIPT</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Statusi</th>
                <th>Data e Regjistrimit</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td style={{ fontWeight: '500' }}>{client.name}</td>
                  <td>{client.nipt}</td>
                  <td>{client.email || '-'}</td>
                  <td>{client.phone || '-'}</td>
                  <td>
                    <span className={`status-badge status-${client.status.toLowerCase()}`}>
                      {client.status}
                    </span>
                  </td>
                  <td>{new Date(client.createdAt).toLocaleDateString('sq-AL')}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn btn-secondary"
                        style={{ padding: '6px' }}
                        onClick={() => {
                          setSelectedClient(client);
                          setFormData({
                            name: client.name,
                            nipt: client.nipt,
                            email: client.email || '',
                            phone: client.phone || '',
                            address: client.address || '',
                            status: client.status
                          });
                          setShowEditModal(true);
                        }}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="btn btn-danger"
                        style={{ padding: '6px' }}
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
            <p>Nuk u gjetën klientë.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
              style={{ marginTop: '16px' }}
            >
              <Plus size={20} />
              Krijo klientin e parë
            </button>
          </div>
        )}
      </div>

      {/* Create Client Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Shto Klient të Ri</h3>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowCreateModal(false)}
                style={{ padding: '8px' }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreateClient}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Emri i Kompanisë *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">NIPT *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.nipt}
                    onChange={(e) => setFormData({...formData, nipt: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Telefon</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Adresa</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Statusi</label>
                  <select
                    className="form-input"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as ClientStatus})}
                  >
                    <option value="ACTIVE">Aktiv</option>
                    <option value="INACTIVE">Jo Aktiv</option>
                    <option value="PENDING">Në Pritje</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Anulo
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                >
                  Krijo Klient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditModal && selectedClient && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Përditëso Klientin</h3>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
                style={{ padding: '8px' }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleEditClient}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Emri i Kompanisë *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">NIPT *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.nipt}
                    onChange={(e) => setFormData({...formData, nipt: e.target.value})}
                    required
                    disabled
                  />
                  <small style={{ color: '#718096' }}>NIPT nuk mund të ndryshohet</small>
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Telefon</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Adresa</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Statusi</label>
                  <select
                    className="form-input"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as ClientStatus})}
                  >
                    <option value="ACTIVE">Aktiv</option>
                    <option value="INACTIVE">Jo Aktiv</option>
                    <option value="PENDING">Në Pritje</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Anulo
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                >
                  Përditëso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .modal {
          background: white;
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .modal-footer {
          padding: 20px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
      `}</style>
    </div>
  );
};

export default ClientsPage;