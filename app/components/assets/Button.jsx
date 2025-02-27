"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // ✅ Use useSearchParams()
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Button = ({ buttonText }) => {
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ Extract query params correctly

  // ✅ Extract Affiliate ID, gi, and ci from the URL
  const affiliateIds = searchParams.get("ai") ? searchParams.get("ai").split(",") : ["2958033"]; // Default affiliate ID
  const gi = searchParams.get("gi") || "22"; // Default gi
  const ci = searchParams.get("ci") || "4";  // Default ci

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: phone,
      gi: gi,
      ci: ci,
    };

    try {
      let autologinUrl = null;

      // ✅ Send request for each affiliate ID
      for (let affiliateId of affiliateIds) {
        const response = await fetch("/api/trackbox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, ai: affiliateId }), // Send each affiliate ID
        });

        const result = await response.json();
        if (result.success) {
          console.log(`✅ Lead successfully sent for affiliate ${affiliateId}`, result);

          // ✅ Extract the autologin URL (if available)
          if (result.autologinUrl) {
            autologinUrl = result.autologinUrl; // Store the autologin link
          }
        } else {
          console.error(`❌ Error submitting form for affiliate ${affiliateId}`, result);
        }
      }

      setShowModal(false);

      // ✅ Redirect to autologin if available, otherwise go to thank you page
      if (autologinUrl) {
        console.log("🔗 Redirecting to Autologin URL:", autologinUrl);
        window.location.href = autologinUrl; // Redirect user to autologin
      } else {
        router.push("/thank-you"); // Fallback redirect
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
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
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>


            <h1 className="form text-[24px] text-center font-bold mb-6 leading-[1.5]">
              {texts.online?.justOneStep || "Nur noch ein Schritt..."}
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder={texts.online?.firstNamePlaceholder || "Emri..."}
                className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[18px]"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder={texts.online?.lastNamePlaceholder || "Mbiemri..."}
                className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[18px]"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />

              <input
                type="email"
                name="email"
                placeholder={texts.online?.emailPlaceholder || "Email..."}
                className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[18px]"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <div className="block w-full mb-4 rounded-[10px] bg-[#edf1f6] p-[15px] relative z-[1001]">
                <PhoneInput
                  country={"de"}
                  value={phone}
                  onChange={setPhone}
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
                    placeholder: texts.online?.telefonnumer || "Telefonnummer",
                  }}
                />
              </div>

              <button
                type="submit"
                className="button1 bg-[#13f97b] mt-[2rem] h-20 w-full rounded-lg p-4 cursor-pointer flex items-center justify-between text-[16px] font-[600] transition-all duration-500 ease-in-out hover:scale-105 relative overflow-hidden"
              >
                <div className="btn-text w-full text-center">
                  {loading ? "Submitting..." : texts.online?.secureAccess || "Secure Access"}
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
