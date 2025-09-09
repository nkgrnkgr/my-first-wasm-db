import { NextResponse } from "next/server";
import { generateUsers } from "@/lib/users";

export async function GET() {
  const users = generateUsers();
  return NextResponse.json(users);
}
