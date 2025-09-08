"use client";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
};

const MOCK_USERS: User[] = [
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

type UserListProps = {
  users?: User[];
  className?: string;
};

export function UserList({ users = MOCK_USERS, className }: UserListProps) {
  return (
    <div className={className}>
      <ul className="divide-y border rounded-md">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-3 flex items-center justify-between gap-4"
          >
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
              {user.role}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
