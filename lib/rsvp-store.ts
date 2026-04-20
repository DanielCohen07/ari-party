import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";

export interface RSVP {
  id: string;
  firstName: string;
  lastName: string;
  guests: number;
  timestamp: string;
}

const KEY = "rsvps";

export async function getAllRSVPs(): Promise<RSVP[]> {
  const data = await kv.get<RSVP[]>(KEY);
  return data ?? [];
}

export async function addRSVP(
  data: Omit<RSVP, "id" | "timestamp">
): Promise<RSVP> {
  const all = await getAllRSVPs();
  const entry: RSVP = {
    id: uuidv4(),
    ...data,
    timestamp: new Date().toISOString(),
  };
  all.push(entry);
  await kv.set(KEY, all);
  return entry;
}
