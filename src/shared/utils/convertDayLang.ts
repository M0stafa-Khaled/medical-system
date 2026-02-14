import { DAYS } from "@/constants";

type Language = "en" | "ar";
const convertDay = (day: string, fromLang: Language): string => {
  if (!day) return "";
  const normalizedDay = day.toLowerCase().trim();

  if (fromLang === "en") {
    const dayObj = DAYS[normalizedDay];
    return dayObj ? dayObj.ar : day;
  } else {
    const dayEntry = Object.values(DAYS).find((d) => d.ar === day);
    return dayEntry ? dayEntry.en : day;
  }
};

export default convertDay;

export const convertDayFromEnToAr = (englishDay: string): string => {
  return convertDay(englishDay, "en");
};

export const convertDayFromArToEn = (arabicDay: string): string => {
  return convertDay(arabicDay, "ar");
};
