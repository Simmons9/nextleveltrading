"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useGeolocation from "../../hooks/useGeolocation";

const Button = ({ buttonText, ai, gi, ci, texts, altid, oi, rd, sxid = "", extid = "" }) => {
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(null);
  const [localTexts, setLocalTexts] = useState(texts || {});
  const router = useRouter();

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
      DE: "de", AT: "de", US: "en", GB: "en", CA: "en",
      AU: "en", NZ: "en", PT: "pt", BR: "pt", FR: "fr",
      CH: "fr", LU: "fr", NL: "nl", BE: "nl", IT: "it",
      SV: "sv", ES: "es",
    };
    const loadTranslations = async (langCode) => {
      try {
        const translations = await import(`../../../public/translations/${langCode}.json`);
        setLocalTexts(translations.default || translations);
      } catch (error) {
        console.error(`Could not load translations for ${langCode}:`, error);
      }
    };
    loadTranslations(languageMap[country] || "de");
  }, [country]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  

    const phoneNumber = phone.startsWith("+") ? phone.slice(1) : phone;

  
  
    // ✅ Get user IP
    let userIp = "0.0.0.0";
    try {
      const res = await fetch("https://ipinfo.io/json?token=" + process.env.NEXT_PUBLIC_IPINFO_TOKEN);
      const ipData = await res.json();
      userIp = ipData.ip || "0.0.0.0";
    } catch (err) {
      console.warn("Unable to fetch IP. Using default.");
    }
  
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: phoneNumber, 
      ai, gi, ci, altid, oi, rd, sxid, extid,
      userip: userIp,
      so: "NextLevelTrading",
      lg: "EN",
    };
  
    console.log("Submitting payload:", payload); 
  
    try {
      const response = await fetch("/api/trackbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      if (result.success) {
        console.log("Lead successfully sent!", result);
        setShowModal(false);
  
        let thankYouUrl = `/thank-you?rd=${encodeURIComponent(rd)}&sxid=${encodeURIComponent(sxid)}&extid=${encodeURIComponent(extid)}`;
        if (result.autologinUrl) {
          thankYouUrl += `&reU=${encodeURIComponent(result.autologinUrl)}`;
        }
  
        router.push(thankYouUrl);
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error sending data.");
    }
  
    setLoading(false);
  };
  

  return (
    <>
      <div className="relative">
        <div
          onClick={() => setShowModal(true)}
          className="button bg-[#13f97b] sm:text-[14px] mt-[2rem] h-20 sm:w-[27rem] w-auto rounded-lg p-4 cursor-pointer flex items-center justify-between text-[13px] font-[600] transition-all duration-500 ease-in-out hover:scale-105 relative overflow-hidden z-50"
        >
          <div className="btn-text w-full text-center">{buttonText}</div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] backdrop-blur-md p-5">
          <div className="bg-white relative rounded-[20px] p-8 w-full max-w-lg lg:mx-0 z-[1001]">
            <button
              className="absolute top-4 right-4"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-all"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h1 className="form text-[24px] text-center font-bold mb-6 leading-[1.5]">
              {localTexts.online?.justOneStep}
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder={localTexts.online?.firstNamePlaceholder}
                className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[18px]"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder={localTexts.online?.lastNamePlaceholder}
                className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[18px]"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={localTexts.online?.emailPlaceholder}
                className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[18px]"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <div className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[15px] relative z-[1001]">
                <PhoneInput
                  country={country ? country.toLowerCase() : "de"}
                  value={phone}
                  onChange={(value) => setPhone(value)} // ✅ Do NOT add "+"
                  inputStyle={{
                    width: "90%",
                    backgroundColor: "#edf1f6",
                    border: "none",
                    fontSize: "16px",
                    padding: "18px",
                    borderRadius: "10px",
                    marginLeft: "43px",
                    zIndex: "1001",
                  }}
                  inputProps={{
                    required: true,
                    placeholder: localTexts.online?.telefonnumer || "Phone Number",
                  }}
                />
              </div>
              <button
                type="submit"
                className="button1 bg-[#13f97b] mt-[2rem] h-20 w-full rounded-lg p-4 cursor-pointer flex items-center justify-between text-[16px] font-[600] transition-all duration-500 ease-in-out hover:scale-105 relative overflow-hidden"
              >
                <div className="btn-text w-full text-center">
                  {loading ? "Submitting..." : localTexts.online?.secureAccess || "Secure Access"}
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
        .custom-checkbox {
          display: none;
        }
        .custom-checkbox + label {
          display: flex;
          align-items: center;
          position: relative;
          padding-left: 34px;
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
          background-image: url("/images/checkmark.svg");
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
