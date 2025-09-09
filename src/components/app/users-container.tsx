"use client";

import { Spacer } from "@/components/layout/spacer";
import { ErrorNotice, LoadingNotice } from "@/components/ui/notice";
import { RenderTimer } from "@/components/ui/timing";
import type { User } from "@/components/ui/user-data-table";
import { UserDataTable } from "@/components/ui/user-data-table";

type UsersContainerProps = {
  loading: boolean;
  error: string | null;
  users: User[] | null;
  timerLabel?: string;
};

export function UsersContainer({
  loading,
  error,
  users,
  timerLabel = "Time to users",
}: UsersContainerProps) {
  return (
    <div>
      <RenderTimer ready={!loading && !error} label={timerLabel} />
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
