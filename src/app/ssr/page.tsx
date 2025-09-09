export const dynamic = "force-dynamic";

import { UsersContainer } from "@/components/app/users-container";
import { H2 } from "@/components/typography/heading";
import { generateUsers } from "@/lib/users";

export default function PageSSR() {
  const TOTAL_COUNT = 100000;
  const PREVIEW_COUNT = 10;
  const users = generateUsers({ count: PREVIEW_COUNT });

  return (
    <>
      <H2>SSR</H2>
      <UsersContainer
        loading={false}
        error={null}
        users={users}
        timerLabel="SSR time to users"
        totalCount={TOTAL_COUNT}
      />
    </>
  );
}
