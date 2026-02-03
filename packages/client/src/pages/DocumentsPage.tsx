import React, { useState, useEffect } from 'react';
import { Upload, Search, FileText, Download, Eye, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ApiResponse, Document, DocumentType } from '@accounting/shared';

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState({
    clientId: '',
    type: 'OTHER' as DocumentType,
    description: ''
  });
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    fetchDocuments();
    fetchClients();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get<ApiResponse<Document[]>>('/documents');
      if (response.data.success) {
        setDocuments(response.data.data || []);
      }
    } catch (error) {
      toast.error('Gabim në marrjen e dokumenteve');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get<ApiResponse<any[]>>('/clients');
      if (response.data.success) {
        setClients(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) { // 10MB
        toast.error('File duhet të jetë më i vogël se 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !uploadData.clientId) {
      toast.error('Zgjidhni një file dhe një klient');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('clientId', uploadData.clientId);
    formData.append('type', uploadData.type);
    formData.append('description', uploadData.description);

    setUploading(true);

    try {
      const response = await axios.post<ApiResponse<Document>>('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Dokumenti u ngarkua me sukses');
        setShowUploadModal(false);
        setSelectedFile(null);
        setUploadData({
          clientId: '',
          type: 'OTHER',
          description: ''
        });
        fetchDocuments();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Gabim në ngarkimin e dokumentit');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!window.confirm('Jeni i sigurt që dëshironi të fshini këtë dokument?')) return;

    try {
      const response = await axios.delete<ApiResponse>(`/documents/${id}`);
      if (response.data.success) {
        toast.success('Dokumenti u fshi me sukses');
        fetchDocuments();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Gabim në fshirjen e dokumentit');
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDocumentTypeLabel = (type: DocumentType) => {
    const labels: Record<DocumentType, string> = {
      INVOICE: 'Faturë',
      RECEIPT: 'Fletëpagesë',
      CONTRACT: 'Kontratë',
      BALANCE_SHEET: 'Bilanc',
      VAT_DECLARATION: 'Deklaratë TVSH',
      PAYROLL: 'Listë Pagese',
      OTHER: 'Tjetër'
    };
    return labels[type];
  };

  if (loading) {
    return (
      <div className="card">
        <p>Duke ngarkuar dokumentet...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Dokumentet</h3>
          <button 
            className="btn btn-primary"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload size={20} />
            Ngarko Dokument
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '40px' }}
              placeholder="Kërko dokumentet..."
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
                <th>Lloji</th>
                <th>Përshkrimi</th>
                <th>Madhësia</th>
                <th>Data e Ngarkimit</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td style={{ fontWeight: '500' }}>{doc.name}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: doc.type === 'INVOICE' ? '#c6f6d5' : 
                                     doc.type === 'RECEIPT' ? '#fed7d7' : 
                                     doc.type === 'CONTRACT' ? '#feebc8' :
                                     '#bee3f8',
                      color: doc.type === 'INVOICE' ? '#22543d' : 
                             doc.type === 'RECEIPT' ? '#742a2a' : 
                             doc.type === 'CONTRACT' ? '#744210' :
                             '#2c5282'
                    }}>
                      {getDocumentTypeLabel(doc.type)}
                    </span>
                  </td>
                  <td>{doc.description || '-'}</td>
                  <td>{(doc.fileSize / 1024 / 1024).toFixed(2)} MB</td>
                  <td>{new Date(doc.createdAt).toLocaleDateString('sq-AL')}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a 
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ padding: '6px' }}
                      >
                        <Eye size={16} />
                      </a>
                      <a 
                        href={doc.fileUrl}
                        download
                        className="btn btn-secondary"
                        style={{ padding: '6px' }}
                      >
                        <Download size={16} />
                      </a>
                      <button 
                        className="btn btn-danger"
                        style={{ padding: '6px' }}
                        onClick={() => handleDeleteDocument(doc.id)}
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

        {filteredDocuments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
            <FileText size={48} style={{ marginBottom: '16px', color: '#cbd5e0' }} />
            <p>Nuk u gjetën dokumente.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowUploadModal(true)}
              style={{ marginTop: '16px' }}
            >
              <Upload size={20} />
              Ngarko dokumentin e parë
            </button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Ngarko Dokument</h3>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowUploadModal(false)}
                style={{ padding: '8px' }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleUpload}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Zgjidhni File *</label>
                  <div 
                    style={{ 
                      border: '2px dashed #e2e8f0', 
                      borderRadius: '8px', 
                      padding: '40px', 
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    {selectedFile ? (
                      <div>
                        <FileText size={32} style={{ marginBottom: '12px', color: '#667eea' }} />
                        <p style={{ fontWeight: '500' }}>{selectedFile.name}</p>
                        <p style={{ fontSize: '12px', color: '#718096' }}>
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Upload size={32} style={{ marginBottom: '12px', color: '#a0aec0' }} />
                        <p>Klikoni për të zgjedhur një file</p>
                        <p style={{ fontSize: '12px', color: '#718096' }}>
                          Max 10MB. Formatet: PDF, Excel, Word, Images
                        </p>
                      </div>
                    )}
                    <input
                      id="file-input"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileSelect}
                      accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Klienti *</label>
                  <select
                    className="form-input"
                    value={uploadData.clientId}
                    onChange={(e) => setUploadData({...uploadData, clientId: e.target.value})}
                    required
                  >
                    <option value="">Zgjidhni një klient</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name} ({client.nipt})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Lloji i Dokumentit</label>
                  <select
                    className="form-input"
                    value={uploadData.type}
                    onChange={(e) => setUploadData({...uploadData, type: e.target.value as DocumentType})}
                  >
                    <option value="OTHER">Tjetër</option>
                    <option value="INVOICE">Faturë</option>
                    <option value="RECEIPT">Fletëpagesë</option>
                    <option value="CONTRACT">Kontratë</option>
                    <option value="BALANCE_SHEET">Bilanc</option>
                    <option value="VAT_DECLARATION">Deklaratë TVSH</option>
                    <option value="PAYROLL">Listë Pagese</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Përshkrimi (opsional)</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={uploadData.description}
                    onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                    placeholder="Përshkrimi i dokumentit..."
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUploadModal(false)}
                  disabled={uploading}
                >
                  Anulo
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                  disabled={uploading || !selectedFile || !uploadData.clientId}
                >
                  {uploading ? 'Duke ngarkuar...' : 'Ngarko'}
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

export default DocumentsPage;