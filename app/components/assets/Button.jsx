"use client";

import { useState, useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import useGeolocation from '../../hooks/useGeolocation';

const Button = ({ buttonText }) => {
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState('');
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
      case "AT":
        loadTranslations('de');
        break;
      case "US":
      case "GB":
      case "CA":
      case "AU":
      case "NZ":
        loadTranslations('en');
        break;
      case "PT":
      case "BR":
        loadTranslations('pt');
        break;
      case "FR":
      case "CH":
      case "LU":
        loadTranslations('fr');
        break;
      case "NL":
      case "BE":
        loadTranslations('nl');
        break;
      case "IT":
        loadTranslations('it');
        break;
      case "SV":
        loadTranslations('sv');
        break;
      case 'ES':
        loadTranslations('es');
        break;
      default:
        loadTranslations('de');
    }
  }, [country]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="relative">
        <div
          onClick={handleOpenModal}
          className="button bg-[#13f97b] sm:text-[16px] mt-[2rem] h-20 w-auto rounded-lg p-4 cursor-pointer flex items-center justify-between text-[13px] font-[600] transition-all duration-500 ease-in-out shadow-[0_24px_32px_-20px_rgba(19,249,123,0)] hover:scale-105 relative overflow-hidden z-50"
        >
          <div className="btn-text w-full text-center">{buttonText}</div>
          <div className="btn-arrow-icon">
            <img
              src="https://cdn.prod.website-files.com/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3e88_arrow-right%201.svg"
              alt="Arrow"
            />
          </div>
          <div className="interaction absolute top-0 left-0 h-full w-full animate-interaction pointer-events-none">
            <img
              className="h-full w-full object-cover"
              src="https://cdn.prod.website-files.com/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3f53_Rectangle%203404.webp"
              alt="interaction"
              loading="lazy"
              sizes="(max-width: 100px), 200.998046875px"
              srcSet="https://cdn.prod.website-files.com/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3f53_Rectangle%25203404-p-500.png 500w, https://cdn.prod.website-files.com/6601dc8887b1e34f1fff3e59/6601dc8887b1e34f1fff3f53_Rectangle%203404.webp 654w"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] backdrop-blur-md p-5">
          <div className="bg-white relative rounded-[20px] p-8 w-full max-w-lg lg:mx-0 z-[1001]">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4"
              onClick={handleCloseModal}
            >
              <img
                className="text-[#fff] h-[20px] w-[20px]"
                src="/images/66bd20b15f0d9108f1af0809_Group 2087326444.png"
                alt="Close"
                style={{ filter: "grayscale(1)" }}
              />
            </button>

            {/* Forma Juaj */}
            <h1 className="form text-[24px] text-center font-bold mb-6 leading-[1.5]">
              {texts.online?.justOneStep || "Nur noch ein Schritt..."}
            </h1>
            <form
  action="https://submit.jotform.com/submit/250456892999378" // Zëvendëso me URL-në e dërgimit të JotForm
  method="POST"
>
  {/* Emri */}
  <input
    type="text"
    name="q3_firstName" // Emri i fushës në JotForm
    placeholder={texts.online?.firstNamePlaceholder || "Emri..."}
    className="block w-full mb-4 rounded-[10px] text-[16px] bg-[#edf1f6] p-[18px]"
    required
  />

  {/* Mbiemri */}
  <input
    type="text"
    name="q4_lastName" // Emri i fushës në JotForm
    placeholder={texts.online?.lastNamePlaceholder || "Mbiemri..."}
    className="block w-full mb-4 rounded-[10px] text-[16px] bg-[#edf1f6] p-[18px]"
    required
  />

  {/* Email */}
  <input
    type="email"
    name="q6_email" // Emri i fushës në JotForm
    placeholder={texts.online?.emailPlaceholder || "Email..."}
    className="block w-full mb-4 rounded-[10px] text-[16px] bg-[#edf1f6] p-[18px]"
    required
  />

  {/* Numri i Telefonit */}
  <div className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[15px] relative z-[1001]">
    <PhoneInput
      country={'de'} // Vendosni kodin e shtetit si parazgjedhje
      value={phone}
      onChange={setPhone}
      containerClass="w-full"
      inputStyle={{
        width: '90%',
        backgroundColor: '#edf1f6',
        border: 'none',
        fontSize: '16px',
        padding: '18px',
        borderRadius: '10px',
        marginLeft: "43px",
        zIndex: "1001",
      }}
      inputProps={{
        required: true,
        placeholder: texts.online?.telefonnumer || "Telefoni...",
      }}
      disableCountryCode={false} // Sigurohuni që kodi i shtetit të përfshihet
    />
  </div>

  {/* Fushat e fshehura për numrin e telefonit */}
  <input
    type="hidden"
    name="q7_phoneNumber[area]" // Fusha për kodin e shtetit
    value={phone.slice(0, 3)} // Merrni kodin e shtetit (p.sh., +49)
  />
  <input
    type="hidden"
    name="q7_phoneNumber[phone]" // Fusha për numrin e telefonit
    value={phone.slice(3)} // Merrni numrin e telefonit pa kodin e shtetit
  />

  {/* Butoni i dërgimit */}
  <button
    type="submit"
    className="button1 bg-[#13f97b] mt-[2rem] h-20 w-full rounded-lg p-4 cursor-pointer flex items-center justify-between text-[16px] font-[600] transition-all duration-500 ease-in-out shadow-[0_24px_32px_-20px_rgba(19,249,123,0)] hover:scale-105 relative overflow-hidden"
  >
    <div className="btn-text w-full text-center z-10">
      {texts.online?.secureAccess}
    </div>
    <div className="btn-arrow-icon">
      <img
        className="w-[30px] h-[30px]"
        src="/images/66be15dd3e60e45dfe4c8ab4_Check box.png"
        alt="Arrow"
      />
    </div>
  </button>
</form>
          </div>
        </div>
      )}



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
        .backdrop-blur-md {
          backdrop-filter: blur(10px);
          background-image: linear-gradient(#f6f8fb80, #f6f8fbe6);
        }
       .checkbox {
  float: none;
  border: 1.5px solid #b9c8da;
  border-radius: 5px;
  width: 24px;
  height: 24px;
  margin-top: 0;
  margin-left: 0;
  margin-right: 10px;

}
  .custom-checkbox {
  display: none; /* Hide the native checkbox */
}

.custom-checkbox + label {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 34px; /* Space for the custom checkbox */
  cursor: pointer;
}

.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1.5px solid #b9c8da;
  border-radius: 5px;
  position: absolute;
  left: 0;
  top: 0;
}

.custom-checkbox:checked + label::before {
  background-image: url("https://d3e54v103j8qbb.cloudfront.net/static/custom-checkbox-checkmark.589d534424.svg");
  background-size: cover;
  background-position: center;
  border: none;
    background-color: #b9c8da;


}
      `}</style>
    </>
  );
};

export default Button;
