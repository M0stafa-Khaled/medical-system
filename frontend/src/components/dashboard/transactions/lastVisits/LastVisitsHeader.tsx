import { format } from "date-fns";
import { ar } from "date-fns/locale";

const LastVisitsHeader = () => {
  return (
    <div className="my-4 text-lg font-semibold text-black dark:text-white flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <h1 className="font-semibold leading-relaxed">اخر الزيارات</h1>
      <div>{format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}</div>
    </div>
  );
};

export default LastVisitsHeader;
