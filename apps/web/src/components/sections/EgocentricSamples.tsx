import { useState } from 'react';
import { Play } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

type Clip = { id: string; label: string; thumb: string };

const SETS: { id: string; label: string; videos: Clip[] }[] = [
  {
    id: 'samples',
    label: 'Samples',
    videos: [
      { id: '13ZDeDrDqn1ic05HnW0CVCcrxXZKvK_So', label: 'Sample 01', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBMWhPyM15RWM0R3q-6BnIa1yqWEPpBU5DgxvesStRKdmcbNeSNIzwtIvP64dNTxwAkGNLu5_TwdJGKHjVOBDelNbAXvAcaJeR19D3IG=s640' },
      { id: '1NlIbpZEXZwG0lzymVcQNXduA4JAhgyBn', label: 'Sample 02', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBMQlbhKmHlzPN9aJCEQJMyZASaX9fpFlNNTJhzig17dy7ovkGs5lcyts7Vs6XspKKxppN-s0uNVRxLLfsnXFRqyyL34j9tBHcUn_MLJ=s640' },
      { id: '1szKpiNtdN-wQmMdneFr_7G4Tau2a6bnN', label: 'Sample 03', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBPrC5ttQx-YJ9gDiqOYVWldoE8jKqdECeZScI1Iaa0CLmGPSferegOr5r-1WxcalYeTGIpDREWdnu1Ub7S0GqaMJ1WBoWGySPz11UWd=s640' },
      { id: '1LfI0BNeWLwn3ta-HzvGcdXyN0TInQZru', label: 'Sample 04', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBMg97o0PTpolmbqAehgEiOVyWVYMUSJubOMHNkbjyIhzU5B7wVMcF6HEpdeA_L7w0hj6jdvgnLDn8unHOIFo-sHDJvkhZyaz28-r3uh=s640' },
      { id: '1Hm3j6pCKCvnnHT5vZ2OK2uOdRNDR37E2', label: 'Sample 05', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBMjokijYY0O-V1yfyrjHrl59JUsXIEX0nt6EZn0tT5RBib_seFqoC_5FJRLNEHI1dDj13TW5gkmHeJnZ_9Q697bEwERqABWOXjoW5kA=s640' },
      { id: '1cEOLHojujE8a1K3Z7Xn9a0vOjsHECjSD', label: 'Sample 06', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBNpY5idyvkMQLdLpzuannkYyXLwNv-DafY4kbpe_Efn5bdgUDkO_6bQBhZetfc3b5UdpSAjDOmS1wT6IFjCLl8Q7VeIPlrbrly3BuX_=s640' },
      { id: '1PvJ9SASkiTU0gbYYNFMnD4LY7SDgVKXf', label: 'Sample 07', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBPBCIZE7gMbZkAOFfHak-Ez5J4bHvSM7Bz_xAoxUIQBNFc-WuVktEs2xDWAyIhK1WVOmCLHwGx3AOWO3dTF7Q-gj16GKLGQ_-YJqk7d=s640' },
      { id: '1vJ9qwq8g379tj9YFit-gf9ya2eAkCWBr', label: 'Sample 08', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBPmeIQ_MEAuqAeR1CAmBStUcTcZfNkl4GVks66ywYsk5FQIT4krXzehkL8XNVUxbX6ncK36eTwSQG-B1P4fm5hs6nqLlR3m1fZGFnc_=s640' },
      { id: '1NbzgV3idAMuiEQlmkZnigwespk6eYLF3', label: 'Sample 09', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBOG8Yl8v9UpaSEMe7IZxf09DacYmCgTfuj5IBflqOuMuR5M4SYKXpYpK6C2t8IgmuyWy9UwYoWahUsaa_duvbw6AMQS6VyJbHE5ytq2=s640' },
      { id: '1bYFhpH3m766dGu7HgWRbctgRMLUzl7fd', label: 'Sample 10', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBPp9jYT0Z-4NG8IbHqFdo2GgfmxfZpTxr_7X1J0ZOWjZgP4ctUpyywAcJV4DRXKXJn5kJzILfCZAL4vV3z2uysrV9QXGd6qTn8gT4aI=s640' },
      { id: '1bkhL_mOT0SVChYUvQm-kmWaAe9d0ymCb', label: 'Sample 11', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBON86pqGTwSc8pm-H_g__Og_6Fr44fMVHb-UMtKrw9QZeUa3ImD1hReicZ7ZpZudUdRpvvZKb8a9Scau0QLIDJLPlCBZD7GIUN7Zt_h=s640' },
      { id: '1zIjPiJw2fAqLFWTAn7SwZjWi58ZQoN-s', label: 'Sample 12', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBOS_BjJi07ZCxcKayCq_DiIYyhTeWuxEKHbnoKDNFt3yMRsglx-uIeBvT-yhTjqTjwvW8CreWN5Idhex5-PVClmOXx0MJdJodV6is_2=s640' },
      { id: '1LyaIzvADGlnXWi-2dw12RUBCMvnJkFTd', label: 'Sample 13', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBP8HwH5lLM8hbQyYvm8nOpiWOKeQWLZl2q0DcbGo1-ACsrc6vDUfqZoaaINDzM0aRVo4DzbCBpoq8_K7wwVtL7L8y-cFgEbGcIPRUzB=s640' },
      { id: '1vU_-dTtG-OvkDy4QaSFRUR_HwfB1rulS', label: 'Sample 14', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBPNggsw23VLEvNzr4ad7fq20j3ITfD0mIvMBqVwgGzwgUdA19omIaLbB6w5O7Ub9LvT7iBzshGOydA8M0Nqk_7U4FR7h64-yhGa4s71=s640' },
      { id: '1ysfy5CpvbUYqKiQ905Xq5jXeJxw1FveO', label: 'Sample 15', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBMG1KdirH1JTBImOejzHgxe9No6nflV4P1Uy1G-iDn-PXCdlff6S56qlWzHQCVYCwuD9efvlbhL3FkKP4fu7lZ5NcIm-ybiklgAzyHk=s640' },
      { id: '18Xxy1ZhP8BcmFDmiW4V9HguFFd_Dme_S', label: 'Sample 16', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBNK1QB5gf50H48EyHe5IlzjXR3DaDlNoQcjzkV3htjpymhmqMCJGKpz7RjeXZbe9oEvuAaVJ1XRYlzpHsHHQJ9rmps5PV05W-gMWffk=s640' },
    ],
  },
  {
    id: 'silent',
    label: 'Without audio',
    videos: [
      { id: '1ycnP8oh3qUvUoEYUzcAjmbf5_Ne7-tGM', label: 'Video 01', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBPREEqqBZwNVMittemklTMDESzz3DdCtpsCgGktebEPbOEgSTOPQJEsaaCJzH5PXUvyu35vnYPoy2QHHK2zOgVYrkkTOHo20lJ_vhk8=s640' },
      { id: '16LADq0cHXkBnKa92teQZdxejqE096frl', label: 'Video 02', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBM7xl5fxNgtpWP6SpfjkF4ZqSrcJMwRBVd-fzsEcaRMxCPIWlTp-_4AqhuJhkuAOrB6BooGEqsPeiq2bcm7R1BIQmnT7_Lm9jn5qGqv=s640' },
      { id: '1WZDk5vc6MaQ0ldbUqV1PeztI_jkjzFlu', label: 'Video 03', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBO3TRaoR0o61BwQgnaqeDo2rpDwQaPDUXSrnBgZn9oWeTyPLSDUlDXoSkYplclH3rWMF92hpeM7RBaN63KJ7-6Q6APKfsf4sk0hUKpk=s640' },
      { id: '1qb8yVcyM5bjxh_XSxboxP7RAiLhEuuiO', label: 'Video 04', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBNwhVz8bWsWXGqzDR558ftyYwAQYt1yjOq0sjKDeiRSLr9NxvazD5fTB7NMrv_5N9O91Pihuq_6gJX2q-p2H3q3EwSVDEuogn3Gligh=s640' },
      { id: '1oqQ5Gyp0Mc5P5yiAhSzvQaUUrnD6yJhf', label: 'Video 05', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBMdHLacmw3VuFaC0E8aMRlppMdVIEcJz32MxftAIJNdkgwXliHxdLGPkhyxE6j71-QYPpDCYV6BDT6Z_0B6t6cSySBKr-3D9WLoroBK=s640' },
      { id: '1sNrIj5DVUS1Qx7KYo588w2YiriM2caJg', label: 'Video 06', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBPJPLeiCCedlAhr1p-9h8pXkhKxTBK63Dj2H_cSgXnHli9jSpW0GcCh2wCCiDcrUemM9VfmliPqdne4muxtv8JhD63lgUVErJflrODK=s640' },
    ],
  },
  {
    id: 'audio',
    label: 'With audio',
    videos: [
      { id: '1T4RiqqcsHAn77W2cS4HTvK6H9tdlXXmy', label: 'Video 1', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBMpkKcvq6jPrszGN88nRiStF997ZmeNPX7ZJ2O9sZyW_xOFDsiababc4PslWO3m14QYFQT9xK8u22wKMYCn1yklHhK9FStsvs7c_OI=s640' },
      { id: '1C2_thxqHkSlkBefJYdj-lRdWItn-tIoC', label: 'Video 2', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBPhpBbus9UxT1VXRUirAGLbD3Do_AG6TqH6l5pJrEqSOkdeEeIa1P3KVzFmgmlmnkHVxwUd8yIKw10qQ-QNfGNNElG2zI3cqmjXgEM=s640' },
      { id: '1-grvQhbhXhx1nmWxscPRscdoZA7fUS4x', label: 'Video 3', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBOJ4ISHMU2ie5qO-6rSxNsXRm8_P1gArt5DlCtfORp5EB7NeaouEoPMDddTPK14zrHS13OKSJ6lkO8BkwzthdKt9fzhzpdCgacH1B8=s640' },
      { id: '1LvmuKaYdSKR1KnzXIkQucR8ddyN6GA_7', label: 'Video 4', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBNtIIt33NUNbROzvQvXZfXtx_fKZUdfjiIbkO76JTxl1QE76c1NPoUOnz0aTJG1EhEudC4UMbKn6jUxjKHg78sQM03nfXR7wks_sXY=s640' },
      { id: '1OdK4JBBUXuovaUjuGxtQ75M4ZjodegIp', label: 'Video 5', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBNBNvGcZlFabjsYR_HI9npuUYL8MnafFp2wCVmI-WHwGvwDFx6NhSzaiArC9Z4JTNNbRZhcI-C-PfLGA6q3jA0jYqWPG1cw2BU8aM0=s640' },
      { id: '16D5DuAK04El3YlQiA4LPRrNwY7Fbs8pY', label: 'Video 7', thumb: 'https://lh3.googleusercontent.com/drive-storage/AJQWtBMI0SGvXnq2_FfgABZpQMQe2ygpWzbbGvIs-k8bwuQmB3aqw6aCG1TLEUzR6OEsW4OhfVnJItu8eKuye8caLEUZ3nVQoEVB_adfWIY=s640' },
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
              src={`https://drive.google.com/file/d/${clip.id}/preview`}
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
                  on ? 'border-gold' : 'border-white/10 hover:border-white/25'
                }`}
              >
                <span className="relative block aspect-[16/10] bg-[#10141c]">
                  <img src={video.thumb} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <span className={`absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/50 ${on ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                    <Play size={12} className="fill-white text-white" />
                  </span>
                  <span className={`absolute bottom-2 left-2.5 text-xs font-medium ${on ? 'text-gold' : 'text-white'}`}>{video.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
