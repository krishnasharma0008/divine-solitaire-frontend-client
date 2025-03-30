import { useCallback } from "react";

const useIsWithinOneYear = () => {
  const isWithinOneYear = useCallback((purchaseDate: string): boolean => {
    if (!purchaseDate) return false; // Handle empty values

    // Parse the input format: "21/Mar/2023"
    const dateParts = purchaseDate.split("/");
    if (dateParts.length !== 3) return false; // Ensure valid format

    const day = parseInt(dateParts[0], 10);
    const monthStr = dateParts[1];
    const year = parseInt(dateParts[2], 10);

    // Month mapping for conversion
    const months: Record<string, number> = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    const month = months[monthStr]; // Convert month name to number
    if (isNaN(day) || month === undefined || isNaN(year)) return false; // Ensure valid numbers

    // Create a Date object for the purchase date
    const purchaseDateObj = new Date(year, month, day);
    purchaseDateObj.setHours(0, 0, 0, 0); // Normalize to midnight

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate the date one year ago from today
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    console.log("📌 Purchase Date:", purchaseDateObj.toISOString());
    console.log("📌 One Year Ago:", oneYearAgo.toISOString());
    console.log("📌 Today:", today.toISOString());

    return purchaseDateObj.getTime() >= oneYearAgo.getTime();
  }, []);

  return { isWithinOneYear };
};

export default useIsWithinOneYear;
