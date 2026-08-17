import { NextResponse } from "next/server";
import { getData, updateData } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getData().logoBar);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const updated = updateData({ logoBar: body });
  return NextResponse.json(updated.logoBar);
}
