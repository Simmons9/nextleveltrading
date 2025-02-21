"use client";
import { useState, useEffect } from "react";

const fetchLocation = async () => {
  try {
    const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN; // Use your token
    if (!token) {
      console.error("IPinfo token is missing");
      return null;
    }

    const response = await fetch(`https://ipinfo.io/json?token=${token}`);
    if (!response.ok) throw new Error("Failed to fetch location");

    const data = await response.json();
    return data.country; // Returns country ISO code (e.g., "DE", "US")
  } catch (error) {
    console.error("Failed to fetch location", error);
    return null;
  }
};

export default function Page() {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      const location = await fetchLocation();
      setCountry(location);
      setLoading(false);
    };

    getLocation();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold">Welcome to Next Level Trading</h1>
      {loading ? (
        <p className="text-gray-500">Lade Standort...</p>
      ) : (
        <p className="text-lg">
          {country === "DE" ? "Willkommen aus Deutschland!" :
           country === "GB" ? "Welcome from the United Kingdom!" :
           country === "FR" ? "Bienvenue de France!" :
           "Welcome!"}
        </p>
      )}
    </div>
  );
}
