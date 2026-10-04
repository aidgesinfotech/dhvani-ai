import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { api } from '../../lib/api';
import { FormStatus, Honeypot, type Status } from './FormStatus';

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ kind: 'sending' });
    try {
      const r = await api.post<{ message: string }>('/api/public/newsletter', { email, website });
      setStatus({ kind: 'ok', message: r.message });
      setEmail('');
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong' });
    }
  };

  return (
    <form onSubmit={submit} className="relative space-y-3">
      <Honeypot value={website} onChange={setWebsite} />
      <div className={`flex gap-2 ${compact ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'}`}>
        <label className="sr-only" htmlFor={compact ? 'nl-email-c' : 'nl-email'}>
          Email address
        </label>
        <input
          id={compact ? 'nl-email-c' : 'nl-email'}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your work email"
          className="field flex-1 min-w-0 !rounded-full"
        />
        <button type="submit" disabled={status.kind === 'sending'} className="btn btn-primary shrink-0 disabled:opacity-60">
          {status.kind === 'sending' ? 'Subscribing…' : 'Subscribe'}
          <ArrowRight size={16} />
        </button>
      </div>
      <FormStatus status={status} />
    </form>
  );
}
