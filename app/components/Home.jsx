"use client";

import React, { useState, useEffect, useRef } from 'react';
import Button from './assets/Button'
import Cards from './assets/Cards'
import Tag from './assets/Tag';
import Datenschutz from './assets/Datenschutz';
import Impressum from './assets/Impressum';
import Risikohinweis from './assets/Risikohinweis';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import useGeolocation from '../hooks/useGeolocation';
// import translations from '../../public/translations';


function Home() {


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
  return (
    <main className="relative " style={{ fontFamily: "'Outfit', sans-serif" }}>
        <div className="light-bg"  style={{ fontFamily: "'Outfit', sans-serif" }}>
        <div className="bg-white">
        <header className="w-full max-w-[80rem] h-[5rem] py-1 bg-[#fff] mx-auto sm:h-[3.8rem]">
  <nav className="flex justify-between items-center  h-full px-4">
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
      <img
        src="/images/66d71361e6381ef5a1d07c03_avatars%202k.png"
        alt="Avatar"
        className="w-[118px] sm:w-[114px] lg:mr-0 mr-[-5rem]"  
      />
      <div className="text-nav ml-4 text-black text-[12px] md:text-[12px]">
      <div dangerouslySetInnerHTML={{ __html: texts.online?.orders }} />
         </div>

    </div>
  </nav>
</header>

</div>



<div className="w-[90%] max-w-[65rem] mx-auto relative z-[1000] flex flex-col items-center justify-center lg:mt-[3rem] mt-[2rem] sm:mt-1">
  <div
    className="text-[12px] text-black font-bold bg-white itepy-2 rounded-3xl px-4 py-3 flex items-center uppercase mt-[1rem]  fadeInUp"
    style={{ animationDelay: "0s" }}
  >
    <span className="online h-3 w-3 bg-green-500 rounded-full mr-2"></span>
    {texts.online?.treading || "QUANTUM-AI-TRADING"}

      </div>
  <h1
  className="title-top text-center text-black text-[32px] sm:text-[32px] font-bold tracking-[-.7px] leading-[1.1] mt-6 sm:leading-[1.1] md:text-[56px] fadeInUp"
  style={{ animationDelay: "0.2s", fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}
>
<div dangerouslySetInnerHTML={{ __html: texts.online?.learnTrading || "Quantum AI Trading Plattform: In nur  7 Tagen zur finanziellen Unabhängigkeit!" }} />
</h1>




  <div
    className="desc1 text-center w-[90%] max-w-[60rem] text-[14px] sm:text-[16px] text-[#728291] tracking-[-.32px] leading-[1.5] my-4 px-4 sm:tracking-[.2px] sm:px-2 fadeInUp"
    style={{ animationDelay: "0.4s" }}
  >
       <div>{texts.online?.description2 || "Erfolgreiches Bitcoin-Trading ist keine Glückssache, sondern eine Fähigkeit, die man erlernen kann. Bei uns bekommst du das Handwerk seriös und von echten Vollzeittradern im 1:1 Mentoring beigebracht. Wir machen Trading für Anfänger und Fortgeschrittene erfolgreich und garantieren jeden Teilnehmer Gewinne. Lerne seriöses Trading und werde ein Teil von NextLevel Trading!"}</div>

  </div>

  <div className="relative z-[1000]">
    <Button />
    <div className="flex items-center justify-center mt-[1rem] fadeInUp" style={{ animationDelay: "0.8s" }}>
      <img
        src="/images/66d71361e6381ef5a1d07c03_avatars%202k.png"
        alt="Avatar"
        width={114}
        height={30.19}
      />
      <div className="text-people ml-4 text-black text-[12px] sm:text-[10px]">
      <div dangerouslySetInnerHTML={{ __html: texts.online?.downloads }} />
        
      </div>
    </div>
  </div>
  </div>



        

<img
  className="absolute top-[5rem] md:top-[3.8rem] inset-0 w-full h-[500px] sm:h-[500px] md:h-[600px] object-cover z-10 opacity-100 bg-gray-80"
  src="/images/66d7215fe0a981366df06f3c_Group 2087326459-p-2600.png"
  alt="Large banner"
/>



<div className="relative z-10 mt-[2rem] sm:mt-[3rem] fadeInUp flex justify-center" style={{ animationDelay: "0.9s" }}>
  <img
    className="images1 h-auto object-cover relative w-[50%] sm:w-[60%] md:w-[70%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]" // Adjusted width for mobile
    src="/images/image11.png"
    alt="New Image"
    loading="lazy"
  />

  <div
    className="blur-white absolute inset-auto w-full h-[110px] sm:h-[200px] md:h-[250px] z-30"
    style={{
      inset: 'auto 0% -1%',
      backgroundImage: 'linear-gradient(#f1f3f500, #f1f3f5 60%)'
    }}
  ></div>
</div>







<div className="grid grid-cols-2 sm:w-[80%] md:grid-cols-6 md:w-[70%]  lg:w-[190%] xl:w-[73%] m-auto">
  <img className="h-[3rem] w-full object-contain" src="/images/l1.png" alt="" />
  <img className="h-[3rem] w-full object-contain" src="/images/l2.png" alt="" />
  <img className="h-[3rem] w-full object-contain" src="/images/l3.png" alt="" />
  <img className="h-[3rem] w-full object-contain" src="/images/l4.png" alt="" />
  <img className="h-[3rem] w-full object-contain" src="/images/l5.png" alt="" />
  <img className="h-[3rem] w-full object-contain" src="/images/l6.png" alt="" />
</div>

<div className="Tradingdeine w-full h-auto mt-[5rem] px-4 mb-[5rem] flex flex-col items-center">
  <h1 className="w-[23.9rem] sm:w-[42.24rem] font-bold text-[34px] sm:text-[45px] tracking-[.4px] leading-[1.2] text-center fadeInUp" style={{ animationDelay: "0.9s" }}>
  <div>{texts.online?.lifeChange || "Wie erfolgreiches Trading dein"}</div>
  <span className="text-[#0cdc6a] fadeInUp ml-2" style={{ animationDelay: "0.9s" }}>{texts.online?.lifeChange2 || "Leben verändern wird"}</span>
  </h1>

  <div className="desc flex justify-center mt-4 text-[#728291] text-[16px] sm:text-[16px] fadeInUp" style={{ animationDelay: "0.9s" }}>
  <div>{texts.online?.timeInvestment || "Mit nur 30-60 Minuten Zeitaufwand am Tag!"}</div>
  </div>

  <Cards />
</div>

<div className="part3 w-full h-auto bg-[#041212] pt-[3rem] text-[#fff] flex flex-col items-center rounded-2xl">

<div className="text-[12px] flex justify-center mx-auto font-bold bg-[#fefefe0f] h-auto py-2 rounded-2xl px-3 items-center uppercase mt-4">
    <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
    <div>{texts.online?.tradingCourse || "QUANTUM-AI-TRADING"}</div>
</div>



<div className="Tradingdeine w-full h-auto mt-[2rem] px-4 flex flex-col items-center">
  <h1 className="w-[23.9rem] sm:w-[46.24rem] font-bold text-[34px] mb-[-1rem] sm:text-[45px] tracking-[.4px] leading-[1.2] text-center fadeInUp" style={{ animationDelay: "0.9s" }}>
  <div>{texts.online?.successTrader || "In nur 7 Tagen zum Erfolgstrader"}</div>
  </h1>


</div>




<Tag />

{!showColumns && (
    <div className="w-full h-auto mt-10 flex justify-center mb-[1.5rem] md:mb-[4rem]">
        <div
            onClick={handleToggleColumns}
            className="button flex items-center justify-between w-[20rem] bg-[#69bc8f26] font-[600] rounded-[10px] p-[20px] m-auto cursor-pointer"
            style={{ border: '1px solid rgba(255, 255, 255, 0.05)' }}
        >
            <p className="mr-2"> {texts.online?.Mehr || "Mehr anzeigen"}</p>

           
            <div className="icon-create w-[24px] h-[24px]">
                <img src="/images/66bdc762139d5d2dbcb2c74c_Add box.png" alt="" />
            </div>
        </div>
    </div>
)}
{showColumns && (
  <>
    <div className="column-add px-5">
      <div className="flex flex-wrap justify-center gap-3">
        {/* Column 1 */}
        <div className="column w-full md:w-[40rem] h-auto p-[20px] bg-[#fefefe08] mb-[2.5rem] md:mb-3 sm:mb-[3rem] relative rounded-[10px]" style={{ border: '1px solid #ffffff0d' }}>
    <img
        className="w-full h-auto object-cover sm:h-[250px] md:h-auto" 
        src="/images/66d70f4263b1d68278be1fe5_Group 2087326667.png"
        alt="" 
    />
<div className="on_the_trader relative z-[20] mt-[3rem] md:mt-0"> 
<div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
{texts.online?.chapter4 || "Loading..."}
</div>
        <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
        {texts.online?.marketStructures || "Loading..."}
        </div>
        <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2 mb-[-1rem]">
        {texts.online?.technicalAnalysis || "Loading..."}
        </div>
    </div>
    <div className="trader_block-overlay" style={{
        backgroundImage: 'linear-gradient(#0c191900, #0c1919  20%)',
        height: '243px',
        position: 'absolute',
        inset: '0',
        width: '100%',
        top: '40%',
        zIndex: 10,
    }}></div>
</div>

        {/* Column 2 */}
        <div className="column w-full md:w-[40rem] h-auto p-[15px] bg-[#fefefe08] mb-[1.9rem] md:mb-3 mobile:mb-[3rem] relative rounded-[10px]" style={{ border: '1px solid #ffffff0d' }}>
          <img
            className="imgtog5 w-auto h-auto"
            src="/images/66bdcaea1657996322be914b_U.avif"
            alt="" />
          <div className="on_the_trader relative z-[20] mt-[-1.7rem] md:mt-[-8.7rem] ">
          <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
          {texts.online?.chapter5 || "Loading..."}
            </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            {texts.online?.riskManagement || "Loading..."}
            </div>
            <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
            {texts.online?.riskManagementDescription || "Loading..."}
            </div>
          </div>
          <div className="trader_block-overlay" style={{
            backgroundImage: 'linear-gradient(#0c191900, #0c1919  30%)',
            height: '243px',
            position: 'absolute',
            inset: '0',
            width: '100%',
            top: '40%',
            zIndex: 10,
          }}></div>
        </div>

        {/* Column 3 */}
        <div className="column w-full md:w-[40rem] h-auto p-[15px] bg-[#fefefe08] mb-[1.9rem] md:mb-3 mobile:mb-[3rem] relative rounded-[10px]" style={{ border: '1px solid #ffffff0d' }}>
          <img
            className="imgtog5 w-auto h-auto"
            src="/images/66d70fe18435ec9fd92ece3a_Group%202087326431.png"
            alt="" />
          <div className="on_the_trader relative z-[20] mt-[-1.7rem] md:mt-[-8.7rem] ">
          <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
          {texts.online?.chapter6 || "Loading..."}
          </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            {texts.online?.strategy || "Loading..."}
            </div>
            <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
            {texts.online?.checklistDefinition || "Loading..."}
            </div>
          </div>
          <div className="trader_block-overlay" style={{
            backgroundImage: 'linear-gradient(#0c191900, #0c1919  30%)',
            height: '243px',
            position: 'absolute',
            inset: '0',
            width: '100%',
            top: '40%',
            zIndex: 10,
          }}></div>
        </div>

        {/* Column 4 */}
        <div className="column w-full md:w-[40rem] h-auto p-[15px] bg-[#fefefe08] mb-3 relative rounded-[10px]" style={{ border: '1px solid #ffffff0d' }}>
          <img
            className="imgtog5 w-auto h-auto"
            src="/images/66bdcaea186d4f1e46c729f4_Frame%202087326564.avif"
            alt="" />
          <div className="on_the_trader relative z-[20] mt-[1rem] md:mt-[-3rem] ">
          <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
          {texts.online?.chapter7 || "Loading..."}

            </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            {texts.online?.traderPath || "Loading..."}
            </div>
            <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
            {texts.online?.incomeLimits || "Loading..."}
            </div>
          </div>
          <div className="trader_block-overlay" style={{
            backgroundImage: 'linear-gradient(#0c191900, #0c1919  30%)',
            height: '200px',
            position: 'absolute',
            inset: '0',
            width: '100%',
            top: '50%',
            zIndex: 10,
          }}></div>
        </div>
      </div>
    </div>

   
    <div className="relative z-[1000] text-[#000]">
  <Button />
  <div className="flex items-center justify-center  mb-[2.5rem] mt-[2rem] sm:mt-[1rem]">
          <img
        src="/images/66d71361e6381ef5a1d07c03_avatars%202k.png"
        alt="Avatar"
            width={114}
            height={30.19}
          />
          <div className="text-people ml-4 text-white text-[12px]  sm:text-[10px]">
          <div dangerouslySetInnerHTML={{ __html: texts.online?.downloads || "Loading downloads..." }} />
          </div>
        </div>
</div>
  </>
)}



</div>

<div className="part3 bg-gradient-[#f1f3f5, #fff]">
<div className="mt-[6rem] flex justify-center items-center space-x-2">
  <p className="text-[18px]">{texts.online?.Hervorragend || "Loading..."}</p>

  {/* 5 Stars */}
  <div className="flex items-center">
  {[...Array(5)].map((_, index) => (
    <div
      key={index}
      className="w-6 h-6 mx-0.5"
      style={{ backgroundColor: '#00b67a', display: 'inline-block'}} 
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white" 
        className="w-full h-full p-0.5" 
      >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </div>
  ))}
</div>


  <p className="font-medium text-[14px] hidden md:flex">{texts.online?.Bewertungen || "Loading..."}</p>

  <div className="items-center hidden md:flex">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00B67A" className="w-6 h-6 ml-1">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
    <p className="font-semibold text-[14px] text-center ml-1">{texts.online?.Trustpilot || "Loading..."}</p>
  </div>
</div>




  <div className="flex flex-wrap justify-center gap-4 w-[100%] h-auto mt-[2.5rem] z-0 px-5">
  <div className="relative flex flex-col items-start rounded-[12px] pr-[32px] pl-[32px] bg-[#fff] p-4 pt-[2rem] w-[25.5rem] h-auto text-[28px] tracking-[.35px] leading-[100%] font-[600]">
    <span className="text-[#0ec661]">{texts.online?.number || "Loading..."}</span> 
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.satisfied || "Loading..."}</span>
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.participants || "Loading..."}</span>
    
    <img
      src="/images/image2.png"
      alt=""
      className="mt-[1rem] object-cover bg-contain bg-repeat w-[27rem] h-[10.6rem] "
      style={{ backgroundImage: '100%' }}
    />
    
    <div
      className="trader_block-overlay"
      style={{
        backgroundImage: 'linear-gradient(to top, #fff, #0000)',
        height: '120px',
        position: 'absolute',
        bottom: '0',
        width: '89%',
        zIndex: 10,
      }}
    />
</div>

  {/* Kolona 2 */}
  <div className="relative flex flex-col rounded-[12px] items-start bg-[#fff] pt-[2rem] pl-[2rem] w-[53rem] h-auto text-[28px] tracking-[.35px] leading-[100%] font-[600] col-start-2 z-20">
    <span className="block text-[28px]  tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem] z-10">{texts.online?.moreThan || "Loading..."}</span>
    <span className="text-[#0ec661] relative z-10">{texts.online?.topExperts || "Loading..."}</span> 
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem] relative z-10">{texts.online?.onTeam || "Loading..."}</span>
    
    <img
      src="/images/image12.png"
      alt=""
      className=" w-auto h-[200px] object-cover z-0 bg-contain bg-repeat ml-[-2rem] md:mr-2 mt-[-2.3rem] md:mt-[-6.3rem] md:w-[820.33px] md:h-[300px]"
      style={{ backgroundImage: '100%' }}
    />
    <img
      src=""
      alt=""
      className="block md:hidden w-auto h-auto object-cover z-0 bg-contain mt-[0.2rem] bg-repeat ml-[-1rem] md:mr-2 md:mt-[-6.3rem] md:w-[820.33px] md:h-[300px]"
      style={{ backgroundImage: '100%' }}
    />

    {/* <div
      className="trader_block-overlay"
      style={{
        backgroundImage: 'linear-gradient(to top, #fff, #0000)',
        height: '80px',
        position: 'absolute',
        bottom: '0',
        width: '94%',
        zIndex: 10,
        marginRight: "4rem",
      }}
    /> */}
  </div>

</div> 



<div className="flex flex-wrap justify-center gap-4 w-[100%] h-auto mt-[1rem]">
  <div className="relative flex flex-col items-start rounded-[12px] pr-[32px] pl-[32px] bg-[#fff] p-4 pt-[2rem] w-[25.5rem] h-auto text-[28px] tracking-[.35px] leading-[100%] font-[600]">

    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem] z-20">{texts.online?.weAre || "Loading..."}</span>
    <span className="text-[#0ec661] z-20">{texts.online?.german || "Loading..."}</span> 
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem] z-20">{texts.online?.company || "Loading..."}</span>
    
    <img
      src="/images/664cd3ac78e980e08b45322e_272326.webp"
      alt=""
      className="mt-[-5rem] object-cover bg-contain bg-repeat relative z-10"
      style={{ backgroundImage: '100%' }}
    />

    <img className='absolute bottom-[5rem] z-20 w-[260px]' src="/images/daytrading.png" alt="daytrading" />
    
    <div
      className="trader_block-overlay"
      style={{
        backgroundImage: 'linear-gradient(to top, #fff, #0000)',
        height: '120px',
        position: 'absolute',
        bottom: '0',
        width: '89%',
        zIndex: 10,
      }}
    />
</div>
<div className="relative z-10 flex flex-col items-start rounded-[12px] pr-[32px] pl-[32px] bg-[#fff] p-4 pt-[2rem] w-[25.5rem] h-auto text-[28px] tracking-[.35px] leading-[100%] font-[600]">
    <span className="text-[#0ec661]">{texts.online?.number2 || "Loading..."}</span> 
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.conducted || "Loading..."}</span>
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.trades || "Loading..."}</span>
    
    <img
      src="/images/6601dc8887b1e34f1fff3f5f_frame-numbers-p-500.webp"
      alt=""
      className="mt-[2rem]  object-cover bg-contain bg-repeat w-[27rem] h-[10.1rem] "
      style={{ backgroundImage: '100%' }}
    />
    
    <div
      className="trader_block-overlay"
      style={{
        backgroundImage: 'linear-gradient(to top, #fff, #0000)',
        height: '120px',
        position: 'absolute',
        bottom: '0',
        width: '89%',
        zIndex: 10,
      }}
    />
</div>
<div className="relative flex flex-col items-start rounded-[12px] pr-[32px] pl-[32px] bg-[#fff] p-4 pt-[2rem] w-[25.5rem] h-auto text-[28px] tracking-[.35px] leading-[100%] font-[600]">
    <span className="text-[#0ec661]">{texts.online?.fifteenYears || "Loading..."}</span> 
    {/* <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.trading || "Loading..."}</span> */}
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.experience || "Loading..."}</span>
    
    <img
      src="/images/6601dc8_Frame-p-500.png"
      alt="aae"
      className="mt-[4.1rem] object-cover bg-contain bg-repeat w-[28rem] h-[11.1rem] "
      style={{ backgroundImage: '100%' }}
    />
    
    <div
      className="trader_block-overlay"
      style={{
        backgroundImage: 'linear-gradient(to top, #fff, #0000)',
        height: '120px',
        position: 'absolute',
        bottom: '0',
        width: '89%',
        zIndex: 10,
      }}
    />
</div>
</div>
</div>
<div className="part5  md:mt-[6rem]">
  <div className="relative w-screen flex flex-col items-center z-20 mt-10 px-5">
    <div className="text-[12px] text-black font-bold bg-white py-2 rounded-3xl px-4 flex items-center uppercase mt-4">
      <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
      {texts.online?.recognizeYourself || "Loading..."}
          </div>

    <div className="title1 text-center text-black text-[40px] tracking-[.7px] font-bold leading-[1.1] mt-6">
    {texts.online?.whoIsTrainingFor || "Loading..."}
    </div>

    <div className="flex flex-wrap justify-center items-start w-full h-auto mt-10 gap-6">
      <div className="w-[32rem] bg-[#fff] p-3 rounded-[20px] h-[27rem]">
        <div className="button1 bg-[#0cdc6a] text-[#ffffff] font-bold pt-[15px] pb-[15px] text-[20px] items-center text-center rounded-[10px]">
        {texts.online?.hundredPercentCorrect || "Loading..."}
        </div>
        <ul className="list-inside list-none m-5 md:m-10 text-[16px] text-[#728291]">
        <li className="flex mt-6">
        <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
      <img 
        src="/images/image6.png" 
        alt="check icon" 
        className="absolute  w-[30px] h-[30px]"
      />
    </span>
    {texts.online?.interestedInTrading || "Loading..."}
    </li>
    <li className="flex mt-[2rem]">
    <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
    <img 
        src="/images/image6.png" 
        alt="check icon" 
        className="absolute  w-[30px] h-[30px]"
      />
    </span>
    {texts.online?.wantToLearnNewSkills || "Loading..."}
    </li>
    <li className="flex mt-[2rem]">
    <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
    <img 
        src="/images/image6.png" 
        alt="check icon" 
        className="absolute  w-[30px] h-[30px]"
      />
    </span>
    {texts.online?.wantFinancialFreedom || "Loading..."}
    </li>
    <li className="flex mt-[2rem]">
    <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
    <img 
        src="/images/image6.png" 
        alt="check icon" 
        className="absolute  w-[30px] h-[30px]"
      />
    </span>
    {texts.online?.readyToInvest || "Loading..."}
    </li>
    <li className="flex mt-[2rem]">
    <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
    <img 
        src="/images/image6.png" 
        alt="check icon" 
        className="absolute  w-[30px] h-[30px]"
      />
    </span>
    {texts.online?.willingToLearn || "Loading..."}
    </li>

</ul>
      </div>
      
      <div className="w-[32rem] bg-[#fff] p-3 rounded-[20px] h-[27rem]">
        <div className="button1 bg-[#ff0000] text-[#ffffff] font-bold pt-[15px] pb-[15px] text-[20px] items-center text-center rounded-[10px] ">
        {texts.online?.definitelyNot || "Loading..."}
        </div>
        <ul className="list-inside list-none m-5 md:m-10 text-[16px] text-[#728291]">
        <li className="flex mt-6">
        <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
      <img 
        src="/images/66bd20b15f0d9108f1af0809_Group%202087326444.png" 
        alt="check icon" 
        className="absolute  w-[15px] h-[15px]"
      />
    </span>
    {texts.online?.notInterested || "Loading..."}

    </li>
  <li className="flex mt-8">
  <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
  <img 
        src="/images/66bd20b15f0d9108f1af0809_Group%202087326444.png" 
        alt="check icon" 
        className="absolute  w-[15px] h-[15px]"
      />
    </span>
    {texts.online?.notWillingToLearn || "Loading..."}

    </li>
  <li className="flex mt-8">
  <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
  <img 
        src="/images/66bd20b15f0d9108f1af0809_Group%202087326444.png" 
        alt="check icon" 
        className="absolute  w-[15px] h-[15px]"
      />
    </span>
    {texts.online?.noFinancialGoals || "Loading..."}

    </li>
  <li className="flex mt-8">
  <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
  <img 
        src="/images/66bd20b15f0d9108f1af0809_Group%202087326444.png" 
        alt="check icon" 
        className="absolute  w-[15px] h-[15px]"
      />
    </span>
    {texts.online?.noMoneyToInvest || "Loading..."}

    </li>
  <li className="flex mt-8">
  <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
  <img 
        src="/images/66bd20b15f0d9108f1af0809_Group%202087326444.png" 
        alt="check icon" 
        className="absolute  w-[15px] h-[15px]"
      />
    </span>
    {texts.online?.noTimeToInvest || "Loading..."}

    </li>
</ul>
      </div>
    </div>
  </div>
</div>



<div className="part5 w-full h-auto bg-[#041212] rounded-[20px] flex flex-col lg:flex-row justify-center items-center mt-[4rem] md:mt-[6rem] mb-10 px-4 lg:px-0">
  
  <div className="left-img w-full lg:w-[34rem] mt-[1.5rem] h-auto lg:mt-[6rem] mb-[2rem] lg:mb-[6rem]">
    <img src="/images/image.png" alt="dada" loading='lazy' className="w-full lg:w-auto" />
  </div>

  <div className="hidden md:block text text-[#ffff] lg:mt-5 lg:ml-[7rem]">
    <h1 className='text-[28px] lg:text-[40px] font-bold leading-[1.2] mb-5 text-center lg:text-left'>
    {texts.online?.easiestWay || "Loading..."}
    <br />
    {texts.online?.minimalTimeInvestment || "Loading..."} <br /> 
      <span className='text-[#0cdc6a] text-[28px] lg:text-[40px]'>
      {texts.online?.completelyFree || "Loading..."}      </span>
    </h1>

    <div className="descript lg:w-[50rem]  text-[#788886] text-[16px] lg:text-[16px] tracking-[-.32px] leading-[1.5] text-center lg:text-left">
    <span dangerouslySetInnerHTML={{ __html: texts.online?.dayTradingTrainingDescription }} />

      <img className='w-[155px] lg:w-[154px] mb-[4rem] mx-auto lg:mx-0' src="/images/66bd24f909b20f8f904dba08_tim%20signature.avif" alt="Tim Signature" />
    </div>
  </div>

  <div className="block md:hidden text text-[#ffff] lg:mt-5 lg:ml-[7rem]">
    <h1 className='text-[28px] lg:text-[40px] font-bold leading-[1.2] mb-5 text-center lg:text-left'>
    {texts.online?.easiestWay || "Loading..."}
  
    {texts.online?.minimalTimeInvestment || "Loading..."} <br /> 
      <span className='text-[#0cdc6a] text-[28px] lg:text-[40px]'>
      {texts.online?.completelyFree || "Loading..."}      </span>
    </h1>

    <div className="descript lg:w-[50rem]  text-[#788886] text-[16px] lg:text-[16px] tracking-[-.32px] leading-[1.5] text-center lg:text-left">
    <span dangerouslySetInnerHTML={{ __html: texts.online?.dayTradingTrainingDescription }} />

      <img className='w-[155px] lg:w-[154px] mb-[4rem] mx-auto lg:mx-0' src="/images/66bd24f909b20f8f904dba08_tim%20signature.avif" alt="Tim Signature" />
    </div>
  </div>
</div>

<div className="part6 py-5 px-4 lg:py-16">
  <div className="part6-1 flex flex-col lg:flex-row justify-between items-start max-w-7xl mx-auto">
  <h1 className="hidden lg:block text-[40px] font-bold text-black leading-[1.2] mb-6 lg:mb-0">
  <div className="text-[24px] font-bold" dangerouslySetInnerHTML={{ __html: texts.online?.faq2 }} />
  </h1>
<h1 className="block lg:hidden text-[28px] font-bold text-black leading-[1.2] mb-10 lg:mb-0">
{texts.online?.faq || "Loading..."}</h1>



   
    {/* FAQ Section */}
    <div className="columns-click w-full lg:w-[38rem] px-1">
    {texts?.online?.faqs?.map((faq, index) => (
        <div 
          key={index} 
          className="bg-white mb-4 p-4 rounded-lg shadow-lg cursor-pointer" 
          onClick={() => toggleAccordion(index)}  
        >
          <div className="flex justify-between items-center relative">
            <h2 className="text-sm lg:text-[15px] tracking-[.18px] p-1 text-black font-[600]">
              {faq.question}
            </h2>

            <div className="container">
              <input type="checkbox" checked={activeIndex === index} readOnly />
              <div className="line"></div>
              <div className={`line line-indicator ${activeIndex === index ? 'active' : ''}`}></div>
            </div>
          </div>

          {activeIndex === index && (
            <div className="mt-2 text-[#0006] text-xs lg:text-[14px] p-2 leading-[160%]">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
</div>



<div className="part7 flex justify-center items-center w-full py-6">
  <div className="section3 part7-1 mb-[-19rem] flex flex-col md:flex-row items-start justify-between max-w-7xl w-full md:w-[85rem] rounded-[20px] mx-auto bg-white pb-[80px] py-[30px] px-[20px] md:px-[80px]">
  <div className="footer_blur hidden md:block"> </div>


    {/* Left Section */}
    <div className="left mt-[2rem] md:mt-[7rem] text-center md:text-left w-full md:w-auto">
      <h1 className="text-[28px] md:text-[44px] font-[600] leading-tight">
      {texts.online?.nurNochEinSchritt || "Loading..."} <span className="text-[#0cdc6a]">{texts.online?.nurNochEinSchritt2 || "Loading..."}</span>...
      </h1>

      <div className="description lg:w-[37rem] text-[15px] md:text-[16px] text-[#728291] leading-relaxed mt-3">
      {texts.online?.transformYourselfToAdvanced || "Loading..."} <br className="hidden md:inline" />
     
      
       </div>

      {/* Button Section */}
      <div className="relative z-[1000] text-[#000] hidden md:block">
      <Button />
  <div className="flex items-center justify-start  mb-[2rem] mt-[2rem] sm:mt-[1rem]">
          <img
        src="/images/66d71361e6381ef5a1d07c03_avatars%202k.png"
        alt="Avatar"
            width={114}
            height={30.19}
          />
          <div className="text-people ml-3 mt-1 text-black text-[12px]  sm:text-[11px]">
          <div dangerouslySetInnerHTML={{ __html: texts.online?.orders || "Loading..." }} />
          </div>
        </div>
        
</div>

     
</div>


    {/* Right Section */}
    <div className="right mt-[2rem] md:mt-[4rem] w-full md:w-auto">



      
     <img className="w-full md:w-[518px] h-auto mx-auto md:mx-0 relative  md:block" src="/images/imageMusk-Bezos.png" alt="" />
  {/*  <img className="w-full md:w-[518px] h-auto mx-auto md:mx-0 relative block md:hidden" src="/images/66bddb6c5a17773ef43ca625_new 4-p-500.png" alt="" /> */}
{/* <div className="absolute bottom-[117.9rem] lg:bottom-[83.4rem]">
<img className="w-[200px]" src="/images/66bddb6c5a17773ef43ca625_new%204.avif" alt="" />

</div>
<div className="img-foot absolute bottom-[90rem] left-[12rem] lg:bottom-[59.5rem] lg:left-[81.5rem]">
<img className="w-[200px]" src="/images/66bdc35512c1734c225b3e8b_5.avif" alt="" />

</div>  */}
<div className="footer_blur1 block lg:hidden"></div>



    </div>
    <div className="relative z-[1000] text-[#000] block md:hidden"> 
  <Button />
  <div className="flex items-center justify-start mb-[4rem] mt-[2rem] sm:mt-[1rem]">
    <img
        src="/images/66d71361e6381ef5a1d07c03_avatars%202k.png"
        alt="Avatar"
      width={114}
      height={30.19}
    />
    <div className="text-people ml-4 text-black text-[12px] sm:text-[11px]">
    <div dangerouslySetInnerHTML={{ __html: texts.online?.orders || "Loading..." }} />
    </div>
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
<a href="/">
  <img
    src="/images/logo-white.svg"
    alt="Logo"
    width={140}
    height={32}
  />
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
    {texts.online?.allrightsreserved || 'Loading...'}



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








      <style jsx>{`
        @keyframes moveInteraction {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-interaction {
          animation: moveInteraction 3s linear infinite;
        }
      `}</style>



</div>


 
    </main>



  );
}

export default Home;
