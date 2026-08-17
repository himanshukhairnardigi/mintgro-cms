import { NextResponse } from "next/server";
import { getData, updateData } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getData().personalization);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const updated = updateData({ personalization: body });
  return NextResponse.json(updated.personalization);
}
