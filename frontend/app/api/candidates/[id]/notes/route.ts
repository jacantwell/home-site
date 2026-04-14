import { NextResponse } from "next/server";
import { db } from "@/lib/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const candidateId = Number(id);

  if (!db.getCandidate(candidateId)) {
    return NextResponse.json(
      { error: "Candidate not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(db.getNotesForCandidate(candidateId));
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { content } = body;

  if (!content) {
    return NextResponse.json(
      { error: "content is required" },
      { status: 400 }
    );
  }

  const note = db.addNote(Number(id), content);
  if (!note) {
    return NextResponse.json(
      { error: "Candidate not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(note, { status: 201 });
}
