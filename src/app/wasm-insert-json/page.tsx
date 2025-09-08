"use client";

import { H2 } from "@/components/typography/heading";
import { ErrorNotice, LoadingNotice } from "@/components/ui/notice";
import { UserDataTable } from "@/components/ui/user-data-table";
import { useWasmSqliteUsersInsertJson } from "@/hooks/use-wasm-sqlite-users";

export default function PageWasmInsertJson() {
  const { users, loading, error } = useWasmSqliteUsersInsertJson();

  return (
    <div>
      <H2>Wasm + SQLite: Insert JSON</H2>
      {error ? <ErrorNotice>{error}</ErrorNotice> : null}
      {loading ? (
        <LoadingNotice>Loading...</LoadingNotice>
      ) : (
        <UserDataTable className="mt-4" data={users ?? []} />
      )}
    </div>
  );
}
