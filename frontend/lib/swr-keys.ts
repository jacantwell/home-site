export const SWR_KEYS = {
  candidates: "candidates",
  notes: (candidateId: number) => `notes-${candidateId}`,
} as const;
