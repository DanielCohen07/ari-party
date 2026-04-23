const WAZE_URL =
  "https://ul.waze.com/ul?ll=31.92087793%2C35.03366232&navigate=yes&zoom=17&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location";

const CAL_DETAILS = encodeURIComponent(
  "🎉 חגיגת יובל בהפתעה – ארי חוגג 50!\n" +
  "📍 האופק 16, כפר האורנים | 🕕 18:00\n" +
  "👗 קוד לבוש: לבן | 🩱 הביאו בגד ים ומגבת\n" +
  "🧑‍🤝‍🧑 אירוע למבוגרים בלבד\n\n" +
  "⏰ תזכורת: אל תאחרו – זו הפתעה!\n\n" +
  "🎁 רוצה לשלוח מתנה?\n" +
  "הצטרפו לקבוצת PayBox של האירוע:\n" +
  "https://links.payboxapp.com/FYKpSn4Lu2b\n" +
  "גם ביט ופייבוקס מתקבלים בשמחה 💙\n" +
  "השימוש ב-PayBox חינם!\n\n" +
  "🤫 זו הפתעה – לא מספרים לארי!"
);

const GOOGLE_CAL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=%D7%99%D7%95%D7%9D+%D7%94%D7%95%D7%9C%D7%93%D7%AA+50+%D7%A9%D7%9C+%D7%90%D7%A8%D7%99+%F0%9F%8E%89" +
  "&dates=20260507T150000Z/20260507T200000Z" +
  "&details=" + CAL_DETAILS +
  "&location=%D7%94%D7%90%D7%95%D7%A4%D7%A7+16%2C+%D7%9B%D7%A4%D7%A8+%D7%94%D7%90%D7%95%D7%A8%D7%A0%D7%99%D7%9D";

function MapPinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function ParkingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
    </svg>
  );
}
function WazeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

export default function LocationSection() {
  return (
    <section className="w-full max-w-2xl px-4 pb-10 fade-up fade-up-delay-3">
      <div className="glass rounded-3xl shadow-2xl" style={{ padding: "clamp(1.25rem, 5vw, 2rem)" }}>

        <div className="flex items-center justify-center gap-2 mb-7" style={{ color: "#90caf9" }}>
          <MapPinIcon />
          <h2 style={{
            fontFamily: "var(--font-secular), sans-serif",
            fontSize: "clamp(1.5rem, 5vw, 1.9rem)",
            color: "#ffffff",
          }}>
            מיקום וניווט
          </h2>
        </div>

        {/* Address */}
        <div className="rounded-2xl px-5 py-5 border mb-4 text-center"
          style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.14)" }}>
          <p style={{ color: "#ffffff", fontSize: "1.35rem", fontWeight: 800 }}>האופק 16, כפר האורנים</p>
          <p style={{ color: "#f0b429", fontSize: "1rem", fontWeight: 700, marginTop: "6px" }}>
            נא להגיע עד 17:55 בדיוק!
          </p>
        </div>

        {/* Parking note */}
        <div className="rounded-2xl px-5 py-4 mb-6 border"
          style={{ background: "rgba(200,134,10,0.08)", borderColor: "rgba(200,134,10,0.25)" }}>
          <div className="flex items-start gap-2 justify-end" style={{ color: "#f0b429" }}>
            <p style={{ color: "#f0b429", fontSize: "1rem", fontWeight: 600, textAlign: "right", lineHeight: 1.5 }}>
              נא לחנות <strong>ברחוב הראשי בגבעה</strong> ולא לחסום חניות שכנים
            </p>
            <span className="mt-1 shrink-0"><ParkingIcon /></span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <a
            href={WAZE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="נווט לאירוע דרך Waze"
            className="flex items-center justify-center gap-3 rounded-2xl font-bold transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-lg cursor-pointer pulse-gold"
            style={{
              background: "linear-gradient(135deg, #c8860a 0%, #f0b429 100%)",
              color: "#07071a",
              minHeight: "60px",
              fontSize: "1.15rem",
              padding: "0 1.5rem",
            }}
          >
            <WazeIcon />
            נווט ב-Waze
          </a>

          <a
            href={GOOGLE_CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="הוסף את האירוע ל-Google Calendar"
            className="flex items-center justify-center gap-3 rounded-2xl font-bold transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-md cursor-pointer border"
            style={{
              background: "rgba(255,255,255,0.09)",
              borderColor: "rgba(255,255,255,0.25)",
              color: "#e8f0fe",
              minHeight: "60px",
              fontSize: "1.1rem",
              padding: "0 1.5rem",
            }}
          >
            <CalendarIcon />
            הוסף ליומן Google
          </a>
        </div>
      </div>
    </section>
  );
}
