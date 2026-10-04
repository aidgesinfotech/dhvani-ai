import { useEffect, useState, type FormEvent } from 'react';
import { KeyRound, Save } from 'lucide-react';
import { api, type SiteSettings } from '../../lib/api';
import { AdminHeader, Btn, Field, Notice, field } from './ui';

type Def = { key: string; label: string; long?: boolean; hint?: string };

const GROUPS: { title: string; fields: Def[] }[] = [
  {
    title: 'Brand',
    fields: [
      { key: 'site_name', label: 'Site name' },
      { key: 'tagline', label: 'Tagline' },
      { key: 'logo_url', label: 'Logo image URL', hint: 'Leave empty to use the built-in Dhvani.ai wordmark' },
      { key: 'cta_label', label: 'Header button label' },
      { key: 'footer_blurb', label: 'Footer description', long: true },
    ],
  },
  {
    title: 'Contact details',
    fields: [
      { key: 'phone', label: 'Phone' },
      { key: 'whatsapp', label: 'WhatsApp number', hint: 'International format, digits only, e.g. 919904199042' },
      { key: 'email', label: 'Email' },
      { key: 'business_hours', label: 'Business hours' },
      { key: 'city', label: 'City / region' },
      { key: 'address', label: 'Full address', long: true },
    ],
  },
  {
    title: 'Social links',
    fields: [
      { key: 'linkedin', label: 'LinkedIn URL' },
      { key: 'instagram', label: 'Instagram URL' },
      { key: 'facebook', label: 'Facebook URL' },
      { key: 'youtube', label: 'YouTube URL' },
      { key: 'x', label: 'X (Twitter) URL' },
    ],
  },
  {
    title: 'Default SEO',
    fields: [
      { key: 'seo_default_title', label: 'Default SEO title' },
      { key: 'seo_default_description', label: 'Default SEO description', long: true },
    ],
  },
];

const KNOWN = new Set(GROUPS.flatMap((g) => g.fields.map((f) => f.key)));

export function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [msg, setMsg] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [pw, setPw] = useState({ current_password: '', new_password: '', confirm: '', email: '' });
  const [pwMsg, setPwMsg] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  useEffect(() => {
    api.get<SiteSettings>('/api/admin/settings').then(setSettings).catch((e) => setMsg({ kind: 'error', text: e.message }));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      setSettings(await api.put<SiteSettings>('/api/admin/settings', settings));
      setMsg({ kind: 'ok', text: 'Settings saved — live on the website.' });
    } catch (e) {
      setMsg({ kind: 'error', text: e instanceof Error ? e.message : 'Save failed' });
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (pw.new_password !== pw.confirm) return setPwMsg({ kind: 'error', text: 'New passwords do not match' });
    try {
      const r = await api.put<{ message: string }>('/api/admin/account/password', {
        current_password: pw.current_password,
        new_password: pw.new_password,
        email: pw.email || undefined,
      });
      setPwMsg({ kind: 'ok', text: r.message });
      setPw({ current_password: '', new_password: '', confirm: '', email: '' });
    } catch (err) {
      setPwMsg({ kind: 'error', text: err instanceof Error ? err.message : 'Update failed' });
    }
  };

  const extra = Object.keys(settings).filter((k) => !KNOWN.has(k));

  return (
    <div>
      <AdminHeader title="Settings" subtitle="Global brand, contact and SEO settings used across the whole website.">
        <Btn onClick={save} disabled={saving}>
          <Save size={15} /> {saving ? 'Saving…' : 'Save settings'}
        </Btn>
      </AdminHeader>
      <Notice msg={msg} onClose={() => setMsg(null)} />

      <div className="grid gap-5 lg:grid-cols-2">
        {GROUPS.map((g) => (
          <div key={g.title} className="card space-y-4 p-5 md:p-6">
            <h2 className="font-display font-semibold text-white">{g.title}</h2>
            {g.fields.map((f) => (
              <Field key={f.key} label={f.label} hint={f.hint}>
                {f.long ? (
                  <textarea className={`${field} min-h-24`} value={settings[f.key] || ''} onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })} />
                ) : (
                  <input className={field} value={settings[f.key] || ''} onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })} />
                )}
              </Field>
            ))}
          </div>
        ))}
        {extra.length > 0 && (
          <div className="card space-y-4 p-5 md:p-6">
            <h2 className="font-display font-semibold text-white">Other</h2>
            {extra.map((k) => (
              <Field key={k} label={k}>
                <input className={field} value={settings[k] || ''} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} />
              </Field>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={changePassword} className="card card-blue mt-8 space-y-4 p-5 md:p-6">
        <h2 className="flex items-center gap-2 font-display font-semibold text-white">
          <KeyRound size={18} className="text-gold" /> Admin account
        </h2>
        <Notice msg={pwMsg} onClose={() => setPwMsg(null)} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Current password *">
            <input type="password" required className={field} value={pw.current_password} onChange={(e) => setPw({ ...pw, current_password: e.target.value })} />
          </Field>
          <Field label="New login email" hint="Optional — leave empty to keep the current email">
            <input type="email" className={field} value={pw.email} onChange={(e) => setPw({ ...pw, email: e.target.value })} />
          </Field>
          <Field label="New password *" hint="Minimum 8 characters">
            <input type="password" required minLength={8} className={field} value={pw.new_password} onChange={(e) => setPw({ ...pw, new_password: e.target.value })} />
          </Field>
          <Field label="Confirm new password *">
            <input type="password" required minLength={8} className={field} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
          </Field>
        </div>
        <Btn type="submit" variant="blue">
          Update account
        </Btn>
      </form>
    </div>
  );
}
