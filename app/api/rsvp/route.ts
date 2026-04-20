import { NextRequest, NextResponse } from "next/server";
import { addRSVP } from "@/lib/rsvp-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, guests } = body;

    if (!firstName || !lastName || !guests) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const entry = await addRSVP({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      guests: Number(guests),
    });

    return NextResponse.json({ success: true, entry });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
