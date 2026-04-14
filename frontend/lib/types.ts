export const VOTERS = ["jasper", "micol", "damia"] as const;
export type Voter = (typeof VOTERS)[number];

export interface Candidate {
  id: number;
  name: string;
  age: number;
  phone: string;
  bio: string;
  source: string;
  scores: Record<string, number>;
  total_score: number;
  created_at: string;
}

export interface Note {
  id: number;
  candidate_id: number;
  content: string;
  created_at: string;
}
