import { NextResponse } from "next/server";

export async function GET() {
  const users = [
    {
      id: "u1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "admin",
    },
    { id: "u2", name: "Bob Smith", email: "bob@example.com", role: "editor" },
    { id: "u3", name: "Carol Lee", email: "carol@example.com", role: "viewer" },
    { id: "u4", name: "Dan Brown", email: "dan@example.com", role: "viewer" },
  ];
  return NextResponse.json(users);
}
