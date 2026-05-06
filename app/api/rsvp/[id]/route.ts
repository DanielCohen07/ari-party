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
    ...(body.firstName !== undefined && { firstName: body.firstName }),
    ...(body.lastName  !== undefined && { lastName:  body.lastName  }),
    ...(body.guests    !== undefined && { guests:    Number(body.guests) }),
    ...(body.phone     !== undefined && { phone:     body.phone     }),
  });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, entry: updated });
}
