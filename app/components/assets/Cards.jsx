"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';

const fetchLocation = async () => {
  try {
    const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
    const response = await fetch(`https://ipinfo.io/json?token=${token}`);
    const data = await response.json();
    return data.country; // Returns country code (e.g., "DE", "US")
  } catch (error) {
    console.error("Failed to fetch location", error);
    return "DE"; // Default to German if error occurs
  }
};

const CardSection = () => {
  const cardRefs = useRef([]);
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

    loadTranslations(languageMap[country] || "de"); // Default to German if no match

  }, [country]);
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0'); // Remove the opacity class
            entry.target.classList.add('animate'); // Add the animation class
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.3 } 
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 w-full h-auto mt-[3rem] p-3 sm:p-4">
      {texts.online?.cards?.data?.map((card, index) => (
        <div
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          className="w-full md:w-[48%] lg:w-[39rem] h-auto flex flex-col sm:flex-row items-center bg-[#fff] p-4 sm:p-[30px] rounded-[10px] fadeRight opacity-0"
          style={{ animationDelay: `${index * 0.5}s` }} 
        >
          <Image
            className="h-[130px] sm:h-[129px] w-[130px] sm:w-[120px] sm:mr-4"
            src={card.imgSrc}
            alt={card.title}
            width={130}
            height={130}
          />
          <div className="text-center sm:text-left">
            <div className="font-bold text-[24px] sm:text-[24px] leading-[1.2]">{card.title}</div>
            <div className="text-[14px] sm:text-[16px] text-[#728291] leading-[1.5] mt-2">
              {card.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSection;
