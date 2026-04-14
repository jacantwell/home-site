"use client";

import { CandidateCard } from "./candidate-card";
import type { Candidate, Voter } from "@/lib/types";

export function CandidateList({
  candidates,
  voter,
}: {
  candidates: Candidate[];
  voter: Voter;
}) {
  if (candidates.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No candidates yet. Add one above or share the application link.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          voter={voter}
        />
      ))}
    </div>
  );
}
