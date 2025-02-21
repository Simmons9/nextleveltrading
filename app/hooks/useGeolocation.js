import { useState, useEffect } from "react";

const fetchLocation = async () => {
  try {
    const response = await fetch("/api/location"); // Calls Next.js API route
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    return data.countryCode || null; // Returns "DE", "US", etc.
  } catch (error) {
    console.error("❌ Error fetching location:", error);
    return null;
  }
};

export default function useGeolocation() {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      const location = await fetchLocation();
      setCountry(location);
    };

    getLocation();
  }, []);

  return country; // Returns country code for further use
}
