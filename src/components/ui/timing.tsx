"use client";

import { useEffect, useRef, useState } from "react";

type RenderTimerProps = {
  ready: boolean;
  label?: string;
};

export function RenderTimer({
  ready,
  label = "Time to display",
}: RenderTimerProps) {
  const startRef = useRef<number | null>(null);
  const [ms, setMs] = useState<number | null>(null);

  // Capture a start timestamp just after first paint
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      startRef.current = performance.now();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // When ready flips to true, measure after the next frame to include rendering time
  useEffect(() => {
    if (!ready || startRef.current == null || ms != null) return;
    const raf = requestAnimationFrame(() => {
      setMs(performance.now() - (startRef.current as number));
    });
    return () => cancelAnimationFrame(raf);
  }, [ready, ms]);

  if (ms == null) return <span aria-live="polite">{label}: measuring…</span>;
  return (
    <span aria-live="polite">
      {label}: {Math.round(ms)} ms
    </span>
  );
}
