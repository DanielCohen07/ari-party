const PAYBOX_URL = "https://links.payboxapp.com/FYKpSn4Lu2b";

function GiftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 12 20 22 4 22 4 12"/>
      <rect x="2" y="7" width="20" height="5"/>
      <line x1="12" y1="22" x2="12" y2="7"/>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
    </svg>
  );
}

function PayboxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="3"/>
      <path d="M2 10h20" stroke="white" strokeWidth="1.5" fill="none"/>
      <circle cx="7" cy="15" r="1.5" fill="white"/>
      <rect x="10" y="13.5" width="7" height="3" rx="1" fill="white" opacity="0.7"/>
    </svg>
  );
}

export default function GiftSection() {
  return (
    <section className="w-full max-w-2xl px-4 pb-10 fade-up fade-up-delay-4">
      <div
        className="glass rounded-3xl p-8 shadow-2xl border"
        style={{ borderColor: "rgba(200,134,10,0.35)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span style={{ color: "#f0b429" }}><GiftIcon /></span>
          <h2
            style={{
              fontFamily: "var(--font-secular), sans-serif",
              fontSize: "1.6rem",
              color: "#ffffff",
            }}
          >
            רוצה לשלוח מתנה?
          </h2>
          <span style={{ color: "#f0b429" }}><GiftIcon /></span>
        </div>

        {/* Description */}
        <div
          className="rounded-2xl px-5 py-4 mb-6 text-center border"
          style={{
            background: "rgba(200,134,10,0.08)",
            borderColor: "rgba(200,134,10,0.25)",
          }}
        >
          <p className="text-base font-semibold mb-1" style={{ color: "#f0b429" }}>
            ניתן להעביר מתנה כספית דרך PayBox
          </p>
          <p className="text-sm font-medium mb-1" style={{ color: "#93c5fd" }}>
            עד לפני האירוע · מאי 2026
          </p>
          <p className="text-xs mt-2" style={{ color: "rgba(147,197,253,0.6)" }}>
            השימוש ב-PayBox חינם! 🎉
          </p>
        </div>

        {/* Group info */}
        <div
          className="rounded-2xl px-5 py-4 mb-6 border"
          style={{
            background: "rgba(255,255,255,0.05)",
            borderColor: "rgba(255,255,255,0.12)",
          }}
        >
          <p className="text-sm font-semibold text-center mb-1" style={{ color: "#e2e8f0" }}>
            מחכים לך בקבוצת
          </p>
          <p className="text-base font-black text-center" style={{ color: "#ffffff" }}>
            "יום הולדת 50 לארי" 🎂
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={PAYBOX_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="הצטרף לקבוצת PayBox לשליחת מתנה"
          className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 px-6 font-black text-lg transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-xl cursor-pointer pulse-gold"
          style={{
            background: "linear-gradient(135deg, #c8860a 0%, #f0b429 100%)",
            color: "#07071a",
            minHeight: "60px",
          }}
        >
          <PayboxIcon />
          לחיצה להצטרפות לקבוצה
        </a>

        <p className="text-center text-xs mt-4" style={{ color: "rgba(147,197,253,0.45)" }}>
          גם ביט ופייבוקס מתקבלים בשמחה 💙
        </p>
      </div>
    </section>
  );
}
