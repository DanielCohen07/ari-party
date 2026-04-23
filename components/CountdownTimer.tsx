"use client";

import { useEffect, useState } from "react";

// May 7 2026 18:00 Israel time (UTC+3)
const EVENT_DATE = new Date("2026-05-07T15:00:00Z");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, done: false };
}

const LABELS = [
  { key: "days" as const,    label: "ימים" },
  { key: "hours" as const,   label: "שעות" },
  { key: "minutes" as const, label: "דקות" },
  { key: "seconds" as const, label: "שניות" },
];

export default function CountdownTimer() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  if (time.done) {
    return (
      <section className="w-full max-w-2xl px-4 pb-10 fade-up fade-up-delay-1">
        <div className="glass rounded-3xl p-6 shadow-2xl text-center border"
          style={{ borderColor: "rgba(200,134,10,0.35)" }}>
          <p style={{ fontFamily: "var(--font-secular), sans-serif", fontSize: "1.6rem", color: "#f0b429" }}>
            🎉 המסיבה מתחילה עכשיו! OPA! 🎉
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-2xl px-4 pb-10 fade-up fade-up-delay-1">
      <div className="glass rounded-3xl p-6 shadow-2xl border"
        style={{ borderColor: "rgba(200,134,10,0.25)" }}>

        <p className="text-center text-xs font-bold tracking-[0.3em] uppercase mb-5"
          style={{ color: "#c8860a", letterSpacing: "0.3em" }}>
          ⏳ נותרו עד המסיבה
        </p>

        <div className="grid grid-cols-4 gap-2 sm:gap-4" dir="rtl">
          {LABELS.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-1">
              <div
                className="w-full flex items-center justify-center rounded-2xl py-3 sm:py-4 border"
                style={{
                  background: "rgba(200,134,10,0.10)",
                  borderColor: "rgba(200,134,10,0.28)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontSize: "clamp(1.8rem, 7vw, 3rem)",
                    lineHeight: 1,
                    color: "#f0b429",
                    letterSpacing: "0.02em",
                  }}
                >
                  {pad(time[key])}
                </span>
              </div>
              <span className="text-xs font-semibold" style={{ color: "#90caf9" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-5 font-medium" style={{ color: "rgba(147,197,253,0.55)" }}>
          7 במאי 2026 · 18:00 · כפר האורנים
        </p>
      </div>
    </section>
  );
}
