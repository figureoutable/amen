import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libre = Libre_Baskerville({
  weight: ["400", "700"],
  variable: "--font-libre",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bible Context AI",
  description: "Historical and linguistic context for Scripture reading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${libre.variable}`}>
        {children}
      </body>
    </html>
  );
}
