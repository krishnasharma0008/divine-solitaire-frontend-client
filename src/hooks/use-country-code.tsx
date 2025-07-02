// import { useEffect, useState } from "react";

// const useCountryCode = () => {
//   const [countryCode, setCountryCode] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCountryCode = async () => {
//       try {
//         const ipResponse = await fetch("https://api.ipify.org?format=json");
//         const { ip } = await ipResponse.json();
//         const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
//         const { country_code } = await locationResponse.json();
//         console.log("Country Code", country_code);
//         setCountryCode(country_code === "IN" ? "IN" : "US");
//       } catch (error) {
//         console.error("Error fetching country code:", error);
//         setCountryCode(null); // Set country code to null in case of error
//       }
//     };

//     fetchCountryCode();
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   return countryCode;
// };

// export default useCountryCode;

import { useEffect, useState } from "react";

const useCountryCode = () => {
  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await fetch("/api/ipinfo");
        const { country_code } = await response.json();
        console.log("Country Code", country_code);
        setCountryCode(country_code === "IN" ? "IN" : "US");
      } catch (error) {
        console.error("Error fetching country code:", error);
        setCountryCode(null);
      }
    };

    fetchCountryCode();
  }, []);

  return countryCode;
};

export default useCountryCode;
