import type { HomeSection, MapRegion } from './homeModel';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch] || ch);
}
const TAB_ON = ['border-[#d1a908]', 'bg-[#d1a908]', 'text-black'];
const TAB_OFF = ['border-line-2', 'text-fg-2'];

function setHeading(h2: HTMLElement, title: string, accent: string) {
  h2.replaceChildren();
  const lead = title.trim();
  if (lead) h2.append(document.createTextNode(accent.trim() ? `${lead} ` : lead));
  if (accent.trim()) {
    const span = document.createElement('span');
    span.className = 'text-gradient-gold';
    span.textContent = accent.trim();
    h2.append(span);
  }
}

function findSection(root: HTMLElement, id: string) {
  if (id === 'faq') {
    return [...root.querySelectorAll('section')].find((section) => section.querySelector('button[aria-expanded]')) || null;
  }
  return root.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
}

export function applyHomeSections(root: HTMLElement, sections: HomeSection[]) {
  for (const sec of sections) {
    const el = findSection(root, sec.id);
    if (!el) continue;
    const eyebrow = el.querySelector<HTMLElement>('.eyebrow');
    if (eyebrow && sec.eyebrow) eyebrow.textContent = sec.eyebrow;
    const h2 = el.querySelector<HTMLElement>('h2');
    if (h2 && (sec.title || sec.accent)) setHeading(h2, sec.title, sec.accent);
    const body = el.querySelector<HTMLElement>('p.mt-5');
    if (body && sec.body) body.textContent = sec.body;
    if (sec.cards.length) {
      const headings = [...el.querySelectorAll<HTMLElement>('h3')];
      headings.forEach((heading, i) => {
        const title = sec.cards[i % sec.cards.length];
        if (title) heading.textContent = title;
      });
    }
    if (sec.bullets.length) {
      const items = [...el.querySelectorAll<HTMLElement>('ul li')];
      sec.bullets.forEach((text, i) => {
        const li = items[i];
        if (!li || !text) return;
        const node = [...li.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
        if (node) node.textContent = text;
      });
    }
  }
}

export function paintRegion(root: HTMLElement, index: number, regions: MapRegion[]) {
  const region = regions[index];
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
    const label = [...tab.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
    if (label && regions[i]) label.textContent = regions[i].name;
  });

  const heading = panel.querySelector('h3');
  if (heading) {
    const text = [...heading.childNodes].find((n) => n.nodeType === Node.TEXT_NODE);
    if (text) text.textContent = region.name;
    else heading.textContent = region.name;
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
      .map((lang, i) => `<span class="chip !py-1 !text-xs${i === 0 ? ' chip-gold' : ''}">${escapeHtml(lang)}</span>`)
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

type Faq = { question: string; answer: string };

function closeFaqCard(card: HTMLElement) {
  const button = card.querySelector<HTMLButtonElement>('button[aria-expanded]');
  if (!button) return;
  button.setAttribute('aria-expanded', 'false');
  const body = button.nextElementSibling as HTMLElement | null;
  if (body) {
    body.setAttribute('hidden', '');
    body.removeAttribute('style');
  }
  card.classList.remove('card-gold', '!border-gold/40');
  const icon = button.querySelector('span.inline-flex');
  if (icon) {
    icon.classList.remove('rotate-45', 'border-[#d1a908]', 'bg-[#d1a908]', 'text-black');
    icon.classList.add('border-royal-light/40', 'text-royal-light');
  }
}

/** Homepage FAQ answers come from Admin → FAQs (General). */
export function syncHomeFaqs(root: HTMLElement, faqs: Faq[]) {
  if (!faqs.length) return;
  const button = root.querySelector<HTMLButtonElement>('button[aria-expanded]');
  const template = button?.parentElement;
  const list = template?.parentElement;
  if (!template || !list) return;
  const fragment = document.createDocumentFragment();
  faqs.forEach((faq) => {
    const card = template.cloneNode(true) as HTMLElement;
    const q = card.querySelector('button span.font-display');
    const a = card.querySelector('p');
    if (q) q.textContent = faq.question;
    if (a) a.textContent = faq.answer;
    closeFaqCard(card);
    fragment.append(card);
  });
  list.replaceChildren(fragment);
}
