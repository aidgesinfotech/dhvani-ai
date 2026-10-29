import { useEffect, useRef } from 'react';
import markup from './home/live-home.html?raw';
import { ContributorIntro } from './home/ContributorIntro';
import { Seo } from '../components/Seo';

const SEO_TITLE = 'Dhvani.ai — Human Data Collection & AI Training Data at Scale';
const SEO_DESCRIPTION =
  'Register on Dhvani.ai, submit speech, photos, video, and text, and get paid. Your data is used to train AI across 100+ languages and dialects.';

type Region = {
  name: string;
  people: string;
  activity: number;
  langs: string[];
  tasks: [string, number][];
};

/** Figures and languages already shown on the live homepage (map panel, marquee, operations). */
const REGIONS: Region[] = [
  {
    name: 'India',
    people: '20K+',
    activity: 100,
    langs: ['Hindi', 'Gujarati', 'Tamil', 'Bengali', 'Marathi', 'Telugu'],
    tasks: [
      ['Read speech · Hindi', 56],
      ['Conversational turns · Gujarati', 53],
      ['Street & storefront photos · India', 23],
    ],
  },
  {
    name: 'Southeast Asia',
    people: '8K+',
    activity: 40,
    langs: ['Bahasa', 'Thai', 'Vietnamese', 'Tagalog'],
    tasks: [
      ['Read speech · Bahasa', 61],
      ['Street signage photos', 44],
      ['Conversational turns · Thai', 38],
    ],
  },
  {
    name: 'Middle East',
    people: '5K+',
    activity: 25,
    langs: ['Arabic', 'Farsi', 'Turkish'],
    tasks: [
      ['Read speech · Arabic', 58],
      ['Storefront photos', 41],
      ['Conversational turns · Turkish', 33],
    ],
  },
  {
    name: 'Europe',
    people: '6K+',
    activity: 30,
    langs: ['German', 'French', 'Spanish', 'Polish', 'English'],
    tasks: [
      ['Read speech · German', 64],
      ['Retail shelf images', 47],
      ['RLHF preference pairs', 52],
    ],
  },
  {
    name: 'North America',
    people: '5K+',
    activity: 25,
    langs: ['English (US)', 'Spanish (US)', 'French (CA)'],
    tasks: [
      ['Read speech · English (US)', 71],
      ['Egocentric kitchen video', 36],
      ['RLHF preference pairs', 68],
    ],
  },
  {
    name: 'Latin America',
    people: '3K+',
    activity: 15,
    langs: ['Portuguese (BR)', 'Spanish (LATAM)'],
    tasks: [
      ['Read speech · Portuguese', 49],
      ['Street signage photos', 34],
      ['Conversational turns · Spanish', 42],
    ],
  },
  {
    name: 'Africa',
    people: '3K+',
    activity: 15,
    langs: ['Swahili', 'Yoruba', 'Amharic', 'Zulu'],
    tasks: [
      ['Read speech · Swahili', 57],
      ['Street & storefront photos', 28],
      ['Conversational turns · Yoruba', 31],
    ],
  },
];

const TAB_ON = ['border-[#d1a908]', 'bg-[#d1a908]', 'text-black'];
const TAB_OFF = ['border-line-2', 'text-fg-2'];

function paintRegion(root: HTMLElement, index: number) {
  const region = REGIONS[index];
  if (!region) return;
  const panel = root.querySelector<HTMLElement>('#region-panel');
  if (!panel) return;

  root.querySelectorAll<HTMLButtonElement>('[role="tab"]').forEach((tab, i) => {
    const on = i === index;
    tab.setAttribute('aria-selected', on ? 'true' : 'false');
    tab.tabIndex = on ? 0 : -1;
    TAB_ON.forEach((c) => tab.classList.toggle(c, on));
    TAB_OFF.forEach((c) => tab.classList.toggle(c, !on));
    const dot = tab.querySelector('span');
    if (dot) {
      dot.classList.toggle('bg-black', on);
      dot.classList.toggle('bg-royal-light', !on);
    }
  });

  const heading = panel.querySelector('h3');
  if (heading) {
    const text = [...heading.childNodes].find((n) => n.nodeType === Node.TEXT_NODE);
    if (text) text.textContent = region.name;
  }

  const figure = panel.querySelector('.text-3xl span');
  if (figure) {
    const text = [...figure.childNodes].find((n) => n.nodeType === Node.TEXT_NODE);
    if (text) text.textContent = region.people;
  }

  const fraction = [...panel.querySelectorAll('span')].find((s) => /\/\s*100/.test(s.textContent || ''));
  if (fraction) fraction.textContent = `${region.activity} / 100`;

  const activityBar = panel.querySelector<HTMLElement>('.h-2 .absolute');
  if (activityBar) activityBar.style.width = `${region.activity}%`;

  const chipRow = panel.querySelector('div.mt-6 .flex.flex-wrap');
  if (chipRow) {
    chipRow.innerHTML = region.langs
      .map(
        (lang, i) =>
          `<span class="chip !py-1 !text-xs${i === 0 ? ' chip-gold' : ''}">${lang}</span>`,
      )
      .join('');
  }

  panel.querySelectorAll('ul li').forEach((li, i) => {
    const task = region.tasks[i];
    const row = li as HTMLElement;
    if (!task) {
      row.hidden = true;
      return;
    }
    row.hidden = false;
    const label = row.querySelector('.truncate');
    if (label) label.textContent = task[0];
    const bar = row.querySelector<HTMLElement>('span.block.h-full');
    if (bar) bar.style.width = `${task[1]}%`;
    const pct = row.querySelector('span.w-9');
    if (pct) pct.textContent = `${task[1]}%`;
  });
}

function toggleFaq(button: HTMLButtonElement) {
  const card = button.parentElement;
  if (!card) return;
  const open = button.getAttribute('aria-expanded') === 'true';
  const next = !open;
  button.setAttribute('aria-expanded', next ? 'true' : 'false');
  const body = button.nextElementSibling as HTMLElement | null;
  if (body) {
    if (next) body.removeAttribute('hidden');
    else body.setAttribute('hidden', '');
  }
  card.classList.toggle('card-gold', next);
  card.classList.toggle('!border-gold/40', next);
  const icon = button.querySelector('span.inline-flex');
  if (icon) {
    icon.classList.toggle('rotate-45', next);
    icon.classList.toggle('border-[#d1a908]', next);
    icon.classList.toggle('bg-[#d1a908]', next);
    icon.classList.toggle('text-black', next);
    icon.classList.toggle('border-royal-light/40', !next);
    icon.classList.toggle('text-royal-light', !next);
  }
}

export function HomePage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const id = anchor.getAttribute('href')?.slice(1);
        const el = id ? document.getElementById(id) : null;
        if (el) {
          event.preventDefault();
          if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90, duration: 1.1 });
          else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      const tab = target.closest<HTMLButtonElement>('[role="tab"]');
      if (tab && root.contains(tab)) {
        const tabs = [...root.querySelectorAll('[role="tab"]')];
        paintRegion(root, tabs.indexOf(tab));
        return;
      }

      const faq = target.closest<HTMLButtonElement>('button[aria-expanded]');
      if (faq && root.contains(faq) && !faq.getAttribute('role')) toggleFaq(faq);
    };

    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <Seo title={SEO_TITLE} description={SEO_DESCRIPTION} />
      <ContributorIntro />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}