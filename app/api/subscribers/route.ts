import { NextResponse } from "next/server";
import { getData, updateData } from "@/lib/store";
import { Subscriber } from "@/lib/types";

export async function GET() {
  return NextResponse.json(getData().subscribers);
}

export async function POST(request: Request) {
  const { email } = await request.json();
  const newSub: Subscriber = {
    id: `sub${Date.now()}`,
    email,
    date: new Date().toISOString().slice(0, 10),
  };
  const updated = updateData({ subscribers: [...getData().subscribers, newSub] });
  return NextResponse.json(updated.subscribers);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const updated = updateData({ subscribers: body });
  return NextResponse.json(updated.subscribers);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const filtered = getData().subscribers.filter((s) => s.id !== id);
  const updated = updateData({ subscribers: filtered });
  return NextResponse.json(updated.subscribers);
}
