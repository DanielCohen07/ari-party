import { NextResponse } from "next/server";
import { getAllRSVPs } from "@/lib/rsvp-store";

export async function GET() {
  const rsvps = await getAllRSVPs();

  const header = "שם פרטי,שם משפחה,מספר מגיעים,תאריך רישום\n";
  const rows = rsvps
    .map((r) => {
      const date = new Date(r.timestamp).toLocaleString("he-IL");
      return `${r.firstName},${r.lastName},${r.guests},"${date}"`;
    })
    .join("\n");

  const csv = "\uFEFF" + header + rows; // BOM for Excel Hebrew support

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="rsvps-ari-50.csv"`,
    },
  });
}
