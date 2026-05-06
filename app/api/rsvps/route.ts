import { NextRequest, NextResponse } from "next/server";
import { getAllRSVPs, deleteRSVPsByName } from "@/lib/rsvp-store";

export async function GET() {
  try {
    const rsvps = await getAllRSVPs();
    return NextResponse.json({ rsvps });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName") ?? undefined;
    if (!firstName) return NextResponse.json({ error: "firstName required" }, { status: 400 });
    const deleted = await deleteRSVPsByName(firstName, lastName);
    return NextResponse.json({ success: true, deleted });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
