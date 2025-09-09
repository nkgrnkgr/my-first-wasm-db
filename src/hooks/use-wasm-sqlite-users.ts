"use client";

import { useQuery } from "@tanstack/react-query";
import type { User } from "@/components/ui/user-data-table";

export function useWasmSqliteUsersInsertJson() {
  const query = useQuery({
    queryKey: ["users", "wasm-insert-json"],
    queryFn: async (): Promise<User[]> => {
      const sqlJsModule = await import("sql.js/dist/sql-wasm.js");
      const initSqlJs = sqlJsModule.default;
      const SQL = await initSqlJs({ locateFile: () => `/sql-wasm.wasm` });

      const db = new SQL.Database();
      // Speed up bulk inserts for experiment (reduced durability semantics)
      db.run("PRAGMA synchronous=OFF;");
      db.run("PRAGMA journal_mode=MEMORY;");
      db.run("PRAGMA temp_store=MEMORY;");
      db.run(
        "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, email TEXT, role TEXT)",
      );

      const res = await fetch("/api/users", { cache: "no-store" });
      const apiUsers: User[] = await res.json();

      db.run("BEGIN");
      const stmt = db.prepare(
        "INSERT OR REPLACE INTO users(id,name,email,role) VALUES (?,?,?,?)",
      );
      for (const u of apiUsers) stmt.run([u.id, u.name, u.email, u.role]);
      stmt.free();
      db.run("COMMIT");

      const queryRes = db.exec(
        "SELECT id, name, email, role FROM users ORDER BY name ASC",
      );
      const rows: unknown[][] = queryRes.length ? queryRes[0].values : [];
      return rows.map((r: unknown[]) => ({
        id: String(r[0]),
        name: String(r[1]),
        email: String(r[2]),
        role: String(r[3]) as User["role"],
      }));
    },
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    users: query.data ?? null,
    loading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
  } as const;
}
