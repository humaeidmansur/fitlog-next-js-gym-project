
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/Component/Nav/page";
import Footer from "@/Component/Footer/page";
import Toast from "@/Component/reactToastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Your workout library",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Suspense
          fallback={<div className="h-16 bg-[#17130F]" />}
        >
          <Navbar />
        </Suspense>

        <main className="flex-1">{children}</main>

        <Toast />

        <Footer />
      </body>
    </html>
  );
}

