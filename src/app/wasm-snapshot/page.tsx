import { H2 } from "@/components/typography/heading";
import { UserDataTable } from "@/components/ui/user-data-table";

export default function PageWasmSnapshot() {
  return (
    <>
      <H2>Wasm + SQLite: Load Snapshot (later)</H2>
      <UserDataTable className="mt-4" />
    </>
  );
}
