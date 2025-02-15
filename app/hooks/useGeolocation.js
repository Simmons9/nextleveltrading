import { useState, useEffect } from 'react';

const fetchLocation = async () => {
  try {
    const accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID; 
    const licenseKey = process.env.NEXT_PUBLIC_LICENSE_KEY; 

    const response = await fetch(
      `https://geoip.maxmind.com/geoip/v2.1/city/me?account_id=${accountId}&license_key=${licenseKey}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch location from MaxMind');
    }

    const data = await response.json();
    return data.country.iso_code; 
  } catch (error) {
    console.error("Failed to fetch location from MaxMind", error);
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

  return country; // Kthen kodin e vendit
}