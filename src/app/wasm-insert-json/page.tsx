"use client";

import { Spacer } from "@/components/layout/spacer";
import { H2 } from "@/components/typography/heading";
import { ErrorNotice, LoadingNotice } from "@/components/ui/notice";
import { RenderTimer } from "@/components/ui/timing";
import { UserDataTable } from "@/components/ui/user-data-table";
import { useWasmSqliteUsersInsertJson } from "@/hooks/use-wasm-sqlite-users";

export default function PageWasmInsertJson() {
  const { users, loading, error } = useWasmSqliteUsersInsertJson();

  return (
    <div>
      <H2>Wasm + SQLite: Insert JSON</H2>
      <RenderTimer ready={!loading && !error} label="Time to users rendered" />
      <Spacer size="sm" />
      {error ? <ErrorNotice>{error}</ErrorNotice> : null}
      {loading ? (
        <LoadingNotice>Loading...</LoadingNotice>
      ) : (
        <UserDataTable data={users ?? []} />
      )}
    </div>
  );
}
