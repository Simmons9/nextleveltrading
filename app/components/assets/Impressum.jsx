"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import useGeolocation from '../../hooks/useGeolocation';


function Impressum() {
    const [showColumns, setShowColumns] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const country = useGeolocation();
  // const [texts, setTexts] = useState(translations.EN)
  const [texts, setTexts] = useState({});

  const loadTranslations = async (langCode) => {
    try {
      const translations = await import(`../../public/translations/${langCode}.json`);
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
  return (
<div>
          <div className="risiko px-4 lg:px-20 py-12 lg:py-24 mx-auto">
              {/* Header Section */}
              <header className="flex justify-between items-center mb-16 border-b border-gray-300 pb-4">
                  <img
                      src="/images/6601dc8887b1e34f1fff3ef7_logo (1).webp"
                      alt="Logo"
                      className="w-15" />
                  <nav className="hidden lg:flex space-x-8 text-gray-500">
                      <a href="#training" className="hover:text-black">Trader-Training</a>
                      <a href="#consultation" className="hover:text-black">Kennenlerngespräch buchen</a>
                      <a href="#reviews" className="hover:text-black">Kundenmeinungen</a>
                  </nav>
              </header>

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

          <div className="part7 flex justify-center items-center w-full py-6">
              <div className="section3 part7-1 mb-[-19rem] flex flex-col md:flex-row items-start justify-between max-w-7xl w-full md:w-[85rem] rounded-[20px] mx-auto bg-white">

                  <img className='w-full rounded-[20px]' src="/images/6601dc8887b1e34f1fff3f9d_Frame 1948755961.webp" alt="aaa" />

                  <img className="w-[55rem] mt-[-5.7rem] ml-[rem] absolute" src="/images/6601dc8887b1e34f1fff3f9c_Mask group.webp" alt="pe" />

                  <div className=" relative right mt-[4rem] w-full ml-[-35rem]">

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
      </div><div className="light-background-footer bg-[#04120b]">
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
                                  <Link href="/risikohinweis">
                                      {texts.online?.privacyPolicy || 'Loading...'}
                                  </Link>
                              </li>      <li>{texts.online?.imprint || "Loading..."}</li>
                              <li>{texts.online?.riskNotice || "Loading..."}</li>
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
