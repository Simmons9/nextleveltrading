"use client";

import React, { useState, useEffect } from "react";
import Button from "./assets/Button";
import Cards from "./assets/Cards";
import Tag from "./assets/Tag";
import Datenschutz from "./assets/Datenschutz";
import Impressum from "./assets/Impressum";
import Risikohinweis from "./assets/Risikohinweis";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import Image from "next/image";

function Home() {
  const [country, setCountry] = useState(null);
  const [texts, setTexts] = useState({});
  const [affiliateParams, setAffiliateParams] = useState({
    ai: "2958033",
    gi: "23",
    ci: "4",
    altid: "",
    oi: "",
    rd: "3",
  });
  const [activeIndex, setActiveIndex] = useState(null);
  const [showColumns, setShowColumns] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      console.log("window.location.search:", search);
      const params = new URLSearchParams(search);
      const newParams = {
        ai: params.get("ai") || "2958033",
        altid: params.get("altid") || "",
        gi: params.get("gi") || "23",
        oi: params.get("oi") || "",
        ci: params.get("ci") || "4",
        rd: params.get('rd') || "3",
      };
      console.log("Updating affiliateParams to:", newParams);
      setAffiliateParams(newParams);
    }
  }, []);

  const fetchLocation = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
      const response = await fetch(`https://ipinfo.io/json?token=${token}`);
      const data = await response.json();
      return data.country;
    } catch (error) {
      console.error("Failed to fetch location", error);
      return "DE";
    }
  };

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
      DE: "de",
      AT: "de",
      US: "en",
      GB: "en",
      CA: "en",
      AU: "en",
      NZ: "en",
      PT: "pt",
      BR: "pt",
      FR: "fr",
      CH: "fr",
      LU: "fr",
      NL: "nl",
      BE: "nl",
      IT: "it",
      SV: "sv",
      ES: "es",
    };
    const loadTranslations = async (langCode) => {
      try {
        const translations = await import(`../../public/translations/${langCode}.json`);
        setTexts(translations.default || translations);
      } catch (error) {
        console.error(`Could not load translations for ${langCode}:`, error);
      }
    };
    loadTranslations(languageMap[country] || "de");
  }, [country]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleToggleColumns = () => {
    setShowColumns((prevState) => !prevState);
  };
  
  return (
    <main className="relative" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <div className="light-bg"  style={{ fontFamily: "'Outfit', sans-serif" }}>
        <div className="bg-white">
        <header className="w-full max-w-[80rem] h-[5rem] py-1 bg-[#fff] mx-auto sm:h-[3.8rem]">
  <nav className="flex justify-between items-center  h-full px-4">
    <div className="left-imagess">
    <a href="/">
  <Image
    src="/images/logo-blakc.svg"
    alt="Logo"
    width={120} 
    height={0} 
    className="h-auto sm:w-[140px]"
  />
</a>
    </div>

    <div className="right-images flex items-center">
  <Image
    src="/images/66d71361e6381ef5a1d07c03_avatars%202k.png"
    alt="Avatar"
    width={118} 
    height={0} 
    className="h-auto sm:w-[114px] lg:mr-0 mr-[-5rem]"
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
    {texts.online?.treading}

      </div>
  <h1
  className="title-top text-center text-black text-[32px] sm:text-[32px] font-bold tracking-[-.7px] leading-[1.1] mt-6 sm:leading-[1.1] md:text-[56px] fadeInUp"
  style={{ animationDelay: "0.2s", fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}
>
<div dangerouslySetInnerHTML={{ __html: texts.online?.learnTrading }} />
</h1>




  <div
    className="desc1 text-center w-[90%] max-w-[60rem] text-[14px] sm:text-[16px] text-[#728291] tracking-[-.32px] leading-[1.5] my-4 px-4 sm:tracking-[.2px] sm:px-2 fadeInUp"
    style={{ animationDelay: "0.4s" }}
  >
       <div>{texts.online?.description2}</div>

  </div>

  <div className="relative z-[1000]">

  <Button
      buttonText={texts.online?.downloadButton || "Loading..."} // Fallback to "Download" if not found
      ai={affiliateParams.ai}
      gi={affiliateParams.gi}
      ci={affiliateParams.ci}
      altid={affiliateParams.altid}
      oi={affiliateParams.oi}
      rd={affiliateParams.rd}
      texts={texts}
    />



<div className="flex items-center justify-center mt-[1rem] fadeInUp" style={{ animationDelay: "0.8s" }}>
  <Image
    src="/images/66d71361e6381ef5a1d07c03_avatars%202k.png"
    alt="Avatar"
    width={114}
    height={30}
    className="h-auto"
  />
  <div className="text-people ml-4 text-black text-[12px] sm:text-[10px]">
    <div dangerouslySetInnerHTML={{ __html: texts.online?.downloads }} />
  </div>
</div>

  </div>


  </div>



        

  <Image
  src="/images/66d7215fe0a981366df06f3c_Group 2087326459-p-2600.png"
  alt="Large banner"
  width={2600}
  height={600}
  className="absolute top-[5rem] md:top-[3.8rem] inset-0 w-full h-[500px] sm:h-[500px] md:h-[600px] object-cover z-10 opacity-100 bg-gray-80"
/>



<div className="relative z-10 mt-[2rem] sm:mt-[3rem] fadeInUp flex justify-center" style={{ animationDelay: "0.9s" }}>
  <Image
    className="images1 h-auto object-cover relative w-[50%] sm:w-[60%] md:w-[70%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
    src="/images/image1.png"
    alt="New Image"
    width={800} 
    height={600} 
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









<div className="grid grid-cols-2 sm:w-[80%] md:grid-cols-6 md:w-[70%] lg:w-[190%] xl:w-[73%] m-auto">
  <Image className="h-[3rem] w-full object-contain" src="/images/l1.png" alt="Logo 1" width={100} height={48} />
  <Image className="h-[3rem] w-full object-contain" src="/images/l2.png" alt="Logo 2" width={100} height={48} />
  <Image className="h-[3rem] w-full object-contain" src="/images/l3.png" alt="Logo 3" width={100} height={48} />
  <Image className="h-[3rem] w-full object-contain" src="/images/l4.png" alt="Logo 4" width={100} height={48} />
  <Image className="h-[3rem] w-full object-contain" src="/images/l5.png" alt="Logo 5" width={100} height={48} />
  <Image className="h-[3rem] w-full object-contain" src="/images/l6.png" alt="Logo 6" width={100} height={48} />
</div>


<div className="Tradingdeine w-full h-auto mt-[5rem] px-4 mb-[5rem] flex flex-col items-center">
  <h1 className="w-[23.9rem] sm:w-[42.24rem] font-bold text-[34px] sm:text-[45px] tracking-[.4px] leading-[1.2] text-center fadeInUp" style={{ animationDelay: "0.9s" }}>
  <div>{texts.online?.lifeChange}</div>
  <span className="text-[#0cdc6a] fadeInUp ml-2" style={{ animationDelay: "0.9s" }}>{texts.online?.lifeChange2 }</span>
  </h1>

  <div className="desc flex justify-center mt-4 text-[#728291] text-[16px] sm:text-[16px] fadeInUp" style={{ animationDelay: "0.9s" }}>
  <div>{texts.online?.timeInvestment}</div>
  </div>

  <Cards />
</div>

<div className="part3 w-full h-auto bg-[#041212] pt-[3rem] text-[#fff] flex flex-col items-center rounded-2xl">

<div className="text-[12px] flex justify-center mx-auto font-bold bg-[#fefefe0f] h-auto py-2 rounded-2xl px-3 items-center uppercase mt-4">
    <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
    <div>{texts.online?.tradingCourse}</div>
</div>



<div className="Tradingdeine w-full h-auto mt-[2rem] px-4 flex flex-col items-center">
  <h1 className="w-[23.9rem] sm:w-[46.24rem] font-bold text-[34px] mb-[-1rem] sm:text-[45px] tracking-[.4px] leading-[1.2] text-center fadeInUp" style={{ animationDelay: "0.9s" }}>
  <div>{texts.online?.successTrader}</div>
  </h1>


</div>




<Tag />

{!showColumns && (
  <div className="w-full h-auto mt-10 flex justify-center mb-[1.5rem] md:mb-[4rem]">
    <div
      onClick={handleToggleColumns}
      className="button flex items-center justify-between w-[20rem] bg-[#69bc8f26] font-[600] rounded-[10px] p-[20px] m-auto cursor-pointer"
      style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
    >
      <p className="mr-2">{texts.online?.Mehr || "Mehr"}</p>
      <div className="icon-create w-[24px] h-[24px]">
        <Image
          src="/images/66bdc762139d5d2dbcb2c74c_Add box.png"
          alt="Add Box"
          width={24}
          height={24}
        />
      </div>
    </div>
  </div>
)}
{showColumns && (
  <>
    <div className="column-add px-5">
      <div className="flex flex-wrap justify-center gap-3">
        {/* Column 1 */}
        <div
          className="column w-full md:w-[40rem] h-auto p-[20px] bg-[#fefefe08] mb-[2.5rem] md:mb-3 sm:mb-[3rem] relative rounded-[10px]"
          style={{ border: "1px solid #ffffff0d" }}
        >
          <Image
            className="w-full h-auto object-cover sm:h-[250px] md:h-auto"
            src="/images/66d70f4263b1d68278be1fe5_Group 2087326667.png"
            alt=""
            width={800}
            height={400}
            layout="responsive"
          />
<div className="on_the_trader relative z-[20] mt-[3rem] md:mt-0"> 
<div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
{texts.online?.chapter4}
</div>
        <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
        {texts.online?.marketStructures}
        </div>
        <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2 mb-[-1rem]">
        {texts.online?.technicalAnalysis}
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
        <Image
          className="imgtog5 w-auto h-auto"
          src="/images/66bdcaea1657996322be914b_U.avif"
          alt=""
          width={500} 
          height={500} 
          layout="intrinsic" 
        />
          <div className="on_the_trader relative z-[20] mt-[-1.7rem] md:mt-[-8.7rem] ">
          <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
          {texts.online?.chapter5}
            </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            {texts.online?.riskManagement}
            </div>
            <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
            {texts.online?.riskManagementDescription}
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
        <Image
          className="imgtog5 w-auto h-auto"
          src="/images/66d70fe18435ec9fd92ece3a_Group%202087326431.png"
          alt=""
          width={500} 
          height={500} 
          layout="intrinsic" 
        />
          <div className="on_the_trader relative z-[20] mt-[-1.7rem] md:mt-[-8.7rem] ">
          <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
          {texts.online?.chapter6}
          </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            {texts.online?.strategy}
            </div>
            <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
            <div dangerouslySetInnerHTML={{ __html: texts.online?.checklistDefinition }} />

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
        <Image
          className="imgtog5 w-auto h-auto"
          src="/images/66bdcaea186d4f1e46c729f4_Frame%202087326564.avif"
          alt=""
          width={500} 
          height={500} 
          layout="intrinsic" 
        />
          <div className="on_the_trader relative z-[20] mt-[1rem] md:mt-[-3rem] ">
          <div className="tag text-[12px] text-[#041212] uppercase bg-[#14f97b] font-bold leading-[1] p-[10px] w-[3.5rem] rounded-2xl">
          {texts.online?.chapter7}

            </div>
            <div className="h3 text-[#fff] tracking-[0] font-[500] leading-[1.2] text-[24px] mt-3">
            {texts.online?.traderPath}
            </div>
            <div className="description text-[#788886] tracking-[-.28px] text-[14px] leading-[1.5] mt-2">
            {texts.online?.incomeLimits}
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
    <Button
      buttonText={texts.online?.downloadButton1 || "Loading..."} // Fallback to "Download" if not found
      ai={affiliateParams.ai}
      gi={affiliateParams.gi}
      ci={affiliateParams.ci}
      altid={affiliateParams.altid}
      oi={affiliateParams.oi}
      rd={affiliateParams.rd}
      texts={texts}
    />


<div className="flex items-center justify-center mb-[2.5rem] mt-[2rem] sm:mt-[1rem]">
  <Image
    src="/images/66d71361e6381ef5a1d07c03_avatars%202k.png"
    alt="Avatar"
    width={114}
    height={30.19}
  />
  <div className="text-people ml-4 text-white text-[12px] sm:text-[10px]">
    <div dangerouslySetInnerHTML={{ __html: texts.online?.downloads || "Loading downloads..." }} />
  </div>
</div>

      </div>
  </>
)}



</div>

<div className="part3 bg-gradient-[#f1f3f5, #fff]">
<div className="mt-[6rem] flex justify-center items-center space-x-2">
  <p className="text-[18px]">{texts.online?.Hervorragend}</p>

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


  <p className="font-medium text-[14px] hidden md:flex">{texts.online?.Bewertungen}</p>

  <div className="items-center hidden md:flex">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00B67A" className="w-6 h-6 ml-1">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
    <p className="font-semibold text-[14px] text-center ml-1">{texts.online?.Trustpilot}</p>
  </div>
</div>




  <div className="flex flex-wrap justify-center gap-4 w-[100%] h-auto mt-[2.5rem] z-0 px-5">
  <div className="relative flex flex-col items-start rounded-[12px] pr-[32px] pl-[32px] bg-[#fff] p-4 pt-[2rem] w-[25.5rem] h-auto text-[28px] tracking-[.35px] leading-[100%] font-[600]">
    <span className="text-[#0ec661]">{texts.online?.number}</span> 
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.satisfied}</span>
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.participants}</span>
    
    <Image
  src="/images/image2.png"
  alt=""
  className="mt-[1rem] object-cover bg-contain bg-repeat"
  width={432} 
  height={170} 
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
    <span className="block text-[28px]  tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem] z-10">{texts.online?.moreThan}</span>
    <span className="text-[#0ec661] relative z-10">{texts.online?.topExperts}</span> 
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem] relative z-10">{texts.online?.onTeam}</span>
    

    <Image
  src="/images/image3.png"
  alt=""
  className="hidden md:block w-auto h-[200px] object-cover z-0 bg-contain bg-repeat ml-[-2rem] md:mr-2 mt-[-2.3rem] md:mt-[-6.3rem] md:w-[820.33px] md:h-[300px]"
  style={{ backgroundImage: '100%' }}
  width={820} 
  height={300} 
/>

<Image
  src="/images/image3.png" 
  alt=""
  className="block md:hidden w-auto h-auto object-cover z-0 bg-contain mt-[0.2rem] bg-repeat ml-[-1rem] md:mr-2 md:mt-[-6.3rem] md:w-[820.33px] md:h-[300px]"
  style={{ backgroundImage: '100%' }}
  width={820} 
  height={300}
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

    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem] z-20">{texts.online?.weAre}</span>
    <span className="text-[#0ec661] z-20">{texts.online?.german}</span> 
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem] z-20">{texts.online?.company}</span>
    
    <img
      src="/images/664cd3ac78e980e08b45322e_272326.webp"
      alt=""
      className="mt-[-5rem] object-cover bg-contain bg-repeat relative z-10"
      style={{ backgroundImage: '100%' }}
    />

    <img className='absolute bottom-[5rem] rounded-[25px] z-20 w-[260px]' src="/images/photo_2024-11-05_17-55-42.jpg" alt="daytrading" />
    
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
    <span className="text-[#0ec661]">{texts.online?.number2}</span> 
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.conducted}</span>
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.trades}</span>
    
    <Image
  src="/images/6601dc8887b1e34f1fff3f5f_frame-numbers-p-500.webp"
  alt=""
  className="mt-[2rem] object-cover bg-contain bg-repeat w-[27rem] h-[10.1rem]"
  style={{ backgroundImage: '100%' }}
  width={540}
  height={202}
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
    <span className="text-[#0ec661]">{texts.online?.fifteenYears}</span> 
    {/* <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.trading}</span> */}
    <span className="block text-[28px] tracking-[.35px] leading-[100%] font-[600] mt-[0.5rem]">{texts.online?.experience}</span>
    <Image
  src="/images/6601dc8_Frame-p-500.png"
  alt="aae"
  className="mt-[4.1rem] object-cover bg-contain bg-repeat w-[28rem] h-[11.1rem]"
  style={{ backgroundImage: '100%' }}
  width={560}
  height={222}
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
      {texts.online?.recognizeYourself}
          </div>

    <div className="title1 text-center text-black text-[40px] tracking-[.7px] font-bold leading-[1.1] mt-6">
    {texts.online?.whoIsTrainingFor}
    </div>

    <div className="flex flex-wrap justify-center items-start w-full h-auto mt-10 gap-6">
    <div className="w-[32rem] bg-[#fff] pt-3 rounded-[20px] h-auto">
  <div className="button1 bg-[#0cdc6a] text-[#ffffff] font-bold pt-[15px] pb-[15px] text-[20px] items-center text-center rounded-[10px]">
    {texts.online?.hundredPercentCorrect}
  </div>
  <ul className="list-inside list-none m-5 md:m-10 text-[16px] text-[#728291]">
    {[
      texts.online?.interestedInTrading,
      texts.online?.wantToLearnNewSkills,
      texts.online?.wantFinancialFreedom,
      texts.online?.readyToInvest,
      texts.online?.willingToLearn,
    ].map((text, index) => (
      <li className="flex mt-[2rem]" key={index}>
        <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
          <img
            src="/images/image6.png"
            alt="check icon"
            className="w-[30px] h-[30px]" // Set fixed size without absolute positioning
          />
        </span>
        {text}
      </li>
    ))}
  </ul>
</div>

      
      <div className="w-[32rem] bg-[#fff] pt-3 rounded-[20px] h-auto">
        <div className="button1 bg-[#ff0000] text-[#ffffff] font-bold pt-[15px] pb-[15px] text-[20px] items-center text-center rounded-[10px] ">
        {texts.online?.definitelyNot}
        </div>
        <ul className="list-inside list-none m-5 md:m-10 text-[16px] text-[#728291]">
        <li className="flex mt-6">
        <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
        <Image
          src="/images/66bd20b15f0d9108f1af0809_Group%202087326444.png"
          alt="check icon"
          className="absolute w-[15px] h-[15px]"
          width={15}
          height={15}
/>

    </span>
    {texts.online?.notInterested}

    </li>
  <li className="flex mt-8">
  <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
  <Image
      src="/images/66bd20b15f0d9108f1af0809_Group%202087326444.png"
      alt="check icon"
      className="absolute w-[15px] h-[15px]"
      width={15}
      height={15}
    />

    </span>
    {texts.online?.notWillingToLearn}

    </li>
  <li className="flex mt-8">
  <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
  <Image
  src="/images/66bd20b15f0d9108f1af0809_Group%202087326444.png"
  alt="check icon"
  className="absolute w-[15px] h-[15px]"
  width={15}
  height={15}
/>

    </span>
    {texts.online?.noFinancialGoals}

    </li>
  <li className="flex mt-8">
  <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
  <Image
  src="/images/66bd20b15f0d9108f1af0809_Group%202087326444.png"
  alt="check icon"
  className="absolute w-[15px] h-[15px]"
  width={15}
  height={15}
/>

    </span>
    {texts.online?.noMoneyToInvest}

    </li>
  <li className="flex mt-8">
  <span className="relative bg-[#f3ecea] rounded-full w-[30px] h-[30px] mr-2 flex items-center justify-center">
  <Image
  src="/images/66bd20b15f0d9108f1af0809_Group%202087326444.png"
  alt="check icon"
  className="absolute w-[15px] h-[15px]"
  width={15}
  height={15}
/>

    </span>
    {texts.online?.noTimeToInvest}

    </li>
</ul>
      </div>
    </div>
  </div>
</div>



<div className="part5 w-full h-auto bg-[#041212] rounded-[20px] flex flex-col lg:flex-row justify-center items-center mt-[4rem] md:mt-[6rem] mb-10 px-4 lg:px-0">
  
<div className="left-img w-full lg:w-[34rem] mt-[1.5rem] h-auto lg:mt-[6rem] mb-[2rem] lg:mb-[6rem]">
  <Image
    src="/images/image4.png"
    alt="dada"
    loading="lazy"
    className="w-full lg:w-auto"
    width={500} // Specify the width in pixels
    height={300} // Specify the height in pixels
  />
</div>



  <div className="hidden md:block text text-[#ffff] lg:mt-5 lg:ml-[7rem]">
    <h1 className='text-[28px] lg:text-[40px] font-bold leading-[1.2] mb-5 text-center lg:text-left'>
    {texts.online?.easiestWay}
    <br />
    {/* {texts.online?.minimalTimeInvestment} <br />  */}
      <span className='text-[#0cdc6a] text-[28px] lg:text-[40px]'>
      {texts.online?.completelyFree}    
        </span>
    </h1>

    <div className="descript lg:w-[50rem] text-[#788886] text-[16px] lg:text-[16px] tracking-[-.32px] leading-[1.5] text-center lg:text-left">
  <span dangerouslySetInnerHTML={{ __html: texts.online?.dayTradingTrainingDescription }} />

  <Image
    className='w-[155px] lg:w-[154px] mb-[4rem] mx-auto lg:mx-0'
    src="/images/66bd24f909b20f8f904dba08_tim%20signature.avif"
    alt="Tim Signature"
    width={155} // Specify the width in pixels
    height={50} // Specify the height in pixels
  />
</div>
  </div>

  <div className="block md:hidden text text-[#ffff] lg:mt-5 lg:ml-[7rem]">
    <h1 className='text-[28px] lg:text-[40px] font-bold leading-[1.2] mb-5 text-center lg:text-left'>
    {texts.online?.easiestWay}
  
    {texts.online?.minimalTimeInvestment} <br /> 
      <span className='text-[#0cdc6a] text-[28px] lg:text-[40px]'>
      {texts.online?.completelyFree}      </span>
    </h1>

    <div className="descript lg:w-[50rem] text-[#788886] text-[16px] lg:text-[16px] tracking-[-.32px] leading-[1.5] text-center lg:text-left">
  <span dangerouslySetInnerHTML={{ __html: texts.online?.dayTradingTrainingDescription }} />

  <Image
    className='w-[155px] lg:w-[154px] mb-[4rem] mx-auto lg:mx-0'
    src="/images/66bd24f909b20f8f904dba08_tim%20signature.avif"
    alt="Tim Signature"
    width={155} // Specify the width in pixels
    height={50} // Specify the height in pixels
  />
</div>
  </div>
</div>

<div className="part6 py-5 px-4 lg:py-16">
  <div className="part6-1 flex flex-col lg:flex-row justify-between items-start max-w-7xl mx-auto">
  <h1 className="hidden lg:block text-[40px] font-bold text-black leading-[1.2] mb-6 lg:mb-0">
  <div className="text-[24px] font-bold" dangerouslySetInnerHTML={{ __html: texts.online?.faq2 }} />
  </h1>
<h1 className="block lg:hidden text-[28px] font-bold text-black leading-[1.2] mb-10 lg:mb-0">
{texts.online?.faq}</h1>



   
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
      {/* {texts.online?.nurNochEinSchritt} <span className="text-[#0cdc6a]">{texts.online?.nurNochEinSchritt2}</span>... */}
     {/* <span>{texts.online?.nurNochEinSchritt2}</span> */}
     <div className='' dangerouslySetInnerHTML={{ __html: texts.online?.nurNochEinSchritt2  }} />


      </h1>

      <div className="description lg:w-[37rem] text-[15px] md:text-[16px] text-[#728291] leading-relaxed mt-3">
      {/* {texts.online?.transformYourselfToAdvanced} <br className="hidden md:inline" /> */}
      <div className='hidden md:inline'
       dangerouslySetInnerHTML={{ __html: texts.online?.transformYourselfToAdvanced  }} />

       

      
       </div>

      {/* Button Section */}
      <div className="relative z-[1000] text-[#000] hidden md:block">
      <Button
      buttonText={texts.online?.downloadButton2} // Fallback to "Download" if not found
      ai={affiliateParams.ai}
      gi={affiliateParams.gi}
      ci={affiliateParams.ci}
      altid={affiliateParams.altid}
      oi={affiliateParams.oi}
      rd={affiliateParams.rd}
      texts={texts}
    />


<div className="flex items-center justify-start mb-[2rem] mt-[2rem] sm:mt-[1rem]">
  <Image
    src="/images/66d71361e6381ef5a1d07c03_avatars%202k.png"
    alt="Avatar"
    width={114}
    height={30.19}
  />
  <div className="text-people ml-3 mt-1 text-black text-[12px] sm:text-[11px]">
    <div dangerouslySetInnerHTML={{ __html: texts.online?.orders }} />
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
    <Button
      buttonText={texts.online?.downloadButton2} // Fallback to "Download" if not found
      ai={affiliateParams.ai}
      gi={affiliateParams.gi}
      ci={affiliateParams.ci}
      altid={affiliateParams.altid}
      oi={affiliateParams.oi}
      rd={affiliateParams.rd}
      texts={texts}
    />

<div className="flex items-center justify-start mb-[4rem] mt-[2rem] sm:mt-[1rem]">
    <img
        src="/images/66d71361e6381ef5a1d07c03_avatars%202k.png"
        alt="Avatar"
      width={114}
      height={30.19}
    />
    <div className="text-people ml-4 text-black text-[12px] sm:text-[11px]">
    <div dangerouslySetInnerHTML={{ __html: texts.online?.orders }} />
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
    <Image
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
          
        </Link>
      </li>
      <li>
        <Link href="/legal/impressum" className="hover:text-green-500">
          
        </Link>
      </li>
      <li>
        <Link href="/legal/risikohinweis" className="hover:text-green-500">
          
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
      {texts.online?.riskNotice}      </div>
      <div className="description-bottom text-[#ffffff8f] w-full font-[400] md:w-[100%] text-[13px] md:text-[14px]">
      {texts.online?.riskNoticeDetails} <br />
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
