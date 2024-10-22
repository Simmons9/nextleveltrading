"use client";
import { useState, useEffect } from 'react';

const fetchLocation = async () => {
  try {
    // Use environment variable for the token
    const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
    const response = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
    const data = await response.json();
    return data.country;
  } catch (error) {
    console.error("Failed to fetch location", error);
    return null; // return null in case of error
  }
};

export default function Page() {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for user feedback

  useEffect(() => {
    const getLocation = async () => {
      const location = await fetchLocation();
      setCountry(location);
      setLoading(false); // Set loading to false after fetching location
    };

    getLocation();
  }, []);

  return (
    <div>
      {/* <h1>Welcome to the Geolocation App</h1>
      {country ? (
        <div>
          {country === "DE" ? (
            <p>Willkommen aus Deutschland!</p>
          ) : country === "GB" ? (
            <p>Welcome from the United Kingdom!</p>
          ) : (
            <p>Welcome!</p>
          )}
        </div>
      ) : (
        <p>Loading location...</p>
      )} */}
    </div>
  );
}
