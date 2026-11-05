import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';
import { DEFAULT_HOME, TASK_ICONS, mergeHome, type HomeContent, type HomeSection } from '../home/homeModel';
import { AdminHeader, Btn, Field, Notice, SaveDock, field } from './ui';

const PANELS = [
  { id: 'hero', label: 'Hero', hint: 'First screen' },
  { id: 'people', label: 'Contributors', hint: 'Profile slider' },
  { id: 'countries', label: 'Countries', hint: 'Language row' },
  { id: 'tasks', label: 'Tasks', hint: 'What people do' },
  { id: 'map', label: 'World map', hint: 'Region tabs' },
  { id: 'page', label: 'Rest of homepage', hint: 'Sections below' },
  { id: 'seo', label: 'SEO', hint: 'Title and description' },
] as const;

type Panel = (typeof PANELS)[number]['id'];

const csv = (list: string[]) => list.join(', ');
const split = (value: string) => value.split(',').map((part) => part.trim()).filter(Boolean);

function move<T>(list: T[], index: number, dir: number) {
  const next = [...list];
  const j = index + dir;
  if (j < 0 || j >= next.length) return list;
  [next[index], next[j]] = [next[j], next[index]];
  return next;
}

function RowActions({ onUp, onDown, onRemove }: { onUp: () => void; onDown: () => void; onRemove: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button type="button" onClick={onUp} className="rounded-lg p-2 text-white/45 hover:text-white" aria-label="Move up">
        <ArrowUp size={14} />
      </button>
      <button type="button" onClick={onDown} className="rounded-lg p-2 text-white/45 hover:text-white" aria-label="Move down">
        <ArrowDown size={14} />
      </button>
      <button type="button" onClick={onRemove} className="rounded-lg p-2 text-red-300/70 hover:text-red-200" aria-label="Remove">
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export function AdminHomeStudio() {
  const [home, setHome] = useState<HomeContent>(DEFAULT_HOME);
  const [panel, setPanel] = useState<Panel>('hero');
  const [openSection, setOpenSection] = useState(DEFAULT_HOME.sections[0]?.id || '');
  const [msg, setMsg] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<HomeContent | null>('/api/admin/homepage')
      .then((saved) => setHome(mergeHome(saved)))
      .catch((e) => setMsg({ kind: 'error', text: e.message }))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      setHome(mergeHome(await api.put<HomeContent>('/api/admin/homepage', home)));
      setMsg({ kind: 'ok', text: 'Homepage saved. Refresh the public site to see it.' });
    } catch (e) {
      setMsg({ kind: 'error', text: e instanceof Error ? e.message : 'Save failed' });
    } finally {
      setSaving(false);
    }
  };

  const hero = home.hero;
  const setHero = (patch: Partial<HomeContent['hero']>) => setHome({ ...home, hero: { ...hero, ...patch } });

  if (loading) return <p className="text-white/40">Loading homepage…</p>;

  return (
    <div className="pb-24">
      <AdminHeader title="Homepage" subtitle="This editor controls the live homepage: hero, contributors, countries, tasks, the world map, and every section below it. FAQ answers are edited under FAQs → General.">
        <Btn onClick={save} disabled={saving}>
          <Save size={15} /> {saving ? 'Saving…' : 'Save homepage'}
        </Btn>
      </AdminHeader>
      <Notice msg={msg} onClose={() => setMsg(null)} />

      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <div>
          <div className="-mx-4 mb-1 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
            {PANELS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPanel(item.id)}
                className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold ${panel === item.id ? 'bg-gold text-black' : 'border border-white/12 text-white/70'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="sticky top-6 hidden self-start lg:block">
            <div className="card space-y-1 p-2">
              {PANELS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPanel(item.id)}
                  className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left ${
                    panel === item.id ? 'bg-gold text-black' : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className={`font-mono text-[10px] ${panel === item.id ? 'text-black/60' : 'text-white/35'}`}>{item.hint}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          {panel === 'hero' && (
            <div className="card space-y-4 p-5 md:p-6">
              <h2 className="font-display text-lg font-semibold text-white">Hero</h2>
              <Field label="Eyebrow">
                <input className={field} value={hero.eyebrow} onChange={(e) => setHero({ eyebrow: e.target.value })} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Headline line 1">
                  <input className={field} value={hero.line1} onChange={(e) => setHero({ line1: e.target.value })} />
                </Field>
                <Field label="Headline line 2">
                  <input className={field} value={hero.line2} onChange={(e) => setHero({ line2: e.target.value })} />
                </Field>
              </div>
              <Field label="Intro">
                <textarea className={`${field} min-h-28`} value={hero.body} onChange={(e) => setHero({ body: e.target.value })} />
              </Field>
              <Field label="Background image URL">
                <input className={field} value={hero.image} onChange={(e) => setHero({ image: e.target.value })} />
              </Field>
              {hero.chips.map((chip, i) => (
                <div key={i} className="grid gap-3 sm:grid-cols-[1fr_140px]">
                  <Field label={`Chip ${i + 1}`}>
                    <input
                      className={field}
                      value={chip.label}
                      onChange={(e) => {
                        const chips = hero.chips.map((c, n) => (n === i ? { ...c, label: e.target.value } : c));
                        setHero({ chips });
                      }}
                    />
                  </Field>
                  <Field label="Colour">
                    <select
                      className={field}
                      value={chip.tone}
                      onChange={(e) => {
                        const tone: 'gold' | 'cyan' = e.target.value === 'cyan' ? 'cyan' : 'gold';
                        const chips = hero.chips.map((c, n) => (n === i ? { ...c, tone } : c));
                        setHero({ chips });
                      }}
                    >
                      <option value="gold">Gold</option>
                      <option value="cyan">Cyan</option>
                    </select>
                  </Field>
                </div>
              ))}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Yellow button title">
                  <input className={field} value={hero.primaryLabel} onChange={(e) => setHero({ primaryLabel: e.target.value })} />
                </Field>
                <Field label="Yellow button line">
                  <input className={field} value={hero.primaryHint} onChange={(e) => setHero({ primaryHint: e.target.value })} />
                </Field>
                <Field label="Yellow button link">
                  <input className={field} value={hero.primaryTo} onChange={(e) => setHero({ primaryTo: e.target.value })} />
                </Field>
                <Field label="Outline button title">
                  <input className={field} value={hero.secondaryLabel} onChange={(e) => setHero({ secondaryLabel: e.target.value })} />
                </Field>
                <Field label="Outline button line">
                  <input className={field} value={hero.secondaryHint} onChange={(e) => setHero({ secondaryHint: e.target.value })} />
                </Field>
                <Field label="Outline button link">
                  <input className={field} value={hero.secondaryTo} onChange={(e) => setHero({ secondaryTo: e.target.value })} />
                </Field>
              </div>
            </div>
          )}

          {panel === 'people' && (
            <div className="space-y-3">
              <div className="card p-5">
                <Field label="Slider label">
                  <input className={field} value={home.contributorsLabel} onChange={(e) => setHome({ ...home, contributorsLabel: e.target.value })} />
                </Field>
              </div>
              {home.contributors.map((person, i) => (
                <div key={`${person.name}-${i}`} className="card p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{person.name || `Contributor ${i + 1}`}</p>
                    <RowActions
                      onUp={() => setHome({ ...home, contributors: move(home.contributors, i, -1) })}
                      onDown={() => setHome({ ...home, contributors: move(home.contributors, i, 1) })}
                      onRemove={() => setHome({ ...home, contributors: home.contributors.filter((_, n) => n !== i) })}
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Name">
                      <input className={field} value={person.name} onChange={(e) => {
                        const contributors = home.contributors.map((p, n) => (n === i ? { ...p, name: e.target.value } : p));
                        setHome({ ...home, contributors });
                      }} />
                    </Field>
                    <Field label="Country">
                      <input className={field} value={person.country} onChange={(e) => {
                        const contributors = home.contributors.map((p, n) => (n === i ? { ...p, country: e.target.value } : p));
                        setHome({ ...home, contributors });
                      }} />
                    </Field>
                    <Field label="Flag">
                      <input className={field} value={person.flag} onChange={(e) => {
                        const contributors = home.contributors.map((p, n) => (n === i ? { ...p, flag: e.target.value } : p));
                        setHome({ ...home, contributors });
                      }} />
                    </Field>
                    <Field label="Projects">
                      <input type="number" className={field} value={person.projects} onChange={(e) => {
                        const contributors = home.contributors.map((p, n) => (n === i ? { ...p, projects: Number(e.target.value) || 0 } : p));
                        setHome({ ...home, contributors });
                      }} />
                    </Field>
                    <Field label="Photo URL" hint="Path or full image URL">
                      <input className={field} value={person.photo} onChange={(e) => {
                        const contributors = home.contributors.map((p, n) => (n === i ? { ...p, photo: e.target.value } : p));
                        setHome({ ...home, contributors });
                      }} />
                    </Field>
                    <Field label="Tasks line">
                      <input className={field} value={person.tasks} onChange={(e) => {
                        const contributors = home.contributors.map((p, n) => (n === i ? { ...p, tasks: e.target.value } : p));
                        setHome({ ...home, contributors });
                      }} />
                    </Field>
                    <Field label="Languages" hint="Comma separated">
                      <input className={field} value={csv(person.languages)} onChange={(e) => {
                        const contributors = home.contributors.map((p, n) => (n === i ? { ...p, languages: split(e.target.value) } : p));
                        setHome({ ...home, contributors });
                      }} />
                    </Field>
                    <Field label="Project types" hint="Comma separated">
                      <input className={field} value={csv(person.types)} onChange={(e) => {
                        const contributors = home.contributors.map((p, n) => (n === i ? { ...p, types: split(e.target.value) } : p));
                        setHome({ ...home, contributors });
                      }} />
                    </Field>
                  </div>
                </div>
              ))}
              <Btn
                variant="ghost"
                onClick={() =>
                  setHome({
                    ...home,
                    contributors: [
                      ...home.contributors,
                      { name: 'New contributor', country: '', flag: '🌍', projects: 1, photo: '', languages: [], types: ['Speech'], tasks: '' },
                    ],
                  })
                }
              >
                <Plus size={15} /> Add contributor
              </Btn>
            </div>
          )}

          {panel === 'countries' && (
            <div className="space-y-3">
              <div className="card space-y-4 p-5">
                <Field label="Eyebrow">
                  <input className={field} value={home.countriesEyebrow} onChange={(e) => setHome({ ...home, countriesEyebrow: e.target.value })} />
                </Field>
                <Field label="Title">
                  <input className={field} value={home.countriesTitle} onChange={(e) => setHome({ ...home, countriesTitle: e.target.value })} />
                </Field>
                <Field label="Intro">
                  <textarea className={`${field} min-h-20`} value={home.countriesBody} onChange={(e) => setHome({ ...home, countriesBody: e.target.value })} />
                </Field>
              </div>
              {home.countries.map((country, i) => (
                <div key={`${country.country}-${i}`} className="card p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-medium text-white">{country.flag} {country.country || `Country ${i + 1}`}</p>
                    <RowActions
                      onUp={() => setHome({ ...home, countries: move(home.countries, i, -1) })}
                      onDown={() => setHome({ ...home, countries: move(home.countries, i, 1) })}
                      onRemove={() => setHome({ ...home, countries: home.countries.filter((_, n) => n !== i) })}
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Country">
                      <input className={field} value={country.country} onChange={(e) => {
                        const countries = home.countries.map((c, n) => (n === i ? { ...c, country: e.target.value } : c));
                        setHome({ ...home, countries });
                      }} />
                    </Field>
                    <Field label="Flag">
                      <input className={field} value={country.flag} onChange={(e) => {
                        const countries = home.countries.map((c, n) => (n === i ? { ...c, flag: e.target.value } : c));
                        setHome({ ...home, countries });
                      }} />
                    </Field>
                    <Field label="Languages" hint="Comma separated">
                      <input className={field} value={csv(country.languages)} onChange={(e) => {
                        const countries = home.countries.map((c, n) => (n === i ? { ...c, languages: split(e.target.value) } : c));
                        setHome({ ...home, countries });
                      }} />
                    </Field>
                    <Field label="Work done there">
                      <input className={field} value={country.tasks} onChange={(e) => {
                        const countries = home.countries.map((c, n) => (n === i ? { ...c, tasks: e.target.value } : c));
                        setHome({ ...home, countries });
                      }} />
                    </Field>
                  </div>
                </div>
              ))}
              <Btn
                variant="ghost"
                onClick={() =>
                  setHome({
                    ...home,
                    countries: [...home.countries, { country: 'New country', flag: '🌍', languages: [], tasks: '' }],
                  })
                }
              >
                <Plus size={15} /> Add country
              </Btn>
            </div>
          )}

          {panel === 'tasks' && (
            <div className="space-y-3">
              {home.tasks.map((task, i) => (
                <div key={`${task.title}-${i}`} className="card space-y-3 p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">{task.title || `Task ${i + 1}`}</p>
                    <RowActions
                      onUp={() => setHome({ ...home, tasks: move(home.tasks, i, -1) })}
                      onDown={() => setHome({ ...home, tasks: move(home.tasks, i, 1) })}
                      onRemove={() => setHome({ ...home, tasks: home.tasks.filter((_, n) => n !== i) })}
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Title">
                      <input className={field} value={task.title} onChange={(e) => {
                        const tasks = home.tasks.map((t, n) => (n === i ? { ...t, title: e.target.value } : t));
                        setHome({ ...home, tasks });
                      }} />
                    </Field>
                    <Field label="Short label">
                      <input className={field} value={task.subtitle} onChange={(e) => {
                        const tasks = home.tasks.map((t, n) => (n === i ? { ...t, subtitle: e.target.value } : t));
                        setHome({ ...home, tasks });
                      }} />
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea className={`${field} min-h-20`} value={task.body} onChange={(e) => {
                      const tasks = home.tasks.map((t, n) => (n === i ? { ...t, body: e.target.value } : t));
                      setHome({ ...home, tasks });
                    }} />
                  </Field>
                  <Field label="Icon">
                    <select className={field} value={task.icon} onChange={(e) => {
                      const tasks = home.tasks.map((t, n) => (n === i ? { ...t, icon: e.target.value } : t));
                      setHome({ ...home, tasks });
                    }}>
                      {TASK_ICONS.map((icon) => (
                        <option key={icon.id} value={icon.id}>{icon.label}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              ))}
              <Btn
                variant="ghost"
                onClick={() =>
                  setHome({
                    ...home,
                    tasks: [...home.tasks, { title: 'New task', subtitle: '', body: '', icon: 'mic' }],
                  })
                }
              >
                <Plus size={15} /> Add task
              </Btn>
            </div>
          )}

          {panel === 'map' && (
            <div className="space-y-3">
              <p className="text-sm text-white/45">The map has seven region tabs. Edit the name, headcount, activity and languages for each one. The live task list shows up to three rows.</p>
              {home.regions.map((region, i) => (
                <div key={`${region.name}-${i}`} className="card space-y-3 p-5">
                  <p className="font-medium text-white">{region.name || `Region ${i + 1}`}</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field label="Name">
                      <input className={field} value={region.name} onChange={(e) => {
                        const regions = home.regions.map((r, n) => (n === i ? { ...r, name: e.target.value } : r));
                        setHome({ ...home, regions });
                      }} />
                    </Field>
                    <Field label="People">
                      <input className={field} value={region.people} onChange={(e) => {
                        const regions = home.regions.map((r, n) => (n === i ? { ...r, people: e.target.value } : r));
                        setHome({ ...home, regions });
                      }} />
                    </Field>
                    <Field label="Activity / 100">
                      <input type="number" className={field} value={region.activity} onChange={(e) => {
                        const regions = home.regions.map((r, n) => (n === i ? { ...r, activity: Number(e.target.value) || 0 } : r));
                        setHome({ ...home, regions });
                      }} />
                    </Field>
                  </div>
                  <Field label="Languages" hint="Comma separated">
                    <input className={field} value={csv(region.langs)} onChange={(e) => {
                      const regions = home.regions.map((r, n) => (n === i ? { ...r, langs: split(e.target.value) } : r));
                      setHome({ ...home, regions });
                    }} />
                  </Field>
                  <Field label="Live tasks" hint="One per line: Read speech · Hindi | 56">
                    <textarea
                      className={`${field} min-h-24 font-mono text-xs`}
                      value={region.tasks.map(([label, pct]) => `${label} | ${pct}`).join('\n')}
                      onChange={(e) => {
                        const tasks = e.target.value
                          .split('\n')
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .slice(0, 3)
                          .map((line) => {
                            const [label, pct] = line.split('|');
                            return [label.trim(), Number(String(pct || '').replace('%', '').trim()) || 0] as [string, number];
                          });
                        const regions = home.regions.map((r, n) => (n === i ? { ...r, tasks } : r));
                        setHome({ ...home, regions });
                      }}
                    />
                  </Field>
                </div>
              ))}
            </div>
          )}

          {panel === 'page' && (
            <div className="space-y-3">
              <p className="text-sm text-white/45">
                Headings, intros, card titles and the network checklist. The FAQ questions themselves live in FAQs → General.
              </p>
              {home.sections.map((sec) => (
                <SectionEditor
                  key={sec.id}
                  section={sec}
                  open={openSection === sec.id}
                  onToggle={() => setOpenSection(openSection === sec.id ? '' : sec.id)}
                  onChange={(next) => setHome({ ...home, sections: home.sections.map((s) => (s.id === sec.id ? next : s)) })}
                />
              ))}
            </div>
          )}

          {panel === 'seo' && (
            <div className="card space-y-4 p-5 md:p-6">
              <Field label="SEO title" hint={`${home.seoTitle.length} characters`}>
                <input className={field} value={home.seoTitle} onChange={(e) => setHome({ ...home, seoTitle: e.target.value })} />
              </Field>
              <Field label="SEO description" hint={`${home.seoDescription.length} characters`}>
                <textarea className={`${field} min-h-28`} value={home.seoDescription} onChange={(e) => setHome({ ...home, seoDescription: e.target.value })} />
              </Field>
            </div>
          )}
        </div>
      </div>

      <SaveDock>
        <Btn onClick={save} disabled={saving} className="w-full shadow-[0_10px_40px_-10px_rgba(209,169,8,0.8)] lg:w-auto">
          <Save size={15} /> {saving ? 'Saving…' : 'Save homepage'}
        </Btn>
      </SaveDock>
    </div>
  );
}

function SectionEditor({
  section,
  open,
  onToggle,
  onChange,
}: {
  section: HomeSection;
  open: boolean;
  onToggle: () => void;
  onChange: (next: HomeSection) => void;
}) {
  return (
    <div className={`card overflow-hidden ${open ? '!border-gold/40' : ''}`}>
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between px-5 py-4 text-left">
        <span>
          <span className="block font-medium text-white">{section.label}</span>
          <span className="block text-xs text-white/40">{section.eyebrow}</span>
        </span>
        <span className="text-xs text-gold">{open ? 'Close' : 'Edit'}</span>
      </button>
      {open && (
        <div className="space-y-3 border-t border-white/10 p-5">
          <Field label="Eyebrow">
            <input className={field} value={section.eyebrow} onChange={(e) => onChange({ ...section, eyebrow: e.target.value })} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Title">
              <input className={field} value={section.title} onChange={(e) => onChange({ ...section, title: e.target.value })} />
            </Field>
            <Field label="Gold accent">
              <input className={field} value={section.accent} onChange={(e) => onChange({ ...section, accent: e.target.value })} />
            </Field>
          </div>
          <Field label="Intro">
            <textarea className={`${field} min-h-24`} value={section.body} onChange={(e) => onChange({ ...section, body: e.target.value })} />
          </Field>
          {section.cards.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">Cards</p>
              {section.cards.map((card, i) => (
                <input
                  key={i}
                  className={field}
                  value={card}
                  onChange={(e) => onChange({ ...section, cards: section.cards.map((c, n) => (n === i ? e.target.value : c)) })}
                />
              ))}
            </div>
          )}
          {section.bullets.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">Checklist</p>
              {section.bullets.map((bullet, i) => (
                <input
                  key={i}
                  className={field}
                  value={bullet}
                  onChange={(e) => onChange({ ...section, bullets: section.bullets.map((b, n) => (n === i ? e.target.value : b)) })}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
