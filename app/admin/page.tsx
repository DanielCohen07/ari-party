import { getAllRSVPs } from "@/lib/rsvp-store";
import AdminTable from "@/components/AdminTable";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const rsvps = await getAllRSVPs();

  return (
    <main
      dir="rtl"
      className="min-h-screen px-4 py-10"
      style={{
        background: "linear-gradient(160deg, #050e1f 0%, #0a1e3d 40%, #0f3460 100%)",
        fontFamily: "var(--font-assistant), system-ui, sans-serif",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-semibold tracking-widest text-sm uppercase mb-2" style={{ color: "#c8860a" }}>
            ADMIN · ניהול אישורי הגעה
          </p>
          <h1 className="text-4xl font-black text-white mb-1"
            style={{ fontFamily: "var(--font-secular), sans-serif" }}>
            ארי חוגג 50 🎉
          </h1>
          <p className="text-base" style={{ color: "#93c5fd" }}>לוח ניהול מוזמנים</p>
        </div>

        <AdminTable initial={rsvps} />
      </div>
    </main>
  );
}
