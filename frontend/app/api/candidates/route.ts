import { NextResponse } from "next/server";
import { db } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(db.getCandidates());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, age, phone, bio, source } = body;

  if (!name || !age || !phone || !bio || !source) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const candidate = db.addCandidate({
    name,
    age: Number(age),
    phone,
    bio,
    source,
  });

  return NextResponse.json(candidate, { status: 201 });
}
