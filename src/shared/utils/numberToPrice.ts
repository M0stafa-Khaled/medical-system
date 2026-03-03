export const numberToPrice = (
  price: number | string,
  locale: string = "ar-EG"
) => {
  if (!Number(price)) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EGP",
  }).format(Number(price));
};
