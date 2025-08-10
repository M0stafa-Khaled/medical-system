export const numberToPrice = (
  price: number | string,
  locale: string = "ar-EG"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EGP",
  }).format(Number(price));
};
