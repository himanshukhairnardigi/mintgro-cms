import { NextResponse } from "next/server";
import { getData, updateData } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getData().ctaSection);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const updated = updateData({ ctaSection: body });
  return NextResponse.json(updated.ctaSection);
}
