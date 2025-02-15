import { useState, useEffect } from 'react';

const fetchLocation = async () => {
  try {
    const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
    const data = await response.json();
    return data.country_code; // Return the country code (e.g., "GB")
  } catch (error) {
    console.error("Failed to fetch location", error);
    return null; // Return null in case of an error
  }
};

export default function useGeolocation() {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      const location = await fetchLocation();
      setCountry(location); // Set the country code in state
    };

    getLocation();
  }, []);

  return country; // Return the country code
}




// import { useState, useEffect } from "react";

// const fetchLocation = async () => {
//   try {
//     const response = await fetch("/api/location"); // API route në Next.js
//     const data = await response.json();
//     return data.country; // Kthen kodin e shtetit (p.sh., "AL" për Shqipëri)
//   } catch (error) {
//     console.error("Gabim gjatë marrjes së lokacionit", error);
//     return null;
//   }
// };

// export default function useGeolocation() {
//   const [country, setCountry] = useState(null);

//   useEffect(() => {
//     const getLocation = async () => {
//       const location = await fetchLocation();
//       setCountry(location);
//     };

//     getLocation();
//   }, []);

//   return country;
// }
