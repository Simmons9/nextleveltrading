"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useGeolocation from "../hooks/useGeolocation";

export default function ThankYouPage() {
  const [texts, setTexts] = useState({});
  const country = useGeolocation();
  const router = useRouter();

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

  useEffect(() => {
    // Check for an autologin URL in the query parameter "reU"
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get("reU");
    if (redirectUrl) {
      // Redirect after 2.5 seconds
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2500);
    }
  }, []);

  return (
    <>
      <Head>
        {/* Conversion Pixel (Lead) Only with a 2.5 second delay */}
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
    </>
  );
}
