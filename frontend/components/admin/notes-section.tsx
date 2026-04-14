"use client";

import { useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { getNotes, addNote } from "@/lib/api";
import { SWR_KEYS } from "@/lib/swr-keys";
import type { Note } from "@/lib/types";

export function NotesSection({ candidateId }: { candidateId: number }) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { data: notes = [], mutate: mutateNotes } = useSWR<Note[]>(
    expanded ? SWR_KEYS.notes(candidateId) : null,
    () => getNotes(candidateId),
    { refreshInterval: 15_000 }
  );

  async function handleAdd() {
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      await addNote(candidateId, content.trim());
      setContent("");
      mutateNotes();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setExpanded(!expanded)}
        className="text-xs text-muted-foreground"
      >
        {expanded ? "Hide notes" : `Notes${notes.length > 0 ? ` (${notes.length})` : ""}`}
      </Button>
      {expanded && (
        <div className="mt-2 space-y-3">
          {notes.length === 0 && (
            <p className="text-xs text-muted-foreground">No notes yet.</p>
          )}
          {notes.map((note) => (
            <div key={note.id}>
              <p className="text-sm">{note.content}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(note.created_at).toLocaleDateString()}
              </p>
              <Separator className="mt-2" />
            </div>
          ))}
          <div className="flex gap-2">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add a note..."
              rows={2}
              className="text-sm"
            />
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={submitting || !content.trim()}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
