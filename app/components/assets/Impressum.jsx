"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import Button from "./Button";

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

function Impressum() {
  const [showColumns, setShowColumns] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
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
  

  const toggleAccordion = (index) => { 
    setActiveIndex(activeIndex === index ? null : index); 
  }; 

  const handleShowColumns = () => { 
    setShowColumns(true); 
  }; 

  const handleToggleColumns = () => { 
    setShowColumns(prevState => !prevState); 
  }; 

  const toggleMenu = () => { 
    setIsOpen(!isOpen); 
    if (!isOpen) { 
      document.body.style.overflow = 'hidden'; 
    } else { 
      document.body.style.overflow = 'auto'; 
    }
  };
  return (
<div>
<div className={`risiko px-4 lg:mt-[0rem] mx-auto ${isOpen ? 'mobile-bg' : ''}`}>
{/* Header Section */}
<div className="bg-white lg:border-b">
<header className="w-full max-w-[80rem] h-[5rem] py-1 mx-auto sm:h-[3.8rem]">
  <nav className="flex justify-between items-center h-full px-4">
    <div className="left-imagess">
      <a href="/">
        <img
          src="/images/logo-blakc.svg"
          alt="Logo"
          className="w-[120px] h-auto sm:w-[140px]"
        />
      </a>
    </div>
    <div className="right-images flex items-center">
      <div className=" items-center">
        <div className="right-images flex items-center">
          <img
            src="/images/66d71361e6381ef5a1d07c03_avatars%202k.png"
            alt="Avatar"
            className="w-[118px] sm:w-[114px] lg:mr-0 mr-[-5rem]"
          />
          <div className="text-nav ml-4 text-black text-[12px] md:text-[12px]">
            <div dangerouslySetInnerHTML={{ __html: texts.online?.orders }} />
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>
  </div>

              {/* Main Content */}
              <main className="max-w-3xl mx-auto mt-[2rem] mb-[5rem] lg:mt-[5rem] relative z-10">
                  <h1 className="text-5xl font-bold mb-8"> 
                    {texts.online?.impressum1 || "Loading..."}
                  </h1>
                  <section className="text-lg text-black leading-relaxed space-y-6">


                {texts.online?.impressum2 || "Loading..."} <br />
                {texts.online?.impressum3 || "Loading..."} <br />
            
                {texts.online?.impressum4 || "Loading..."} <br />
                {texts.online?.impressum5 || "Loading..."} <br />
                {texts.online?.impressum6 || "Loading..."}
                <br />
                <p>{texts.online?.impressum7 || "Loading..."}</p>
                
                <p>{texts.online?.impressum8 || "Loading..."}</p>
                {texts.online?.impressum9 || "Loading..."} <br />
                {texts.online?.impressum10 || "Loading..."} <br />
                {texts.online?.impressum11 || "Loading..."} <br />
          <br />      <strong>
                <p>{texts.online?.impressum12 || "Loading..."}</p> </strong>
                <p>{texts.online?.impressum13 || "Loading..."}</p>
                <br />    <strong>  <p>{texts.online?.impressum14 || "Loading..."}</p></strong>
                <p>{texts.online?.impressum15 || "Loading..."}</p>
                <br />        <strong>    <p>{texts.online?.impressum16 || "Loading..."}</p> </strong>
                <p>{texts.online?.impressum17 || "Loading..."}</p>
                <p>{texts.online?.impressum18 || "Loading..."}</p>
                <p>{texts.online?.impressum19 || "Loading..."}</p>
                <br />      <strong>   <p>{texts.online?.impressum20 || "Loading..."}</p> </strong>
                <p>{texts.online?.impressum21 || "Loading..."}</p>
                <br />        <strong>     <p>{texts.online?.impressum22 || "Loading..."}</p> </strong>
                <p>{texts.online?.impressum23 || "Loading..."}</p>
                <br />       <strong>     <p>{texts.online?.impressum24 || "Loading..."}</p> </strong>
                <p>{texts.online?.impressum25 || "Loading..."}</p>
                <p>{texts.online?.impressum26 || "Loading..."}</p>                   
                                      

                  </section>
              </main>
          </div>

         
      
      
      <div className="light-background-footer bg-[#04120b]">
              <div className="part7-1 max-w-full md:max-w-8xl w-full md:w-[85rem] rounded-[20px] bg-[#04120b] flex flex-col mx-auto pb-[80px] py-[30px] px-[20px] md:px-[80px]">

                  {/* Footer Top Section */}
                  <div className="content mt-[2rem] flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between border-b border-solid border-[#ffffff29]">

                      {/* Left Images */}
                      <div className="left-images mb-[3rem]">
                      <a href="/">
                          <img
                              src="/images/logo-white.svg"
                              alt="Logo"
                              width={140}
                              height={32} />
                      </a>
                      </div>

                      {/* Right List */}


                  </div>




                  {/* Footer Bottom Section */}
                  <div className="content flex flex-col md:flex-row items-start md:items-center justify-between border-b border-solid border-[#ffffff29] py-4">
                      {/* Left List */}
                      <div className="text-left">
                      <ul className="list-none flex space-x-4 md:space-x-8 text-[#fff] text-[14px] md:text-[14px] mt-[2.5rem] mb-[2.5rem] font-[500] tracking-[.175px]">
      <li>
        <Link href="/legal/datenschutz" className="hover:text-green-500">
          {texts.online?.privacyPolicy || 'Loading...'}
        </Link>
      </li>
      <li>
        <Link href="/legal/impressum" className="hover:text-green-500">
          {texts.online?.imprint || 'Loading...'}
        </Link>
      </li>
      <li>
        <Link href="/legal/risikohinweis" className="hover:text-green-500">
          {texts.online?.riskNotice || 'Loading...'}
        </Link>
      </li>
    </ul>
                      </div>


                      {/* Right Copyright Text */}
                      <div className="text text-[#ffffff3d] text-[14px] md:text-[12px] ">
                          © 2025 NextLevelTrading® All rights reserved
                      </div>
                  </div>
                  <div className="content flex flex-col py-4 mt-[3rem] md:mt-[5rem]">
                      <div className="title-footer mb-[4rem] text-[#fff] text-[24px] md:text-[24px] font-[600] leading-[100%]">
                          {texts.online?.riskNotice || "Loading..."}      </div>
                      <div className="description-bottom text-[#ffffff8f] w-full font-[400] md:w-[100%] text-[13px] md:text-[14px]">
                          {texts.online?.riskNoticeDetails || "Loading..."} <br />
                          <br />
                          <br />
                          <br />
                      </div>
                  </div>
              </div>
          </div>
        </div>
    
  
  )
}

export default Impressum
