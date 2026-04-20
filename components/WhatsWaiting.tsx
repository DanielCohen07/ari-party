const items = [
  {
    icon: "🍽️",
    title: "אוכל יווני מכל טוב",
    desc: "מטעמים יווניים אותנטיים ישר מהטברנה",
  },
  {
    icon: "🏺",
    title: "חגיגת טברנה",
    desc: "אווירה יוונית אמיתית — כולל שבירת צלחות",
  },
  {
    icon: "🥂",
    title: "אלכוהול משובח",
    desc: "אוזו, יין ועוד. לחיים!",
  },
  {
    icon: "🎶",
    title: "מוזיקה טובה",
    desc: "ריתמוס שיגרום לכם לרקוד כל הלילה",
  },
  {
    icon: "🫂",
    title: "אנשים טובים",
    desc: "החברים והמשפחה שאוהבים את ארי",
  },
];

export default function WhatsWaiting() {
  return (
    <section className="w-full max-w-2xl px-4 pb-10 fade-up fade-up-delay-3">
      <div className="glass rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span role="img" aria-hidden="true">🇬🇷</span>
          <h2
            style={{
              fontFamily: "var(--font-secular), sans-serif",
              fontSize: "1.6rem",
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            מה מחכה לכם?
          </h2>
          <span role="img" aria-hidden="true">🇬🇷</span>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl px-5 py-4 border"
              style={{
                background: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.11)",
              }}
            >
              {/* Icon */}
              <span
                className="text-3xl shrink-0 flex items-center justify-center rounded-xl"
                style={{
                  width: "52px",
                  height: "52px",
                  background: "rgba(200,134,10,0.14)",
                  border: "1px solid rgba(200,134,10,0.28)",
                }}
                role="img"
                aria-hidden="true"
              >
                {item.icon}
              </span>

              {/* Text */}
              <div className="text-right">
                <p className="font-black text-base" style={{ color: "#ffffff" }}>
                  {item.title}
                </p>
                <p className="text-sm mt-0.5" style={{ color: "#93c5fd" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div
          className="mt-6 rounded-2xl px-6 py-3 text-center border"
          style={{
            background: "rgba(200,134,10,0.08)",
            borderColor: "rgba(200,134,10,0.25)",
          }}
        >
          <p className="text-sm font-semibold" style={{ color: "#f0b429" }}>
            OPA! 🎉 זו המסיבה שמחכים לה כל השנה
          </p>
        </div>
      </div>
    </section>
  );
}
