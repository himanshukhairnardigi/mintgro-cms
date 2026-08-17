import { NextResponse } from "next/server";
import { getData, updateData } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getData().steps);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = updateData({ steps: body });
  return NextResponse.json(data.steps);
}