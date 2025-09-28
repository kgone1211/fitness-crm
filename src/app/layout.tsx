import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { GoalsProvider } from '@/contexts/GoalsContext';
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitCoach Pro - Fitness CRM",
  description: "A comprehensive fitness CRM application for trainers to manage clients, track workouts, and monitor progress.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider>
            <GoalsProvider>
              <Layout userRole="coach">
                {children}
              </Layout>
            </GoalsProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
