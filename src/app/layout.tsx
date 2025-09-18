import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const sen = Sen({
  variable: "--font-sen",
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Mishkat",
  description: "Courses for everyone",
};

export default function RootLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sen.variable} ${sen.className} antialiased`}
      >
        <Navbar />
        {auth}
        {children}
        <Footer />
      </body>
    </html>
  );
}
