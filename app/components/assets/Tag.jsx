"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
const fetchLocation = async () => {
  try {
    const token = process.env.IPINFO_TOKEN;
    const response = await fetch(`https://ipinfo.io/json?token=${token}`);
    const data = await response.json();
    return data.country; // Returns country code (e.g., "DE", "US")
  } catch (error) {
    console.error("Failed to fetch location", error);
    return "DE"; // Default to German if an error occurs
  }
};

function Tag() {
  const [country, setCountry] = useState(null);
  const [texts, setTexts] = useState({});

  useEffect(() => {
    const getLocation = async () => {
      const location = await fetchLocation();
      setCountry(location);
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (!country) return;

    const languageMap = {
      DE: "de", AT: "de",
      US: "en", GB: "en", CA: "en", AU: "en", NZ: "en",
      PT: "pt", BR: "pt",
      FR: "fr", CH: "fr", LU: "fr",
      NL: "nl", BE: "nl",
      IT: "it",
      SV: "sv",
      ES: "es",
    };

    const loadTranslations = async (langCode) => {
      try {
        const translations = await import(`../../../public/translations/${langCode}.json`);
        setTexts(translations.default || translations);
      } catch (error) {
        console.error(`Could not load translations for ${langCode}:`, error);
      }
    };

    loadTranslations(languageMap[country] || "de"); // Default to German

  }, [country]);
      

  return (
    <div className="columns mt-[3.5rem] flex flex-col sm:flex-row">
    <div className="flex justify-center gap-5 flex-wrap p-6">
        <div className="w-full sm:w-[26rem] h-auto p-4 bg-[#fefefe08] rounded-[10px]" style={{ border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Image className='h-[15rem] w-full mb-2'
             src="/images/66bd16540ad3c85ea696aa79_Group 2087326428.avif" alt=""
             width={520}
             height={240} />
            <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
            {texts.online?.chapter1}
            </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            
            {texts.online?.ourMethod}
                <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
                {texts.online?.learnIn7Steps}
                </div>
            </div>
        </div>

        <div className="w-full sm:w-[26rem] h-auto p-4 bg-[#fefefe08] rounded-[10px]" style={{ border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Image className='h-[15rem] w-full mb-2' 
            src="/images/66bd19add8d6303b525ea374_Group 2087326437.avif" alt=""
            width={520}
            height={240} />
            <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
            {texts.online?.chapter2}
            </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            {texts.online?.rightBroker}
            </div>

            <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
            {texts.online?.cfBrokerSelection}
            </div>
        </div>

        <div className="w-full sm:w-[26rem] h-auto p-4 bg-[#fefefe08] rounded-[10px]" style={{ border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Image className='h-[15rem] w-full mb-2'
             src="/images/66d70e3588f256762cf127db_Group 2087326472.png" alt="" 
             width={520}
             height={240}/>
            <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
            {texts.online?.chapter3}
            </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            {texts.online?.tradingPlatforms}
            </div>
            <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
            {texts.online?.tradingPlatformsIntro}
            </div>
        </div>
    </div>
</div>


  )
}

export default Tag
