import { Candidate, Note } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function submitApplication(data: {
  name: string;
  age: number;
  phone: string;
  bio: string;
}): Promise<Candidate> {
  const res = await fetch(`${API}/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit application");
  return res.json();
}

export async function getCandidates(): Promise<Candidate[]> {
  const res = await fetch(`${API}/candidates`);
  if (!res.ok) throw new Error("Failed to fetch candidates");
  return res.json();
}

export async function addCandidate(data: {
  name: string;
  age: number;
  phone: string;
  bio: string;
  source: string;
}): Promise<Candidate> {
  const res = await fetch(`${API}/candidates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add candidate");
  return res.json();
}

export async function vote(
  id: number,
  delta: 1 | -1,
  voter: string
): Promise<Candidate> {
  const res = await fetch(`${API}/candidates/${id}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ delta, voter }),
  });
  if (!res.ok) throw new Error("Failed to vote");
  return res.json();
}

export async function getNotes(candidateId: number): Promise<Note[]> {
  const res = await fetch(`${API}/candidates/${candidateId}/notes`);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function addNote(
  candidateId: number,
  content: string
): Promise<Note> {
  const res = await fetch(`${API}/candidates/${candidateId}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Failed to add note");
  return res.json();
}
