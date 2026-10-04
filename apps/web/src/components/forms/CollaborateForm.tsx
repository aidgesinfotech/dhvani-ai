import { useEffect, useState, type FormEvent } from 'react';
import { Building2, FileUp, Send, UserRound, X } from 'lucide-react';
import { api } from '../../lib/api';
import { FormStatus, Honeypot, type Status } from './FormStatus';

export type PartnerType = 'freelancer' | 'vendor';

const MAX_BYTES = 2.5 * 1024 * 1024;
const ACCEPT = '.pdf,.doc,.docx,.ppt,.pptx,.txt,.rtf,.odt';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  languages: '',
  expertise: '',
  experience_years: '',
  team_size: '',
  company_name: '',
  website_url: '',
  message: '',
};

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error('Could not read file'));
    r.readAsDataURL(file);
  });
}

export function CollaborateForm({ type, onTypeChange }: { type: PartnerType; onTypeChange: (t: PartnerType) => void }) {
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const vendor = type === 'vendor';
  const set = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    setFile(null);
    setStatus({ kind: 'idle' });
  }, [type]);

  const pickFile = (f: File | null) => {
    if (f && f.size > MAX_BYTES) {
      setStatus({ kind: 'error', message: 'File must be 2.5 MB or smaller.' });
      return;
    }
    setStatus({ kind: 'idle' });
    setFile(f);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ kind: 'sending' });
    try {
      const files = file
        ? [{ field: vendor ? 'company_profile' : 'resume', filename: file.name, mime: file.type, data: await toBase64(file) }]
        : [];
      const r = await api.post<{ message: string }>('/api/public/collaborate', { ...form, type, website, files });
      setStatus({ kind: 'ok', message: r.message });
      setForm(EMPTY);
      setFile(null);
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong' });
    }
  };

  const tab = (t: PartnerType, label: string, Ico: typeof UserRound) => (
    <button
      type="button"
      onClick={() => onTypeChange(t)}
      aria-pressed={type === t}
      className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all ${
        type === t ? 'bg-gold text-black shadow-[0_8px_24px_-8px_rgba(209,169,8,0.8)]' : 'text-fg-2 hover:text-white'
      }`}
    >
      <Ico size={16} /> {label}
    </button>
  );

  return (
    <form onSubmit={submit} className="relative">
      <Honeypot value={website} onChange={setWebsite} />
      <div className="flex gap-1 rounded-full border border-line-2 bg-white/[0.03] p-1">
        {tab('freelancer', 'I Am a Freelancer', UserRound)}
        {tab('vendor', 'I Am a Vendor', Building2)}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="p-name">
            {vendor ? 'Contact person name *' : 'Name *'}
          </label>
          <input id="p-name" required className="field" value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label className="field-label" htmlFor="p-email">
            Email *
          </label>
          <input id="p-email" type="email" required className="field" value={form.email} onChange={set('email')} />
        </div>
        <div>
          <label className="field-label" htmlFor="p-phone">
            Phone (with country code) *
          </label>
          <input id="p-phone" required className="field" value={form.phone} onChange={set('phone')} placeholder="+91 …" />
        </div>
        {vendor ? (
          <div>
            <label className="field-label" htmlFor="p-company">
              Company name
            </label>
            <input id="p-company" className="field" value={form.company_name} onChange={set('company_name')} />
          </div>
        ) : (
          <div>
            <label className="field-label" htmlFor="p-exp">
              Number of years experience
            </label>
            <input id="p-exp" className="field" value={form.experience_years} onChange={set('experience_years')} placeholder="e.g. 3" />
          </div>
        )}
        <div>
          <label className="field-label" htmlFor="p-country">
            Country
          </label>
          <input id="p-country" className="field" value={form.country} onChange={set('country')} />
        </div>
        <div>
          <label className="field-label" htmlFor="p-city">
            City
          </label>
          <input id="p-city" className="field" value={form.city} onChange={set('city')} />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="p-langs">
            Languages you can cover
          </label>
          <input
            id="p-langs"
            className="field"
            value={form.languages}
            onChange={set('languages')}
            placeholder="e.g. Hindi, Gujarati, English"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="p-expertise">
            Expertise
          </label>
          <input
            id="p-expertise"
            className="field"
            value={form.expertise}
            onChange={set('expertise')}
            placeholder="Transcription, annotation, voice recording, translation…"
          />
        </div>
        {vendor && (
          <>
            <div>
              <label className="field-label" htmlFor="p-exp-v">
                Number of years experience
              </label>
              <input id="p-exp-v" className="field" value={form.experience_years} onChange={set('experience_years')} />
            </div>
            <div>
              <label className="field-label" htmlFor="p-team">
                Current team size
              </label>
              <input id="p-team" className="field" value={form.team_size} onChange={set('team_size')} placeholder="e.g. 25" />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="p-web">
                Website
              </label>
              <input id="p-web" className="field" value={form.website_url} onChange={set('website_url')} placeholder="https://" />
            </div>
          </>
        )}
        <div className="sm:col-span-2">
          <span className="field-label">{vendor ? 'Company profile' : 'Candidate resume'} (PDF, DOC, PPT — max 2.5 MB)</span>
          {file ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/40 bg-gold/5 px-4 py-3">
              <span className="truncate text-sm text-white">{file.name}</span>
              <button type="button" onClick={() => setFile(null)} className="text-fg-3 hover:text-white" aria-label="Remove file">
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-royal-light/40 bg-royal/10 px-4 py-6 text-sm text-fg-2 hover:border-gold/60 hover:text-white transition-colors">
              <FileUp size={20} className="text-gold" />
              Click to upload {vendor ? 'company profile' : 'your resume'}
              <input type="file" accept={ACCEPT} className="sr-only" onChange={(e) => pickFile(e.target.files?.[0] || null)} />
            </label>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="p-msg">
            Anything else we should know?
          </label>
          <textarea id="p-msg" rows={3} className="field resize-y" value={form.message} onChange={set('message')} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <button type="submit" disabled={status.kind === 'sending'} className="btn btn-primary w-full sm:w-auto sm:self-start disabled:opacity-60">
          {status.kind === 'sending' ? 'Submitting…' : vendor ? 'Register as Vendor' : 'Register as Freelancer'}
          <Send size={16} />
        </button>
        <FormStatus status={status} />
      </div>
    </form>
  );
}
