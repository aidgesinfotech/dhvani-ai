import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { api, TOKEN_KEY } from '../../lib/api';
import { LOGO_SRC } from '../../components/ui/Logo';
import { field, labelCls } from './ui';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.post<{ token: string }>('/api/auth/login', { email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute -top-40 left-1/2 h-[30rem] w-[40rem] max-w-[140vw] -translate-x-1/2 glow-blue" aria-hidden />
      <form onSubmit={submit} className="card relative w-full max-w-sm space-y-5 p-8">
        <div className="text-center">
          <img src={LOGO_SRC} alt="Dhvani.ai" className="mx-auto h-16 w-auto" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-white/45">Sign in to manage your website</p>
        </div>
        <label className="block">
          <span className={labelCls}>Email</span>
          <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} mt-1.5`} required />
        </label>
        <label className="block">
          <span className={labelCls}>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${field} mt-1.5`}
            required
          />
        </label>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-60">
          {loading ? 'Signing in…' : 'Sign In'} <LogIn size={16} />
        </button>
      </form>
    </div>
  );
}
