"use client";

import { UsersContainer } from "@/components/app/users-container";
import { H2 } from "@/components/typography/heading";
import { useWasmSqliteUsersInsertJson } from "@/hooks/use-wasm-sqlite-users";

export default function PageWasmInsertJson() {
  const { users, loading, error } = useWasmSqliteUsersInsertJson();

  return (
    <>
      <H2>Wasm + SQLite: Insert JSON</H2>
      <UsersContainer
        loading={loading}
        error={error}
        users={users}
        timerLabel="Time to users rendered"
      />
    </>
  );
}
