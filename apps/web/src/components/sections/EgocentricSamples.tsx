import { useState } from 'react';
import { Film, Play } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

type Clip = { id: string; label: string };

function driveThumb(id: string, size = 640) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;
}

function drivePreview(id: string) {
  return `https://drive.google.com/file/d/${id}/preview`;
}

function Thumb({ id, alt, active }: { id: string; alt: string; active: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="relative block aspect-[16/10] bg-[#10141c]">
      {!failed ? (
        <img
          src={driveThumb(id)}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(80%_80%_at_50%_20%,rgba(209,169,8,0.18),transparent_60%),#10141c] text-white/50">
          <Film size={22} className="text-gold/80" />
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase">Preview</span>
        </span>
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <span
        className={`absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/50 transition-opacity ${
          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <Play size={12} className="fill-white text-white" />
      </span>
      <span className={`absolute bottom-2 left-2.5 text-xs font-medium ${active ? 'text-gold' : 'text-white'}`}>{alt}</span>
    </span>
  );
}

const SETS: { id: string; label: string; videos: Clip[] }[] = [
  {
    id: 'samples',
    label: 'Samples',
    videos: [
      { id: '13ZDeDrDqn1ic05HnW0CVCcrxXZKvK_So', label: 'Sample 01' },
      { id: '1NlIbpZEXZwG0lzymVcQNXduA4JAhgyBn', label: 'Sample 02' },
      { id: '1szKpiNtdN-wQmMdneFr_7G4Tau2a6bnN', label: 'Sample 03' },
      { id: '1LfI0BNeWLwn3ta-HzvGcdXyN0TInQZru', label: 'Sample 04' },
      { id: '1Hm3j6pCKCvnnHT5vZ2OK2uOdRNDR37E2', label: 'Sample 05' },
      { id: '1cEOLHojujE8a1K3Z7Xn9a0vOjsHECjSD', label: 'Sample 06' },
      { id: '1PvJ9SASkiTU0gbYYNFMnD4LY7SDgVKXf', label: 'Sample 07' },
      { id: '1vJ9qwq8g379tj9YFit-gf9ya2eAkCWBr', label: 'Sample 08' },
      { id: '1NbzgV3idAMuiEQlmkZnigwespk6eYLF3', label: 'Sample 09' },
      { id: '1bYFhpH3m766dGu7HgWRbctgRMLUzl7fd', label: 'Sample 10' },
      { id: '1bkhL_mOT0SVChYUvQm-kmWaAe9d0ymCb', label: 'Sample 11' },
      { id: '1zIjPiJw2fAqLFWTAn7SwZjWi58ZQoN-s', label: 'Sample 12' },
      { id: '1LyaIzvADGlnXWi-2dw12RUBCMvnJkFTd', label: 'Sample 13' },
      { id: '1vU_-dTtG-OvkDy4QaSFRUR_HwfB1rulS', label: 'Sample 14' },
      { id: '1ysfy5CpvbUYqKiQ905Xq5jXeJxw1FveO', label: 'Sample 15' },
      { id: '18Xxy1ZhP8BcmFDmiW4V9HguFFd_Dme_S', label: 'Sample 16' },
    ],
  },
  {
    id: 'silent',
    label: 'Without audio',
    videos: [
      { id: '1ycnP8oh3qUvUoEYUzcAjmbf5_Ne7-tGM', label: 'Video 01' },
      { id: '16LADq0cHXkBnKa92teQZdxejqE096frl', label: 'Video 02' },
      { id: '1WZDk5vc6MaQ0ldbUqV1PeztI_jkjzFlu', label: 'Video 03' },
      { id: '1qb8yVcyM5bjxh_XSxboxP7RAiLhEuuiO', label: 'Video 04' },
      { id: '1oqQ5Gyp0Mc5P5yiAhSzvQaUUrnD6yJhf', label: 'Video 05' },
      { id: '1sNrIj5DVUS1Qx7KYo588w2YiriM2caJg', label: 'Video 06' },
    ],
  },
  {
    id: 'audio',
    label: 'With audio',
    videos: [
      { id: '1T4RiqqcsHAn77W2cS4HTvK6H9tdlXXmy', label: 'Video 1' },
      { id: '1C2_thxqHkSlkBefJYdj-lRdWItn-tIoC', label: 'Video 2' },
      { id: '1-grvQhbhXhx1nmWxscPRscdoZA7fUS4x', label: 'Video 3' },
      { id: '1LvmuKaYdSKR1KnzXIkQucR8ddyN6GA_7', label: 'Video 4' },
      { id: '1OdK4JBBUXuovaUjuGxtQ75M4ZjodegIp', label: 'Video 5' },
      { id: '16D5DuAK04El3YlQiA4LPRrNwY7Fbs8pY', label: 'Video 7' },
    ],
  },
];

export function EgocentricSamples() {
  const [setIndex, setSetIndex] = useState(0);
  const [clipId, setClipId] = useState(SETS[0].videos[0].id);
  const set = SETS[setIndex];
  const clip = set.videos.find((video) => video.id === clipId) ?? set.videos[0];

  return (
    <section id="ego-samples" className="section scroll-mt-28">
      <div className="container-x">
        <div className="mb-14">
          <span className="eyebrow">For training</span>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
            Ultrawide capture, the way a model sees it
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-2 sm:text-base">
            One continuous first-person pass — the kind of footage used to train video and robotics models.
          </p>
          <div className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-gold/35 bg-black shadow-[0_0_48px_rgba(209,169,8,0.14)]">
            <div className="aspect-[21/9] w-full">
              <iframe
                title="Egocentric training video"
                src="https://drive.google.com/file/d/1tQUHMjTeqOj_FpyYQvwM_R5b7JjdAiK6/preview"
                className="h-full w-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <SectionHeading
          eyebrow="Sample previews"
          title="Watch real egocentric footage"
          body="Field clips, silent task videos, and recordings with audio. Pick a clip to play it."
        />
        <div className="mt-8 flex flex-wrap gap-2">
          {SETS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSetIndex(index);
                setClipId(item.videos[0].id);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                index === setIndex ? 'border-gold bg-gold text-black' : 'border-white/15 bg-white/[0.04] text-white/80 hover:border-gold/50 hover:text-white'
              }`}
            >
              {item.label}
              <span className={`ml-2 font-mono text-[11px] ${index === setIndex ? 'text-black/70' : 'text-white/40'}`}>{item.videos.length}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black">
          <div className="aspect-video w-full">
            <iframe
              key={clip.id}
              title={clip.label}
              src={drivePreview(clip.id)}
              className="h-full w-full"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {set.videos.map((video) => {
            const on = video.id === clip.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => setClipId(video.id)}
                aria-pressed={on}
                className={`group relative overflow-hidden rounded-2xl border text-left ${
                  on ? 'border-gold shadow-[0_0_0_1px_rgba(209,169,8,0.35)]' : 'border-white/10 hover:border-white/25'
                }`}
              >
                <Thumb id={video.id} alt={video.label} active={on} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
