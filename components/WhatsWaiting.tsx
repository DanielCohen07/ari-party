const items = [
  { icon: "🍽️", title: "אוכל יווני מכל טוב",   desc: "מטעמים יווניים אותנטיים ישר מהטברנה" },
  { icon: "🏺", title: "חגיגת טברנה",           desc: "אווירה יוונית אמיתית — כולל שבירת צלחות" },
  { icon: "🥂", title: "אלכוהול משובח",          desc: "אוזו, יין ועוד. לחיים!" },
  { icon: "🎶", title: "מוזיקה טובה",            desc: "ריתמוס שיגרום לכם לרקוד כל הלילה" },
  { icon: "🫂", title: "אנשים טובים",            desc: "החברים והמשפחה שאוהבים את ארי" },
];

export default function WhatsWaiting() {
  return (
    <section className="w-full max-w-2xl px-4 pb-10 fade-up fade-up-delay-3">
      <div className="glass rounded-3xl shadow-2xl" style={{ padding: "clamp(1.25rem, 5vw, 2rem)" }}>

        <div className="flex items-center justify-center gap-3 mb-7">
          <span role="img" aria-hidden="true" style={{ fontSize: "1.4rem" }}>🇬🇷</span>
          <h2 style={{
            fontFamily: "var(--font-secular), sans-serif",
            fontSize: "clamp(1.5rem, 5vw, 1.9rem)",
            color: "#ffffff",
          }}>
            מה מחכה לכם?
          </h2>
          <span role="img" aria-hidden="true" style={{ fontSize: "1.4rem" }}>🇬🇷</span>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl border"
              style={{
                background: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.11)",
                padding: "1rem 1.25rem",
              }}
            >
              <span
                className="shrink-0 flex items-center justify-center rounded-xl"
                style={{
                  width: "56px", height: "56px",
                  fontSize: "1.75rem",
                  background: "rgba(200,134,10,0.14)",
                  border: "1px solid rgba(200,134,10,0.28)",
                }}
                role="img"
                aria-hidden="true"
              >
                {item.icon}
              </span>

              <div className="flex-1 text-right">
                <p style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 800, lineHeight: 1.3 }}>
                  {item.title}
                </p>
                <p style={{ color: "#93c5fd", fontSize: "0.95rem", fontWeight: 500, marginTop: "3px", lineHeight: 1.4 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl px-5 py-4 text-center border"
          style={{ background: "rgba(200,134,10,0.08)", borderColor: "rgba(200,134,10,0.25)" }}>
          <p style={{ color: "#f0b429", fontSize: "1.05rem", fontWeight: 700 }}>
            OPA! 🎉 זו המסיבה שמחכים לה כל השנה
          </p>
        </div>
      </div>
    </section>
  );
}
