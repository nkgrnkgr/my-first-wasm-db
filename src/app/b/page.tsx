export const dynamic = "force-dynamic";

import { H2 } from "@/components/typography/heading";
import { UserDataTable } from "@/components/ui/user-data-table";

export default function PageB() {
  return (
    <div>
      <H2>Page B - SSR</H2>
      <UserDataTable className="mt-4" />
    </div>
  );
}
