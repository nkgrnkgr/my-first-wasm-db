import type * as React from "react";

type NoticeProps = {
  children: React.ReactNode;
  className?: string;
};

export function LoadingNotice({ children, className }: NoticeProps) {
  return <div className={className}>{children ?? "Loading..."}</div>;
}

export function ErrorNotice({ children, className }: NoticeProps) {
  return <div className={className}>{children ?? "Error"}</div>;
}
