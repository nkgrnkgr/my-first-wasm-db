declare module "sql.js" {
  export type SqlJsStatic = {
    Database: new (
      data?: Uint8Array,
    ) => {
      run: (sql: string) => void;
      exec: (sql: string) => { columns: string[]; values: unknown[][] }[];
      prepare: (sql: string) => {
        run: (params?: unknown[]) => void;
        free: () => void;
      };
    };
  };

  export default function initSqlJs(config?: {
    locateFile?: (file: string) => string;
  }): Promise<SqlJsStatic>;
}
