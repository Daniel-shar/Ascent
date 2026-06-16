import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ascent — Build. Launch. Grow.",
  description:
    "Ascends is your end-to-end technical partner that helps founders turn ideas into real, scalable businesses.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
