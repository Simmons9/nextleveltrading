"use client";

import { useState, useEffect } from "react";

const fetchLocation = async () => {
  try {
    const response = await fetch("/api/location"); // Calls your Next.js API route
    if (!response.ok) throw new Error("Failed to fetch location");

    const data = await response.json();
    return data.countryCode || null; // Returns "DE", "US", etc.
  } catch (error) {
    console.error("❌ Failed to fetch location:", error);
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
