"use client";

import { useState, useCallback } from "react";
import type { RSVP } from "@/lib/rsvp-store";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("he-IL", { dateStyle: "short", timeStyle: "short" });
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  );
}
function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

interface EditState { id: string; firstName: string; lastName: string; guests: string; phone: string; }

const cardStyle = (highlight: boolean): React.CSSProperties => ({
  background: highlight ? "rgba(200,134,10,0.25)" : "rgba(255,255,255,0.10)",
  border: `1px solid ${highlight ? "rgba(200,134,10,0.4)" : "rgba(255,255,255,0.18)"}`,
  backdropFilter: "blur(16px)",
  borderRadius: "1rem",
  padding: "1.5rem",
  textAlign: "center",
});

export default function AdminTable({ initial }: { initial: RSVP[] }) {
  const [rsvps, setRsvps]   = useState<RSVP[]>(initial);
  const [editing, setEditing] = useState<EditState | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [busy, setBusy]     = useState(false);

  const totalGuests = rsvps.reduce((s, r) => s + r.guests, 0);
  const couples     = rsvps.filter((r) => r.guests === 2).length;

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("למחוק את הרישום?")) return;
    setBusy(true); setDeleting(id);
    await fetch(`/api/rsvp/${id}`, { method: "DELETE" });
    setRsvps((p) => p.filter((r) => r.id !== id));
    setDeleting(null); setBusy(false);
  }, []);

  const startEdit  = (r: RSVP) => setEditing({ id: r.id, firstName: r.firstName, lastName: r.lastName, guests: String(r.guests), phone: r.phone ?? "" });
  const cancelEdit = () => setEditing(null);

  const saveEdit = async () => {
    if (!editing) return;
    setBusy(true);
    const res = await fetch(`/api/rsvp/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editing, guests: Number(editing.guests), phone: editing.phone || undefined }),
    });
    if (res.ok) {
      const { entry } = await res.json();
      setRsvps((p) => p.map((r) => (r.id === editing.id ? entry : r)));
      setEditing(null);
    }
    setBusy(false);
  };

  const textInput = (field: "firstName" | "lastName") => (
    <input
      type="text"
      value={editing![field]}
      onChange={(e) => setEditing((p) => p ? { ...p, [field]: e.target.value } : p)}
      style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "0.5rem", padding: "4px 8px", color: "#fff", width: "100%", direction: "rtl" }}
    />
  );

  return (
    <>
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div style={cardStyle(false)}><p className="text-4xl font-black text-white">{rsvps.length}</p><p className="text-sm mt-1" style={{ color: "#93c5fd" }}>אישורים</p></div>
        <div style={cardStyle(false)}><p className="text-4xl font-black text-white">{totalGuests}</p><p className="text-sm mt-1" style={{ color: "#93c5fd" }}>מגיעים</p></div>
        <div style={cardStyle(true)}><p className="text-4xl font-black" style={{ color: "#f0c040" }}>{couples}</p><p className="text-sm mt-1" style={{ color: "#fbbf24" }}>זוגות</p></div>
      </div>

      {/* Export */}
      <div className="flex justify-start mb-4">
        <a href="/api/rsvps/export" download
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm cursor-pointer hover:brightness-110 transition-all duration-200"
          style={{ background: "rgba(200,134,10,0.9)", color: "#07071a", minHeight: "44px" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          ייצוא ל-CSV (אקסל)
        </a>
      </div>

      {/* Table */}
      <div className="rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(24px)" }}>
        {rsvps.length === 0 ? (
          <div className="py-20 text-center" style={{ color: "#93c5fd" }}>
            <p className="text-5xl mb-4">🫒</p><p className="text-lg font-medium">עדיין אין אישורים</p>
          </div>
        ) : (
          <table className="w-full" style={{ color: "#fff", tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "88px" }} /> {/* פעולות */}
              <col style={{ width: "36px" }} /> {/* # */}
              <col />                            {/* שם פרטי */}
              <col />                            {/* שם משפחה */}
              <col style={{ width: "80px" }} /> {/* מגיעים */}
              <col style={{ width: "120px" }} />{/* טלפון */}
              <col style={{ width: "130px" }} />{/* נרשם */}
            </colgroup>
            <thead>
              <tr style={{ background: "rgba(26,58,107,0.6)", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                {["פעולות", "#", "שם פרטי", "שם משפחה", "מגיעים", "טלפון", "נרשם"].map((h) => (
                  <th key={h} className="px-3 py-4 text-right text-xs font-bold uppercase tracking-wider" style={{ color: "#93c5fd" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rsvps.map((r, i) => {
                const isEditing  = editing?.id === r.id;
                const isDeleting = deleting === r.id;
                return (
                  <tr key={r.id} style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    background: isEditing ? "rgba(200,134,10,0.10)" : i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                    opacity: isDeleting ? 0.4 : 1,
                    transition: "all 0.2s",
                  }}>

                    {/* ── פעולות (ימין) ── */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        {isEditing ? (
                          <>
                            <button onClick={saveEdit} disabled={busy} aria-label="שמור"
                              className="p-2 rounded-lg cursor-pointer hover:bg-green-500/20 transition-colors"
                              style={{ color: "#4ade80", minWidth: "32px", minHeight: "32px" }}>
                              <CheckIcon />
                            </button>
                            <button onClick={cancelEdit} disabled={busy} aria-label="ביטול"
                              className="p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                              style={{ color: "#94a3b8", minWidth: "32px", minHeight: "32px" }}>
                              <XIcon />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEdit(r)} disabled={busy} aria-label="ערוך"
                              className="p-2 rounded-lg cursor-pointer hover:bg-blue-500/20 transition-colors"
                              style={{ color: "#93c5fd", minWidth: "32px", minHeight: "32px" }}>
                              <EditIcon />
                            </button>
                            <button onClick={() => handleDelete(r.id)} disabled={busy} aria-label="מחק"
                              className="p-2 rounded-lg cursor-pointer hover:bg-red-500/20 transition-colors"
                              style={{ color: "#f87171", minWidth: "32px", minHeight: "32px" }}>
                              <TrashIcon />
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="px-3 py-3 text-sm" style={{ color: "#93c5fd" }}>{i + 1}</td>
                    <td className="px-3 py-3 font-semibold">{isEditing ? textInput("firstName") : r.firstName}</td>
                    <td className="px-3 py-3 font-semibold">{isEditing ? textInput("lastName")  : r.lastName}</td>

                    <td className="px-3 py-3">
                      {isEditing ? (
                        <select value={editing!.guests}
                          onChange={(e) => setEditing((p) => p ? { ...p, guests: e.target.value } : p)}
                          className="rounded-lg px-2 py-1 text-sm font-bold outline-none"
                          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }}>
                          <option value="1">👤 1</option>
                          <option value="2">👥 2</option>
                        </select>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold"
                          style={{ background: r.guests === 2 ? "rgba(251,191,36,0.2)" : "rgba(147,197,253,0.15)", color: r.guests === 2 ? "#fbbf24" : "#93c5fd" }}>
                          {r.guests === 2 ? "👥" : "👤"} {r.guests}
                        </span>
                      )}
                    </td>

                    <td className="px-3 py-3 text-sm" dir="ltr" style={{ color: r.phone ? "#4ade80" : "rgba(147,197,253,0.3)" }}>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editing!.phone}
                          onChange={(e) => setEditing((p) => p ? { ...p, phone: e.target.value } : p)}
                          placeholder="05X-XXXXXXX"
                          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "0.5rem", padding: "4px 8px", color: "#fff", width: "100%", direction: "ltr" }}
                        />
                      ) : r.phone ? (
                        <a
                          href={`https://wa.me/972${r.phone.replace(/^0/, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                          style={{ color: "#4ade80" }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          {r.phone}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="px-3 py-3 text-sm" style={{ color: "#93c5fd" }}>{formatDate(r.timestamp)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-center text-xs mt-8" style={{ color: "rgba(147,197,253,0.35)" }}>
        רענן את הדף לעדכון · /admin
      </p>
    </>
  );
}
