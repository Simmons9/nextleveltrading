"use client";

import React, { useState, useEffect } from 'react'

import useGeolocation from '../../hooks/useGeolocation';


function Tag() {

    const country = useGeolocation();
    // const [texts, setTexts] = useState(translations.EN)
    const [texts, setTexts] = useState({});
    const loadTranslations = async (langCode) => {
        try {
          const translations = await import(`../../../public/translations/${langCode}.json`);
          setTexts(translations); 
        } catch (error) {
          console.error(`Could not load translations for ${langCode}:`, error);
        }
      };
    
      
      useEffect(() => {
        switch (country) {
          case "DE":
          case "AT": // Austria
            loadTranslations('de'); // German
            break;
          case "US":
          case "GB": // United Kingdom
          case "CA": // Canada
          case "AU": // Australia
          case "NZ": // New Zealand
            loadTranslations('en'); // English
            break;
          case "PT":
          case "BR": // Brazil
            loadTranslations('pt'); // Portuguese
            break;
          case "FR":
          case "CH": // Switzerland
          case "LU": // Luxembourg
            loadTranslations('fr'); // French
            break;
          case "NL":
          case "BE": // Belgium
            loadTranslations('nl'); // Dutch
            break;
          case "IT":
            loadTranslations('it'); // Italian
            break;
          case "SV":
            loadTranslations('sv'); // Swedish
            break;
            case 'ES':
              loadTranslations('es'); // Spanish
              break;
          default:
            loadTranslations('de'); // Default to German
          }
      }, [country]);
      

  return (
    <div className="columns mt-[3.5rem] flex flex-col sm:flex-row">
    <div className="flex justify-center gap-5 flex-wrap p-6">
        <div className="w-full sm:w-[26rem] h-auto p-4 bg-[#fefefe08] rounded-[10px]" style={{ border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <img className='h-[15rem] w-full mb-2' src="/images/66bd16540ad3c85ea696aa79_Group 2087326428.avif" alt="" />
            <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
            {texts.online?.chapter1 || "Kapitel 1"}
            </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            
            {texts.online?.ourMethod || "Unsere Methode"}
                <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
                {texts.online?.learnIn7Steps || "Loading time investment message..."}
                </div>
            </div>
        </div>

        <div className="w-full sm:w-[26rem] h-auto p-4 bg-[#fefefe08] rounded-[10px]" style={{ border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <img className='h-[15rem] w-full mb-2' src="/images/66bd19add8d6303b525ea374_Group 2087326437.avif" alt="" />
            <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
            {texts.online?.chapter2 || "Loading time investment message..."}
            </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            {texts.online?.rightBroker || "Loading time investment message..."}
            </div>

            <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
            {texts.online?.cfBrokerSelection || "Loading time investment message..."}
            </div>
        </div>

        <div className="w-full sm:w-[26rem] h-auto p-4 bg-[#fefefe08] rounded-[10px]" style={{ border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <img className='h-[15rem] w-full mb-2' src="/images/66d70e3588f256762cf127db_Group 2087326472.png" alt="" />
            <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
            {texts.online?.chapter3 || "Loading time investment message..."}
            </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            {texts.online?.tradingPlatforms || "Loading time investment message..."}
            </div>
            <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
            {texts.online?.tradingPlatformsIntro || "Loading time investment message..."}
            </div>
        </div>
    </div>
</div>


  )
}

export default Tag
