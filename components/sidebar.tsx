"use client";

import { CATEGORIES, formatAgo, formatClock, formatDay, formatViewers, type Stream } from "@/lib/streams";

type SidebarProps = {
  now: Date | null;
  query: string;
  onQuery: (value: string) => void;
  category: string | null;
  onCategory: (value: string | null) => void;
  streams: Stream[];
  viewersOf: (stream: Stream) => number;
  activeId: string | null;
  onSelect: (id: string) => void;
};

export function Sidebar({
  now,
  query,
  onQuery,
  category,
  onCategory,
  streams,
  viewersOf,
  activeId,
  onSelect,
}: SidebarProps) {
  const ranked = [...streams].sort((a, b) => viewersOf(b) - viewersOf(a)).slice(0, 3);

  return (
    <aside className="order-2 flex w-full shrink-0 flex-col gap-6 min-[960px]:order-1 min-[960px]:w-[260px] xl:w-[300px]">
      <p className="text-xs font-semibold tracking-[0.28em] text-red-400 uppercase">Trực tiếp</p>
      <h1 className="font-editorial text-[clamp(3.4rem,7vw,4.8rem)] leading-[1.15] font-normal tracking-tighter text-white/80 italic">
        Binh
        <br />
        DC
        <br />
        Live
      </h1>
      <div className="text-sm font-light text-white/70">
        {now ? formatDay(now) : "Đang lấy giờ địa phương…"}
        <div className="mt-1 text-xs text-white/50">{now ? `${formatClock(now)} · Asia/Saigon` : "Asia/Saigon"}</div>
      </div>

      <form
        className="flex items-center gap-2"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Tìm kênh</span>
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Tìm kênh…"
            className="h-10 w-full rounded-md border border-white/10 bg-white/5 pr-3 pl-8 text-sm text-white/80 placeholder:text-white/30 focus:ring-2 focus:ring-white/20 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="h-10 shrink-0 rounded-md border border-white/10 px-4 text-sm text-white/80 hover:bg-white/5"
        >
          Tìm
        </button>
      </form>

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/55">
        <button
          type="button"
          onClick={() => onCategory(null)}
          className={category === null ? "text-white underline decoration-white/40 underline-offset-4" : "hover:text-white"}
        >
          Tất cả
        </button>
        {CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onCategory(category === item ? null : item)}
            className={category === item ? "text-white underline decoration-white/40 underline-offset-4" : "hover:text-white"}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="overflow-hidden rounded-lg border border-white/10 bg-white/5 text-white">
        <div className="bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-editorial text-2xl italic">Trên sóng</h2>
            <span className="text-xs text-white/60">{now ? `Cập nhật ${now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Ho_Chi_Minh" })}` : ""}</span>
          </div>
          <p className="mb-3 text-sm text-white/70">{streams.length} kênh đang phát</p>
          <ol className="space-y-2">
            {ranked.map((stream, index) => (
              <li key={stream.id}>
                <button
                  type="button"
                  onClick={() => onSelect(stream.id)}
                  className={`flex w-full items-start gap-3 rounded-md px-2 py-2 text-left hover:bg-white/5 ${activeId === stream.id ? "bg-white/10" : ""}`}
                >
                  <span className="font-editorial w-4 pt-0.5 text-lg text-white/40 italic">{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{stream.title}</span>
                    <span className="text-xs text-white/50">
                      {formatViewers(viewersOf(stream))} đang xem · {formatAgo(stream.startedMinutesAgo)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="max-w-[300px] text-[0.7rem] leading-relaxed font-light text-white/50">
        <div className="mb-4 h-px w-full bg-white/10" />
        <p>
          BinhDC là phòng phát trực tiếp theo nhịp một tòa soạn: tin nóng, trận đấu, phiên giao dịch và những buổi
          diễn đang diễn ra. Chọn một ô trên tường sóng — hình phóng ra, tiếng mở khi bạn muốn, chat chạy cùng
          chương trình.
        </p>
      </div>
    </aside>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="pointer-events-none absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-white/50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
