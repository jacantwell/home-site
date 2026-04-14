import { Note } from "./types";

interface StoredCandidate {
  id: number;
  name: string;
  age: number;
  phone: string;
  bio: string;
  source: string;
  created_at: string;
}

let nextCandidateId = 1;
let nextNoteId = 1;

const candidates: StoredCandidate[] = [];
const notes: Note[] = [];
const voterScores: Map<number, Record<string, number>> = new Map();

function enrichCandidate(c: StoredCandidate) {
  const scores = voterScores.get(c.id) ?? {};
  const total_score = Object.values(scores).reduce((a, b) => a + b, 0);
  return { ...c, scores: { ...scores }, total_score };
}

export const db = {
  getCandidates: () => candidates.map(enrichCandidate),

  getCandidate: (id: number) => {
    const c = candidates.find((c) => c.id === id);
    if (!c) return undefined;
    return enrichCandidate(c);
  },

  addCandidate: (
    data: Pick<StoredCandidate, "name" | "age" | "phone" | "bio" | "source">
  ) => {
    const candidate: StoredCandidate = {
      ...data,
      id: nextCandidateId++,
      created_at: new Date().toISOString(),
    };
    candidates.push(candidate);
    return enrichCandidate(candidate);
  },

  vote: (id: number, delta: number, voter: string) => {
    const candidate = candidates.find((c) => c.id === id);
    if (!candidate) return null;
    const scores = voterScores.get(id) ?? {};
    scores[voter] = (scores[voter] ?? 0) + delta;
    voterScores.set(id, scores);
    return enrichCandidate(candidate);
  },

  getNotesForCandidate: (candidateId: number): Note[] =>
    notes.filter((n) => n.candidate_id === candidateId),

  addNote: (candidateId: number, content: string): Note | null => {
    if (!candidates.find((c) => c.id === candidateId)) return null;
    const note: Note = {
      id: nextNoteId++,
      candidate_id: candidateId,
      content,
      created_at: new Date().toISOString(),
    };
    notes.push(note);
    return note;
  },
};
