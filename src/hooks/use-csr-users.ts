"use client";

import { useQuery } from "@tanstack/react-query";
import type { User } from "@/components/ui/user-data-table";

export function useCsrUsers() {
  const query = useQuery({
    queryKey: ["users", "csr"],
    queryFn: async (): Promise<User[]> => {
      const res = await fetch("/api/users", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    // disable caching semantics
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
