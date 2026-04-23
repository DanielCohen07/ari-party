export default function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center pt-10 pb-0 px-4 text-center">

      {/* Gold meander bar */}
      <div className="gold-line w-full max-w-2xl rounded-full mb-8" />

      {/* YOU ARE INVITED */}
      <div className="fade-up mb-5 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="h-px w-10 opacity-50" style={{ background: "linear-gradient(to left, #c8860a, transparent)" }} />
          <span style={{ color: "#90caf9", fontSize: "0.85rem", letterSpacing: "0.5em", fontWeight: 600, textTransform: "uppercase" }}>
            you are
          </span>
          <div className="h-px w-10 opacity-50" style={{ background: "linear-gradient(to right, #c8860a, transparent)" }} />
        </div>
        <p
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontSize: "clamp(3.5rem, 14vw, 6.5rem)",
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
      </div>

      {/* Invite image */}
      <div className="float-anim fade-up mb-10">
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] opacity-40 blur-xl" style={{
            background: "linear-gradient(135deg, #c8860a, #0f3460, #c8860a)",
          }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-invite-new.webp"
            alt="הזמנה לחגיגת יום הולדת 50 של ארי"
            className="relative rounded-3xl"
            style={{ width: "min(360px, 92vw)", height: "auto", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", display: "block" }}
          />
        </div>
      </div>

      {/* Headline block */}
      <div className="fade-up fade-up-delay-1 flex flex-col items-center gap-3">
        <p style={{ color: "#c8860a", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" }}>
          YASAS! · יאסו!
        </p>

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
              fontSize: "clamp(2.8rem, 10vw, 5.5rem)",
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

        <p style={{ color: "#90caf9", fontSize: "1.15rem", fontWeight: 600 }}>
          חגיגת יובל בהפתעה
        </p>

        <p style={{ color: "#64b5f6", fontSize: "1rem", fontStyle: "italic", maxWidth: "300px", lineHeight: 1.6 }}>
          Opa! ούζο, θάλασσα και χορός. בואו לחגוג!
        </p>
      </div>

      {/* Gold meander bottom */}
      <div className="gold-line w-full max-w-2xl rounded-full mt-10" />
    </section>
  );
}
