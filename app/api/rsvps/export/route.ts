import { NextResponse } from "next/server";
import { getAllRSVPs } from "@/lib/rsvp-store";

function esc(v: string) {
  return `"${v.replace(/"/g, '""')}"`;
}

function confirmLabel(c: boolean | null | undefined) {
  if (c === true)  return "מגיע";
  if (c === false) return "לא מגיע";
  if (c === null)  return "לא ענה";
  return "";
}

export async function GET() {
  const rsvps = await getAllRSVPs();

  const header = "שם פרטי,שם משפחה,מספר מגיעים,טלפון,וואטסאפ,סטטוס אישור,תאריך רישום\n";
  const rows = rsvps
    .map((r) => {
      const date = new Date(r.timestamp).toLocaleString("he-IL");
      const wa = r.phone
        ? `https://wa.me/972${r.phone.replace(/^0/, "")}`
        : "";
      return [
        esc(r.firstName),
        esc(r.lastName),
        r.guests,
        esc(r.phone ?? ""),
        esc(wa),
        esc(confirmLabel(r.confirmed)),
        esc(date),
      ].join(",");
    })
    .join("\n");

  const csv = "﻿" + header + rows;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="rsvps-ari-50.csv"`,
    },
  });
}
