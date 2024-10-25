"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import useGeolocation from '../../hooks/useGeolocation';
import Button from './Button';


function Impressum() {
  const [showColumns, setShowColumns] = useState(false); 
  const [isOpen, setIsOpen] = useState(false); 
  const [activeIndex, setActiveIndex] = useState(null); 
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
      default:
        loadTranslations('de'); // Default to German
    }
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
    <header className={`w-full max-w-[80rem] h-[5rem] py-1 mx-auto sm:h-[3.8rem] ${isOpen ? 'mobile-bg' : ''}`}>
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
          <div className="hidden md:flex items-center">
          <div className="text-nav ml-5 text-black text-[14px] font-semibold">
            <Link href="/" className="hover:text-green-500">
          Home
        </Link>            </div>
            <div className="text-nav ml-5 text-black text-[14px] font-semibold">
            <Link href="/legal/impressum" className="hover:text-green-500">
          {texts.online?.imprint || 'Loading...'}
        </Link>           </div>
            <div className="text-nav ml-10 text-black text-[14px] font-semibold">
            <Link href="/legal/risikohinweis" className="hover:text-green-500">
          {texts.online?.riskNotice || 'Loading...'}
        </Link>           </div>
            <div className="text-nav ml-10 text-black text-[14px] font-semibold">
            <Link href="/legal/datenschutz" className="hover:text-green-500">
          {texts.online?.privacyPolicy || 'Loading...'}
        </Link>           </div>
          </div>
          {/* Hamburger Menu / X for close */}
          <button
            className="md:hidden flex flex-col items-center justify-center border border-[#00000029] bg-[#0000000A] px-2 py-2 "
            onClick={toggleMenu}
          >
            {isOpen ? (
              // X icon for close
              <span className="block w-5 h-3 mb-3  text-white text-2xl">✕</span>
            ) : (
              // Hamburger menu when closed
              <>
                <span className="block w-5 h-[2px] bg-black mb-1"></span>
                <span className="block w-5 h-[2px] bg-black mb-1"></span>
                <span className="block w-5 h-[2px] bg-black"></span>
              </>
            )}
          </button>
        </div>
      </nav>
  
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden  z-50 mt-[5rem] flex  items-center flex-col bg-[#536054] relative h-[53rem] text-[30px]">
          <div className=" p-4 text-black text-[21px] lg:text-[21px] font-semibold">
          <Link href="/" className="hover:text-green-500">
          Home
        </Link>            </div>
          <div className=" p-4 text-black text-[21px] lg:text-[21px] font-semibold border-b border-t border-[#ffffff29]">
          <Link href="/legal/impressum" className="hover:text-green-500">
          {texts.online?.imprint || 'Loading...'}
        </Link>            </div>
          <div className=" p-4 text-black text-[21px] lg:text-[21px] font-semibold">
          <Link href="/legal/risikohinweis" className="hover:text-green-500">
          {texts.online?.riskNotice || 'Loading...'}
        </Link>           </div>
        <div className=" p-4 text-black text-[21px] lg:text-[21px] font-semibold">
        <Link href="/legal/datenschutz" className="hover:text-green-500">
          {texts.online?.privacyPolicy || 'Loading...'}
        </Link>           </div>
        

          < Button />
        
        </div>
      )}
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
                          <img
                              src="/images/logo-white.svg"
                              alt="Logo"
                              width={150}
                              height={32} />
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
                          © 2024 NextLevelTrading® All rights reserved
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
