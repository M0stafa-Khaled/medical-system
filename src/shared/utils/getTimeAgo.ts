import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

export const getTimeAgo = (date: string): string => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ar,
  });
};
