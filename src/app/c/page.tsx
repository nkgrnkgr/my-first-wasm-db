"use client";

import { H2 } from "@/components/typography/heading";
import { UserDataTable } from "@/components/ui/user-data-table";

export default function PageC() {
  return (
    <div>
      <H2>Page C - CSR + Fetch (later)</H2>
      <UserDataTable className="mt-4" />
    </div>
  );
}
