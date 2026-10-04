import type { ReactNode } from 'react';

/** Inline: **bold**, *em*, [text](url). */
function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const k = `${key}-${i++}`;
    if (tok.startsWith('**')) out.push(<strong key={k}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith('[')) {
      const [, label, href] = tok.match(/\[([^\]]+)\]\(([^)]+)\)/) || [];
      const safe = /^(https?:|mailto:|\/)/.test(href || '') ? href : '#';
      out.push(
        <a key={k} href={safe} className="text-gold underline underline-offset-4 hover:text-gold-light">
          {label}
        </a>
      );
    } else out.push(<em key={k}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Minimal markdown for CMS blog content: ## / ### headings, - lists, > quotes, paragraphs. */
export function Markdown({ source }: { source?: string }) {
  const blocks: ReactNode[] = [];
  const lines = (source || '').replace(/\r\n/g, '\n').split('\n');
  let list: string[] = [];
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) blocks.push(<p key={`p${blocks.length}`}>{inline(para.join(' '), `p${blocks.length}`)}</p>);
    para = [];
  };
  const flushList = () => {
    if (list.length)
      blocks.push(
        <ul key={`u${blocks.length}`}>
          {list.map((li, i) => (
            <li key={i}>{inline(li, `l${blocks.length}-${i}`)}</li>
          ))}
        </ul>
      );
    list = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
    } else if (line.startsWith('### ')) {
      flushPara();
      flushList();
      blocks.push(<h3 key={`h${blocks.length}`}>{inline(line.slice(4), `h${blocks.length}`)}</h3>);
    } else if (line.startsWith('## ')) {
      flushPara();
      flushList();
      blocks.push(<h2 key={`h${blocks.length}`}>{inline(line.slice(3), `h${blocks.length}`)}</h2>);
    } else if (/^[-*] /.test(line)) {
      flushPara();
      list.push(line.slice(2));
    } else if (line.startsWith('> ')) {
      flushPara();
      flushList();
      blocks.push(<blockquote key={`q${blocks.length}`}>{inline(line.slice(2), `q${blocks.length}`)}</blockquote>);
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return <div className="prose-dark">{blocks}</div>;
}
