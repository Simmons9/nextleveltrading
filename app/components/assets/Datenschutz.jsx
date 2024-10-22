"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import useGeolocation from '../../hooks/useGeolocation';



function Datenschutz() {
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
                  <h1 className="text-5xl font-bold mb-8">Datenschutzerklärung</h1>
                  <section className="text-lg text-[#00000066] leading-relaxed space-y-6">
                    <img src="/images/6601dc8887b1e34f1fff3fab_erecht24-siegel-datenschutz-rot-gross-322x420-1 (1).png" alt="" />
                      <p>
                          <strong>1. Datenschutz auf einen Blick
                          </strong><br />
                          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.

                      </p>

                      <strong>Datenerfassung auf dieser Website

                      </strong><br />


                      <p>
                      Wer ist verantwortlich für die Datenerfassung auf dieser Website?

Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.

Wie erfassen wir Ihre Daten?

Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.

Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.

Wofür nutzen wir Ihre Daten?

Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.

Welche Rechte haben Sie bezüglich Ihrer Daten?

Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.

Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Details hierzu entnehmen Sie der Datenschutzerklärung unter „Recht auf Einschränkung der Verarbeitung”.                      </p>
                     

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
                                  src="/images/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3e88_arrow-right%201.svg"
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
                                  src="images/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3e88_arrow-right%201.svg"
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
        <Link href="/assets/datenschutz" className="hover:text-green-500">
          {texts.online?.privacyPolicy || 'Loading...'}
        </Link>
      </li>
      <li>
        <Link href="/impressum" className="hover:text-green-500">
          {texts.online?.imprint || 'Loading...'}
        </Link>
      </li>
      <li>
        <Link href="/risikohinweis" className="hover:text-green-500">
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

export default Datenschutz
