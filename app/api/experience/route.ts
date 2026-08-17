import { NextResponse } from "next/server";
import { getData, updateData } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getData().experience);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const updated = updateData({ experience: body });
  return NextResponse.json(updated.experience);
}
