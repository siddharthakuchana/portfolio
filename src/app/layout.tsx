import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrolling from "@/components/SmoothScrolling";
import CustomCursor from "@/components/ui/CustomCursor";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { PortfolioProvider } from "@/components/providers/PortfolioProvider";
import CommandPalette from "@/components/ui/CommandPalette";
import Toolbar from "@/components/ui/Toolbar";
import { getPortfolioData } from "@/lib/dataFetcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Siddhartha Kuchana | Portfolio",
  description: "Official portfolio of Siddhartha Kuchana — AI & ML Engineer and Full-Stack Developer.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPortfolioData();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-accent/30 min-h-screen flex flex-col">
        <AuthProvider>
          <PortfolioProvider data={data}>
            <SmoothScrolling>
            <CustomCursor />
            <CommandPalette />
            <Navbar />
            <main className="min-h-screen pt-20">
              {children}
            </main>
            <Footer />
            <Toolbar />
          </SmoothScrolling>
          </PortfolioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

