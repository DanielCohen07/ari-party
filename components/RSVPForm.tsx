"use client";

import { useState } from "react";

interface FormState {
  firstName: string;
  lastName: string;
  guests: string;
}

type Status = "idle" | "loading" | "success" | "error";

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#90caf9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

export default function RSVPForm() {
  const [form, setForm] = useState<FormState>({ firstName: "", lastName: "", guests: "1" });
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          guests: Number(form.guests),
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="w-full max-w-2xl px-4 pb-16 fade-up">
        <div className="glass rounded-3xl shadow-2xl text-center border"
          style={{ borderColor: "rgba(200,134,10,0.35)", padding: "clamp(1.5rem, 6vw, 2.5rem)" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
          <h2 style={{
            fontFamily: "var(--font-secular), sans-serif",
            fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
            color: "#ffffff",
            marginBottom: "0.75rem",
          }}>
            יאסו! אשרת הגעה התקבלה
          </h2>
          <p style={{ color: "#90caf9", fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            {form.firstName}, נתראה ב-7 במאי!
          </p>
          <p style={{ color: "#64b5f6", fontSize: "1rem", marginBottom: "1.5rem" }}>
            זכור · זו הפתעה! 🤫 לא מספרים לארי.
          </p>

          <div className="rounded-2xl px-5 py-5 mb-4 border text-center"
            style={{ background: "rgba(200,134,10,0.10)", borderColor: "rgba(200,134,10,0.30)" }}>
            <p style={{ color: "#f0b429", fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>
              🎁 רוצה לשלוח מתנה?
            </p>
            <a
              href="https://links.payboxapp.com/FYKpSn4Lu2b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl font-bold cursor-pointer hover:brightness-110 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #c8860a, #f0b429)",
                color: "#07071a",
                minHeight: "56px",
                padding: "0 1.5rem",
                fontSize: "1.05rem",
              }}
            >
              הצטרפות לקבוצת PayBox 🎂
            </a>
            <p style={{ color: "rgba(147,197,253,0.55)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
              חינם · עד מאי 2026
            </p>
          </div>

          <div style={{ marginTop: "1rem", fontSize: "2.5rem" }}>🫒🇬🇷🫒</div>
        </div>
      </section>
    );
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.08)",
    border: "1.5px solid rgba(255,255,255,0.18)",
    borderRadius: "0.875rem",
    padding: "0.875rem 1rem",
    color: "#ffffff",
    fontSize: "16px",
    minHeight: "56px",
    width: "100%",
    outline: "none",
    fontWeight: 500,
  };

  return (
    <section className="w-full max-w-2xl px-4 pb-16 fade-up fade-up-delay-4">
      <div className="glass rounded-3xl shadow-2xl" style={{ padding: "clamp(1.25rem, 5vw, 2rem)" }}>

        <div className="flex items-center justify-center gap-2 mb-7">
          <MailIcon />
          <h2 style={{
            fontFamily: "var(--font-secular), sans-serif",
            fontSize: "clamp(1.5rem, 5vw, 1.9rem)",
            color: "#ffffff",
          }}>
            אישור הגעה
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

          {/* Name fields */}
          <div className="flex flex-col gap-5">
            {[
              { id: "firstName", label: "שם פרטי",   placeholder: "ישראל" },
              { id: "lastName",  label: "שם משפחה",  placeholder: "ישראלי" },
            ].map(({ id, label, placeholder }) => (
              <div key={id} className="flex flex-col gap-2">
                <label htmlFor={id} style={{ color: "#90caf9", fontSize: "1rem", fontWeight: 700 }}>
                  {label}
                </label>
                <input
                  id={id}
                  name={id}
                  type="text"
                  required
                  placeholder={placeholder}
                  value={form[id as keyof FormState]}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(240,180,41,0.7)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
                />
              </div>
            ))}
          </div>

          {/* Guest count */}
          <div className="flex flex-col gap-3">
            <label style={{ color: "#90caf9", fontSize: "1rem", fontWeight: 700 }}>
              מספר מגיעים
            </label>
            <div className="flex gap-4">
              {["1", "2"].map((num) => (
                <label
                  key={num}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl cursor-pointer font-bold transition-all duration-200 border select-none"
                  style={{
                    background: form.guests === num ? "rgba(200,134,10,0.25)" : "rgba(255,255,255,0.06)",
                    borderColor: form.guests === num ? "rgba(200,134,10,0.7)" : "rgba(255,255,255,0.18)",
                    color: form.guests === num ? "#f0b429" : "#c8e6ff",
                    minHeight: "60px",
                    fontSize: "1.1rem",
                  }}
                >
                  <input
                    type="radio"
                    name="guests"
                    value={num}
                    checked={form.guests === num}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {num === "1" ? "👤 אחד/אחת" : "👥 שניים"}
                </label>
              ))}
            </div>
          </div>

          {status === "error" && (
            <p className="text-center font-semibold" style={{ color: "#ff6b6b", fontSize: "1rem" }}>
              משהו השתבש, נסה/י שוב.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full mt-1 rounded-2xl font-black transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: status === "loading"
                ? "rgba(200,134,10,0.5)"
                : "linear-gradient(135deg, #c8860a 0%, #f0b429 100%)",
              color: "#07071a",
              minHeight: "64px",
              fontSize: "1.2rem",
            }}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#07071a" strokeWidth="4"/>
                  <path className="opacity-75" fill="#07071a" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                שולח...
              </span>
            ) : "אני מגיע/ה! 🎉"}
          </button>
        </form>
      </div>
    </section>
  );
}
