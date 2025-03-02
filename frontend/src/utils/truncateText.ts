/**
 * Truncates text to a specified maximum length and adds ellipsis if needed
 * @param text - The text to be truncated
 * @param maxLength - The maximum length of the text (default: 50)
 * @returns The truncated text with ellipsis if needed, or the original text if shorter than maxLength
 */
const truncateText = (text: string, maxLength: number = 50): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export default truncateText;
