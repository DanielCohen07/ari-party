export default function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center pt-12 pb-0 px-4 text-center">

      {/* Gold meander bar */}
      <div className="gold-line w-full max-w-2xl rounded-full mb-10" />

      {/* YOU ARE INVITED */}
      <div className="fade-up mb-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="h-px w-10 opacity-50" style={{ background: "linear-gradient(to left, #c8860a, transparent)" }} />
          <span
            className="tracking-[0.55em] uppercase text-xs font-semibold"
            style={{ color: "#90caf9", letterSpacing: "0.5em" }}
          >
            you are
          </span>
          <div className="h-px w-10 opacity-50" style={{ background: "linear-gradient(to right, #c8860a, transparent)" }} />
        </div>
        <p
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontSize: "clamp(3.2rem, 12vw, 6rem)",
            lineHeight: 0.95,
            letterSpacing: "0.06em",
            color: "transparent",
            WebkitTextStroke: "2px #c8860a",
            textShadow: "0 0 40px rgba(200,134,10,0.35)",
            userSelect: "none",
          }}
        >
          INVITED
        </p>
        <div className="flex gap-1.5 mt-1">
          {["#c8860a", "#ffffff", "#90caf9", "#ffffff", "#c8860a"].map((c, i) => (
            <div key={i} className="w-1 h-1 rounded-full opacity-70" style={{ background: c }} />
          ))}
        </div>
      </div>

      {/* Invite card — neon-free clean glow */}
      <div className="float-anim fade-up mb-10">
        <div className="relative">
          {/* Outer ring glow */}
          <div className="absolute -inset-3 rounded-[2rem] opacity-40 blur-xl" style={{
            background: "linear-gradient(135deg, #c8860a, #0f3460, #c8860a)",
          }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-invite-new.webp"
            alt="הזמנה לחגיגת יום הולדת 50 של ארי"
            className="relative rounded-3xl"
            style={{ width: "min(340px, 90vw)", height: "auto", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", display: "block" }}
          />
        </div>
      </div>

      {/* Headline block */}
      <div className="fade-up fade-up-delay-1 flex flex-col items-center gap-3">
        <p className="text-xs font-bold tracking-[0.4em] uppercase" style={{ color: "#c8860a", letterSpacing: "0.35em" }}>
          YASAS! · יאסו!
        </p>

        {/* Big number behind the title */}
        <div className="relative flex items-center justify-center">
          <span
            className="absolute select-none"
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "clamp(7rem, 22vw, 13rem)",
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(200,134,10,0.20)",
              letterSpacing: "-0.03em",
              userSelect: "none",
            }}
          >
            50
          </span>
          <h1
            style={{
              fontFamily: "var(--font-secular), sans-serif",
              fontSize: "clamp(3rem, 9.5vw, 5.5rem)",
              lineHeight: 1.08,
              color: "#ffffff",
              textShadow: "0 4px 40px rgba(21,101,192,0.5), 0 1px 0 rgba(255,255,255,0.15)",
              letterSpacing: "-0.02em",
              position: "relative",
              zIndex: 1,
            }}
          >
            ארי חוגג 50!
          </h1>
        </div>

        <p className="text-lg font-semibold" style={{ color: "#90caf9" }}>
          חגיגת יובל בהפתעה
        </p>

        <p className="text-sm font-light max-w-[280px] leading-relaxed" style={{ color: "#64b5f6", fontStyle: "italic" }}>
          Opa! ούζο, θάλασσα και χορός. בואו לחגוג!
        </p>
      </div>

      {/* Gold meander bottom */}
      <div className="gold-line w-full max-w-2xl rounded-full mt-12" />
    </section>
  );
}
