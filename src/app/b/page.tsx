export const dynamic = "force-dynamic";

import { H2 } from "@/components/typography/heading";
import { UserList } from "@/components/ui/user-list";

export default function PageB() {
  return (
    <div>
      <H2>Page B - SSR</H2>
      <UserList className="mt-4" />
    </div>
  );
}
