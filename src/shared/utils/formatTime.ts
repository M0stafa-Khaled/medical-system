const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  const paddedHour = formattedHour.toString().padStart(2, "0");
  const paddedMinutes = minutes.padStart(2, "0");
  return `${paddedHour}:${paddedMinutes} ${period}`;
};

const reverseFormatTime = (time: string) => {
  const [timePart, period] = time.split(" ");
  const [hours, minutes] = timePart.split(":");
  let hour = parseInt(hours);

  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  const paddedHour = hour.toString().padStart(2, "0");
  return `${paddedHour}:${minutes}`;
};

export { formatTime, reverseFormatTime };
