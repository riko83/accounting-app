import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Users, Lock, Mail } from 'lucide-react';
import { ApiResponse, LoginRequest } from '@accounting/shared';

const loginSchema = z.object({
  email: z.string().email('Email i pavlefshëm'),
  password: z.string().min(6, 'Fjalëkalimi duhet të ketë të paktën 6 karaktere')
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'accountant@accounting.app',
      password: 'accountant123'
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    
    try {
      const response = await axios.post<ApiResponse>('/auth/login', data);
      
      if (response.data.success) {
        const { token, user } = response.data.data as any;
        
        // Save token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        toast.success('Hyrja me sukses!');
        navigate('/dashboard');
      } else {
        toast.error(response.data.error || 'Hyrja dështoi');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Gabim në server');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (email: string, password: string) => {
    const event = {
      target: {
        email: { value: email },
        password: { value: password }
      }
    };
    
    onSubmit({ email, password } as LoginFormData);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Users size={48} color="#667eea" />
          </div>
          <h1>Accounting App</h1>
          <p>Hyni në sistemin tuaj të kontabilitetit</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '40px' }}
                placeholder="shembull@email.com"
                {...register('email')}
              />
            </div>
            {errors.email && <span className="form-error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Fjalëkalimi</label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: '40px' }}
                placeholder="••••••••"
                {...register('password')}
              />
            </div>
            {errors.password && <span className="form-error">{errors.password.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Duke hyrë...' : 'Hyr në Sistem'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#718096', marginBottom: '16px' }}>Ose përdorni këto kredenciale:</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleQuickLogin('admin@accounting.app', 'admin123')}
              disabled={loading}
            >
              Hyr si Administrator
            </button>
            
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleQuickLogin('accountant@accounting.app', 'accountant123')}
              disabled={loading}
            >
              Hyr si Kontabilist
            </button>
          </div>
        </div>

        <div className="login-footer">
          <p>© 2024 Accounting App - Të gjitha të drejtat e rezervuara</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;