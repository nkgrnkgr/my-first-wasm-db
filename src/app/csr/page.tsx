"use client";

import { UsersContainer } from "@/components/app/users-container";
import { H2 } from "@/components/typography/heading";
import { useCsrUsers } from "@/hooks/use-csr-users";

export default function PageCSR() {
  const { users, loading, error } = useCsrUsers();
  return (
    <>
      <H2>CSR</H2>
      <UsersContainer
        loading={loading}
        error={error}
        users={users}
        timerLabel="CSR time to users"
      />
    </>
  );
}
