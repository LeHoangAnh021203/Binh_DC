"use client";

import { useEffect, useRef, useState } from "react";
import { formatAgo, formatViewers, type ChatMessage, type Stream } from "@/lib/streams";

type StageProps = {
  streams: Stream[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onClear: () => void;
  follows: string[];
  onToggleFollow: (id: string) => void;
  messages: Record<string, ChatMessage[]>;
  onSend: (id: string, text: string) => void;
  viewersOf: (stream: Stream) => number;
};

export function StreamStage({
  streams,
  activeId,
  onSelect,
  onClear,
  follows,
  onToggleFollow,
  messages,
  onSend,
  viewersOf,
}: StageProps) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const focusId = activeId ?? (hoverId && streams.some((stream) => stream.id === hoverId) ? hoverId : null);
  const focusIndex = focusId ? streams.findIndex((stream) => stream.id === focusId) : -1;
  const tracks = gridTracks(streams.length, focusIndex);

  if (streams.length === 0) {
    return (
      <div
        id="kenh"
        className="order-1 flex h-[62vh] w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-white/60 min-[960px]:order-2 min-[960px]:h-[80vh] min-[960px]:flex-1"
      >
        Không có kênh nào khớp với từ khóa này.
      </div>
    );
  }

  const active = streams.find((stream) => stream.id === activeId) ?? null;

  return (
    <div id="kenh" className="order-1 h-[62vh] w-full min-w-0 min-[960px]:order-2 min-[960px]:h-[80vh] min-[960px]:flex-1">
      {active ? (
        <div className="flex h-full min-h-0 flex-col gap-1">
          <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
            <Player
              stream={active}
              viewers={viewersOf(active)}
              followed={follows.includes(active.id)}
              muted={muted}
              onMuted={setMuted}
              messages={messages[active.id] ?? []}
              onToggleFollow={() => onToggleFollow(active.id)}
              onClear={onClear}
              onSend={(text) => onSend(active.id, text)}
            />
          </div>
          <div className="flex h-28 shrink-0 gap-1 overflow-x-auto">
            {streams
              .filter((stream) => stream.id !== active.id)
              .map((stream) => (
                <button
                  key={stream.id}
                  type="button"
                  onClick={() => onSelect(stream.id)}
                  className="relative h-full w-40 shrink-0 overflow-hidden text-left"
                  aria-label={`Xem ${stream.title}`}
                >
                  <span className="absolute inset-0" style={{ background: stream.poster }} />
                  <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[9px] font-bold tracking-wider">
                    <span className="h-1 w-1 rounded-full bg-white" />
                    LIVE
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-2 text-xs leading-tight font-semibold">
                    {stream.title}
                  </span>
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div
          className="grid-smooth grid h-full w-full gap-1"
          style={{
            gridTemplateColumns: tracks.columns,
            gridTemplateRows: tracks.rows,
            transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
          }}
        >
          {streams.map((stream) => (
            <div key={stream.id} className="relative min-h-0 min-w-0 overflow-hidden bg-black">
              <button
                type="button"
                onClick={() => onSelect(stream.id)}
                onMouseEnter={() => setHoverId(stream.id)}
                onMouseLeave={() => setHoverId((current) => (current === stream.id ? null : current))}
                onFocus={() => setHoverId(stream.id)}
                onBlur={() => setHoverId((current) => (current === stream.id ? null : current))}
                className="group absolute inset-0 cursor-pointer text-left"
                aria-label={`Xem ${stream.title}`}
              >
                <span className="absolute inset-0" style={{ background: stream.poster }} />
                <span className="font-editorial pointer-events-none absolute -top-3 -left-1 text-6xl tracking-tighter text-white/10 italic select-none">
                  {stream.watermark}
                </span>
                <span className="absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  LIVE
                </span>
                <span className="absolute top-2 right-2 rounded-full bg-black/45 px-2 py-0.5 text-[10px] text-white/85">
                  {formatViewers(viewersOf(stream))}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white transition group-hover:scale-105">
                    <PlayIcon />
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3">
                  <span className="block text-[10px] tracking-wider text-white/60 uppercase">{stream.category}</span>
                  <span className="mt-0.5 block text-sm leading-tight font-semibold text-white">{stream.title}</span>
                </span>
                <span className="absolute inset-0 z-10 flex flex-col justify-end bg-black/60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-lg font-bold text-white">{stream.title}</span>
                  <span className="mt-1 line-clamp-2 text-sm text-white/80">{stream.summary}</span>
                  <span className="mt-2 text-xs text-white/60">
                    {stream.host} · {formatAgo(stream.startedMinutesAgo)}
                  </span>
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Player({
  stream,
  viewers,
  followed,
  muted,
  onMuted,
  messages,
  onToggleFollow,
  onClear,
  onSend,
}: {
  stream: Stream;
  viewers: number;
  followed: boolean;
  muted: boolean;
  onMuted: (value: boolean) => void;
  messages: ChatMessage[];
  onToggleFollow: () => void;
  onClear: () => void;
  onSend: (text: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const mutedRef = useRef(muted);
  const [failed, setFailed] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [draft, setDraft] = useState("");

  mutedRef.current = muted;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    setFailed(false);
    video.muted = mutedRef.current;
    video.play().catch(() => {
      if (cancelled) return;
      video.muted = true;
      onMuted(true);
      video.play().catch(() => {
        if (!cancelled) setFailed(true);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [stream.id, onMuted]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const scroller = chatRef.current;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, [messages.length, chatOpen, stream.id]);

  return (
    <div className="absolute inset-0 bg-black">
      <video
        key={stream.src}
        ref={videoRef}
        className="h-full w-full bg-black object-cover"
        src={stream.src}
        controls
        autoPlay
        playsInline
        loop
        muted={muted}
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-x-0 top-0 z-20 flex flex-wrap items-center gap-1.5 bg-gradient-to-b from-black via-black/75 to-transparent px-2 py-2">
        <div className="flex w-full min-w-0 items-center gap-2">
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold tracking-wider">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            LIVE
          </span>
          <h2 className="min-w-0 flex-1 truncate text-sm font-semibold">{stream.title}</h2>
        </div>
        <span className="shrink-0 text-xs whitespace-nowrap text-white/70">{formatViewers(viewers)} đang xem</span>
        <button type="button" onClick={() => onMuted(!muted)} className="shrink-0 rounded-md px-2 py-1 text-xs whitespace-nowrap text-white/85 hover:bg-white/10">
          {muted ? "Bật tiếng" : "Tắt tiếng"}
        </button>
        <button type="button" onClick={onToggleFollow} aria-pressed={followed} className="shrink-0 rounded-md px-2 py-1 text-xs whitespace-nowrap text-white/85 hover:bg-white/10">
          {followed ? "Đang theo dõi" : "Theo dõi"}
        </button>
        <button type="button" onClick={() => setChatOpen((value) => !value)} aria-expanded={chatOpen} className="shrink-0 rounded-md px-2 py-1 text-xs whitespace-nowrap text-white/85 hover:bg-white/10">
          Chat
        </button>
        <button type="button" onClick={onClear} className="shrink-0 rounded-md px-2 py-1 text-xs whitespace-nowrap text-white/85 hover:bg-white/10">
          Tất cả kênh
        </button>
      </div>
      <p className="pointer-events-none absolute bottom-12 left-3 z-20 max-w-[60%] truncate text-xs text-white/75">
        {stream.host} · {stream.category} · đã phát {formatAgo(stream.startedMinutesAgo)}
      </p>
      {failed && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-black/75 px-6 text-center">
          <p className="max-w-sm text-sm text-white/80">Không tải được nguồn phát demo. Kiểm tra mạng rồi thử lại.</p>
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
            onClick={() => {
              setFailed(false);
              const video = videoRef.current;
              if (!video) return;
              video.load();
              video.play().catch(() => setFailed(true));
            }}
          >
            Thử lại
          </button>
        </div>
      )}
      {chatOpen && (
        <aside className="absolute inset-x-2 bottom-12 z-20 flex max-h-[46%] flex-col overflow-hidden rounded-lg border border-white/15 bg-black/75 backdrop-blur-sm sm:inset-x-auto sm:top-14 sm:right-3 sm:bottom-14 sm:w-[min(250px,42%)] sm:max-h-none">
          <div className="border-b border-white/10 px-3 py-2 text-xs font-semibold tracking-wider text-white/70 uppercase">
            Chat trực tiếp
          </div>
          <div ref={chatRef} className="chat-scroll min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-2">
            {messages.map((message) => (
              <p key={message.id} className="text-sm leading-snug break-words">
                <span className="font-semibold" style={{ color: message.tone }}>
                  {message.author}
                </span>{" "}
                <span className="text-white/85">{message.text}</span>
              </p>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-white/10 p-2"
            onSubmit={(event) => {
              event.preventDefault();
              const text = draft.trim();
              if (!text) return;
              onSend(text);
              setDraft("");
            }}
          >
            <label className="sr-only" htmlFor={`chat-${stream.id}`}>
              Nhập tin nhắn
            </label>
            <input
              id={`chat-${stream.id}`}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Nhập tin nhắn…"
              className="h-9 min-w-0 flex-1 rounded-md border border-white/10 bg-white/10 px-2 text-sm text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 focus:outline-none"
            />
            <button type="submit" className="h-9 shrink-0 rounded-md border border-white/10 px-3 text-sm text-white/80 hover:bg-white/10">
              Gửi
            </button>
          </form>
        </aside>
      )}
    </div>
  );
}

function gridTracks(count: number, focusIndex: number) {
  const columns = count >= 7 ? 3 : count >= 4 ? 2 : count === 3 ? 3 : Math.max(count, 1);
  const rows = Math.ceil(count / columns);
  const sized = (length: number, focus: number) =>
    Array.from({ length }, (_, index) => (focusIndex >= 0 && index === focus ? "5.6fr" : "1fr")).join(" ");

  return {
    columns: sized(columns, focusIndex >= 0 ? focusIndex % columns : -1),
    rows: sized(rows, focusIndex >= 0 ? Math.floor(focusIndex / columns) : -1),
  };
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}
