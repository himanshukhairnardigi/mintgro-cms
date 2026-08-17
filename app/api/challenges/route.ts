import { NextResponse } from "next/server";
import { getData, updateData } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getData().challenges);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const updated = updateData({ challenges: body });
  return NextResponse.json(updated.challenges);
}
