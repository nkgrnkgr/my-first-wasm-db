"use client";

import { H2 } from "@/components/typography/heading";
import { UserList } from "@/components/ui/user-list";

export default function PageC() {
  return (
    <div>
      <H2>Page C - CSR + Fetch (later)</H2>
      <UserList className="mt-4" />
    </div>
  );
}
