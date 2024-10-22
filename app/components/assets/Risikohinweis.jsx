"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import useGeolocation from '../../hooks/useGeolocation';


function Risikohinweis() {
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
                  <h1 className="text-5xl font-bold mb-8">Risikohinweis</h1>
                  <section className="text-lg text-[#00000066] leading-relaxed space-y-6">
                      <p>
                          <strong>Allgemeiner Risikohinweis</strong><br />
                          Die TF Daytrading GmbH, vertreten durch den Geschäftsführer Tim Grüger, Am Brauhof 2, in 53721 Siegburg, (nachstehend als „TradingFreaks“ oder „Anbieter“ benannt) bieten ein Internetportal auf der Internetseite
                          <a href="https://www.tradingfreaks.com" className="text-blue-500"> www.tradingfreaks.com</a> und auf <a href="https://www.ttp-tradingfreaks.com" className="text-blue-500">www.ttp-tradingfreaks.com</a> ein Ausbildungskonzept an (nachstehend als „Angebot“ benannt).
                      </p>
                      <p>
                          Der Inhalt, der Blog dient ausschließlich der Unterhaltung und der persönlichen Weiter- und Fortbildung. Leser oder Abonnenten, die aufgrund der veröffentlichten Inhalte oder Informationen des Anbieters Anlageentscheidungen treffen bzw. Transaktionen durchführen, handeln in vollem Umfang auf eigene Gefahr und auf eigenes Risiko.
                      </p>
                      <p>
                          Jegliche Meinungen oder andere auf dieser Seite enthaltenen Informationen werden als allgemeine Marktkommentare bereitgestellt und stellen keine Investitionsratsschläge dar.
                      </p>
                      <p>
                          TradingFreaks übernimmt keine Haftung für bereitgestellte Handelsanregungen und Informationen. Diese stellen in keiner Weise einen Aufruf zur individuellen oder allgemeinen Nachbildung, auch nicht stillschweigend, dar.
                      </p>
                      <p>

                          TradingFreaks übernimmt keine Haftung für bereitgestellte Handelsanregungen und Informationen. Diese stellen in keiner Weise einen Aufruf zur individuellen oder allgemeinen Nachbildung, auch nicht stillschweigend, dar. Handelsanregungen oder anderweitige Informationen stellen keine Aufforderung zum Kauf oder Verkauf von Wertpapieren oder derivativen Finanzprodukten dar. Eine Haftung für mittelbare und unmittelbare Folgen der veröffentlichten Inhalte und Informationen ist somit ausgeschlossen.
                      </p>

                      <p>
                          TradingFreaks ist nicht für Verluste oder Schäden verantwortlich, inklusive und ohne Beschränkung auf jeden entgangenen Gewinn, der direkt oder indirekt durch Tradingaktivitäten entsteht, die auf diesen Informationen basieren. Tradingfreaks.com hat hinreichende Maßnahmen ergriffen, um die Richtigkeit der Informationen auf der Webseite sicherzustellen.


                      </p>
                      <p>
                          Änderungen des Inhalts dieser Webseite sind jederzeit und ohne Vorankündigung vorbehalten.

                          Aktien-, Index-, Forex/Devisen- und CFD Handel auf Margin ist mit einem hohen Risiko verbunden und ist daher nicht für jeden Anleger geeignet. Bevor Sie die Dienste und Produkte von diversen Brokern für den Derivatehandel in Erwägung ziehen, sollten Sie sorgfältig Ihre Investitionsziele, finanziellen Umstände, Bedürfnisse sowie Ihren Erfahrungsstand und Ihre Sachkenntnis in Betracht ziehen.
                      </p>
                      <p>
                          Durch den Handel und die Spekulation mit Devisen, könnten Sie einen Teil oder den kompletten Verlust Ihrer ggfs. hinterlegten Geldeinlagen bei diversen Brokern erleiden und sollten deshalb nicht mit Kapital spekulieren, dessen Verlust Sie sich nicht leisten können. Seien Sie sich aller Risiken bewusst die mit dem Derivatehandel verbunden sind insbesondere auch der möglichen Nachschusspflicht bei den jeweiligen Brokern. Tradingfreaks.com empfiehlt die Konsultation eines unabhängigen Finanzberaters.


                      </p>
                      <p>TradingFreaks weist auf die besonders hohen Risiken bei Geschäften mit Optionsscheinen, Derivaten und derivativen Finanzinstrumenten hin. Der Handel mit Optionsscheinen, CFDs bzw. Derivaten ist ein Finanztermingeschäft. Den erheblichen Chancen der Finanztermingeschäfte stehen entsprechende Risiken gegenüber, die nicht nur einen Totalverlust des eingesetzten Kapitals, sondern darüber hinausgehende Verluste nach sich ziehen können, die zu einer Nachforderung zu dem eingesetzten Kapital führen können. Sollten Sie die erforderliche Marge nicht erfüllen, kann Ihre Position liquidiert werden; für daraus resultierende Verluste sind alleine Sie verantwortlich. Die Verwendung eines internetbasierten Handelssystems birgt Risiken, inklusive, aber nicht beschränkt auf Ausfall der Hardware, der Software und der Internetverbindung.

                      </p>
                      <p>
                          Aus diesem Grund setzt diese Art von Geschäften vertiefte und fundierte Kenntnisse in Bezug auf Finanzprodukte, Finanzinstrumente und sonstigen handelbaren Produkten, die Wertpapiermärkte, Wertpapierhandelstechniken und -strategien voraus.


                      </p>
                      <p>
                          Nur Verbraucher, die die gem. § 37d WpHG bei Banken und Sparkassen ausliegende Broschüre „Basisinformationen über Finanztermingeschäfte“ gelesen und verstanden sowie das Formular „Wichtige Information über die Verlustrisiken bei Finanztermingeschäften“ gelesen und unterschrieben haben, sind berechtigt, am Handel mit Optionsscheinen und sonstigen Finanztermingeschäften teilzunehmen. Der Kunde handelt gleichwohl auf eigenes Risiko und auf eigene Gefahr.


                      </p>
                      <br />

                      <strong>Allgemeiner Risikohinweis</strong><br />
                      <p>Durch den Hebeleffekt können überproportionale Verluste entstehen. Bitte beachten Sie, dass der Futures-Handel den Wert- und Kursschwankungen der zugrundeliegenden Basiswerte unterliegt. Nach Handelsaussetzungen, in volatilen Marktphasen und zwischen Schluss- und Eröffnungskurs kann es zu Kursveränderungen kommen, der den Verlust das eingesetzte Kapital übersteigen kann.

                      </p>

                      <br />

                      <strong>Risikohinweis Margin Handel

                      </strong>

                      <p>Marginhandel umfasst Transaktionen, die auf den Preisbewegungen eines Produktes basieren. Die Abrechnung erfolgt auf Grundlage der Differenz zwischen dem Eröffnungs- und Schlusspreis der Transaktion. Der Handel auf Marginbasis ist nur für erfahrene Anleger mit einer hohen Risikotragfähigkeit geeignet .Es besteht die Gefahr, dass Sie mehr Kapitalverlieren, als Sie ursprünglich investiert haben. Der Marginhandel kann zu Totalverlusten und Nachschusspflichten führen.

                      </p>

                      <br />

                      <strong>Risikohinweis Markt-, Aktienanalysen und Artikel



                      </strong>

                      <p>Markt-, Aktienanalysen oder Artikel dienen ausschließlich zu Informationszwecken. Sie stellen weder ein Angebot noch eine Empfehlung zur Eröffnung eines Brokerkontos, zur Beanspruchung einer Dienstleistung oder zum Kauf bzw. Verkauf von Finanzinstrumenten dar. Angaben über realisierte und potentielle Gewinne in der Vergangenheit stellen keine Garantie für zukünftige Gewinne dar.

                      </p>

                      <strong>Risikohinweis Forex-, Index-, Rohstoffmarkt





                      </strong>

                      <p>Bevor Sie sich zur Teilnahme am (Forex-, Index-, Rohstoff-)Markt entschließen, sollten Sie Ihre Investitionsziele, Ihre Kenntnisse und Erfahrungen und Ihre Risikobereitschaft sorgfältig überprüfen. Sie sollten auf kein Fall Geld investieren, wenn Sie es sich nicht leisten können, dieses zu verlieren.

                      </p>

                      <strong>Risiko Warnung







                      </strong>

                      <p>
                          Das Handeln mit Futures bzw. mit Margin involviert ein hohes Risiko und ist nicht für alle Investoren geeignet. Der hohe Hebeleffekt kann sowohl für, als auch gegen Sie arbeiten. Bevor Sie mit dem Handeln anfangen, sollten Sie eine Einschätzung Ihrer Investitionsziele, Ihrer Erfahrung und Ihrer Risikofreudigkeit vornehmen.

                          Wir empfehlen hinsichtlich der genannten und weiteren möglichen Risiken eine unabhängige professionelle Beratung.
                      </p>



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

export default Risikohinweis
