"use client";

import { useSWRConfig } from "swr";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotesSection } from "./notes-section";
import { vote } from "@/lib/api";
import { SWR_KEYS } from "@/lib/swr-keys";
import { VOTERS } from "@/lib/types";
import type { Candidate, Voter } from "@/lib/types";

const INITIALS: Record<Voter, string> = {
  jasper: "J",
  micol: "M",
  damia: "D",
};

export function CandidateCard({
  candidate,
  voter,
}: {
  candidate: Candidate;
  voter: Voter;
}) {
  const { mutate } = useSWRConfig();

  async function handleVote(delta: 1 | -1) {
    await vote(candidate.id, delta, voter);
    mutate(SWR_KEYS.candidates);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {candidate.name}, {candidate.age}
              <Badge variant="secondary">{candidate.source}</Badge>
            </CardTitle>
            <CardDescription>{candidate.phone}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleVote(-1)}>
              -1
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleVote(1)}>
              +1
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm pt-1">
          {VOTERS.map((v) => (
            <span
              key={v}
              className={v === voter ? "font-bold" : "text-muted-foreground"}
            >
              {INITIALS[v]}: {candidate.scores[v] ?? 0}
            </span>
          ))}
          <span className="font-bold">
            Total: {candidate.total_score}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">{candidate.bio}</p>
        <p className="text-xs text-muted-foreground">
          Added {new Date(candidate.created_at).toLocaleDateString()}
        </p>
        <NotesSection candidateId={candidate.id} />
      </CardContent>
    </Card>
  );
}
