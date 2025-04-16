"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useGeolocation from "../hooks/useGeolocation";

export default function ThankYouPage() {
  const [texts, setTexts] = useState({});
  const country = useGeolocation();
  const router = useRouter();
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

  // ✅ Load translations using fetch instead of import
  useEffect(() => {
    const loadTranslations = async (langCode) => {
      try {
        const response = await fetch(`/translations/${langCode}.json`);
        const translations = await response.json();
        setTexts(translations);
      } catch (error) {
        console.error(`Could not load translations for ${langCode}:`, error);
      }
    };

    const languageMap = {
      DE: "de", AT: "de", US: "en", GB: "en", CA: "en",
      AU: "en", NZ: "en", PT: "pt", BR: "pt", FR: "fr",
      CH: "fr", LU: "fr", NL: "nl", BE: "nl", IT: "it",
      SV: "sv", ES: "es",
    };

    loadTranslations(languageMap[country] || "de");
  }, [country]);

  // ✅ Extract parameters from URL (ensure it runs only on client side)
  const [params, setParams] = useState({ sxid: "", extid: "", rd: "3", reU: "" });

  useEffect(() => {
    if (searchParams) {
      setParams({
        sxid: searchParams.get("sxid") || "",
        extid: searchParams.get("extid") || "",
        rd: searchParams.get("rd") || "", // Default to 3 if not provided
        reU: searchParams.get("reU") || "",
      });
    }
  }, [searchParams]);

  const { sxid, extid, rd, reU } = params;
  const countryCode = country ? country.toLowerCase() : "de";

  // ✅ Autologin Redirect after 2.5s if "reU" exists
  useEffect(() => {
    if (reU) {
      setTimeout(() => {
        window.location.href = reU;
      }, 2500);
    }
  }, [reU]);

  // ✅ Affiliate Pixel URLs
  const affiliateLeadPixelUrl = `https://contactapi.static.fyi/tracking/custom-conversion/alpha/?event=lead&sxid=${encodeURIComponent(sxid)}&extid=${encodeURIComponent(extid)}&country=${encodeURIComponent(countryCode)}&offer=7`;

  const affiliateDepositePixelUrl = `https://contactapi.static.fyi/tracking/custom-conversion/alpha/?event=deposite&sxid=${encodeURIComponent(sxid)}&extid=${encodeURIComponent(extid)}&country=${encodeURIComponent(countryCode)}&offer=7`;

  return (
    <>
      <Head>
        {/* ✅ Facebook Pixel for "Lead" Event */}
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
            src="https://www.facebook.com/tr?id=499262767247141&ev=Lead&noscript=1"
          />
        </noscript>
      </Head>

      <div className="flex flex-col justify-center items-center h-screen text-center">
        {/* ✅ Animated Checkmark */}
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

        {/* ✅ Thank You Message */}
        <h1 className="text-4xl font-bold text-green-600 mt-6">
          {texts?.thankYou || "Thank You!"}
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          {texts?.submissionSuccess || "Your submission was successful."}
        </p>
      </div>

      {/* ✅ Affiliate Conversion Pixels (Invisible Images) */}
      <img src={affiliateLeadPixelUrl} style={{ display: "none" }} alt="Affiliate Lead Pixel" />
      <img src={affiliateDepositePixelUrl} style={{ display: "none" }} alt="Affiliate Deposite Pixel" />
    </>
  );
}
