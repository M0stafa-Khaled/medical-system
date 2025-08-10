const defaultOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};
const formatDateTime = (
  data: string,
  options: Intl.DateTimeFormatOptions = defaultOptions
): string => {
  const date = new Date(data);

  return date.toLocaleString("ar-EG", options);
};

export default formatDateTime;
