import { NextResponse } from "next/server";
import { getData, updateData } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getData().features);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = updateData({ features: body });
  return NextResponse.json(data.features);
}