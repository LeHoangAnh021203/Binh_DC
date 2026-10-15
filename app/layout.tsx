import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const editorial = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial",
});

export const metadata: Metadata = {
  title: "BinhDC — Trực tiếp",
  description:
    "Xem livestream trên BinhDC: tin tức, thể thao, kinh tế và các buổi diễn đang phát.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} ${editorial.variable} antialiased`}>{children}</body>
    </html>
  );
}
