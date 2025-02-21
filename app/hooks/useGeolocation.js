import { useState, useEffect } from "react";

const fetchLocation = async () => {
  try {
    const response = await fetch("/api/location"); // Calls your Next.js API route
    const data = await response.json();
    return data.countryCode; // Returns "DE", "US", etc.
  } catch (error) {
    console.error("Error fetching location", error);
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
