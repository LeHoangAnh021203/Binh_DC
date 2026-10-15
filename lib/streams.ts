export type ChatMessage = {
  id: string;
  author: string;
  text: string;
  tone: string;
};

export type Stream = {
  id: string;
  title: string;
  summary: string;
  category: string;
  host: string;
  viewers: number;
  startedMinutesAgo: number;
  watermark: string;
  poster: string;
  src: string;
  chat: ChatMessage[];
  incoming: string[];
};

export const CATEGORIES = [
  "Tin tức",
  "Thể thao",
  "Kinh tế",
  "Giải trí",
  "Game",
  "Công nghệ",
  "Đời sống",
] as const;

export const STREAMS: Stream[] = [
  {
    id: "ban-tin-toi",
    title: "Bản tin tối BinhDC",
    summary:
      "Toàn cảnh trong nước và quốc tế, phát trực tiếp từ phòng tin Hà Nội.",
    category: "Tin tức",
    host: "Ngọc Anh",
    viewers: 12840,
    startedMinutesAgo: 18,
    watermark: "TIN",
    poster: "linear-gradient(165deg, #3f1218 0%, #7f1d1d 48%, #141414 100%)",
    src: "/flower.mp4",
    chat: [
      { id: "n1", author: "Minh", text: "Mở đầu bằng mục giao thông được không?", tone: "#fca5a5" },
      { id: "n2", author: "Hà", text: "Hình phòng tin tối nay sáng rõ hơn hẳn.", tone: "#fecaca" },
      { id: "n3", author: "Quân", text: "Cho xin lại số liệu lạm phát vừa rồi.", tone: "#fda4af" },
    ],
    incoming: [
      "Phụ đề đang chậm khoảng một nhịp.",
      "Góc máy bàn tin ổn, đừng cắt sang flycam nữa.",
      "Có bản tin thời tiết cuối chương trình không?",
    ],
  },
  {
    id: "derby-thu-do",
    title: "Derby thủ đô: Hà Nội gặp Hải Phòng",
    summary: "Hiệp hai đang diễn ra tại Mỹ Đình, tỷ số đang cân bằng.",
    category: "Thể thao",
    host: "Minh Khang",
    viewers: 84220,
    startedMinutesAgo: 64,
    watermark: "MATCH",
    poster: "linear-gradient(165deg, #052e16 0%, #166534 46%, #141414 100%)",
    src: "/bbb.mp4",
    chat: [
      { id: "s1", author: "Tuấn", text: "Pha bóng bổng vừa rồi thiếu người đón.", tone: "#86efac" },
      { id: "s2", author: "Linh", text: "Tiếng sân vang thật, như ngồi ở khán đài B.", tone: "#bbf7d0" },
      { id: "s3", author: "Khoa", text: "Bình luận viên đọc tên cầu thủ hơi vội.", tone: "#4ade80" },
    ],
    incoming: [
      "Góc camera sau cầu môn đẹp hơn góc giữa.",
      "Cho xem lại tình huống phút 51.",
      "Khán đài A kín chỗ từ hiệp một.",
    ],
  },
  {
    id: "san-chieu",
    title: "Sàn chiều: dòng tiền vào ngân hàng",
    summary: "Theo dõi khớp lệnh và nhận định cuối phiên.",
    category: "Kinh tế",
    host: "Thu Hà",
    viewers: 6304,
    startedMinutesAgo: 41,
    watermark: "OPEN",
    poster: "linear-gradient(165deg, #451a03 0%, #b45309 42%, #141414 100%)",
    src: "/flower.mp4",
    chat: [
      { id: "e1", author: "Đạt", text: "Nhóm ngân hàng kéo chỉ số từ đầu giờ chiều.", tone: "#fcd34d" },
      { id: "e2", author: "My", text: "Nhắc lại mốc thanh khoản giúp mình với.", tone: "#fde68a" },
    ],
    incoming: [
      "Biểu đồ nến 5 phút bị khuất mất một cạnh.",
      "Cuối phiên liệu có đợt xả không?",
    ],
  },
  {
    id: "dem-acoustic",
    title: "Đêm acoustic tại Nhà hát Lớn",
    summary: "Set mở màn với những bản hit chơi acoustic.",
    category: "Giải trí",
    host: "Phòng trà BinhDC",
    viewers: 22190,
    startedMinutesAgo: 12,
    watermark: "SET",
    poster: "linear-gradient(165deg, #2e1065 0%, #7e22ce 46%, #141414 100%)",
    src: "/bbb.mp4",
    chat: [
      { id: "m1", author: "Chi", text: "Giọng hát tối nay ấm, mic không bị rè.", tone: "#d8b4fe" },
      { id: "m2", author: "Phong", text: "Bài tiếp theo chơi bản nào vậy?", tone: "#e9d5ff" },
    ],
    incoming: [
      "Ánh đèn sân khấu hơi tối ở góc trái.",
      "Xin playlist sau buổi diễn.",
      "Tiếng guitar rõ hơn tiếng trống, cân lại hộ.",
    ],
  },
  {
    id: "dem-rank",
    title: "Đêm rank: đường giữa cao thủ",
    summary: "Leo rank trực tiếp, chat chọn tướng cho ván sau.",
    category: "Game",
    host: "Tuấn Kiệt",
    viewers: 15660,
    startedMinutesAgo: 95,
    watermark: "RANK",
    poster: "linear-gradient(165deg, #172554 0%, #1d4ed8 44%, #141414 100%)",
    src: "/flower.mp4",
    chat: [
      { id: "g1", author: "Bo", text: "Ván này đi đường giữa, đừng đổi kèo.", tone: "#93c5fd" },
      { id: "g2", author: "Nyx", text: "HUD hơi to, che mất thanh máu.", tone: "#bfdbfe" },
    ],
    incoming: [
      "Chat vote tướng: để mình gõ số 1 hoặc 2.",
      "Ping mạng đang ổn, không giật.",
    ],
  },
  {
    id: "ra-mat-ong-kinh",
    title: "Ra mắt ống kính mới",
    summary: "Trải nghiệm thực tế và hỏi đáp cùng kỹ sư sản phẩm.",
    category: "Công nghệ",
    host: "Studio BinhDC",
    viewers: 4102,
    startedMinutesAgo: 7,
    watermark: "LENS",
    poster: "linear-gradient(165deg, #083344 0%, #0e7490 46%, #141414 100%)",
    src: "/bbb.mp4",
    chat: [
      { id: "t1", author: "An", text: "Cho xem lại khẩu độ khi quay thiếu sáng.", tone: "#67e8f9" },
      { id: "t2", author: "Khoa", text: "So với đời trước thì nặng hơn bao nhiêu?", tone: "#a5f3fc" },
    ],
    incoming: [
      "Zoom vào vạch lấy nét giúp mình.",
      "Phần hỏi đáp bắt đầu lúc nào?",
    ],
  },
  {
    id: "pho-bo",
    title: "Bếp nhà: phở bò 12 giờ",
    summary: "Ninh xương từ sáng, múc tô đầu tiên ngay trên sóng.",
    category: "Đời sống",
    host: "Chef Lan",
    viewers: 9800,
    startedMinutesAgo: 33,
    watermark: "PHO",
    poster: "linear-gradient(165deg, #431407 0%, #c2410c 48%, #141414 100%)",
    src: "/flower.mp4",
    chat: [
      { id: "f1", author: "Hương", text: "Nước dùng trong thật, thấy cả váng mỡ.", tone: "#fdba74" },
      { id: "f2", author: "Nam", text: "Liều quế hồi cho nồi 8 lít là bao nhiêu?", tone: "#fed7aa" },
    ],
    incoming: [
      "Góc nồi hơi cao, hạ xuống ngang mặt nước.",
      "Xin công thức bánh phở nhà làm.",
    ],
  },
  {
    id: "phien-toa",
    title: "Phiên tòa công khai vụ đất đai",
    summary: "Tường thuật diễn biến phiên xử buổi chiều.",
    category: "Tin tức",
    host: "Pháp đình",
    viewers: 27440,
    startedMinutesAgo: 52,
    watermark: "COURT",
    poster: "linear-gradient(165deg, #1c1917 0%, #44403c 50%, #141414 100%)",
    src: "/bbb.mp4",
    chat: [
      { id: "c1", author: "Trang", text: "Nhớ ghi rõ ai đang phát biểu.", tone: "#d6d3d1" },
      { id: "c2", author: "Long", text: "Âm thanh hội trường hơi vang.", tone: "#e7e5e4" },
    ],
    incoming: [
      "Cho lại tên hội đồng đang ngồi giữa.",
      "Phụ đề thuật ngữ pháp lý rất cần.",
    ],
  },
  {
    id: "giao-luu-tac-gia",
    title: "Giao lưu tác giả cuối tuần",
    summary: "Đọc một chương mới và trả lời độc giả đang xem.",
    category: "Giải trí",
    host: "Nhà sách BinhDC",
    viewers: 1888,
    startedMinutesAgo: 5,
    watermark: "READ",
    poster: "linear-gradient(165deg, #292208 0%, #a16207 46%, #141414 100%)",
    src: "/flower.mp4",
    chat: [
      { id: "b1", author: "Vy", text: "Đọc chậm đoạn mở đầu giúp mình ghi lại.", tone: "#fde68a" },
      { id: "b2", author: "Khôi", text: "Sách phát hành tuần sau hay cuối tháng?", tone: "#fcd34d" },
    ],
    incoming: [
      "Hỏi về nhân vật phụ ở chương ba được không?",
      "Ánh sáng lên mặt tác giả hơi gắt.",
    ],
  },
];

export const TICKER = [
  {
    title: "Derby thủ đô bước vào hiệp hai, khán đài Mỹ Đình kín chỗ",
    minutesAgo: 4,
  },
  {
    title: "Bản tin tối BinhDC đang phát từ phòng tin Hà Nội",
    minutesAgo: 18,
  },
  {
    title: "Dòng tiền ngân hàng kéo chỉ số trong phiên giao dịch chiều",
    minutesAgo: 27,
  },
  {
    title: "Đêm acoustic mở màn tại Nhà hát Lớn, set đầu đã lên sóng",
    minutesAgo: 12,
  },
  {
    title: "Phiên tòa công khai vụ đất đai tiếp tục phần tranh tụng",
    minutesAgo: 9,
  },
];

export function formatViewers(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

export function formatAgo(minutes: number) {
  if (minutes < 1) return "vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  return `${hours} giờ trước`;
}

export function formatClock(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}

export function formatDay(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}
