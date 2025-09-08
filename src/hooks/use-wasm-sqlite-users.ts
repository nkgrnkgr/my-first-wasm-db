"use client";

import { useEffect, useState } from "react";
import type { User } from "@/components/ui/user-data-table";

type UseWasmSqliteUsersResult = {
  users: User[] | null;
  loading: boolean;
  error: string | null;
};

export function useWasmSqliteUsersInsertJson(): UseWasmSqliteUsersResult {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        // Dynamic import (browser entry) to avoid Node 'fs' resolution
        const sqlJsModule = await import("sql.js/dist/sql-wasm.js");
        const initSqlJs = sqlJsModule.default;

        const SQL = await initSqlJs({
          locateFile: () => `/sql-wasm.wasm`,
        });

        const db = new SQL.Database();
        db.run(
          "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, email TEXT, role TEXT)",
        );

        const res = await fetch("/api/users");
        const apiUsers: User[] = await res.json();

        db.run("BEGIN");
        const stmt = db.prepare(
          "INSERT OR REPLACE INTO users(id,name,email,role) VALUES (?,?,?,?)",
        );
        for (const u of apiUsers) {
          stmt.run([u.id, u.name, u.email, u.role]);
        }
        stmt.free();
        db.run("COMMIT");

        const query = db.exec(
          "SELECT id, name, email, role FROM users ORDER BY name ASC",
        );
        const rows: unknown[][] = query.length ? query[0].values : [];
        const mapped: User[] = rows.map((r: unknown[]) => ({
          id: String(r[0]),
          name: String(r[1]),
          email: String(r[2]),
          role: String(r[3]) as User["role"],
        }));

        if (!cancelled) setUsers(mapped);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to init sql.js");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { users, loading, error };
}
