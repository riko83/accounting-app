import { http } from './http';
import { User } from '../types';

export interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await http.post('/api/auth/login', { email, password });
    return data;
  },

  async register(name: string, email: string, password: string, role: User['role'] = 'accountant'): Promise<AuthResponse> {
    const { data } = await http.post('/api/auth/register', { name, email, password, role });
    return data;
  },

  async me(): Promise<{ user: User }> {
    const { data } = await http.get('/api/auth/me');
    return data;
  },
};
