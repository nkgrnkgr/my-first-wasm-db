"use client";

import { H2 } from "@/components/typography/heading";
import { UserDataTable } from "@/components/ui/user-data-table";

export default function PageCSR() {
  return (
    <div>
      <H2>CSR</H2>
      <UserDataTable className="mt-4" />
    </div>
  );
}
