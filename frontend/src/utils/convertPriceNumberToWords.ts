const numberToWords = (num: number): string => {
  if (num === 0) return "صفر جنيه";

  const words: Record<number, string> = {
    0: "صفر",
    1: "واحد",
    2: "اثنان",
    3: "ثلاثة",
    4: "أربعة",
    5: "خمسة",
    6: "ستة",
    7: "سبعة",
    8: "ثمانية",
    9: "تسعة",
    10: "عشرة",
    11: "أحد عشر",
    12: "اثنا عشر",
    13: "ثلاثة عشر",
    14: "أربعة عشر",
    15: "خمسة عشر",
    16: "ستة عشر",
    17: "سبعة عشر",
    18: "ثمانية عشر",
    19: "تسعة عشر",
    20: "عشرون",
    30: "ثلاثون",
    40: "أربعون",
    50: "خمسون",
    60: "ستون",
    70: "سبعون",
    80: "ثمانون",
    90: "تسعون",
  };

  const levels: Record<number, string> = {
    100: "مئة",
    200: "مئتان",
    300: "ثلاثمائة",
    400: "أربعمائة",
    500: "خمسمائة",
    600: "ستمائة",
    700: "سبعمائة",
    800: "ثمانمائة",
    900: "تسعمائة",
  };

  if (num < 21) {
    return words[num as keyof typeof words];
  } else if (num < 100) {
    return (
      words[Math.floor(num / 10) * 10] +
      (num % 10 !== 0 ? " و" + words[num % 10] : "")
    );
  } else if (num < 1000) {
    return (
      levels[Math.floor(num / 100) * 100] +
      (num % 100 !== 0 ? " و" + numberToWords(num % 100) : "")
    );
  } else if (num < 1000000) {
    return (
      numberToWords(Math.floor(num / 1000)) +
      " ألف" +
      (num % 1000 !== 0 ? " و" + numberToWords(num % 1000) : "")
    );
  } else if (num < 1000000000) {
    return (
      numberToWords(Math.floor(num / 1000000)) +
      " مليون" +
      (num % 1000000 !== 0 ? " و" + numberToWords(num % 1000000) : "")
    );
  } else if (num < 1000000000000) {
    return (
      numberToWords(Math.floor(num / 1000000000)) +
      " مليار" +
      (num % 1000000000 !== 0 ? " و" + numberToWords(num % 1000000000) : "")
    );
  } else {
    return "رقم كبير جدًا";
  }
};

export const convertToEgyptianPounds = (amount: string): string => {
  amount = parseFloat(amount).toFixed(2);
  const [pounds, piastres] = amount.split(".").map(Number);

  let result = numberToWords(pounds) + " جنيه";
  if (pounds !== 0 && pounds % 100 !== 0) result += " مصري";

  if (piastres > 0) {
    result += " و" + numberToWords(piastres) + " قرش";
  }

  return result;
};
