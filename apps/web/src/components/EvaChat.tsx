import { MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { waHref } from '../lib/content';

export function EvaChat() {
  const { settings } = useSite();
  if (!settings.whatsapp) return null;

  return (
    <a
      href={waHref(settings.whatsapp, 'Hi Eva, I would like to talk to Dhvani.ai.')}
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 bottom-24 z-[55] inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/80 py-2 pr-4 pl-2 text-white shadow-[0_12px_40px_-12px_rgba(209,169,8,0.7)] backdrop-blur-md lg:bottom-6"
      aria-label="Chat with Eva on WhatsApp"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-black">
        <MessageCircle size={18} />
      </span>
      <span className="leading-tight">
        <span className="block font-mono text-[9px] tracking-[0.16em] text-gold uppercase">Chat bot</span>
        <span className="block text-sm font-semibold">Eva</span>
      </span>
    </a>
  );
}
