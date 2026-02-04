// src/components/documents/DocumentUpload.tsx
import React, { useState, useCallback } from 'react';
import { Upload, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Button from '../common/Button';
import Input from '../common/Input';
import { useStore } from '@/store/useStore';
import { useApi } from '@/services/useApi';

interface DocumentUploadProps {
  clientId?: string;
  onClose?: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ clientId, onClose }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [metadata, setMetadata] = useState({
    amount: '',
    vat: '',
    description: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  const { clients, addDocument } = useStore();
  const api = useApi();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    try {
      for (const file of files) {
        const document = await api.uploadDocument(
          file,
          clientId || clients[0]?.id || '',
          metadata
        );
        addDocument(document);
      }
      
      setFiles([]);
      setMetadata({
        amount: '',
        vat: '',
        description: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      });
      
      if (onClose) onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Lësho dokumentet këtu ose kliko për të zgjedhur
        </h3>
        <p className="text-sm text-gray-500 mb-1">
          PDF, Excel, CSV, JPEG, PNG (max 10MB)
        </p>
        <Button variant="outline" type="button">
          Zgjidh skedarët
        </Button>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Skedarët e zgjedhur</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metadata Form */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-medium text-gray-900 mb-4">Informacione shtesë</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Shuma (€)"
            type="number"
            value={metadata.amount}
            onChange={(e) => setMetadata({...metadata, amount: e.target.value})}
            placeholder="0.00"
          />
          <Input
            label="TVSH (€)"
            type="number"
            value={metadata.vat}
            onChange={(e) => setMetadata({...metadata, vat: e.target.value})}
            placeholder="0.00"
          />
          <div className="md:col-span-2">
            <Input
              label="Përshkrimi"
              value={metadata.description}
              onChange={(e) => setMetadata({...metadata, description: e.target.value})}
              placeholder="Përshkrimi i dokumentit..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Muaji
            </label>
            <select
              value={metadata.month}
              onChange={(e) => setMetadata({...metadata, month: parseInt(e.target.value)})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Viti
            </label>
            <select
              value={metadata.year}
              onChange={(e) => setMetadata({...metadata, year: parseInt(e.target.value)})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-success-500" />
          <span>{files.length} skedarë gati për ngarkim</span>
        </div>
        <div className="flex items-center space-x-3">
          {onClose && (
            <Button variant="ghost" onClick={onClose}>
              Anulo
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleUpload}
            loading={uploading}
            disabled={files.length === 0}
          >
            Ngarko Dokumentet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;