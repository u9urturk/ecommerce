import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/providers";
import { Footer } from "@/components/layout/footer";
import { TopProgressBar } from "@/components/loading/global-loading";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aspaio Oz",
  description: "Aspaio Oz web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          <TopProgressBar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
