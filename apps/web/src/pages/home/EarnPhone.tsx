import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Mic, ShieldCheck, Sparkles, Wallet } from 'lucide-react';

type Scene = 'form' | 'success' | 'claim' | 'thanks';

function wait(ms: number, bucket: number[]) {
  return new Promise<void>((resolve) => {
    bucket.push(window.setTimeout(resolve, ms));
  });
}

function Caret() {
  return <span className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-gold" aria-hidden />;
}

function Field({
  label,
  value,
  state,
}: {
  label: string;
  value: string;
  state: 'idle' | 'active' | 'done';
}) {
  return (
    <div>
      <p className="font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase">{label}</p>
      <div
        className={`mt-1 flex h-8 items-center rounded-xl border px-2.5 text-[12px] ${
          state === 'active' ? 'border-gold/80 bg-gold/10 text-white' : 'border-white/10 bg-white/[0.04] text-white'
        }`}
      >
        {state === 'idle' ? <span className="text-white/25">—</span> : <span>{value}</span>}
        {state === 'active' && <Caret />}
      </div>
    </div>
  );
}

function Wave() {
  const bars = [28, 52, 78, 44, 92, 60, 36, 74, 48, 86, 32, 68, 54, 80];
  return (
    <div className="flex h-6 items-center gap-[3px]" aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className="wave-bar w-[3px] rounded-full bg-gold"
          style={{ height: `${h}%`, animationDelay: `${(i % 6) * 0.1}s` }}
        />
      ))}
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 font-mono text-[10px] text-white/70">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <span className="flex items-end gap-px" aria-hidden>
          {[3, 5, 7, 9].map((h) => (
            <span key={h} className="w-[2px] rounded-sm bg-white/80" style={{ height: h }} />
          ))}
        </span>
        <span className="text-[9px] tracking-wider text-gold">5G</span>
        <span className="relative h-2.5 w-5 rounded-[3px] border border-white/50" aria-hidden>
          <span className="absolute inset-y-[1.5px] left-[1.5px] w-[70%] rounded-[1px] bg-gold" />
          <span className="absolute top-1/2 -right-[2px] h-1 w-[2px] -translate-y-1/2 rounded-r-sm bg-white/50" />
        </span>
      </span>
    </div>
  );
}

export function EarnPhone() {
  const reduce = useReducedMotion();
  const [scene, setScene] = useState<Scene>(reduce ? 'thanks' : 'form');
  const [step, setStep] = useState(reduce ? 5 : 0);

  useEffect(() => {
    if (reduce) return;
    let alive = true;
    const timers: number[] = [];
    const run = async () => {
      while (alive) {
        setScene('form');
        setStep(0);
        await wait(450, timers);
        if (!alive) return;
        setStep(1);
        await wait(700, timers);
        if (!alive) return;
        setStep(2);
        await wait(700, timers);
        if (!alive) return;
        setStep(3);
        await wait(650, timers);
        if (!alive) return;
        setStep(4);
        await wait(700, timers);
        if (!alive) return;
        setStep(5);
        await wait(800, timers);
        if (!alive) return;
        setScene('success');
        await wait(2100, timers);
        if (!alive) return;
        setScene('claim');
        await wait(2800, timers);
        if (!alive) return;
        setScene('thanks');
        await wait(3200, timers);
      }
    };
    run();
    return () => {
      alive = false;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [reduce]);

  const fieldState = (index: number) => {
    if (step > index) return 'done' as const;
    if (step === index) return 'active' as const;
    return 'idle' as const;
  };

  return (
    <div className="relative mx-auto w-[240px] sm:w-[252px] lg:w-[268px]">
      <div
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(209,169,8,0.28),rgba(55,24,200,0.16)_42%,transparent_70%)] blur-2xl"
        aria-hidden
      />
      <div className="relative rounded-[2.55rem] bg-gradient-to-b from-[#4a4a52] via-[#1c1c22] to-[#0a0a0d] p-[3px] shadow-[0_28px_70px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.35)]">
        <span className="absolute top-[22%] -left-[2px] h-6 w-[3px] rounded-l bg-[#2a2a30]" aria-hidden />
        <span className="absolute top-[32%] -left-[2px] h-10 w-[3px] rounded-l bg-[#2c2c32]" aria-hidden />
        <span className="absolute top-[42%] -left-[2px] h-10 w-[3px] rounded-l bg-[#2c2c32]" aria-hidden />
        <span className="absolute top-[34%] -right-[2px] h-14 w-[3px] rounded-r bg-[#2c2c32]" aria-hidden />
        <div className="relative flex aspect-[9/16.6] flex-col overflow-hidden rounded-[2.35rem] bg-[#07070c] lg:aspect-[9/19.5]">
          <span className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-white/[0.07] to-transparent" aria-hidden />
          <StatusBar />
          <span className="absolute top-2.5 left-1/2 z-20 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" aria-hidden />

          <div className="relative min-h-0 flex-1">
            <AnimatePresence mode="wait">
              {scene === 'form' && (
                <motion.div
                  key="form"
                  className="absolute inset-0 flex flex-col overflow-hidden px-3 pt-1.5 pb-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display text-[13px] font-semibold tracking-tight text-white">
                      Dhvani<span className="text-gold">.ai</span>
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2 py-0.5 font-mono text-[9px] text-rose-300">
                      <Mic size={10} /> REC
                    </span>
                  </div>
                  <p className="mt-2 font-display text-[15px] leading-tight font-semibold text-white">Read this aloud</p>
                  <p className="mt-0.5 font-mono text-[10px] tracking-wide text-gold">Marathi · earns XXX</p>
                  <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                    <p className="text-[12px] leading-snug text-white/85">“Remind me to call the bank tomorrow at ten.”</p>
                    <div className="mt-2">
                      <Wave />
                    </div>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <Field label="Full name" value="Ananya Shah" state={fieldState(1)} />
                    <Field label="City" value="Pune, India" state={fieldState(2)} />
                    <Field label="Language" value="Marathi" state={fieldState(3)} />
                  </div>
                  <div className={`mt-2 flex items-start gap-2 text-[11px] leading-snug ${step >= 4 ? 'text-white/85' : 'text-white/35'}`}>
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border ${
                        step >= 4 ? 'border-gold bg-gold text-black' : 'border-white/25'
                      }`}
                    >
                      {step >= 4 && <Check size={11} strokeWidth={3} />}
                    </span>
                    I agree this recording is used to train AI.
                  </div>
                  <div
                    className={`mt-auto flex h-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
                      step >= 5 ? 'scale-[0.98] bg-gold text-black' : 'bg-white text-black'
                    }`}
                  >
                    {step >= 5 ? 'Submitting…' : 'Submit task'}
                  </div>
                </motion.div>
              )}

              {scene === 'success' && (
                <motion.div
                  key="success"
                  className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold text-black">
                    <span className="absolute inset-0 rounded-full bg-gold/40 pulse-ring" />
                    <Check size={30} strokeWidth={2.6} />
                  </span>
                  <p className="mt-5 font-display text-[1.35rem] leading-tight font-semibold text-white">Submission successful</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/65">Prompt 12 of 40 is in. Audio, script, and consent all passed.</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {['Audio clear', 'On script', 'Consent on file'].map((tag) => (
                      <span key={tag} className="rounded-full border border-gold/35 bg-gold/10 px-2.5 py-1 font-mono text-[10px] text-gold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {scene === 'claim' && (
                <motion.div
                  key="claim"
                  className="absolute inset-0 flex flex-col px-4 pt-4 pb-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/40 bg-gold/15 text-gold">
                    <Wallet size={22} />
                  </span>
                  <p className="mt-3 text-center font-mono text-[10px] tracking-[0.2em] text-gold uppercase">Payout ready</p>
                  <p className="mt-1.5 text-center font-display text-[1.45rem] leading-tight font-semibold text-white">Claim your amount</p>
                  <p className="mt-3 text-center font-display text-5xl font-bold tracking-[0.18em] text-gradient-gold">XXX</p>
                  <p className="mt-2 text-center text-xs text-white/50">Depends on the task · Marathi read</p>
                  <div className="mt-auto flex h-11 items-center justify-center rounded-full bg-gold text-sm font-semibold text-black">
                    Claim XXX
                  </div>
                </motion.div>
              )}

              {scene === 'thanks' && (
                <motion.div
                  key="thanks"
                  className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-royal-light/30 bg-royal/25 text-royal-light">
                    <Sparkles size={24} />
                  </span>
                  <p className="mt-5 font-display text-[1.45rem] leading-tight font-semibold text-white">Thank you for your data</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/70">
                    We’ll use this recording to train AI, so speech models can understand Marathi.
                  </p>
                  <p className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs text-white">
                    <ShieldCheck size={14} className="text-gold" /> XXX added to your balance
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-3 pt-1 pb-2.5">
            <ol className="grid grid-cols-4 gap-1 text-center font-mono text-[8px] tracking-[0.12em] text-white/40 uppercase">
              {(
                [
                  ['form', 'Fill'],
                  ['success', 'Sent'],
                  ['claim', 'Claim'],
                  ['thanks', 'Train AI'],
                ] as const
              ).map(([id, label]) => (
                <li key={id} className={scene === id ? 'text-gold' : ''}>
                  <span className={`mx-auto mb-1 block h-0.5 rounded-full ${scene === id ? 'bg-gold' : 'bg-white/15'}`} />
                  {label}
                </li>
              ))}
            </ol>
            <div className="mx-auto mt-2 h-1 w-[4.5rem] rounded-full bg-white/30" aria-hidden />
          </div>
        </div>
      </div>
      <p className="mx-auto mt-3 w-fit rounded-full border border-white/10 bg-black/70 px-3 py-1 text-center font-mono text-[10px] tracking-wide text-white/70">
        Payout set per task
      </p>
    </div>
  );
}
