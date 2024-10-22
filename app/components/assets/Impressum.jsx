"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import useGeolocation from '../../hooks/useGeolocation';


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
      default: 
        loadTranslations('de'); 
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
<div className={`risiko px-4 lg:mt-[2rem] mx-auto ${isOpen ? 'mobile-bg' : ''}`}>
{/* Header Section */}
<div className="bg-white lg:border-b">
  <header className={`w-full max-w-[80rem] h-[5rem] py-1 mx-auto sm:h-[3.8rem] ${isOpen ? 'mobile-bg' : ''}`}>
    <nav className="flex justify-between items-center h-full px-4">
      <div className="left-imagess">
        <img
          src="/images/logo-blakc.svg"
          alt="Logo"
          className="w-[90px] h-auto sm:w-[115px]"
        />
      </div>
      <div className="right-images flex items-center">
        <div className="hidden md:flex items-center">
          <div className="text-nav ml-5 text-black text-[14px] font-semibold">
            <div dangerouslySetInnerHTML={{ __html: texts.online?.trader || "Loading..." }} />
          </div>
          <div className="text-nav ml-10 text-black text-[14px] font-semibold">
            <div dangerouslySetInnerHTML={{ __html: texts.online?.Kennerlerngesprach || "Loading..." }} />
          </div>
          <div className="text-nav ml-10 text-black text-[14px] font-semibold">
            <div dangerouslySetInnerHTML={{ __html: texts.online?.Kundenmeinungen || "Loading..." }} />
          </div>
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
      <div className="md:hidden mt-[8rem] flex  items-center flex-col bg-[#536054] relative h-[53rem] text-[30px]">
        <div className=" p-4 text-black text-[21px] lg:text-[21px] font-semibold">
          <div dangerouslySetInnerHTML={{ __html: texts.online?.trader || "Loading..." }} />
        </div>
        <div className=" p-4 text-black text-[21px] lg:text-[21px] font-semibold border-b border-t border-[#ffffff29]">
          <div dangerouslySetInnerHTML={{ __html: texts.online?.Kennerlerngesprach || "Loading..." }} />
        </div>
        <div className=" p-4 text-black text-[21px] lg:text-[21px] font-semibold">
          <div dangerouslySetInnerHTML={{ __html: texts.online?.Kundenmeinungen || "Loading..." }} />
        </div>
        {/* Butoni i Qendruar */}
        <div className="flex justify-center mt-4">
          <div
            className="button bg-[#13f97b] h-[3.5rem] w-[300px] rounded-lg p-4 cursor-pointer flex items-center justify-between text-[14px] font-[600] transition-all duration-500 ease-in-out shadow-[0_24px_32px_-20px_rgba(19,249,123,0)] hover:scale-105 relative overflow-hidden z-50"
          >
            <div className="btn-text w-full text-left ml-[1rem]">
              Jetz Trader-Training ansehen
            </div>
            <div className="btn-arrow-icon">
              <img
                src="https://cdn.prod.website-files.com/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3e88_arrow-right%201.svg"
                alt="Arrow"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div
            className="button border border-[#ffffff29] h-[3.5rem] w-[300px] rounded-lg p-4 cursor-pointer flex items-center justify-between text-[12px] font-[600] transition-all duration-500 ease-in-out shadow-[0_24px_32px_-20px_rgba(19,249,123,0)] hover:scale-105 relative overflow-hidden z-50"
          >
            <div className="btn-text w-full text-left ml-[1rem]">
              order Kennenkerngesprach buchen
            </div>
            <div className="btn-arrow-icon">
              <img
                src="https://cdn.prod.website-files.com/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3e88_arrow-right%201.svg"
                alt="Arrow"
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </header>
</div>

              {/* Main Content */}
              <main className="max-w-3xl mx-auto mt-[10rem]">
                  <h1 className="text-5xl font-bold mb-8">Impressum</h1>
                  <section className="text-lg text-[#00000066] leading-relaxed space-y-6">

                    <p>(Angaben gemäß § 5 DDG)
                    </p>

                    <p>TF Daytrading GmbH
                    </p>
                    <p>Am Brauhof 2
                    </p>
                    <p>53721 Siegburg
                    </p>
                    <p>Deutschland (Germany)
                    </p>
                    <p>Telefon: +49 2241 9446738 (Keine Kundenberatung!)
                    </p>
                    <p>info(at)tradingfreaks.com
                    </p>

                    <p className="mt-4"><strong>Internetseite:</strong> www.tradingfreaks.com</p>

<p className="mt-4"><strong>Registereintrag:</strong> Eingetragen im Handelsregister</p>
<p>Registergericht: Siegburg</p>
<p>Registernummer: 13928</p>

<p className="mt-4"><strong>Geschäftsführer:</strong></p>
<p>Andreas Stark</p>
<p>Tim Grüger B.Sc. (Finance)</p>

<p className="mt-4"><strong>Online-Streitbeilegung:</strong></p>
<p>Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO: Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die der Kunde unter</p>
<p><a href="http://ec.europa.eu/consumers/odr/" className="text-blue-500">http://ec.europa.eu/consumers/odr/</a> findet.</p>

<p className="mt-4"><strong>Umsatzsteuer-ID-Nr.:</strong> DE307330406</p>

<p className="mt-4">Verantwortliche für den Inhalt ist i.S.d. § 18 Abs. 2 Medienstaatsvertrag (MStV)</p>
<p>Andreas Stark, Tim Grüger</p>

<p className="mt-4"><strong>Ansprechpartner:</strong></p>
<p>Andreas Stark</p>

<p className="mt-4">Erstellung der Webseite: WP-Agentur24</p>

<p className="mt-4">Bildrechte: Fotostudio Seldmeier (53721 Siegburg), pixabay.de und shutterstock.com</p>

<p className="mt-4">Zeitung Mockup: <a href="https://de.freepik.com/psd/mockup" className="text-blue-500">https://de.freepik.com/psd/mockup</a> PSD erstellt von zlatko_plamenov – de.freepik.com</p>

<h2 className="text-2xl font-semibold mt-8">1. Haftungsbeschränkung</h2>

                      

                  </section>
              </main>
          </div>

          <div className="hidden md:flex text1  items-center relative bg-white left-[13%] rounded-[20px] px-[10px] py-2 w-[13rem] top-[16rem] z-20 font-[400]">
       <img src="/images/6601dc8887b1e34f1fff3e8d_check.svg" alt="aaa" className="mr-2" />
       <span>15 Jahre Erfahrung</span>
            </div>

            <div className="hidden md:flex text1  items-center relative bg-white left-[38%] rounded-[20px] px-[10px] py-2 w-[11rem] top-[30rem] font-[400]">
       <img src="/images/6601dc8887b1e34f1fff3e8d_check.svg" alt="aaa" className="mr-2" />
       <span>15.000+ Trades</span>
            </div>

            <div className="hidden md:flex text1  items-center relative bg-white left-[33%] rounded-[20px] px-[10px] py-2 w-[12rem] top-[3rem] font-[400]">
  <img src="/images/amazon6707.jpg" alt="aaa" className="mr-2 w-[40px]" />
  <div className="flex flex-col">
    <span>Amazon</span>
    <span className='text-[#13f97b]'>+3.455$</span>
  </div>
</div>


       <div className="hidden md:flex part7 justify-center items-center w-full py-6">

       
       <div className="section3 part7-1 mb-[-19rem] flex flex-col md:flex-row items-start justify-between max-w-7xl w-full md:w-[85rem] rounded-[20px] mx-auto bg-white">

                  <img className='w-full rounded-[20px]' src="/images/6601dc8887b1e34f1fff3f9d_Frame 1948755961.webp" alt="aaa" />

                  <img className="w-[55rem] mt-[-5.7rem] ml-[rem] absolute" src="/images/6601dc8887b1e34f1fff3f9c_Mask group.webp" alt="pe" />

                 




                  <div className=" relative right lg:mt-[4rem] w-full lg:ml-[-35rem]">

                      <h1 className="text-[48px] text-[#fff] leading-[90%] font-bold">Dein Weg zum
                          <br />Trader beginnt jetzt
                      </h1>

                      <p className="text-[#ffffffb8] mt-[3rem]">Erfolgreiches Daytrading ist keine Glückssache, sondern eine Fähigkeit, die man erlernen kann. Bei uns bekommst du das Handwerk von echten Vollzeittradern beigebracht.

                      </p>

                      <div
                          className="button bg-[#13f97b] mt-[2rem] h-[4rem] w-[388px] rounded-lg p-4 cursor-pointer flex items-center justify-between text-[16px] font-[600] transition-all duration-500 ease-in-out shadow-[0_24px_32px_-20px_rgba(19,249,123,0)] hover:scale-105 relative overflow-hidden z-50"
                      >
                          <div className="btn-text w-full text-left ml-[1rem]">
                                Jetz Trader-Training ansehen
                          </div>

                          <div className="btn-arrow-icon">
                              <img
                                  src="https://cdn.prod.website-files.com/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3e88_arrow-right%201.svg"
                                  alt="Arrow" />
                          </div>
                 </div>
                 <div
                          className="button border border-[#ffffff29] mt-[2rem] h-[4rem] w-[388px] rounded-lg p-4 cursor-pointer flex items-center justify-between text-[16px] font-[600] transition-all duration-500 ease-in-out shadow-[0_24px_32px_-20px_rgba(19,249,123,0)] hover:scale-105 relative overflow-hidden z-50"
                      >
                          <div className="btn-text w-full text-left ml-[1rem]">
                                order Kennenkerngesprach buchen 
                          </div>

                          <div className="btn-arrow-icon">
                              <img
                                  src="https://cdn.prod.website-files.com/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3e88_arrow-right%201.svg"
                                  alt="Arrow" />
                          </div>
                 </div>
</div>


          </div>
 </div>

 <div className="lg:hidden mobile part7 flex flex-col justify-center items-center w-full bg-[#536054]">
  <div className="img-top flex justify-center w-full">
    <img src="/images/6601dc8887b1e34f1fff3f9f_banner.webp" alt="we" className="w-full h-auto" />
  </div>
  <h1 className="mt-4 text-center text-[32px] w-[13rem] bg-[#536054] text-white font-bold">Dein Web zum Trader Beginnt jetzt</h1> 
  <div className="desc1 text-[#FFFFFFB8] text-[14px] mt-[1rem] text-center">
  Erfolgreiches Daytrading ist keine Glückssache, sondern eine Fähigkeit, die man erlernen kann. Bei uns bekommst du das Handwerk von echten Vollzeittradern beigebracht.
  </div>


  <div className="flex justify-center mt-8">
          <div
            className="button bg-[#13f97b] h-[3.5rem] w-full rounded-lg p-4 cursor-pointer flex items-center justify-between text-[14px] font-[600] transition-all duration-500 ease-in-out shadow-[0_24px_32px_-20px_rgba(19,249,123,0)] hover:scale-105 relative overflow-hidden z-50"
          >
            <div className="btn-text w-full text-left ml-[1rem]">
              Jetz Trader-Training ansehen
            </div>
            <div className="btn-arrow-icon">
              <img
                src="https://cdn.prod.website-files.com/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3e88_arrow-right%201.svg"
                alt="Arrow"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-7">
          <div
            className="button border border-[#ffffff29] h-[3.5rem] w-full rounded-lg p-4 cursor-pointer flex items-center justify-between text-[12px] font-[600] transition-all duration-500 ease-in-out shadow-[0_24px_32px_-20px_rgba(19,249,123,0)] hover:scale-105 relative overflow-hidden z-50"
          >
            <div className="btn-text w-full text-left ml-[1rem]">
              order Kennenkerngesprach buchen
            </div>
            <div className="btn-arrow-icon">
              <img
                src="https://cdn.prod.website-files.com/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3e88_arrow-right%201.svg"
                alt="Arrow"
              />
            </div>
          </div>
        </div>
</div>
      
      
      
      <div className="light-background-footer bg-[#04120b]">
              <div className="part7-1 max-w-full md:max-w-8xl w-full md:w-[85rem] rounded-[20px] bg-[#04120b] flex flex-col mx-auto pb-[80px] py-[30px] px-[20px] md:px-[80px]">

                  {/* Footer Top Section */}
                  <div className="content mt-[10rem] md:mt-[20rem] flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between border-b border-solid border-[#ffffff29]">

                      {/* Left Images */}
                      <div className="left-images mb-[3rem]">
                          <img
                              src="/images/logo-white.svg"
                              alt="Logo"
                              width={115}
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
                          © 2023 TradingFreaks® All rights reserved
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
