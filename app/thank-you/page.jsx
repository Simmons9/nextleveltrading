"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import useGeolocation from "../hooks/useGeolocation";

export default function ThankYouPage() {
  const [texts, setTexts] = useState({});
  const [params, setParams] = useState({
    sxid: "",
    extid: "",
    rd: "3",
    reU: "",
  });

  const country = useGeolocation();

  // ✅ Parse URL query parameters from window.location
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setParams({
        sxid: urlParams.get("sxid") || "",
        extid: urlParams.get("extid") || "",
        rd: urlParams.get("rd") || "3",
        reU: urlParams.get("reU") || "",
      });
    }
  }, []);

  // ✅ Load translations based on geolocation
  useEffect(() => {
    const languageMap = {
      DE: "de", AT: "de", US: "en", GB: "en", CA: "en",
      AU: "en", NZ: "en", PT: "pt", BR: "pt", FR: "fr",
      CH: "fr", LU: "fr", NL: "nl", BE: "nl", IT: "it",
      SV: "sv", ES: "es",
    };

    const loadTranslations = async (langCode) => {
      try {
        const res = await fetch(`/translations/${langCode}.json`);
        const data = await res.json();
        setTexts(data);
      } catch (err) {
        console.error("Could not load translations:", err);
      }
    };

    if (country) {
      loadTranslations(languageMap[country] || "de");
    }
  }, [country]);

  const { sxid, extid, rd, reU } = params;
  const countryCode = country ? country.toLowerCase() : "de";

  // ✅ Auto-redirect if reU exists
  useEffect(() => {
    if (reU) {
      setTimeout(() => {
        window.location.href = reU;
      }, 2500);
    }
  }, [reU]);

  const leadPixel = `https://contactapi.static.fyi/tracking/custom-conversion/alpha/?event=lead&sxid=${encodeURIComponent(sxid)}&extid=${encodeURIComponent(extid)}&country=${encodeURIComponent(countryCode)}&offer=7`;
  const depositPixel = `https://contactapi.static.fyi/tracking/custom-conversion/alpha/?event=deposite&sxid=${encodeURIComponent(sxid)}&extid=${encodeURIComponent(extid)}&country=${encodeURIComponent(countryCode)}&offer=7`;

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              setTimeout(() => {
                if (window.fbq) {
                  fbq('track', 'Lead');
                }
              }, 2500);
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=417146658918283&ev=Lead&noscript=1"
          />
        </noscript>
      </Head>

      <div className="flex flex-col justify-center items-center h-screen text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-green-500 animate-checkmark"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <h1 className="text-4xl font-bold text-green-600 mt-6">
          {texts?.thankYou || "Thank You!"}
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          {texts?.submissionSuccess || "Your submission was successful."}
        </p>
      </div>

      {/* Tracking pixels */}
      <img src={leadPixel} style={{ display: "none" }} alt="Lead Pixel" />
      <img src={depositPixel} style={{ display: "none" }} alt="Deposit Pixel" />
    </>
  );
}
