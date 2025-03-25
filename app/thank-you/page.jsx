"use client";

import Head from "next/head";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useGeolocation from "../hooks/useGeolocation";

function ThankYouContent() {
  const [texts, setTexts] = useState({});
  const country = useGeolocation();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load translations based on the detected country.
  useEffect(() => {
    const loadTranslations = async (langCode) => {
      try {
        const translations = await import(`/public/translations/${langCode}.json`);
        setTexts(translations.default || translations);
      } catch (error) {
        console.error(`Could not load translations for ${langCode}:`, error);
      }
    };

    const languageMap = {
      DE: "de",
      AT: "de",
      US: "en",
      GB: "en",
      CA: "en",
      AU: "en",
      NZ: "en",
      PT: "pt",
      BR: "pt",
      FR: "fr",
      CH: "fr",
      LU: "fr",
      NL: "nl",
      BE: "nl",
      IT: "it",
      SV: "sv",
      ES: "es",
    };

    loadTranslations(languageMap[country] || "de");
  }, [country]);

  // Autologin redirect: Check for autologin URL in the query parameter "reU"
  useEffect(() => {
    const redirectUrl = searchParams.get("reU");
    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2500);
    }
  }, [searchParams]);

  // Extract additional parameters for affiliate pixels:
  const sxid = searchParams.get("sxid") || "";
  const extid = searchParams.get("extid") || "";
  const rd = searchParams.get("rd") || ""; // If rd is not passed, you can default it to "3" if needed
  const countryCode = country ? country.toLowerCase() : "de";

  // Build affiliate pixel URLs based on the provided format:
  const affiliateLeadPixelUrl = `https://contactapi.static.fyi/tracking/custom-conversion/alpha/?event=lead&sxid=${encodeURIComponent(sxid)}&extid=${encodeURIComponent(extid)}&country=${encodeURIComponent(countryCode)}&offer=7`;
const affiliateDepositePixelUrl = `https://contactapi.static.fyi/tracking/custom-conversion/alpha/?event=deposite&sxid=${encodeURIComponent(sxid)}&extid=${encodeURIComponent(extid)}&country=${encodeURIComponent(countryCode)}&offer=7`;
  return (
    <>
      <Head>
        {/* (Optional) Facebook Conversion Pixel: Only conversion event here (Lead) */}
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
        {/* Animated Checkmark */}
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
        {/* Thank You Message */}
        <h1 className="text-4xl font-bold text-green-600 mt-6">
          {texts?.thankYou || "Thank You!"}
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          {texts?.submissionSuccess || "Your submission was successful."}
        </p>
      </div>
      {/* Affiliate Conversion Pixels (Invisible Images) */}
      <img
        src={affiliateLeadPixelUrl}
        style={{ display: "none" }}
        alt="Affiliate Lead Pixel"
      />
      <img
        src={affiliateDepositePixelUrl}
        style={{ display: "none" }}
        alt="Affiliate Deposite Pixel"
      />
    </>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
