import fs from "node:fs";
import path from "node:path";

async function main() {
  const { default: initSqlJs } = await import("sql.js/dist/sql-wasm.js");

  const wasmPath = path.resolve(
    process.cwd(),
    "node_modules/sql.js/dist/sql-wasm.wasm",
  );
  const SQL = await initSqlJs({ locateFile: () => wasmPath });

  const db = new SQL.Database();

  // Speed up bulk inserts (reduced durability semantics are fine for generation)
  db.run("PRAGMA synchronous=OFF;");
  db.run("PRAGMA journal_mode=MEMORY;");
  db.run("PRAGMA temp_store=MEMORY;");

  db.run(
    "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, email TEXT, role TEXT)",
  );

  const roles = ["admin", "editor", "viewer"];
  const domains = ["gmail.com", "yahoo.co.jp", "example.com", "outlook.com"];

  const N = 100000;
  db.run("BEGIN");
  const stmt = db.prepare(
    "INSERT OR REPLACE INTO users(id,name,email,role) VALUES (?,?,?,?)",
  );
  for (let i = 0; i < N; i++) {
    const idx = i + 1;
    const id = `u${idx}`;
    const name = `User ${String(idx).padStart(6, "0")}`;
    const email = `user${idx}@${domains[i % domains.length]}`;
    const role = roles[i % roles.length];
    stmt.run([id, name, email, role]);
  }
  stmt.free();
  db.run("COMMIT");

  // Helpful index for common queries
  db.run("CREATE INDEX IF NOT EXISTS idx_users_name ON users(name)");
  db.run("CREATE INDEX IF NOT EXISTS idx_users_role_name ON users(role, name)");

  const data = db.export();
  const outPath = path.resolve(process.cwd(), "public/users-100k.sqlite");
  fs.writeFileSync(outPath, Buffer.from(data));

  // eslint-disable-next-line no-console
  console.log(`Wrote snapshot: ${outPath}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
