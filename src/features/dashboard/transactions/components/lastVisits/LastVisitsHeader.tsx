import { format } from "date-fns";
import { ar } from "date-fns/locale";

export const LastVisitsHeader = ({ name }: { name: string }) => {
  return (
    <div className="my-4 flex flex-col justify-between gap-4 text-lg text-black sm:flex-row sm:items-center dark:text-white">
      <h1 className="text-dark/80 leading-relaxed dark:text-gray-300">
        اخر زيارات المريض:{" "}
        <span className="text-dark font-semibold dark:text-white">{name}</span>
      </h1>
      <div>{format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}</div>
    </div>
  );
};
