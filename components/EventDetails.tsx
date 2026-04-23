function CalIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#90caf9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#90caf9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#90caf9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
function ShirtIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#90caf9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
    </svg>
  );
}
function WavesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#90caf9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
    </svg>
  );
}

const details = [
  { Icon: CalIcon,   label: "תאריך",    value: "7 במאי 2026",        note: "לא לאחר — זו הפתעה!", noteColor: "#ffab40" },
  { Icon: ClockIcon, label: "שעה",      value: "18:00",               note: undefined,              noteColor: "" },
  { Icon: UsersIcon, label: "מי מגיע?", value: "מבוגרים בלבד",       note: "ללא ילדים",            noteColor: "#f0b429" },
  { Icon: ShirtIcon, label: "קוד לבוש", value: "לבן בלבד",            note: undefined,              noteColor: "" },
  { Icon: WavesIcon, label: "טיפ חשוב", value: "הביאו בגד ים ומגבת", note: undefined,              noteColor: "" },
];

export default function EventDetails() {
  return (
    <section className="w-full max-w-2xl px-4 py-10 fade-up fade-up-delay-2">
      <div className="glass rounded-3xl shadow-2xl" style={{ padding: "clamp(1.25rem, 5vw, 2rem)" }}>

        <div className="flex items-center justify-center gap-3 mb-7">
          <span role="img" aria-hidden="true" style={{ fontSize: "1.4rem" }}>🫒</span>
          <h2 style={{
            fontFamily: "var(--font-secular), sans-serif",
            fontSize: "clamp(1.5rem, 5vw, 1.9rem)",
            color: "#ffffff",
          }}>
            פרטי האירוע
          </h2>
          <span role="img" aria-hidden="true" style={{ fontSize: "1.4rem" }}>🫒</span>
        </div>

        <div className="flex flex-col gap-3">
          {details.map((d) => (
            <div
              key={d.label}
              className="flex items-center gap-4 rounded-2xl border"
              style={{
                background: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.13)",
                padding: "1rem 1.25rem",
              }}
            >
              {/* Icon bubble */}
              <div className="shrink-0 flex items-center justify-center rounded-xl"
                style={{
                  width: "48px", height: "48px",
                  background: "rgba(33,150,243,0.15)",
                  border: "1px solid rgba(144,202,249,0.2)",
                }}>
                <d.Icon />
              </div>

              {/* Text */}
              <div className="flex-1 text-right">
                <p style={{ color: "#90caf9", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {d.label}
                </p>
                <p style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 800, lineHeight: 1.3, marginTop: "2px" }}>
                  {d.value}
                </p>
                {d.note && (
                  <p style={{ color: d.noteColor, fontSize: "0.9rem", fontWeight: 600, marginTop: "2px" }}>
                    {d.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl px-5 py-4 text-center border"
          style={{ background: "rgba(200,134,10,0.10)", borderColor: "rgba(200,134,10,0.30)" }}>
          <p style={{ color: "#f0b429", fontSize: "1.05rem", fontWeight: 700 }}>
            🤫 זו <strong style={{ color: "#ffd700" }}>הפתעה</strong> — אל תגלו לארי!
          </p>
        </div>
      </div>
    </section>
  );
}
