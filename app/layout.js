"use client"; // Shtoni këtë linjë në fillim të skedës

import localFont from "next/font/local";
import Head from "next/head";
import { usePathname } from "next/navigation"; 
import "./globals.css";
import Home from "./components/Home";
import { metadata } from './metadata'; // Importoni metadata

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); 

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <body>
        <main>
          {pathname === '/' ? <Home /> : children}
        </main>
      </body>
    </html>
  );
}
