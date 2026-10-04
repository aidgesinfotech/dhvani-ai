import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { api } from '../../lib/api';
import { useSite } from '../../context/SiteContext';
import { FormStatus, Honeypot, type Status } from './FormStatus';

const EMPTY = { name: '', email: '', phone: '', company: '', country: '', service: '', message: '' };

export function ContactForm({ defaultService = '' }: { defaultService?: string }) {
  const { services } = useSite();
  const [form, setForm] = useState({ ...EMPTY, service: defaultService });
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const set = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ kind: 'sending' });
    try {
      const r = await api.post<{ message: string }>('/api/public/contact', { ...form, website });
      setStatus({ kind: 'ok', message: r.message });
      setForm({ ...EMPTY });
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong' });
    }
  };

  return (
    <form onSubmit={submit} className="relative grid gap-4 sm:grid-cols-2">
      <Honeypot value={website} onChange={setWebsite} />
      <div>
        <label className="field-label" htmlFor="c-name">
          Full name *
        </label>
        <input id="c-name" required className="field" value={form.name} onChange={set('name')} placeholder="Your name" />
      </div>
      <div>
        <label className="field-label" htmlFor="c-email">
          Work email *
        </label>
        <input
          id="c-email"
          type="email"
          required
          className="field"
          value={form.email}
          onChange={set('email')}
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label className="field-label" htmlFor="c-phone">
          Phone (with country code)
        </label>
        <input id="c-phone" className="field" value={form.phone} onChange={set('phone')} placeholder="+91 …" />
      </div>
      <div>
        <label className="field-label" htmlFor="c-company">
          Company
        </label>
        <input id="c-company" className="field" value={form.company} onChange={set('company')} placeholder="Company name" />
      </div>
      <div>
        <label className="field-label" htmlFor="c-country">
          Country
        </label>
        <input id="c-country" className="field" value={form.country} onChange={set('country')} placeholder="Country" />
      </div>
      <div>
        <label className="field-label" htmlFor="c-service">
          Service of interest
        </label>
        <select id="c-service" className="field" value={form.service} onChange={set('service')}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Other / Not sure">Other / Not sure</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="field-label" htmlFor="c-message">
          Project details *
        </label>
        <textarea
          id="c-message"
          required
          rows={5}
          className="field resize-y"
          value={form.message}
          onChange={set('message')}
          placeholder="Languages, data type, volumes, timelines…"
        />
      </div>
      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="text-xs text-fg-3">We respect your privacy. Your details are only used to respond to your enquiry.</p>
        <button type="submit" disabled={status.kind === 'sending'} className="btn btn-primary disabled:opacity-60">
          {status.kind === 'sending' ? 'Sending…' : 'Send Message'}
          <Send size={16} />
        </button>
      </div>
      <div className="sm:col-span-2">
        <FormStatus status={status} />
      </div>
    </form>
  );
}
