"use client";
import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';

const CardSection = () => {
  const cardRefs = useRef([]);
  const country = useGeolocation();
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
        loadTranslations('de');
        break;
      case "PT":
        loadTranslations('pt');
        break;
      case "FR":
        loadTranslations('fr');
        break;
      case "NL":
        loadTranslations('nl');
        break;
      case "IT":
        loadTranslations('it');
        break;
      case "SV": 
        loadTranslations('sv');
        break;
      default:
        loadTranslations('de'); 
    }
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
          <img
            className="h-[130px] sm:h-[129px] w-[130px] sm:w-[120px] sm:mr-4"
            src={card.imgSrc}
            alt={card.title}
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
