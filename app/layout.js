"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";
import Script from "next/script";
import "./globals.css";
import Home from "./components/Home";
import { metadata } from "./metadata";

// Load Local Fonts Correctly
import localFont from "next/font/local";

const geistSans = localFont({
  src: "/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>

        {/* ✅ Define gvars Before Any Other Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.gvars = { gi: 21, ci: 4, wl: 17, rd: 2, ap: 0, ae: 0, lg: "en", ai: 2958103 };
            `,
          }}
        />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        {/* ✅ Load Vue ONLY for Trackbox (No Need to Install Vue in Next.js) */}
        <Script
          src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js"
          strategy="beforeInteractive"
          onLoad={() => console.log("✅ Vue.js loaded for Trackbox!")}
        />

        {/* ✅ Load Web Components for Trackbox */}
        <Script
          src="https://unpkg.com/@webcomponents/webcomponentsjs@2.6.0/webcomponents-loader.js"
          strategy="beforeInteractive"
        />

        {/* ✅ Delay Trackbox Script to Prevent Errors */}
        <Script
          id="trackbox-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("DOMContentLoaded", function() {
                let script = document.createElement("script");
                script.src = "/trackbot.js";
                script.async = true;
                script.onload = () => console.log("✅ Trackbox script loaded!");
                document.body.appendChild(script);
              });
            `,
          }}
        />

        {/* Required Trackbox Elements */}
        <div className="gaff2" id="caff"></div>
        <div className="gaff"></div>

        <main>{pathname === "/" ? <Home /> : children}</main>
      </body>
    </html>
  );
}
