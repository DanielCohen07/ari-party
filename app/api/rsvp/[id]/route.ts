import { NextRequest, NextResponse } from "next/server";
import { deleteRSVP, updateRSVP } from "@/lib/rsvp-store";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ok = await deleteRSVP(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const updated = await updateRSVP(id, {
    firstName: body.firstName,
    lastName: body.lastName,
    guests: Number(body.guests),
  });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, entry: updated });
}
