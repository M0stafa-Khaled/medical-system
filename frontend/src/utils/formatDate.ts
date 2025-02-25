const formatDateTime = (data: string): string => {
  const date = new Date(data);

  const options: Intl.DateTimeFormatOptions = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // hour12: true,
  };

  return date.toLocaleString("ar-EG", options);
};

export default formatDateTime;
