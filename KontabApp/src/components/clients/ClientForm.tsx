// src/components/clients/ClientForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { Client } from '../../types';

const clientSchema = z.object({
  name: z.string().min(2, 'Emri duhet të jetë të paktën 2 karaktere'),
  taxId: z.string().min(9, 'NIPT duhet të jetë 9 ose 10 karaktere').max(10),
  email: z.string().email('Email i pavlefshëm'),
  phone: z.string().optional(),
  address: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending']),
  notes: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
  title: string;
  initialData?: Partial<Client>;
  onSubmit: (data: ClientFormData) => void;
  onCancel: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
  title,
  initialData,
  onSubmit,
  onCancel
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: initialData || {
      status: 'active',
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Emri i Kompanisë"
              placeholder="Shkruani emrin e kompanisë"
              {...register('name')}
              error={errors.name?.message}
              required
            />

            <Input
              label="NIPT"
              placeholder="K12345678L"
              {...register('taxId')}
              error={errors.taxId?.message}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="info@kompania.com"
              {...register('email')}
              error={errors.email?.message}
              required
            />

            <Input
              label="Telefon"
              placeholder="+355 69 123 4567"
              {...register('phone')}
              error={errors.phone?.message}
            />

            <div className="md:col-span-2">
              <Input
                label="Adresa"
                placeholder="Rruga, Qyteti, Shteti"
                {...register('address')}
                error={errors.address?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statusi
              </label>
              <select
                {...register('status')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="active">Aktiv</option>
                <option value="pending">Në Pritje</option>
                <option value="inactive">Jo Aktiv</option>
              </select>
              {errors.status?.message && (
                <p className="mt-1 text-sm text-danger-600">{errors.status.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shënime
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Shënime shtesë për klientin..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
            >
              Anulo
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
            >
              {initialData ? 'Ruaj Ndryshimet' : 'Krijo Klient'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;