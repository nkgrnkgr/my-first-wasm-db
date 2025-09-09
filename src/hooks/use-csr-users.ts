"use client";

import { useEffect, useState } from "react";
import type { User } from "@/components/ui/user-data-table";

type UseCsrUsersResult = {
  users: User[] | null;
  loading: boolean;
  error: string | null;
};

export function useCsrUsers(): UseCsrUsersResult {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;
    async function run() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: User[] = await res.json();
        if (!aborted) setUsers(data);
      } catch (e) {
        if (!aborted)
          setError(e instanceof Error ? e.message : "Failed to fetch users");
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    run();
    return () => {
      aborted = true;
    };
  }, []);

  return { users, loading, error };
}
