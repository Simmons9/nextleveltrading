"use client";

import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useGeolocation from "../../hooks/useGeolocation";

const Button = ({ buttonText }) => {
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ Success state
  const country = useGeolocation();
  const [texts, setTexts] = useState({});

  useEffect(() => {
    const loadTranslations = async (langCode) => {
      try {
        const translations = await import(`../../../public/translations/${langCode}.json`);
        setTexts(translations.default || translations);
      } catch (error) {
        console.error(`Could not load translations for ${langCode}:`, error);
      }
    };

    const languageMap = {
      DE: "de", AT: "de",
      US: "en", GB: "en", CA: "en", AU: "en", NZ: "en",
      PT: "pt", BR: "pt",
      FR: "fr", CH: "fr", LU: "fr",
      NL: "nl", BE: "nl",
      IT: "it",
      SV: "sv",
      ES: "es",
    };

    loadTranslations(languageMap[country] || "de");
  }, [country]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: phone,
      ip: "user-ip",
    };

    try {
      const response = await fetch("/api/trackbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Lead successfully sent!", result);
        setSuccess(true); // ✅ Show success message
        setTimeout(() => {
          setShowModal(false);
          setSuccess(false);
          setFormData({ firstName: "", lastName: "", email: "" });
          setPhone("");
        }, 3000); // ✅ Auto-close after 3 seconds
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

            {/* Close Button */}
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* ✅ Success Message & Animation */}
            {success ? (
              <div className="flex flex-col items-center justify-center">
                <div className="checkmark-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-green-500 animate-checkmark"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="text-green-600 text-2xl font-bold mt-4">Thank you!</h2>
                <p className="text-gray-500 text-center">Your information has been submitted successfully.</p>
              </div>
            ) : (
              <>
                <h1 className="form text-[24px] text-center font-bold mb-6 leading-[1.5]">
                  {texts.online?.justOneStep || "Nur noch ein Schritt..."}
                </h1>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder={texts.online?.firstNamePlaceholder || "Name..."}
                    className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[18px]"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />

                  <input
                    type="text"
                    name="lastName"
                    placeholder={texts.online?.lastNamePlaceholder || "Surname..."}
                    className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[18px]"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder={texts.online?.emailPlaceholder || "E-mail..."}
                    className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[18px]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />

                  <button
                    type="submit"
                    className="button1 bg-[#13f97b] mt-[2rem] h-20 w-full rounded-lg p-4 cursor-pointer flex items-center justify-between text-[16px] font-[600] transition-all duration-500 ease-in-out hover:scale-105 relative overflow-hidden"
                  >
                    <div className="btn-text w-full text-center">
                      {loading ? "Submitting..." : texts.online?.secureAccess || "Secure Access"}
                    </div>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ✅ FULLY RESTORED CSS */}
      <style jsx>{`
        @keyframes moveInteraction {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-interaction { animation: moveInteraction 3s linear infinite; }
        .backdrop-blur-md { backdrop-filter: blur(10px); background-image: linear-gradient(#f6f8fb80, #f6f8fbe6); }
        .custom-checkbox { display: none; }
        .custom-checkbox + label { display: flex; align-items: center; position: relative; padding-left: 34px; cursor: pointer; }
        .custom-checkbox + label::before { content: ""; width: 24px; height: 24px; border: 1.5px solid #b9c8da; border-radius: 5px; position: absolute; left: 0; top: 0; }
        .custom-checkbox:checked + label::before { background-image: url("/images/checkmark.svg"); background-size: cover; background-position: center; border: none; background-color: #b9c8da; }
      `}</style>
    </>
  );
};

export default Button;
