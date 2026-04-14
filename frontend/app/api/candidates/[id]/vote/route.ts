import { NextResponse } from "next/server";
import { db } from "@/lib/mock-data";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { delta, voter } = body;

  if (delta !== 1 && delta !== -1) {
    return NextResponse.json(
      { error: "delta must be 1 or -1" },
      { status: 400 }
    );
  }

  if (!["jasper", "micol", "damia"].includes(voter)) {
    return NextResponse.json(
      { error: "invalid voter" },
      { status: 400 }
    );
  }

  const candidate = db.vote(Number(id), delta, voter);
  if (!candidate) {
    return NextResponse.json(
      { error: "Candidate not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(candidate);
}
