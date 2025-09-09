import { NextResponse } from "next/server";

export async function GET() {
  const N = 100000;
  const roles = ["admin", "editor", "viewer"] as const;
  const domains = ["gmail.com", "yahoo.co.jp", "example.com", "outlook.com"];

  const users = Array.from({ length: N }, (_, i) => {
    const idx = i + 1;
    const id = `u${idx}`;
    const name = `User ${String(idx).padStart(6, "0")}`;
    const email = `user${idx}@${domains[i % domains.length]}`;
    const role = roles[i % roles.length];
    return { id, name, email, role };
  });

  return NextResponse.json(users);
}
