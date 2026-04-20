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

export async function deleteRSVP(id: string): Promise<boolean> {
  const all = await getAllRSVPs();
  const next = all.filter((r) => r.id !== id);
  if (next.length === all.length) return false;
  await kv.set(KEY, next);
  return true;
}

export async function updateRSVP(
  id: string,
  data: Partial<Pick<RSVP, "firstName" | "lastName" | "guests">>
): Promise<RSVP | null> {
  const all = await getAllRSVPs();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data };
  await kv.set(KEY, all);
  return all[idx];
}
