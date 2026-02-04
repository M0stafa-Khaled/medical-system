import { format } from "date-fns";
import { ar } from "date-fns/locale";

const LastVisitsHeader = ({ name }: { name: string }) => {
  return (
    <div className="my-4 text-lg text-black dark:text-white flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <h1 className="leading-relaxed text-dark/80 dark:text-gray-300 ">
        اخر زيارات المريض:{" "}
        <span className="text-dark dark:text-white font-semibold">{name}</span>
      </h1>
      <div>{format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}</div>
    </div>
  );
};

export default LastVisitsHeader;
