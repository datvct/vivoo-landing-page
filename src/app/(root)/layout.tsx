import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";
import "../../styles/globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  const backendUrl = apiBase.replace("/api", "");

  try {
    const res = await fetch(`${backendUrl}/site-settings/general`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const result = await res.json();
      const settings = result?.data?.value;
      if (settings) {
        return {
          title: settings.siteTitle || "VIVOO",
          description: settings.siteDescription || "VIVOO - Advanced Security Solutions",
        };
      }
    }
  } catch (error) {
    // Fallback to default metadata
  }

  return {
    title: "VIVOO",
    description: "VIVOO - Advanced Security Solutions",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
