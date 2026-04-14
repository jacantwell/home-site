import { NextResponse } from "next/server";
import { db } from "@/lib/mock-data";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, age, phone, bio } = body;

  if (!name || !age || !phone || !bio) {
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
    source: "website",
  });

  return NextResponse.json(candidate, { status: 201 });
}
