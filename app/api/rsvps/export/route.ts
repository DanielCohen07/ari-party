import { NextResponse } from "next/server";
import { getAllRSVPs } from "@/lib/rsvp-store";
import ExcelJS from "exceljs";

function confirmLabel(c: boolean | null | undefined) {
  if (c === true)  return "מגיע";
  if (c === false) return "לא מגיע";
  if (c === null)  return "לא ענה";
  return "לא ענה";
}

function confirmOrder(c: boolean | null | undefined) {
  if (c === true)  return 0;
  if (c === null || c === undefined) return 1;
  return 2; // false = לא מגיע
}

const COLORS = {
  true:    { bg: "FFD1FAE5", fg: "FF065F46" }, // green
  null:    { bg: "FFFFF9C4", fg: "FF78350F" }, // yellow (also undefined)
  false:   { bg: "FFFEE2E2", fg: "FF991B1B" }, // red
};

function rowColor(c: boolean | null | undefined) {
  if (c === true)  return COLORS.true;
  if (c === false) return COLORS.false;
  return COLORS.null;
}

export async function GET() {
  const rsvps = await getAllRSVPs();

  const sorted = [...rsvps].sort((a, b) => {
    const diff = confirmOrder(a.confirmed) - confirmOrder(b.confirmed);
    if (diff !== 0) return diff;
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("רשימת אורחים", {
    views: [{ rightToLeft: true }],
  });

  ws.columns = [
    { header: "שם פרטי",       key: "firstName", width: 18 },
    { header: "שם משפחה",      key: "lastName",  width: 18 },
    { header: "מגיעים",        key: "guests",    width: 10 },
    { header: "טלפון",         key: "phone",     width: 16 },
    { header: "וואטסאפ",       key: "wa",        width: 36 },
    { header: "סטטוס אישור",   key: "status",    width: 14 },
    { header: "תאריך רישום",   key: "date",      width: 22 },
  ];

  // Header row styling
  const headerRow = ws.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill   = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E3A5F" } };
    cell.font   = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
    cell.alignment = { horizontal: "right", vertical: "middle" };
    cell.border = { bottom: { style: "thin", color: { argb: "FF93C5FD" } } };
  });
  headerRow.height = 24;

  sorted.forEach((r) => {
    const wa = r.phone ? `https://wa.me/972${r.phone.replace(/^0/, "")}` : "";
    const date = new Date(r.timestamp).toLocaleString("he-IL");
    const { bg, fg } = rowColor(r.confirmed);

    const row = ws.addRow({
      firstName: r.firstName,
      lastName:  r.lastName,
      guests:    r.guests,
      phone:     r.phone ?? "",
      wa,
      status:    confirmLabel(r.confirmed),
      date,
    });

    row.eachCell((cell) => {
      cell.fill      = { type: "pattern", pattern: "solid", fgColor: { argb: bg } };
      cell.font      = { color: { argb: fg }, size: 11 };
      cell.alignment = { horizontal: "right", vertical: "middle" };
    });

    if (wa) {
      const waCell = row.getCell("wa");
      waCell.value = { text: wa, hyperlink: wa };
      waCell.font  = { color: { argb: "FF1D4ED8" }, size: 11, underline: true };
    }

    row.height = 20;
  });

  // Auto-filter on header
  ws.autoFilter = { from: "A1", to: "G1" };

  // Summary block
  const sum = (fn: (r: typeof rsvps[0]) => boolean) =>
    rsvps.filter(fn).reduce((s, r) => s + r.guests, 0);

  const comingCount    = sum(r => r.confirmed === true);
  const notComingCount = sum(r => r.confirmed === false);
  const noAnswerCount  = sum(r => r.confirmed === null || r.confirmed === undefined);
  const totalGuests    = sum(() => true);

  ws.addRow([]);

  const summaryDef = [
    { label: "✓ אישרו הגעה",  count: comingCount,    ...COLORS.true  },
    { label: "✕ לא מגיעים",   count: notComingCount, ...COLORS.false },
    { label: "? לא ענו",       count: noAnswerCount,  ...COLORS.null  },
    { label: "סה״כ אנשים",    count: totalGuests,    bg: "FFE2E8F0", fg: "FF1E293B" },
  ];

  summaryDef.forEach(({ label, count, bg, fg }) => {
    const r = ws.addRow([label, count]);
    [r.getCell(1), r.getCell(2)].forEach((cell) => {
      cell.fill      = { type: "pattern", pattern: "solid", fgColor: { argb: bg } };
      cell.font      = { bold: true, color: { argb: fg }, size: 12 };
      cell.alignment = { horizontal: "right", vertical: "middle" };
    });
    r.height = 22;
  });

  const buffer = await wb.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="rsvps-ari-50.xlsx"`,
    },
  });
}
