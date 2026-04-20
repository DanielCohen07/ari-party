"use client";

import { useState, useCallback } from "react";
import type { RSVP } from "@/lib/rsvp-store";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("he-IL", { dateStyle: "short", timeStyle: "short" });
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  );
}
function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

interface EditState {
  id: string;
  firstName: string;
  lastName: string;
  guests: string;
}

export default function AdminTable({ initial }: { initial: RSVP[] }) {
  const [rsvps, setRsvps] = useState<RSVP[]>(initial);
  const [editing, setEditing] = useState<EditState | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const totalGuests = rsvps.reduce((s, r) => s + r.guests, 0);
  const couples = rsvps.filter((r) => r.guests === 2).length;

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("למחוק את הרישום?")) return;
    setBusy(true);
    setDeleting(id);
    await fetch(`/api/rsvp/${id}`, { method: "DELETE" });
    setRsvps((prev) => prev.filter((r) => r.id !== id));
    setDeleting(null);
    setBusy(false);
  }, []);

  const startEdit = (r: RSVP) =>
    setEditing({ id: r.id, firstName: r.firstName, lastName: r.lastName, guests: String(r.guests) });

  const cancelEdit = () => setEditing(null);

  const saveEdit = async () => {
    if (!editing) return;
    setBusy(true);
    const res = await fetch(`/api/rsvp/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editing, guests: Number(editing.guests) }),
    });
    if (res.ok) {
      const { entry } = await res.json();
      setRsvps((prev) => prev.map((r) => (r.id === editing.id ? entry : r)));
      setEditing(null);
    }
    setBusy(false);
  };

  const cellInput = (field: keyof Omit<EditState, "id">, type = "text") => (
    <input
      type={type}
      value={editing![field]}
      onChange={(e) => setEditing((prev) => prev ? { ...prev, [field]: e.target.value } : prev)}
      className="w-full rounded-lg px-2 py-1 text-sm font-medium outline-none focus:ring-2"
      style={{
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.3)",
        color: "#fff",
        direction: "rtl",
        minWidth: field === "guests" ? "60px" : "90px",
      }}
    />
  );

  return (
    <>
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'סה"כ מגיעים', value: totalGuests, highlight: false },
          { label: "אישורים", value: rsvps.length, highlight: false },
          { label: "זוגות", value: couples, highlight: true },
        ].map(({ label, value, highlight }) => (
          <div key={label}
            className={label === "אישורים" ? "col-span-1" : label === 'סה"כ מגיעים' ? "col-span-2 sm:col-span-1" : ""}
            style={{
              background: highlight ? "rgba(200,134,10,0.25)" : "rgba(255,255,255,0.10)",
              border: `1px solid ${highlight ? "rgba(200,134,10,0.4)" : "rgba(255,255,255,0.18)"}`,
              backdropFilter: "blur(16px)",
              borderRadius: "1rem",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <p className="text-4xl font-black" style={{ color: highlight ? "#f0c040" : "#fff" }}>{value}</p>
            <p className="text-sm mt-1 font-medium" style={{ color: highlight ? "#fbbf24" : "#93c5fd" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Export */}
      <div className="flex justify-start mb-4">
        <a href="/api/rsvps/export" download
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 hover:brightness-110"
          style={{ background: "rgba(200,134,10,0.9)", color: "#07071a", minHeight: "44px" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
            <p className="text-5xl mb-4">🫒</p>
            <p className="text-lg font-medium">עדיין אין אישורים</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ color: "#fff" }}>
              <thead>
                <tr style={{ background: "rgba(26,58,107,0.6)", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                  {["#", "שם פרטי", "שם משפחה", "מגיעים", "נרשם", "פעולות"].map((h) => (
                    <th key={h} className="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider" style={{ color: "#93c5fd" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rsvps.map((r, i) => {
                  const isEditing = editing?.id === r.id;
                  const isDeleting = deleting === r.id;
                  return (
                    <tr key={r.id}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        background: isEditing ? "rgba(200,134,10,0.10)" : i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                        opacity: isDeleting ? 0.4 : 1,
                        transition: "all 0.2s",
                      }}
                    >
                      <td className="px-4 py-3 text-sm" style={{ color: "#93c5fd" }}>{i + 1}</td>

                      <td className="px-4 py-3 font-semibold">
                        {isEditing ? cellInput("firstName") : r.firstName}
                      </td>

                      <td className="px-4 py-3 font-semibold">
                        {isEditing ? cellInput("lastName") : r.lastName}
                      </td>

                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select
                            value={editing!.guests}
                            onChange={(e) => setEditing((prev) => prev ? { ...prev, guests: e.target.value } : prev)}
                            className="rounded-lg px-2 py-1 text-sm font-bold outline-none"
                            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }}
                          >
                            <option value="1">👤 1</option>
                            <option value="2">👥 2</option>
                          </select>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold"
                            style={{
                              background: r.guests === 2 ? "rgba(251,191,36,0.2)" : "rgba(147,197,253,0.15)",
                              color: r.guests === 2 ? "#fbbf24" : "#93c5fd",
                            }}>
                            {r.guests === 2 ? "👥" : "👤"} {r.guests}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-sm" style={{ color: "#93c5fd" }}>
                        {formatDate(r.timestamp)}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          {isEditing ? (
                            <>
                              <button onClick={saveEdit} disabled={busy} aria-label="שמור"
                                className="p-2 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-green-500/20"
                                style={{ color: "#4ade80", minWidth: "32px", minHeight: "32px" }}>
                                <CheckIcon />
                              </button>
                              <button onClick={cancelEdit} disabled={busy} aria-label="ביטול"
                                className="p-2 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-white/10"
                                style={{ color: "#94a3b8", minWidth: "32px", minHeight: "32px" }}>
                                <XIcon />
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => startEdit(r)} disabled={busy} aria-label="ערוך"
                                className="p-2 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-blue-500/20"
                                style={{ color: "#93c5fd", minWidth: "32px", minHeight: "32px" }}>
                                <EditIcon />
                              </button>
                              <button onClick={() => handleDelete(r.id)} disabled={busy} aria-label="מחק"
                                className="p-2 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-red-500/20"
                                style={{ color: "#f87171", minWidth: "32px", minHeight: "32px" }}>
                                <TrashIcon />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-center text-xs mt-8" style={{ color: "rgba(147,197,253,0.4)" }}>
        רענן את הדף לעדכון הנתונים · /admin
      </p>
    </>
  );
}
