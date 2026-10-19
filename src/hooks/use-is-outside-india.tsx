import { useEffect, useState } from "react";

let resolved: boolean | null = null;
let detection: Promise<boolean> | null = null;

const detectOutsideIndia = (): Promise<boolean> => {
  if (!detection) {
    detection = fetch("/api/ipinfo")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => (data?.country_code ? data.country_code !== "IN" : false))
      .catch(() => false)
      .then((value) => {
        resolved = value;
        return value;
      });
  }
  return detection;
};

const useIsOutsideIndia = () => {
  const [isOutsideIndia, setIsOutsideIndia] = useState(resolved ?? false);

  useEffect(() => {
    let active = true;
    detectOutsideIndia().then((value) => {
      if (active) setIsOutsideIndia(value);
    });
    return () => {
      active = false;
    };
  }, []);

  return isOutsideIndia;
};

export default useIsOutsideIndia;
