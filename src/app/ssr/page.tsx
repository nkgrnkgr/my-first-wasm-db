export const dynamic = "force-dynamic";

import { H2 } from "@/components/typography/heading";
import { UserDataTable } from "@/components/ui/user-data-table";

export default function PageSSR() {
  return (
    <>
      <H2>SSR</H2>
      <UserDataTable className="mt-4" />
    </>
  );
}
