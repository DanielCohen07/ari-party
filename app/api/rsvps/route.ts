import { NextResponse } from "next/server";
import { getAllRSVPs } from "@/lib/rsvp-store";

export async function GET() {
  try {
    const rsvps = await getAllRSVPs();
    return NextResponse.json({ rsvps });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
