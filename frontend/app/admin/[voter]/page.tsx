"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { AddCandidateForm } from "@/components/admin/add-candidate-form";
import { CandidateList } from "@/components/admin/candidate-list";
import { getCandidates } from "@/lib/api";
import { SWR_KEYS } from "@/lib/swr-keys";
import { VOTERS } from "@/lib/types";
import type { Voter } from "@/lib/types";

export default function AdminPage() {
  const params = useParams();
  const voter = params.voter as string;

  const isValidVoter = (VOTERS as readonly string[]).includes(voter);

  const { data: candidates, isLoading } = useSWR(
    isValidVoter ? SWR_KEYS.candidates : null,
    getCandidates,
    { refreshInterval: 10_000 }
  );

  if (!isValidVoter) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Not Found</h1>
        <p className="text-muted-foreground">
          This page does not exist.
        </p>
      </main>
    );
  }

  const displayName = voter.charAt(0).toUpperCase() + voter.slice(1);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin — {displayName}</h1>
      <AddCandidateForm />
      <Separator className="my-8" />
      <h2 className="text-xl font-semibold mb-4">Candidates</h2>
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <CandidateList
          candidates={candidates ?? []}
          voter={voter as Voter}
        />
      )}
    </main>
  );
}
