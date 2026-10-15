"use client";

import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { StreamStage } from "@/components/stream-stage";
import { Ticker } from "@/components/ticker";
import { STREAMS, type ChatMessage, type Stream } from "@/lib/streams";

const FOLLOW_KEY = "binhdc-follows";

export function BinhdcLive() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(STREAMS[0]?.id ?? null);
  const [now, setNow] = useState<Date | null>(null);
  const [follows, setFollows] = useState<string[]>([]);
  const [followsReady, setFollowsReady] = useState(false);
  const [drift, setDrift] = useState<Record<string, number>>({});
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() =>
    Object.fromEntries(STREAMS.map((stream) => [stream.id, stream.chat])),
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return STREAMS.filter((stream) => {
      const inCategory = category === null || stream.category === category;
      const inQuery =
        needle.length === 0 ||
        stream.title.toLowerCase().includes(needle) ||
        stream.host.toLowerCase().includes(needle) ||
        stream.category.toLowerCase().includes(needle) ||
        stream.summary.toLowerCase().includes(needle);
      return inCategory && inQuery;
    });
  }, [query, category]);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const raw = window.localStorage.getItem(FOLLOW_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as string[];
        if (Array.isArray(parsed)) setFollows(parsed);
      } catch {
        setFollows([]);
      }
    }
    setFollowsReady(true);
  }, []);

  useEffect(() => {
    if (!followsReady) return;
    window.localStorage.setItem(FOLLOW_KEY, JSON.stringify(follows));
  }, [follows, followsReady]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDrift((current) => {
        const next = { ...current };
        for (const stream of STREAMS) {
          const cap = Math.round(stream.viewers * 0.04);
          const step = Math.round((Math.random() - 0.42) * Math.max(8, stream.viewers * 0.004));
          const value = next[stream.id] ?? 0;
          next[stream.id] = Math.max(-cap, Math.min(cap, value + step));
        }
        return next;
      });
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!activeId) return;
    const stream = STREAMS.find((item) => item.id === activeId);
    if (!stream) return;
    let cursor = 0;
    const timer = window.setInterval(() => {
      const text = stream.incoming[cursor % stream.incoming.length];
      cursor += 1;
      const author = ["Lan", "Huy", "Mai", "Khánh", "Giang"][cursor % 5];
      setMessages((current) => ({
        ...current,
        [stream.id]: [
          ...(current[stream.id] ?? []),
          {
            id: `${stream.id}-${Date.now()}`,
            author,
            text,
            tone: "#e5e5e5",
          },
        ].slice(-40),
      }));
    }, 9000);
    return () => window.clearInterval(timer);
  }, [activeId]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (activeId && !filtered.some((stream) => stream.id === activeId)) {
      setActiveId(null);
    }
  }, [filtered, activeId]);

  const viewersOf = (stream: Stream) => Math.max(1, stream.viewers + (drift[stream.id] ?? 0));

  return (
    <div className="min-h-screen bg-[#141414] p-4 text-white md:p-8">
      <a
        href="#kenh"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Tới tường sóng
      </a>
      <Ticker />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 min-[960px]:flex-row min-[960px]:items-start">
        <Sidebar
          now={now}
          query={query}
          onQuery={setQuery}
          category={category}
          onCategory={setCategory}
          streams={filtered}
          viewersOf={viewersOf}
          activeId={activeId}
          onSelect={setActiveId}
        />
        <StreamStage
          streams={filtered}
          activeId={activeId}
          onSelect={setActiveId}
          onClear={() => setActiveId(null)}
          follows={follows}
          onToggleFollow={(id) =>
            setFollows((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
          }
          messages={messages}
          onSend={(id, text) =>
            setMessages((current) => ({
              ...current,
              [id]: [
                ...(current[id] ?? []),
                { id: `me-${Date.now()}`, author: "Bạn", text, tone: "#fca5a5" },
              ].slice(-40),
            }))
          }
          viewersOf={viewersOf}
        />
      </div>
    </div>
  );
}
