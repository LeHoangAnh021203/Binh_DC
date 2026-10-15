"use client";

import { useEffect, useState } from "react";
import { TICKER, formatAgo } from "@/lib/streams";

export function Ticker() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (paused || hidden) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % TICKER.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused, hidden]);

  if (hidden) return null;

  const item = TICKER[index];

  return (
    <div
      className="mb-6 w-full overflow-hidden rounded-lg bg-red-900/80 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative flex items-center p-4">
        <div className="mr-3 shrink-0">
          <div className="rounded-full bg-red-600 p-2">
            <AlertIcon />
          </div>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="mb-1 flex items-center text-xs font-bold tracking-wider uppercase">
            <span className="mr-2">Đang phát</span>
            <span className="relative h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="ml-2 text-white/70">{formatAgo(item.minutesAgo)}</span>
          </div>
          <p key={index} className="ticker-in text-lg font-bold md:text-xl">
            {item.title}
          </p>
        </div>
        <div className="ml-3 flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-1 md:flex">
            {TICKER.map((entry, dot) => (
              <button
                key={entry.title}
                type="button"
                aria-label={`Tin ${dot + 1}`}
                onClick={() => setIndex(dot)}
                className={`h-2 w-2 rounded-full transition-colors ${dot === index ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Đóng thanh trực tiếp"
            onClick={() => setHidden(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-red-800/50"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
