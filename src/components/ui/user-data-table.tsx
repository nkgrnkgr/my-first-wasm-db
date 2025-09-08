"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
};

const DEFAULT_USERS: User[] = [
  {
    id: "u1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
  },
  { id: "u2", name: "Bob Smith", email: "bob@example.com", role: "editor" },
  { id: "u3", name: "Carol Lee", email: "carol@example.com", role: "viewer" },
  { id: "u4", name: "Dan Brown", email: "dan@example.com", role: "viewer" },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name") as string}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("email") as string}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
        {row.getValue("role") as string}
      </span>
    ),
  },
];

type UserDataTableProps = {
  data?: User[];
  className?: string;
};

export function UserDataTable({
  data = DEFAULT_USERS,
  className,
}: UserDataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={className}>
      <div className="mb-2 text-sm text-muted-foreground">
        Total: {data.length}
      </div>
      <Table className="w-full text-sm">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-left p-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="border-b last:border-b-0">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
