"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";
import Script from "next/script";
import "./globals.css";
import Home from "./components/Home";
import { metadata } from "./metadata";

// Load Google Fonts
import localFont from "next/font/local";

// Load GeistSans from local files
const geistSans = localFont({
  src: "./fonts/GeistVF.woff", 
  variable: "--font-geist-sans",
  display: "swap", // Prevents layout shifts
});

// Load GeistMono from local files
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});


export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        {/* Inject Trackbox AI Global Variables */}
        <script
          dangerouslySetInnerHTML={{
            __html: `gvars = { gi: 81, ci: 887, wl: 17, rd: 2, ap: 0, ae: 0, lg: "en", ai: 2958103 };`,
          }}
        />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Load External Scripts */}
        <Script
          src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://unpkg.com/@webcomponents/webcomponentsjs@2.6.0/webcomponents-loader.js"
          strategy="afterInteractive"
        />
        <Script
          src="/trackbot.js"
          strategy="afterInteractive"
          onLoad={() => console.log("Trackbox script loaded successfully!")}
        />

        {/* Required Trackbox Elements */}
        <div className="gaff2" id="caff"></div>
        <div className="gaff"></div>

        <main>{pathname === "/" ? <Home /> : children}</main>
      </body>
    </html>
  );
}
