import { getAllRSVPs } from "@/lib/rsvp-store";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("he-IL", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

export default async function AdminPage() {
  const rsvps = await getAllRSVPs();
  const totalGuests = rsvps.reduce((sum, r) => sum + r.guests, 0);

  return (
    <main
      dir="rtl"
      className="min-h-screen px-4 py-10"
      style={{
        background:
          "linear-gradient(160deg, #0f2d5e 0%, #1a4a8a 40%, #2a6cb5 100%)",
        fontFamily: "var(--font-heebo), system-ui, sans-serif",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#c8960c] font-semibold tracking-widest text-sm uppercase mb-2">
            ADMIN · ניהול אישורי הגעה
          </p>
          <h1 className="text-4xl font-black text-white mb-1">ארי חוגג 50 🎉</h1>
          <p className="text-blue-200 text-base">לוח ניהול מוזמנים</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div
            className="rounded-2xl p-6 text-center col-span-2 sm:col-span-1"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <p className="text-4xl font-black text-white">{totalGuests}</p>
            <p className="text-blue-200 text-sm mt-1 font-medium">סה"כ מגיעים</p>
          </div>
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <p className="text-4xl font-black text-white">{rsvps.length}</p>
            <p className="text-blue-200 text-sm mt-1 font-medium">אישורים</p>
          </div>
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background: "rgba(200,150,12,0.25)",
              border: "1px solid rgba(200,150,12,0.4)",
              backdropFilter: "blur(16px)",
            }}
          >
            <p className="text-4xl font-black text-[#f0c040]">
              {rsvps.filter((r) => r.guests === 2).length}
            </p>
            <p className="text-amber-200 text-sm mt-1 font-medium">זוגות</p>
          </div>
        </div>

        {/* Export button */}
        <div className="flex justify-start mb-4">
          <a
            href="/api/rsvps/export"
            download
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-colors duration-200 cursor-pointer hover:brightness-110"
            style={{
              background: "rgba(200,150,12,0.9)",
              color: "#0f2d5e",
              minHeight: "44px",
            }}
          >
            <DownloadIcon />
            ייצוא ל-CSV (אקסל)
          </a>
        </div>

        {/* Table */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(24px)",
          }}
        >
          {rsvps.length === 0 ? (
            <div className="py-20 text-center text-blue-200">
              <p className="text-5xl mb-4">🫒</p>
              <p className="text-lg font-medium">עדיין אין אישורים</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr
                    style={{
                      background: "rgba(26,58,107,0.6)",
                      borderBottom: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {["#", "שם פרטי", "שם משפחה", "מגיעים", "נרשם"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-blue-200"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r, i) => (
                    <tr
                      key={r.id}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        background:
                          i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                      }}
                      className="transition-colors hover:bg-white/10"
                    >
                      <td className="px-5 py-4 text-blue-300 text-sm font-medium">
                        {i + 1}
                      </td>
                      <td className="px-5 py-4 font-semibold">{r.firstName}</td>
                      <td className="px-5 py-4 font-semibold">{r.lastName}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                            r.guests === 2
                              ? "bg-amber-400/20 text-amber-300"
                              : "bg-blue-400/20 text-blue-200"
                          }`}
                        >
                          {r.guests === 2 ? "👥" : "👤"} {r.guests}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-blue-300 text-sm">
                        {formatDate(r.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-center text-blue-300/50 text-xs mt-8">
          רענן את הדף לעדכון הנתונים · /admin
        </p>
      </div>
    </main>
  );
}
