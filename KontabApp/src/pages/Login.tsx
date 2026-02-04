import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { authApi } from '@/services/authApi';
import { useStore } from '@/store/useStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user, token } = await authApi.login(email, password);
      setAuth(user, token);
      const redirectTo = (location.state as { from?: string } | null)?.from || '/';
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login d?shtoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Hyrje</h1>
          <p className="text-gray-600 mt-1">Hyni me email dhe fjal?kalim</p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Fjal?kalimi"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" loading={loading} className="w-full">
            Hyr
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
