"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import useGeolocation from '../../hooks/useGeolocation';
import Button from './Button';
// import Header from './Header';




function Datenschutz() { 
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
      case "SV": 
        loadTranslations('sv');
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
        <a href="/">
  <img
    src="/images/logo-blakc.svg"
    alt="Logo"
    className="w-[120px] h-auto sm:w-[115px]"  
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
              <main className="max-w-3xl mx-auto mt-[5rem] lg:mt-[10rem] relative z-10">
                  <h1 className="text-5xl text-black font-bold mb-8">          <div dangerouslySetInnerHTML={{ __html: texts.online?.title || "Loading..." }} />
                  </h1>
                  <section className="text-lg text-[#00000066] leading-relaxed space-y-6">
                    <img className='w-[300px] h-auto' src="/images/6601dc8887b1e34f1fff3fab_erecht24-siegel-datenschutz-rot-gross-322x420-1 (1).png" alt="" />
                      <p className="text-black">
                          <strong>            
                            {texts.online?.first || "Loading..."} 

                          </strong>
                          
                          <br />
                          <br />
                          {texts.online?.desc || "Loading..."}    
                                      
                          </p>

                  


                      <p className="text-black">
                      {texts.online?.desc2 || "Loading..."}    
                        
                     </p>
                     <p className="text-black">
                      {texts.online?.desc3 || "Loading..."}    
                        
                     </p>   <p className="text-black">
                      {texts.online?.desc4 || "Loading..."}    
                        
                     </p>   <p className="text-black">
                      {texts.online?.desc5|| "Loading..."}    
                        
                     </p>   <p className="text-black">
                      {texts.online?.desc6 || "Loading..."}    
                        
                     </p>   <p className="text-black">
                      {texts.online?.desc7 || "Loading..."}    
                        
                     </p>   <p className="text-black">
                      {texts.online?.desc8 || "Loading..."}    
                        
                     </p>   <p className="text-black">
                      {texts.online?.desc9 || "Loading..."}    
                        
                     </p>   <p className="text-black">
                      {texts.online?.desc10 || "Loading..."}    
                        
                     </p>   <p className="text-black">
                      {texts.online?.desc11 || "Loading..."}    
                        
                     </p>   <p className="text-black">
                      {texts.online?.desc12 || "Loading..."}    
                        
                     </p>   <p className="text-black">
                      {texts.online?.desc13 || "Loading..."}    
                        
                     </p>   
                     <p className="text-black">
                      {texts.online?.desc14 || "Loading..."}    
                        
                     </p >
                     <p className="text-black">
                      {texts.online?.desc15 || "Loading..."}    
                        
                     </p>
                     <p className="text-black">
                      {texts.online?.desc16 || "Loading..."}    
                        
                     </p>

                    
                      {texts.online?.desc17 || "Loading..."}    


<br />
<br />
                      <strong>

                      {texts.online?.Hosting || "Loading..."}    

                      </strong>


                    
                      <p className="text-black">{texts.online?.desc19 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc20 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc21 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc22 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc23 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc24 || "Loading..."}</p>
                       <br />
                      <strong>
                      <p className="text-black">{texts.online?.Allgemeine || "Loading..."}</p> 
                      
                       </strong>

                      <p className="text-black">{texts.online?.desc26 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc27 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc28 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc29 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc30 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc31 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc32 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc33 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc34 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc35 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc36 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc37 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc38 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc39 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc40 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc41 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc42 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc43 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc44 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc45 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc46 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc47 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc48 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc49 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc50 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc51 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc52 || "Loading..."}</p>
                      <p dangerouslySetInnerHTML={{ __html: texts.online?.desc53 || "Loading..." }}></p>
                      <p dangerouslySetInnerHTML={{ __html: texts.online?.desc54 || "Loading..." }}></p>
                      <p dangerouslySetInnerHTML={{ __html: texts.online?.desc55 || "Loading..." }}></p>
                      <p dangerouslySetInnerHTML={{ __html: texts.online?.desc56 || "Loading..." }}></p>
                      <p className="text-black">{texts.online?.desc57 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc58 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc59 || "Loading..."}</p>
 <br />

                     <strong>

                     <p className="text-black">{texts.online?.Datenefassung || "Loading..."}</p>


                     </strong>
                      <p className="text-black">{texts.online?.desc60 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc61 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc62 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc63 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc64 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc65 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc66 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc67 || "Loading..."}</p>
                      <p className="text-black" dangerouslySetInnerHTML={{ __html: texts.online?.desc68 || "Loading..." }}></p>
                      <p className="text-black" dangerouslySetInnerHTML={{ __html: texts.online?.desc69 || "Loading..." }}></p>
                      <p className="text-black" dangerouslySetInnerHTML={{ __html: texts.online?.desc70 || "Loading..." }}></p>
                      <p className="text-black" dangerouslySetInnerHTML={{ __html: texts.online?.desc71 || "Loading..." }}></p>
                      <p className="text-black" dangerouslySetInnerHTML={{ __html: texts.online?.desc72 || "Loading..." }}></p>
                      <p className="text-black">{texts.online?.desc73 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc74 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc75 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc76 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc77 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc78 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc79 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc80 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc81 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc82 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc83 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc84 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc85 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc86 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc87 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc88 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc89 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc90 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc91 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc92 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc93 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc94 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc95 || "Loading..."}</p>
                      <br />

<strong>

<p className="text-black">{texts.online?.Analyse || "Loading..."}</p>


</strong>
                      <p className="text-black">{texts.online?.desc96 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc97 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc98 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc99 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc100 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc101 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc102 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc103 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc104 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc105 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc106 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc107 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc108 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc109 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc110 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc111 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc112 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc113 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc114 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc115 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc116 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc117 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc118 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc119 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc120 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc121 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc122 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc123 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc124 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc125 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc126 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc127 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc128 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc129 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc130 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc131 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc132 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc133 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc134 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc135 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc136 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc137 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc138 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc139 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc140 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc141 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc142 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc143 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc144 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc145 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc146 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc147 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc148 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc149 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc150 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc151 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc152 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc153 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc154 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc155 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc156 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc157 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc158 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc159 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc160 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc161 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc162 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc163 || "Loading..."}</p>

                      <br />
                      <strong>
                      <p className="text-black">{texts.online?.newsletter || "Loading..."}</p>
                      </strong>

                      <p className="text-black">{texts.online?.desc164 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc165 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc166 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc167 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc168 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc169 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc170 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc171 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc172 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc173 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc174 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc175 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc176 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc177 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc178 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc179 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc180 || "Loading..."}</p>
                      <br />
                      <strong>
                      <p className="text-black">{texts.online?.plugins || "Loading..."}</p>
                      </strong>
                      <p className="text-black">{texts.online?.desc181 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc182 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc183 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc184 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc185 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc186 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc187 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc188 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc189 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc190 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc191 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc192 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc193 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc194 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc195 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc196 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc197 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc198 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc199 || "Loading..."}</p>
                      <br />
                      <strong>
                      <p className="text-black">{texts.online?.online || "Loading..."}</p>
                      </strong>
                      <p className="text-black">{texts.online?.desc200 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc201 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc202 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc203 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc204 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc205 || "Loading..."}</p>
                      <br />
                      <strong>
                      <p className="text-black">{texts.online?.Zahlung || "Loading..."}</p>
                      </strong>
                      <p className="text-black">{texts.online?.desc206 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc207 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc208 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc209 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc210 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc211 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc212 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc213 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc214 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc215 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc216 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc217 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc218 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc219 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc220 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc221 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc222 || "Loading..."}</p>
                      <br />
                      <strong>
                      <p className="text-black">{texts.online?.webinare || "Loading..."}</p>
                      </strong>
                      <p className="text-black">{texts.online?.desc223 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc224 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc225 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc226 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc227 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc228 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc229 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc230 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc231 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc232 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc233 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc234 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc235 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc236 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc237 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc238 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc239 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc240 || "Loading..."}</p>
                      <br />
                      <strong>
                      <p className="text-black">{texts.online?.telefontermine || "Loading..."}</p>
                      </strong>
                      <p className="text-black">{texts.online?.desc241 || "Loading..."}</p>
                      <br />
                      <strong>
                      <p className="text-black">{texts.online?.CRM || "Loading..."}</p>
                      </strong>
                      <p className="text-black">{texts.online?.desc242 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc243 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc244 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc245 || "Loading..."}</p>
                      <p className="text-black">{texts.online?.desc246 || "Loading..."}</p>
                      <br />
                      <strong>
                      <p className="text-black">{texts.online?.smsfactor || "Loading..."}</p>
                      </strong>
                      <p className="text-black">{texts.online?.desc247 || "Loading..."}</p>
                     
            
                        
                    

                   
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
