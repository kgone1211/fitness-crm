import type { Metadata } from "next";
import { ThemeProvider } from '@/contexts/ThemeContext';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: "My Fitness CRM",
  description: "Your personal fitness tracking portal",
};

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <ClientLayout>
        {children}
      </ClientLayout>
    </ThemeProvider>
  );
}
