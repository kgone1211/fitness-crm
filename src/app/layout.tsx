import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GoalsProvider } from "@/contexts/GoalsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fitness CRM - Personal Trainer Management",
  description: "A comprehensive fitness CRM application for trainers to manage clients, track workouts, and monitor progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WhopAuthWrapper>
            <WhopWrapper>
            <ThemeProvider>
          <GoalsProvider>
            {children}
          </GoalsProvider>
        </ThemeProvider>
          </WhopWrapper>
          </WhopAuthWrapper>
      </body>
    </html>
  );
}
