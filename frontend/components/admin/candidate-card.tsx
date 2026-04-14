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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { NotesSection } from "./notes-section";
import { vote, deleteCandidate } from "@/lib/api";
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

  async function handleDelete() {
    await deleteCandidate(candidate.id);
    mutate(SWR_KEYS.candidates);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2">
              {candidate.name}, {candidate.age}
              <Badge variant="secondary" className="truncate max-w-[150px]">{candidate.source}</Badge>
            </CardTitle>
            <CardDescription>{candidate.phone}</CardDescription>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => handleVote(-1)}>
              -1
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleVote(1)}>
              +1
            </Button>
            <AlertDialog>
              <AlertDialogTrigger
                render={<Button variant="destructive" size="sm" />}
              >
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete {candidate.name}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this candidate and all their
                    votes and notes. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
