import { NextResponse } from "next/server";
import { getData, updateData } from "@/lib/store";
import { Subscriber } from "@/lib/types";

export async function GET() {
  return NextResponse.json(getData().subscribers);
}

export async function PUT(request: Request) {
  const body: Subscriber[] = await request.json();
  const data = updateData({ subscribers: body });
  return NextResponse.json(data.subscribers);
}

export async function POST(request: Request) {
  const { email } = await request.json();
  const data = getData();
  const newSub: Subscriber = {
    id: `sub${Date.now()}`,
    email,
    date: new Date().toISOString().split("T")[0],
  };
  const updated = updateData({ subscribers: [...data.subscribers, newSub] });
  return NextResponse.json(updated.subscribers);
}