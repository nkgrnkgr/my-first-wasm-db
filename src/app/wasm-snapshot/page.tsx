"use client";
import { UsersContainer } from "@/components/app/users-container";
import { H2 } from "@/components/typography/heading";
import { useWasmSqliteUsersSnapshot } from "@/hooks/use-wasm-sqlite-users";

export default function PageWasmSnapshot() {
  const { users, loading, error } = useWasmSqliteUsersSnapshot();

  return (
    <>
      <H2>Wasm + SQLite: Load Snapshot</H2>
      <UsersContainer
        loading={loading}
        error={error}
        users={users}
        timerLabel="Snapshot time to users"
      />
    </>
  );
}
