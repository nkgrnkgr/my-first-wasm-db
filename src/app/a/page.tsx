import { H2 } from "@/components/typography/heading";
import { UserList } from "@/components/ui/user-list";

export default function PageA() {
  return (
    <div>
      <H2>Page A - WASM + DB (later)</H2>
      <UserList className="mt-4" />
    </div>
  );
}
