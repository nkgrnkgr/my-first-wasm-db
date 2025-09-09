import type { User } from "@/components/ui/user-data-table";

export type GenerateUsersOptions = {
  count?: number;
};

const DEFAULT_COUNT = 100000;
const ROLES: User["role"][] = ["admin", "editor", "viewer"];
const DOMAINS = ["gmail.com", "yahoo.co.jp", "example.com", "outlook.com"];

export function generateUsers(options: GenerateUsersOptions = {}): User[] {
  const count = options.count ?? DEFAULT_COUNT;
  return Array.from({ length: count }, (_, index) => {
    const idx = index + 1;
    const id = `u${idx}`;
    const name = `User ${String(idx).padStart(6, "0")}`;
    const email = `user${idx}@${DOMAINS[index % DOMAINS.length]}`;
    const role = ROLES[index % ROLES.length];
    return { id, name, email, role } satisfies User;
  });
}
