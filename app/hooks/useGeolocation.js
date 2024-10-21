import { useState, useEffect } from 'react';

// Function to fetch country from IP info
const fetchLocation = async () => {
  try {
    const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
    const response = await fetch(`https://ipinfo.io/json?token=${token}`);
    const data = await response.json();
    return data.country; // Returns country code like 'DE', 'US', etc.
  } catch (error) {
    console.error("Failed to fetch location:", error);
    return null; // Return null in case of failure
  }
};

export default function useGeolocation() {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      const location = await fetchLocation();
      setCountry(location || "DE"); // Fallback to "DE" if location fetching fails
    };

    getLocation();
  }, []);

  return country;
}
