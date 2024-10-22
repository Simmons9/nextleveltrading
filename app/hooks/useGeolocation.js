import { useState, useEffect } from 'react';

const fetchLocation = async () => {
  try {
    const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
    const data = await response.json();
    return data.country; // This will return the country code (e.g., "DE", "US")
  } catch (error) {
    console.error("Failed to fetch location", error);
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

  return country;
}
