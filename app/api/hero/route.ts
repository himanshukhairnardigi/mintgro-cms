import { NextResponse } from "next/server";
import { getData, updateData } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getData().hero);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = updateData({ hero: body });
  return NextResponse.json(data.hero);
}