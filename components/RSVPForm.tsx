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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#90caf9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        <div className="glass rounded-3xl p-10 shadow-2xl text-center border"
          style={{ borderColor: "rgba(200,134,10,0.35)" }}>
          <div className="text-6xl mb-5">🎉</div>
          <h2 style={{
            fontFamily: "var(--font-secular), sans-serif",
            fontSize: "2rem",
            color: "#ffffff",
            marginBottom: "0.75rem",
          }}>
            יאסו! אשרת הגעה התקבלה
          </h2>
          <p className="text-lg font-medium mb-2" style={{ color: "#90caf9" }}>
            {form.firstName}, נתראה ב-7 במאי!
          </p>
          <p className="text-sm" style={{ color: "#64b5f6" }}>
            זכור · זו הפתעה! 🤫 לא מספרים לארי.
          </p>
          <div className="mt-8 text-4xl">🫒🇬🇷🫒</div>
        </div>
      </section>
    );
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    color: "#e8f0fe",
    fontSize: "1rem",
    minHeight: "48px",
    width: "100%",
    outline: "none",
  };

  return (
    <section className="w-full max-w-2xl px-4 pb-16 fade-up fade-up-delay-4">
      <div className="glass rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-7">
          <MailIcon />
          <h2 style={{
            fontFamily: "var(--font-secular), sans-serif",
            fontSize: "1.6rem",
            color: "#ffffff",
            letterSpacing: "-0.01em",
          }}>
            אישור הגעה
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: "firstName", label: "שם פרטי",   placeholder: "ישראל" },
              { id: "lastName",  label: "שם משפחה", placeholder: "ישראלי" },
            ].map(({ id, label, placeholder }) => (
              <div key={id} className="flex flex-col gap-2">
                <label htmlFor={id} className="text-sm font-bold" style={{ color: "#64b5f6" }}>
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
                  className="cursor-text transition-colors duration-200 focus:ring-2"
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(240,180,41,0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)")}
                />
              </div>
            ))}
          </div>

          {/* Guest count */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold" style={{ color: "#64b5f6" }}>
              מספר מגיעים
            </label>
            <div className="flex gap-4">
              {["1", "2"].map((num) => (
                <label
                  key={num}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-5 cursor-pointer font-bold text-base transition-all duration-200 border select-none"
                  style={{
                    background: form.guests === num ? "rgba(200,134,10,0.25)" : "rgba(255,255,255,0.05)",
                    borderColor: form.guests === num ? "rgba(200,134,10,0.7)" : "rgba(255,255,255,0.15)",
                    color: form.guests === num ? "#f0b429" : "#90caf9",
                    minHeight: "48px",
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
            <p className="text-center text-sm font-medium" style={{ color: "#ff6b6b" }}>
              משהו השתבש, נסה/י שוב.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full mt-2 rounded-2xl font-black text-lg transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: status === "loading"
                ? "rgba(200,134,10,0.5)"
                : "linear-gradient(135deg, #c8860a 0%, #f0b429 100%)",
              color: "#07071a",
              minHeight: "56px",
            }}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
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
